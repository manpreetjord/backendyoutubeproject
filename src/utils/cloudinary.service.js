import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: proces.env.CLOUDINARY_CLOUD_NAME,
  api_key: proces.env.CLOUDINARY_API_KEY,
  api_secret: proces.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("File is uploaded on cloudinary");
    console.log("response", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the localally saved temporary file as the upload operation has failed
    return null;
  }
};


export {uploadOnCloudinary}