const SubSections = require("../models/SubSections");
const Sections = require("../models/Sections");
const { cloudinaryImageUpload } = require("../utils/imageUpload");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const File = req.files.videoUrl;

    if (!sectionId || !title || !description || !File) {
      return res.status(500).json({
        success: false,
        message: "Provide all mandatory fields",
      });
    }

    let uploadedVid;
    try {
      uploadedVid = await cloudinaryImageUpload(
        File,
        process.env.CLOUDINARY_FOLDER
      );
      // console.log(uploadedVid)
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in uploading video to cloudinary",
      });
    }

    const newSubSection = await SubSections.create({
      title,
      timeDuration: `${uploadedVid.duration}`,
      // timeDuration,
      description,
      videoUrl: uploadedVid.secure_url,
    });

    const updatedSection = await Sections.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: newSubSection._id } },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "New sub section created successfully",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//To be completed based on usage
exports.updateSubSection = async (req, res) => {
  try {
    const {
      sectionId,
      subSectionId,
      title,
      description,
      // videoUrl,
      // additionalUrl,
    } = req.body;

    const subSection = await SubSections.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.videoUrl !== undefined) {
      const video = req.files.videoUrl;
      const uploadDetails = await cloudinaryImageUpload(
        video,
        process.env.CLOUDINARY_FOLDER
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await Sections.findById(sectionId).populate(
      "subSection"
    );

    // console.log("updated section", updatedSection);
    return res.status(200).json({
      success: true,
      message: "Sub section updated successfully",
      data: updatedSection,  
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: updatedSection,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    const subSection = await SubSections.findById(subSectionId);

    const updatedSection = await Sections.findByIdAndUpdate(
      subSection.sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    );

    const sSub = await SubSections.findByIdAndDelete(subSectionId);

    if (!sSub) {
      return res.status(404).json({ 
        success: false,
         message: "SubSection not found" 
        })
    }

    const updateSection = await Sections.findById(sectionId)
    .populate(
      "subSection"
    )

    return res.status(200).json({
      success: true,
      message: "Sub section deleted successfully",
      data: updateSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
