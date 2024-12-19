const express = require("express");
const { generateAnswer, shortAns } = require("../utils/answerGen");
const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is required. " });
  }
  try {
    const rawAns = await generateAnswer(question);
    const ans = shortAns(rawAns);

    res.json({ question, ans });
  } catch (error) {
    res.status(500).json({ error: "Please try again" });
  }
});

module.exports = router;
