import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL;

    if (!mongoURL) {
      throw new Error("MONGODB_URL is not defined in .env");
    }

    await mongoose.connect(mongoURL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
  }
};