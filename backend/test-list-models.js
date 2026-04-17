require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // There is no direct listModels in the SDK for some versions? 
    // Actually, it might be in the 'genAI' object or requires an alternative approach.
    // Let's try to just find one that works by guessing first or using a simpler one.
    console.log("Listing models is not directly supported in this SDK version easily.");
    console.log("Trying 'gemini-1.0-pro'...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const result = await model.generateContent("Hi");
    console.log("Result for gemini-1.0-pro:", result.response.text());
  } catch (err) {
    console.error("Test failed:", err.message);
  }
}

listModels();
