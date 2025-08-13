import React from 'react'
import { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI';

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        ; (async () => {
            try {
                const res = await getUserEnrolledCourses(token)
                const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
                setEnrolledCourses(filterPublishCourse)
                // console.log(res);
            } catch (error) {
                console.log("Could not fetch enrolled courses.")
            }
        })()

    }, [])

    return (
    <>
<div className="text-2xl sm:text-3xl font-bold text-richblack-50 mb-6">Enrolled Courses</div>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5 text-center text-base sm:text-lg">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="hidden md:flex rounded-t-lg bg-richblack-500">
            <p className="w-[45%] px-5 py-3 text-sm font-medium">Course Name</p>
            <p className="w-1/4 px-2 py-3 text-sm font-medium">Duration</p>
            <p className="flex-1 px-2 py-3 text-sm font-medium">Progress</p>
          </div>
          <div className="space-y-4 md:space-y-0">
            {enrolledCourses.map((course, i, arr) => (
              <div
                className={`
                  flex flex-col md:flex-row md:items-center 
                  border border-richblack-700 
                  ${i === arr.length - 1 ? "rounded-b-lg md:rounded-b-lg" : "rounded-none"} 
                  ${i === 0 && "md:border-t-0"}
                  p-4 md:p-0
                  bg-richblack-800 md:bg-transparent
                  rounded-lg md:rounded-none
                  mb-4 md:mb-0
                `}
                key={i}
              >
                <div
                  className="flex w-full md:w-[45%] cursor-pointer items-center gap-4 md:px-5 md:py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`,
                    )
                  }}
                >
                  <img
                    src={course.thumbnailUrl || "/placeholder.svg"}
                    alt="course_img"
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <p className="font-semibold text-sm sm:text-base line-clamp-2">{course.courseName}</p>
                    <p className="text-xs text-richblack-300 line-clamp-2">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/4 md:px-2 md:py-3 mt-2 md:mt-0">
                  <div className="flex md:block">
                    <span className="text-xs text-richblack-300 md:hidden mr-2">Duration:</span>
                    <span className="text-sm">{course?.totalDuration || "N/A"}</span>
                  </div>
                </div>

                <div className="flex w-full md:w-1/5 flex-col gap-2 md:px-2 md:py-3 mt-3 md:mt-0">
                  <div className="flex items-center justify-between md:block">
                    <p className="text-sm">Progress: {course.progressPercentage || 0}%</p>
                  </div>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    bgColor="#FFD60A"
                    baseBgColor="#2C333F"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
    )
}

export default EnrolledCourses