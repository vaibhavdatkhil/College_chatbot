require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  console.log("Testing with API Key:", apiKey.substring(0, 5) + "...");
  console.log("Testing with Model:", modelName);
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, are you active?");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (err) {
    console.error("API Key Test Failed:", err.message);
  }
}

test();
