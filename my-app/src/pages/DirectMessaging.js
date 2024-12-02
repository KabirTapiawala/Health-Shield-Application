// Inside /src/pages/DirectMessaging.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import './DirectMessaging.css';
import { useAuth } from '../context/AuthContext'; // Assuming you use this to get logged-in user info

const API_URL = 'http://localhost:5000/api';

function DirectMessaging() {
  const { user } = useAuth(); // Get logged-in user's email
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Fetch messages from the backend when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/messages/${user.email}`);
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
  }, [user.email]); // Re-fetch if the user email changes

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        sender: user.email,
        receiver: 'doctor@example.com',  // Adjust this as needed, e.g., dynamic receiver email
        text: inputMessage,
      };

      try {
        const response = await axios.post(`${API_URL}/messages`, newMessage);
        setMessages([...messages, response.data.newMessage]);  // Add the new message to the chat
        setInputMessage('');  // Clear input field
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className="direct-messaging">
      <div className="content">
        <div className="header">
          <h2>Direct Messaging</h2>
          <span>{messages.length} New Messages</span>
        </div>
        <div className="inbox">
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div key={index} className="message-item">
                <strong>{msg.sender === user.email ? 'You' : 'Doctor'}</strong><br />
                <small>{msg.text}</small>
              </div>
            ))}
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
