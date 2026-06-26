import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './context/AuthContext';
import { chatService } from './services/chat.service';
import './index.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      // In a real app, Algolia or similar is better for text search.
      // For this demo, we'll do an exact match or simple query on displayName.
      const usersRef = collection(db, 'users');
      // Simple prefix search using string bounds
      const q = query(
        usersRef, 
        where('displayName', '>=', searchTerm.trim()),
        where('displayName', '<=', searchTerm.trim() + '\uf8ff'),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== user.uid) { // Don't show yourself
          fetchedUsers.push({ id: doc.id, ...doc.data() });
        }
      });
      setResults(fetchedUsers);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleStartChat = async (targetUserId) => {
    try {
      // Create or get direct chat
      await chatService.createDirectChat(user.uid, targetUserId);
      // Navigate back to chats (in a real app, you might pass the chatId in state or URL)
      // Since our chats.jsx handles global chat, we need a small refactor to allow passing chatId
      navigate('/app/chats');
    } catch (err) {
      console.error("Failed to start chat:", err);
    }
  };

  return (
    <div className="auth-card" style={{ maxWidth: '600px', width: '90%' }}>
      <button 
        type="button" 
        className="back-to-home" 
        onClick={() => navigate('/app/chats')}
      >
        Back to Chats
      </button>
      
      <h2>Search Users</h2>
      <p style={{ color: '#6b7280', fontSize: '0.9em', marginTop: '-10px', marginBottom: '20px' }}>
        Find other Chattrix users by their display name.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <input 
          type="text" 
          className="input-field" 
          style={{ flexGrow: 1 }}
          placeholder="Enter display name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn-primary" style={{ width: '100px' }} disabled={isSearching}>
          {isSearching ? <div className="spinner" style={{width: '20px', height: '20px'}}></div> : 'Search'}
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {results.length === 0 && !isSearching && searchTerm && (
          <p style={{ textAlign: 'center', color: '#9ca3af' }}>No users found.</p>
        )}
        
        {results.map((u) => (
          <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: '#f9fafb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}`} 
                alt={u.displayName} 
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <strong style={{ display: 'block', color: '#1f2937' }}>{u.displayName}</strong>
                <span style={{ fontSize: '0.8em', color: '#6b7280' }}>
                  {u.isOnline ? <span style={{ color: '#10b981' }}>● Online</span> : 'Offline'}
                </span>
              </div>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85em' }}
              onClick={() => handleStartChat(u.id)}
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
