const mongoose = require('mongoose');
require("dotenv").config();

exports.connectDb = () => {
    mongoose.connect(`${process.env.DATABASE_URL}/edTechDb`,{
        useUnifiedTopology : true,
        useNewUrlParser : true,
    })
    .then(() => {
        console.log("Database Connection Succesful");
    })
    .catch((error) => {
        console.log(`DB Connection Failed`);
        console.error(error.message);
        process.exit(1);
    })
}