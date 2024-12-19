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
          { role: "system", content: "You are a helpful assistant" },
          { role: "user", content: question },
        ],
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": `application/json`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching answer", error.message);
    return "Sorry, I couldn't fetch an answer at the moment.";
  }
};

const shortAns = (ans) => {
  if (ans.length <= 140) {
    return ans;
  }
  return ans.slice(0, 137) + "...";
};

module.exports = { generateAnswer, shortAns };
