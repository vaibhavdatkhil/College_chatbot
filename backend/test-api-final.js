async function testChat() {
  console.log("Testing backend API at http://localhost:5000/api/chat...");
  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "What is the admission process?" })
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log("SUCCESS: Backend responded:", data.response);
    } else {
      console.log("FAILURE: Backend responded with:", response.status, data.error || data);
    }
  } catch (err) {
    console.log("ERROR connecting to backend:", err.message);
  }
}

testChat();
