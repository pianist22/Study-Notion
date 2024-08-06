const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    console.log("Entry to upload image to cloudinary");
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    console.log("Image Is uploading");
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}