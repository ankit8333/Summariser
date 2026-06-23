// src/utils/api.js
// Central place for all API calls using Axios.
// Import these functions in any component instead of writing fetch/axios directly.

import axios from "axios";

// Base URL for the backend — change this if your backend runs on a different port
const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ─── Summarise text ────────────────────────────────────────────────────────────
// @param {string} text - The text to summarise
// @param {string} summaryLength - "short" | "medium" | "long"
// @returns {object} The saved summary document from MongoDB
export const summariseText = async (text, summaryLength = "medium") => {
  const response = await api.post("/summarise", { text, summaryLength });
  return response.data.data;
};

// ─── Get all saved summaries ───────────────────────────────────────────────────
// @returns {Array} Array of summary objects
export const getAllSummaries = async () => {
  const response = await api.get("/summaries");
  return response.data.data;
};

// ─── Delete a summary by ID ────────────────────────────────────────────────────
// @param {string} id - The MongoDB _id of the summary to delete
export const deleteSummary = async (id) => {
  const response = await api.delete(`/summaries/${id}`);
  return response.data;
};
