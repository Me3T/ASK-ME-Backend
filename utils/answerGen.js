const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

const generateAnswer = async (question) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Always keep your answers concise, under 140 characters.",
          },
          { role: "user", content: question },
        ],
        max_tokens: 40,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching answer", error.message);
    return "Sorry, I couldn't fetch an answer at the moment.";
  }
};

module.exports = { generateAnswer };
