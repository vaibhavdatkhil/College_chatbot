# 🎓 Balbhim College AI Chatbot

An AI-powered college helpdesk chatbot built using **React, Node.js, MongoDB, and Google Gemini API**.
This project helps students quickly get answers to common college-related queries through an interactive chat interface.

---

## 🚀 Setup Instructions

### 🔹 Backend Setup

1. Open terminal and go to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   * Open `.env` file
   * Add your **Gemini API key**
   * Add your **MongoDB connection URL**

4. Start the backend server:

   ```bash
   npm run dev
   ```

✅ If everything is correct, you’ll see:

* MongoDB connected
* Server running successfully

---

### 🔹 Frontend Setup

1. Open a new terminal and go to frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the React app:

   ```bash
   npm run dev
   ```

4. Open browser and visit:

   ```
   http://localhost:5173
   ```

---

## 🎯 Features

* 🤖 AI chatbot powered by Google Gemini API
* 💬 Real-time conversation interface
* 🗂 Chat history stored in MongoDB
* 🎨 Modern UI with glassmorphism design
* 🌙 Dark mode support
* ⚡ Smooth animations and auto-scrolling
* 💡 Quick question suggestions

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **AI Integration:** Google Gemini API

---

## 📌 Project Overview

This chatbot acts as a virtual assistant for students. Users can ask questions related to college information, and the system processes the query through the backend, sends it to the AI model, and returns an intelligent response instantly.

All interactions are stored in the database for future reference and analysis.

