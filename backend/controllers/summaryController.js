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
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
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
  } catch (error) {
    console.error("Summarise error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate summary. Check your GROQ_API_KEY." });
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