const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        required : true
    },
    courseDescription : {
        type : String,
        required : true,
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Users"
    },
    whatYouWillLearn : {
        type : String,
    },
    courseContent : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Sections"
    }],
    ratingAndReviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingAndReviews"
    }],
    price : {
        type : Number,
        required : true
    },
    thumbnailUrl : {
        type : String,
    },
    tag : {
        type : [String],
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Categories"
    },
    studentsEnrolled : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }],
    instructions: {
    type: [String],
    },
    status: {
    type: String,
    enum: ["Draft", "Published"],
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Courses",CourseSchema);