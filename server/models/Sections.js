const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses",
    },
    sectionName : {
        type : String,
        required : true,
    },
    subSection : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubSections",
        required: true,
    }]
});

module.exports = mongoose.model("Sections",SectionSchema);