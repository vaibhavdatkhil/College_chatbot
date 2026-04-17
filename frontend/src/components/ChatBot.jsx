import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot } from 'lucide-react';

const QA_SUGGESTIONS = [
  "What is the admission process?",
  "What courses do you offer?",
  "Tell me about campus facilities.",
  "When are the exams conducted?"
];

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am the Balbhim College Helpdesk Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chat/history');
        if (res.data && res.data.length > 0) {
          // Format based on what's defined in Chat schema
          const history = res.data.map(m => ({ text: m.text, sender: m.sender }));
          setMessages(history);
        }
      } catch (err) {
        console.error("Could not load history", err);
      }
    };
    fetchHistory();
  }, []);

  const handleSend = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = { text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: textToSend });
      setMessages(prev => [...prev, { text: res.data.response, sender: 'bot' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "Sorry, I am having trouble connecting to the server.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="bot-avatar">
          <Bot size={24} />
        </div>
        <div className="header-info">
          <h3>Balbhim Assistant</h3>
          <p><span className="status-dot"></span> Online</p>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        
        {messages.length < 5 && !isTyping && (
          <div className="quick-questions">
            {QA_SUGGESTIONS.map((q, idx) => (
               <button key={idx} className="quick-btn" onClick={() => handleSend(q)}>
                 {q}
               </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Type your question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button 
            className="send-btn" 
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
