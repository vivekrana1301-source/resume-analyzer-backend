import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    resumeText: {
      type: String
    },
    jobDescription: {
      type: String
    },
    aiResult: {
      type: Object
    }
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);