require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  
  console.log(`Testing v1beta with ${modelName}...`);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }]
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log(`SUCCESS:`, data.candidates[0].content.parts[0].text);
    } else {
      console.log(`FAILURE:`, response.status, data.error ? data.error.message : 'Unknown error');
    }
  } catch (err) {
    console.log(`ERROR:`, err.message);
  }
}

test();
