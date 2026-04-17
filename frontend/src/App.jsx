import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-container">
      {/* College Website "Clone" Background */}
      <iframe 
        src="https://www.mspmbeed.com/" 
        title="Balbhim College Official Website"
        className="college-iframe"
      />

      {/* Floating Chat Button */}
      <button 
        className={`floating-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* ChatBot Window */}
      {isOpen && (
        <div className="chatbot-wrapper">
          <ChatBot onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
