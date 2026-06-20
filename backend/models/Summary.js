// models/Summary.js
// Defines the MongoDB schema for storing summaries.
// Each document stores: original text, generated summary, word count, and timestamp.

const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
  {
    originalText: {
      type: String,
      required: [true, "Original text is required"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
    },
    wordCount: {
      type: Number, // Word count of the original text
    },
    summaryLength: {
      type: String,
      enum: ["short", "medium", "long"],
      default: "medium",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Summary", summarySchema);
