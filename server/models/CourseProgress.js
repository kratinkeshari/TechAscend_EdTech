const mongoose = require('mongoose');

const CourseProgressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses",
    },
    completedVideos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubSections",
    }]
});

module.exports = mongoose.model("CourseProgress",CourseProgressSchema);