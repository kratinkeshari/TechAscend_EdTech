const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim: true,
    },
    lastname : {
        type : String,
        required : true,
        trim: true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim: true,
    },
    password : {
        type : String,
        required : true
    },
    accountType : {
        type : String,
        required : true,
        enum : ["instructor","student","admin"]
    },
    active : {
        type : Boolean,
    },
    approved : {
        type : Boolean,
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses"
    }],
    profile : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Profiles"
    },
    courseProgress : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "CourseProgress"
    }],
    image: {
        type : String,
    },
    token : {
        type : String,
    },
    resetTokenExpiry : {
        type : Date,
    }
});

module.exports = mongoose.model("Users",UserSchema);