import Resume from "../models/resume.model";
import { Request, Response } from "express";
import { extractTextFromPDF } from "../utils/pdfParser";
import { analyzeResumeAI } from "../services/ai.service";
import { aiDummyData } from '../constant/aiDummyData'

export const addResume = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { jobDescription } = req.body;

    // ✅ Extract text
    const resumeText = await extractTextFromPDF(req.file.path);

    let aiResult;

    try {
      // 🔥 Try AI
      aiResult = await analyzeResumeAI(resumeText, jobDescription);
    } catch (aiError) {
      console.error("AI FAILED → using dummy data");

      // 🔥 Fallback
      aiResult = aiDummyData;
    }

    // ✅ Save in DB (same for both cases)
    const newResume = await Resume.create({
      userId: req.user?.userId,
      resumeText,
      jobDescription,
      aiResult
    });

    return res.json({
      msg: "Analysis complete",
      data: newResume,
      aiResult
    });

  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getLatestResult = async (req: any, res: Response) => {
  try {
    const latest = await Resume.findOne({
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ msg: "No result found" });
    }

    res.json({
      aiResult: latest.aiResult
    });

  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};