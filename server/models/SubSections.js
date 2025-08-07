const mongoose = require('mongoose');

const SubSectionsSchema = new mongoose.Schema({
    sectionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Sections"
    },
    title : {
        type : String,
        required : true,
    },
    timeDuration : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    videoUrl : {
        type : String,
    },
    additionalUrl : {
        type : String
    }
});

module.exports = mongoose.model("SubSections",SubSectionsSchema);