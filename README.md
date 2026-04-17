# 🎓 Balbhim College AI Chatbot

AI-Powered College Helpdesk Chatbot built with React + Node.js + MongoDB + Gemini API.

---

## 🚀 Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder: 
   ```bash
   cd backend
   ```
2. Install dependencies (already done if you followed the setup): 
   ```bash
   npm install
   ```
3. Open the `backend/.env` file and replace `paste_your_key_here` with your actual **Gemini API Key**. Ensure your MongoDB is running locally or provide a MongoDB Atlas URI.
4. Start the backend server: 
   ```bash
   npm run dev
   ```
   *You should see '✅ MongoDB Connected' and '🚀 Server running...'*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React app:
   ```bash
   npm run dev
   ```
4. Open your browser to the URL provided (typically `http://localhost:3000` or `http://localhost:5173`).

---

## 🎯 Features
- ✅ AI chatbot powered by Google Gemini 2.5 Flash
- ✅ Chat history saved in MongoDB
- ✅ Modern Glassmorphism Premium UI with Dark Mode
- ✅ Floating WhatsApp-style interactive button
- ✅ Typing animations and smooth auto-scrolling
- ✅ "Quick Questions" suggestion chips

---

## 🎤 What to say in Viva
> "Our project is an AI-powered chatbot for Balbhim College. 
> A student types a question, it goes to our Node.js backend, 
> which sends it to the Gemini AI API, and the response is shown 
> in the chat window. All conversations are stored securely in MongoDB."

---
*Built with ❤️ for Balbhim College*
