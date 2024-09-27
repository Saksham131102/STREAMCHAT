import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

export default cloudinary;

/*************************************************************************
 * These credentials in .env file are not working.
 * That's why I had to use it directly in video.controller.js file.
 * ***********************************************************************/
