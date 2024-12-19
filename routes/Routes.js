const express = require("express");
const { generateAnswer } = require("../utils/answerGen");
const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;

  // Validate input
  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    // Generate answer
    const ans = await generateAnswer(question);

    // Respond with the question and generated answer
    res.json({ question, ans });
  } catch (error) {
    console.error("Error generating answer:", error.message);
    res
      .status(500)
      .json({ error: "Failed to generate an answer. Please try again." });
  }
});

module.exports = router;
