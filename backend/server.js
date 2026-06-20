// server.js
// Main entry point for the Express backend.
// Sets up middleware, connects to DB, and mounts all routes.

require("dotenv").config(); // Load .env variables FIRST
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const summaryRoutes = require("./routes/summaryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:3000" })); // Allow React frontend
app.use(express.json({ limit: "10mb" }));           // Parse JSON bodies (large text allowed)
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", summaryRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "🧠 AI Summariser API is running!" });
});

// ─── Global Error Handler (must be LAST) ──────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
