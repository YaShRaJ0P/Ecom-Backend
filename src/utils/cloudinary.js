import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { _config } from "../config/config.js";

cloudinary.config({
  cloud_name: _config.CLOUDINARY_NAME,
  api_key: _config.CLOUDINARY_API_KEY,
  api_secret: _config.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder,
    });
  
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

const deleteOnCloudinary = async (imageId) => {
  const response = await cloudinary.uploader.destroy(imageId);
  return response;
};

export { uploadOnCloudinary, deleteOnCloudinary };