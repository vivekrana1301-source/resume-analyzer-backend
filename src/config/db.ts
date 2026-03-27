import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const mongoURL = process.env.MONGODB_URL;

  if (!mongoURL) {
    console.error("❌ MONGODB_URL is not defined");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1); // 🔥 Important: stop server if DB fails
  }
};