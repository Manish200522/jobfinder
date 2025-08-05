import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

async function configureCloudinary() {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
  } catch (error) {
    console.error(error);
  }
}

configureCloudinary();

export default cloudinary;