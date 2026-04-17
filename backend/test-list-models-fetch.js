require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  console.log("Listing models...");
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      console.log("SUCCESS: Models found:", data.models ? data.models.map(m => m.name) : "None");
    } else {
      console.log("FAILURE:", response.status, data.error ? data.error.message : 'Unknown error');
    }
  } catch (err) {
    console.log("ERROR:", err.message);
  }
}

listModels();
