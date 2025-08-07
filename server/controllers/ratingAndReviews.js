const RatingAndReviews = require('../models/RatingAndReviews');
const Users = require('../models/Courses');
const Courses = require('../models/Courses');
const mongoose = require('mongoose');

exports.createRating = async (req,res) => {
    try{

    const {courseId, rating, review} = req.body;
    const userId = req.payload.id;

    if(!courseId || !userId){
        return res.status(500).json({
            success : false,
            message : "Provide both course and user id",
        });
    }

    const isEnrolled = await Courses.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    })

    if(!isEnrolled){
        return res.status(500).json({
            success : false,
            message : "You are not enrolled in this course",
        });
    }

    const alreadyReviewed = await RatingAndReviews.findOne({
        courseId : courseId,
        userId : userId,
    });

    if(alreadyReviewed){
        return res.status(500).json({
            success : false,
            message : "User have already reviewed the course",
        });
    }

    const newReview = await RatingAndReviews.create({
        userId,
        courseId,
        rating,
        review,
    });

    const updatedCourse = await Courses.findByIdAndUpdate(courseId,
        {$push : {ratingAndReviews : newReview._id}},
        {new : true},
    ).populate("ratingAndReviews").exec();

    return res.status(200).json({
        success : true,
        data : updatedCourse,
        newReview,
        message : "Course reviewed successfully by the user",
    });

    }catch(error){

        return res.status(500).json({
            success : false,
            message : error.message,
        });

    }
}

exports.getAverageRating = async (req,res) => {
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(500).json({
                success : false,
                message : "Provide the course id",
            });
        }

        const courseDetail = await Courses.findById(courseId);

        if(!courseDetail){
            return res.status(500).json({
                success : false,
                message : "Invalid course id, course with such id doesnot exist"
            });
        }

        const avgRating = await RatingAndReviews.aggregate([
            {$match : {courseId : new mongoose.Types.ObjectId(courseId)} },
            {$group : {
                _id : null,
                avgRating : { $avg : "$rating"}
            }}
        ]);
        // console.log(avgRating);

        if (avgRating.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: avgRating[0]?.avgRating,
      })
    }

    // If no ratings are found, return 0 as the default rating
    return res.status(200).json({ 
        success: true, 
        averageRating: 0 
    })

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
}

exports.getAllRatingReview = async (req,res) => {
    try{
    const allRatings = await RatingAndReviews.find({})
    .sort({rating : "desc"})
    .populate({
        path : "userId",
        select : "firstname lastname email image",
        populate : {
            path : "profile",
            select: "gender about"
        }
    })
    .populate({
        path : "courseId",
        select : "courseName",
    });

    return res.status(200).json({
        success : true,
        message : "Fetched all the rating and reviews",
        data : allRatings,
    });

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        });        
    }

}