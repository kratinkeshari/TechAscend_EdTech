const cloudinary = require('cloudinary').v2;;

exports.cloudinaryConnect = () => {
    try{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD, 
        api_key: process.env.CLOUDINARY_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET,
    });
    }catch(error){
        console.log(error);
    }
}