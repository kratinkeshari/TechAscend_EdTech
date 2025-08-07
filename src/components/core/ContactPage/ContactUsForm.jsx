import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/apis';
import countrycode from '../../../data/countrycode.json'


function ContactUsForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const submitContactForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            // console.log("Email Res - ", response);
            setLoading(false);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstname: "",
                lastname: "",
                email: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstname" className="lable-style">First Name</label>
                    <input
                        name="firstname"
                        type="text"
                        id="firstname"
                        placeholder="Enter first name"
                        {...register("firstname", { required: true })}
                        className="form-style"
                    />
                    {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your name
                            </span>
                        )
                    }
                </div>

                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastname" className="lable-style">Last Name</label>
                    <input
                        name="lastname"
                        type="text"
                        id="lastname"
                        placeholder="Enter last name"
                        {...register("lastname")}
                        className="form-style"
                    />
                </div>

            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="lable-style">Email Address</label>
                <input
                    type="email"
                    placeholder='Enter email address'
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="form-style"
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your Email adddress.
                        </span>
                    )
                }
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber" className="lable-style">
                    Phone Number
                </label>
                <div className="flex gap-5">
                    <div className="flex w-[81px] flex-col gap-2">
                        <select name="countrycode"
                            id="countrycode"
                            className="form-style"
                            {...register("countrycode", {
                                required: {
                                    value: true,
                                    message: "Please select country code"
                                },
                            }
                            )
                            }
                        >
                            {
                                countrycode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code} >
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input type='number' name="phonenumber" id="phonenumber" placeholder="12345 67890" className="form-style no-spinner"
                            {...register("phoneNo", {
                                required: {
                                    value: true,
                                    message: "Please enter your Phone Number.",
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Invalid Phone Number"
                                },
                                minLength: {
                                    value: 10,
                                    message: "Invalid Phone Number"
                                },
                            })}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="lable-style">Message</label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    {...register("message", { required: true })}
                    className="form-style"
                />
                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your message
                        </span>
                    )
                }

            </div>

            <button disabled={loading} type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${!loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `
                }
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactUsForm