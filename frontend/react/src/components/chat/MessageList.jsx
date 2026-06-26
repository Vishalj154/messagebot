import React, { useEffect, useRef, useState } from 'react';
import { chatService } from '../../services/chat.service';
import { useAuth } from '../../context/AuthContext';
import ChatBubble from './ChatBubble';

const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    const unsubscribe = chatService.listenToMessages(chatId, (newMessages) => {
      setMessages(newMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#9ca3af' }}>
        <div className="spinner" style={{ width: '30px', height: '30px' }}></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#9ca3af' }}>
        <p>No messages yet.</p>
        <p style={{ fontSize: '0.85em' }}>Send a message to start the conversation.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      {messages.map((msg) => (
        <ChatBubble 
          key={msg.id} 
          message={msg} 
          isOwnMessage={msg.senderId === user.uid} 
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
