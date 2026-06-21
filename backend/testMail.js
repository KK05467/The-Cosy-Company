//import { configDotenv } from "dotenv";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.CLOUDINARY_NAME);
console.log(process.env.CLOUDINARY_KEY);
console.log(process.env.CLOUDINARY_SECRET);