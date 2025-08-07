import toast from "react-hot-toast"

import rzpLogo from '../../assets/Logo/rzp_logo.png'
import {apiConnector} from "../apiconnector"
import { studentEndpoints } from "../apis"
import {resetCart} from "../../slices/cartSlice";
import {setPaymentLoading} from "../../slices/courseSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src

    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")

  try {
    // load the sript
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your Internet Connection.")
      return
    }

    // initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("ORDER RESPONSE>>>",orderResponse);
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }

    //options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: orderResponse.data.data.amount,
      order_id: orderResponse.data.data.id,
      name: "TechAscend",
      description: "Thank you for Purchasing the Course",
      // image: rzpLogo,
      prefill: {
        name: `${userDetails.firstname} ${userDetails.lastname}`,
        email: userDetails.email,
      },
      handler: function (response) {
        sendPaymentSuccessfulEmail(
          response,
          orderResponse.data.data.amount,
          token
        )
        verifyPayment({ ...response,courses }, token, navigate, dispatch)
      },
    }

    //miss hojayega raorpay modal
    const paymentObject = new window.Razorpay(options)

    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR....", error)
    toast.error("Could not make Payment")
  }
  toast.dismiss(toastId)
}

async function sendPaymentSuccessfulEmail(response, amount, token) {
  // console.log("PAY RESPONSE>>>>",response);
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authoriazation: `Bearer ${token}`,
      }
    )
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR...", error)
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment")
  dispatch(setPaymentLoading(true))
  // console.log("BODY DATA>>>",bodyData);
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    // console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Payment successful,  you are added to the course")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR...", error)
    toast.error("PAYMENT COULD NOT BE VERIFIED")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}
