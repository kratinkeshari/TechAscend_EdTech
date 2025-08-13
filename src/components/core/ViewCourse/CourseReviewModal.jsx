import React from 'react'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

function CourseReviewModal({setReviewModal}) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 md:p-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* User Info Section */}
        <div className="my-6 flex items-center justify-center gap-x-4">
          <img
            src={
              user?.image
                ? user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstname} ${user?.lastname}`
            }
            alt={user?.firstname + "profile"}

            className="aspect-square w-[50px] md:w-[60px] rounded-full object-cover"
          />
          <div className="">
            <p className="font-semibold text-richblack-5 text-base md:text-lg">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-sm text-richblack-5">Posting Publicly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col items-center">
          {/* Rating Section */}
          <div className="flex flex-col items-center mb-6">
            <ReactStars
              count={5}
              onChange={ratingChanged}

              size={window.innerWidth < 768 ? 30 : 40}
              activeColor="#ffd700"
            />
            {errors.courseRating && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">Please Select Rating</span>
            )}
          </div>

          {/* Review Text Area */}
          <div className="flex w-full flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="courseExperience">
              Add Your Experience <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="courseExperience"
              placeholder="Add Your Experience"
              {...register("courseExperience", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full p-3 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400 border border-richblack-600 focus:border-yellow-50 focus:outline-none"
            />
            {errors.courseExperience && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">Please Add Your Experience</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex w-full justify-end gap-x-2">
            <button
              onClick={() => setReviewModal(false)}
              className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 hover:bg-richblack-400 transition-colors"
            >
              Cancel
            </button>
            <IconBtn text="Save" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CourseReviewModal;