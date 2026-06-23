// controllers/summaryController.js
// Uses Groq API (FREE) instead of OpenAI to generate summaries.

const axios = require("axios");
const Summary = require("../models/Summary");

// ─── POST /api/summarise ───────────────────────────────────────────────────────
const summariseText = async (req, res) => {
  try {
    const { text, summaryLength = "medium" } = req.body;

    if (!text || text.trim().length < 20) {
      return res
        .status(400)
        .json({ message: "Please provide at least 20 characters of text." });
    }

<<<<<<< HEAD
    // ✅ Check if API key is loaded at all
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("❌ GROQ_API_KEY is missing from .env file!");
      return res.status(500).json({ message: "GROQ_API_KEY is not set in .env file." });
    }

    console.log("🔑 Using API key starting with:", apiKey.substring(0, 8) + "...");

=======
>>>>>>> 7a704bb869582b1e80bceca2c7d99ff2da96cf60
    const lengthGuide = {
      short: "2-3 sentences",
      medium: "a concise paragraph (4-6 sentences)",
      long: "a detailed summary of 8-10 sentences",
    };

    const prompt = `You are an expert summariser. Read the following text carefully and produce ${lengthGuide[summaryLength]}. 
Focus on the key points, main ideas, and important details. Write clearly and professionally.

Text to summarise:
"""
${text}
"""

Summary:`;

    // ─── Call Groq API ─────────────────────────────────────────────────────────
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.5,
      },
      {
        headers: {
<<<<<<< HEAD
          Authorization: `Bearer ${apiKey}`,
=======
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
>>>>>>> 7a704bb869582b1e80bceca2c7d99ff2da96cf60
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices[0].message.content.trim();
    const wordCount = text.trim().split(/\s+/).length;

    // Save to MongoDB
    const newSummary = await Summary.create({
      originalText: text,
      summary,
      wordCount,
      summaryLength,
    });

    res.status(201).json({
      success: true,
      data: newSummary,
    });
<<<<<<< HEAD

  } catch (error) {
    // ✅ Show the REAL error clearly in terminal
    console.error("─────────────────────────────────────");
    console.error("❌ GROQ API ERROR:");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.error?.message || error.message);
    console.error("Full response:", JSON.stringify(error.response?.data, null, 2));
    console.error("─────────────────────────────────────");

    const errorMsg = error.response?.data?.error?.message || error.message;
    res.status(500).json({ message: errorMsg });
=======
  } catch (error) {
    console.error("Summarise error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate summary. Check your GROQ_API_KEY." });
>>>>>>> 7a704bb869582b1e80bceca2c7d99ff2da96cf60
  }
};

// ─── GET /api/summaries ────────────────────────────────────────────────────────
const getAllSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: summaries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE /api/summaries/:id ─────────────────────────────────────────────────
const deleteSummary = async (req, res) => {
  try {
    const summary = await Summary.findByIdAndDelete(req.params.id);
    if (!summary) {
      return res.status(404).json({ message: "Summary not found." });
    }
    res.status(200).json({ success: true, message: "Summary deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { summariseText, getAllSummaries, deleteSummary };