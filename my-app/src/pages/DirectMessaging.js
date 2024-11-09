// Inside /src/pages/DirectMessaging.js
import React, { useState } from 'react';
import './DirectMessaging.css';

function DirectMessaging() {
  const [messages, setMessages] = useState([
    { sender: 'doctor', text: "Hello! It looks like your next health check-up is scheduled for next week..." },
    { sender: 'user', text: "Hi, Doctor, yes, I will be attending." },
    { sender: 'doctor', text: "Perfect! Also, I noticed your prescription for *Medication* is due for renewal. Do you need a refill before your next appointment?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: 'user', text: inputMessage }]);
      setInputMessage('');
    }
  };

  return (
    <div className="direct-messaging">
      <div className="content">
        <div className="header">
          <h2>Direct Messaging</h2>
          <span>6 New Messages</span>
        </div>
        <div className="inbox">
          <div className="messages-list">
            <div className="message-item" onClick={() => console.log('Open chat with Doctor')}>
              <strong>Doctor</strong><br />
              <small>Hello! It looks like your next health check-up is scheduled for next week...</small>
            </div>
            {/* Additional message items can be added here */}
          </div>
          <div className="chat">
            <div id="chat-area">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === 'doctor' ? 'doctor-message' : 'user-message'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="input-area">
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectMessaging;
