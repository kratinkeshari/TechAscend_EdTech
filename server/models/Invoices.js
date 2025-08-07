const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
    },
    courseName : {
        type : String,
    },
    price : {
        type : String,
    },
    address : {
        type : String,
    },
    pinCode : {
        type : String
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses",
    },
});
 
module.exports = new mongoose.model("Invoices",InvoiceSchema);