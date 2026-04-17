require('dotenv').config();

async function testEndpoint(apiVersion, modelName) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${apiKey}`;
  
  console.log(`Testing ${apiVersion} with ${modelName}...`);
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
      console.log(`SUCCESS [${apiVersion}]:`, data.candidates[0].content.parts[0].text);
      return true;
    } else {
      console.log(`FAILURE [${apiVersion}]:`, response.status, data.error ? data.error.message : 'Unknown error');
      return false;
    }
  } catch (err) {
    console.log(`ERROR [${apiVersion}]:`, err.message);
    return false;
  }
}

async function runTests() {
  await testEndpoint('v1beta', 'gemini-1.5-flash');
  await testEndpoint('v1', 'gemini-1.5-flash');
  await testEndpoint('v1beta', 'gemini-pro');
  await testEndpoint('v1', 'gemini-pro');
}

runTests();
