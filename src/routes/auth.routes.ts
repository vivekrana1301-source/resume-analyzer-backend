import express, { Router } from "express";
import { upload } from "../middleware/upload";
import {register} from '../controllers/auth.controller'
import {login} from '../controllers/auth.controller'
import { verifyToken } from "../middleware/auth.middleware";
import { addResume } from "../controllers/resume.controller";
import { getLatestResult } from "../controllers/resume.controller";

const router = express.Router()
//Registr Api

router.post("/register",register )

router.post("/login",login )

router.post("/resume", verifyToken,upload.single("resume"), addResume);

router.get("/latest-result", verifyToken, getLatestResult);

export default router;