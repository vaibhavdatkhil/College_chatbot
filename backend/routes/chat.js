const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    console.log(`Using model: ${process.env.GEMINI_MODEL}`);
    console.log(`API Key partial: ${process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 5) : 'MISSING'}`);

    const userChat = new Chat({ sender: 'user', text: message });
    await userChat.save();

    const prompt = `You are a highly helpful and official AI chatbot for Balbhim College (M.S.P. Mandal's Balbhim Arts, Science and Commerce College, Beed).
    
    COLLEGE INFO:
    - Founded: 1960. Inaugurated by late Hon’ble Shri Y.B.Chavan (Chief Minister of Maharashtra).
    - Address: Balbhim Chowk, Killa Maidan Beed – 431122 Maharashtra.
    - Forms Available to Download on Website: Admission Form, Application Form, Markmemo, Migration Certificate, NCC/NSS Enrollment, Ph.D. Research Center Form.
    
    LATEST NOTICES (Reference these if asked about exams/events):
    - CAPSES-2026 International Conference on Chemical/Physical Sciences: 30th and 31st January 2026.
    - PG Semester Theory Exams: Starting 24 Nov 2025.
    - PG Science Practical Exams: Starting 12 Nov 2025.
    - UG Practical Exams: Starting 8 Nov 2025.
    - UG Semester Exams: Starting 12 Nov 2025.
    
    INSTRUCTIONS:
    Answer the following question from a student concisely, accurately, and politely based on the information above (or general college knowledge if not specified). Give them the link "https://www.mspmbeed.com/" if they need exact forms.
    
    Student Question:
    "${message}"`;

    let botResponseText = '';
    try {
      const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      console.log(`Using model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      botResponseText = response.text() || "Sorry, I couldn't generate a response.";
    } catch (apiError) {
      console.error("Detailed Gemini API Error:", {
        message: apiError.message,
        stack: apiError.stack,
        status: apiError.status,
        statusText: apiError.statusText
      });
      botResponseText = "Sorry, I'm having trouble connecting to my knowledge base right now. Please check if your API key is correct.";
    }

    const botChat = new Chat({ sender: 'bot', text: botResponseText });
    await botChat.save();

    res.json({ response: botResponseText });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: 1 }).limit(100);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

module.exports = router;
