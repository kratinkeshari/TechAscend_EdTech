const mongoose = require('mongoose');

const RatingAndReviewsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
    },
    rating : {
        type : Number,
        required : true,
    },
    review : {
        type : String,
        required : true,
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses",
        required : true,
        index : true,
    }
});

module.exports = mongoose.model("RatingAndReviews",RatingAndReviewsSchema);