const mongoose = require('mongoose');

const ProfileSchema  = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
    },
    gender : {
        type : String,
    },
    dob : {
        type : String,
    },
    about : {
        type : String,
        trim : true,
    },
    contactNumber : {
        type : String,
        trim : true,
    }
});

module.exports = mongoose.model("Profiles",ProfileSchema);