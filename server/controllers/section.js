const Courses = require("../models/Courses");
const Sections = require("../models/Sections");
const Users = require("../models/Users");
const SubSections = require('../models/SubSections');

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    // const courseId = req.params;
    if (!sectionName || !courseId) {
      return res.status(500).json({
        success: false,
        message: "Enter the required properties",
      });
    }
    // console.log("COurseID...",courseId)

    const newSection = await Sections.create({
      sectionName,
      courseId,
    });

    const course = await Courses.findByIdAndUpdate(
      courseId,
      { $push: { 
        courseContent: newSection._id 
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    console.log(newSection)
    return res.status(200).json({
      success: true,
      course,
      message: "Section created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(500).json({
        success: false,
        message: "Enter all details carefully",
      });
    }

    const updatedSection = await Sections.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    )

    const course = await Courses.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      data: course,
      message : updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { courseId, sectionId } = req.body;
    // console.log("Section Id...",sectionId)
    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    );

    const section = await Sections.findById(sectionId)
    // console.log(sectionId, courseId)
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }
    // Delete the associated subsections
    await SubSections.deleteMany({
       _id: { $in: section.subSection } 
      })

    await Sections.findByIdAndDelete(sectionId);

    const course = await Courses.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      data: course,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSections = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await Users.findById(courseId);

    if (!user) {
      return res.status(500).json({
        success: false,
        meassage: "Invalid user",
      });
    }

    response = user.courseContent.populate("courseContent");

    return res.status(200).json({
      success: true,
      data: response,
      message: "showing all the sections of the course",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
