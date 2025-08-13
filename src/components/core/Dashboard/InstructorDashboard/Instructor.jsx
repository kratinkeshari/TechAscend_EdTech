import React from 'react'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"
import InstructorChart from "./InstructorChart"

function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

    useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      // console.log(instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-richblack-5">Hi {user?.firstname} 👋</h1>
        <p className="text-sm sm:text-base font-medium text-richblack-200">Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:h-[450px]">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-4 sm:p-6">
                <p className="text-base sm:text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-lg sm:text-xl font-medium text-richblack-50">Not Enough Data To Visualize</p>
              </div>
            )}

            <div className="w-full lg:min-w-[250px] lg:max-w-[300px] flex flex-col rounded-md bg-richblack-800 p-4 sm:p-6">
              <p className="text-base sm:text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm sm:text-lg text-richblack-200">Total Courses</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-richblack-50">{courses.length}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-lg text-richblack-200">Total Students</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-lg text-richblack-200">Total Income</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-richblack-50">Rs. {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-richblack-800 p-4 sm:p-6">
            {/* Render 3 courses */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <p className="text-base sm:text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50 hover:text-yellow-100 transition-colors">View All</p>
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-full">
                  <img
                    src={course.thumbnailUrl || "/placeholder.svg"}
                    alt={course.courseName}
                    className="h-[150px] sm:h-[180px] lg:h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50 line-clamp-2">{course.courseName}</p>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="hidden sm:block text-xs font-medium text-richblack-300">|</p>
                      <p className="text-xs font-medium text-richblack-300">Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-xl sm:text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-base sm:text-lg font-semibold text-yellow-50 hover:text-yellow-100 transition-colors">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Instructor