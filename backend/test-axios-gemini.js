require('dotenv').config();
const axios = require('axios');

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  try {
    const res = await axios.post(url, {
      contents: [{ parts: [{ text: "Hello" }] }]
    });
    console.log("Response:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error("API Error Response:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error("Request Error:", err.message);
    }
  }
}

test();
