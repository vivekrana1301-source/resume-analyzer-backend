import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

// ✅ CORS (only this is needed)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://resume-analyzer-frontend-cyan.vercel.app"
    ],
    credentials: true
  })
);

// ✅ Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// ✅ Routes
app.use("/api/auth", authRoutes);

export default app;