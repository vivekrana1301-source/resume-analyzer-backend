import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

// ✅ CORS (must be first)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://resume-analyzer-frontend-git-main-vr717109-5238s-projects.vercel.app"
    ],
    credentials: true
  })
);

// ✅ Body parser (fix 413 error)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// ✅ Routes
app.use("/api/auth", authRoutes);

export default app;