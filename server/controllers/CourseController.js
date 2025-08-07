const Users = require("../models/Users")
const Courses = require("../models/Courses")
const Categories = require("../models/Categories")
const Sections = require("../models/Sections")
const SubSections = require("../models/SubSections")
const CourseProgress = require("../models/CourseProgress")
const { cloudinaryImageUpload } = require("../utils/imageUpload")
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.createCourse = async (req, res) => {
  try {
    const userId = req.payload.id
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      status,
      tag: _tag,
      instructions: _instructions,
    } = req.body
    const File = req.files?.thumbnailImage
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    // console.log("tag", tag)
    // console.log("instructions", instructions)

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !File ||
      !category
    ) {
      return res.status(500).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    const instructorDetail = await Users.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetail) {
      return res.status(500).json({
        success: false,
        message: "Not authorized to add the course",
      })
    }
    // console.log("CAtegory...",category)
    const categoryDetails = await Categories.findById(category)

    if (!categoryDetails) {
      return res.status(500).json({
        success: false,
        message: "Category is not valid",
      })
    }

    // let imgUploaded
    // console.log(process.env.CLOUDINARY_FOLDER);
    // console.log("File to be uplaoded...",File);
    // try {
    const imgUploaded = await cloudinaryImageUpload(
        File,
        process.env.CLOUDINARY_FOLDER
      )
    // } catch (error) {
    //   return res.send(500).json({
    //     success: false,
    //     message: "Error in uploading image to cloudinary",
    //   })
    // }
    // console.log("Image Uploaded...",imgUploaded);
    const newCourse = await Courses.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      thumbnailUrl: imgUploaded.secure_url,
      category: categoryDetails._id,
      instructor: instructorDetail._id,
      tag,
      status: status,
      instructions,
    })
    
    await Users.findByIdAndUpdate(
      {
        _id: instructorDetail._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    
    // console.log("here")
    const categoryDetails2 = await Categories.findByIdAndUpdate(
      { _id: categoryDetails._id, },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    )
    // console.log("HEREEEEEEEE", categoryDetails2)
    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Courses.find(
              { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnailUrl: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    ).populate("instructor").exec()

    return res.status(200).json({
      success: true,
      data: allCourses,
      message: "All courses have been retrieved",
    })
  } catch (error) {
    return res.send(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body

    if (!courseId) {
      return res.status(500).json({
        success: false,
        message: "provide the course id",
      })
    }

    const courseDetail = await Courses.findById(courseId)
      .populate({ 
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        }, 
    })
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "userId",
          select: "firstname lastname email image",
        },
      })
      .populate({
        path: "studentsEnrolled",
        populate: {
          path: "profile",
          select: "gender",
        },
      })
            .populate({
        path: "instructor",
        populate: {
          path: "profile",
        },
      })
      .populate("category")

      if (!courseDetail) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    let totalDurationInSeconds = 0
    courseDetail.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      message: "Fetched the reqquired course detail",
      data: courseDetail,
      totalDuration,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.payload.id
    const courseDetails = await Courses.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "profile",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = {...req.body}
    const course = await Courses.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImg
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.CLOUDINARY_FOLDER
      )
      course.thumbnailUrl = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Courses.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "profile",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.payload.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Courses.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Courses.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await Users.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Sections.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSections.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Sections.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Courses.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
