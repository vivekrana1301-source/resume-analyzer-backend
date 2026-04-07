import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-analyzer-frontend-cyan.vercel.app"
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ Handle preflight
app.options("*", cors());

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