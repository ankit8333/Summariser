// routes/summaryRoutes.js
const express = require("express");
const router = express.Router();

const {
  summariseText,
  getAllSummaries,
  deleteSummary,
} = require("../controllers/summaryController");

router.post("/summarise", summariseText);
router.get("/summaries", getAllSummaries);
router.delete("/summaries/:id", deleteSummary);

module.exports = router;