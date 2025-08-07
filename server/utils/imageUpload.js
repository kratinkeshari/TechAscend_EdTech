const cloudinary = require('cloudinary').v2;

exports.cloudinaryImageUpload = async (File, folder, quality, height) => {

    try{
    const options = { folder, resource_type: 'auto' };
    if(quality){
        options.quality = quality;
    }
    if(height){
        options.height = height;
    }
    // options.resourceType = 'auto';

    const imgUploaded = await cloudinary.uploader.upload(File.tempFilePath, options);
    // console.log(imgUploaded);
    return imgUploaded;

    }catch(error){
        console.error(error.message)
    }

}