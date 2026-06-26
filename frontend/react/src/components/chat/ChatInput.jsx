import React, { useState } from 'react';
import { chatService } from '../../services/chat.service';
import { useAuth } from '../../context/AuthContext';
import './ChatInput.css';

const ChatInput = ({ chatId }) => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !chatId || isSending) return;

    setIsSending(true);
    try {
      await chatService.sendMessage(chatId, user.uid, text);
      setText('');
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="chat-input-container" onSubmit={handleSend}>
      <input
        type="text"
        className="chat-input-field"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSending}
      />
      <button 
        type="submit" 
        className="chat-send-btn" 
        disabled={!text.trim() || isSending}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
