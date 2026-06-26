import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ message, isOwnMessage }) => {
  const { text, createdAt } = message;
  
  // Format timestamp
  const timeString = createdAt?.toDate 
    ? createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : 'Sending...';

  return (
    <div className={`chat-bubble-container ${isOwnMessage ? 'own' : 'other'}`}>
      <div className="chat-bubble">
        <p className="chat-text">{text}</p>
        <span className="chat-time">{timeString}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
