import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { useToast } from '../src/context/ToastContext';
import '../src/index.css';

const Settings = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('chattrix_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('chattrix_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('chattrix_theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      showToast("Logged out successfully.", "success");
      navigate("/login");
    } catch (err) {
      console.error(err);
      showToast("Failed to log out.", "error");
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
      
      <h2>Settings</h2>
      
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div>
            <strong style={{ display: 'block', color: '#1f2937' }}>Dark Mode</strong>
            <span style={{ fontSize: '0.85em', color: '#6b7280' }}>Toggle dark appearance for Chattrix.</span>
          </div>
          
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)}
              style={{ opacity: 0, width: 0, height: 0 }} 
            />
            <span style={{
              position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: darkMode ? '#4dc0b5' : '#ccc', transition: '.4s', borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute', content: '""', height: '18px', width: '18px', left: '4px', bottom: '4px',
                backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                transform: darkMode ? 'translateX(24px)' : 'none'
              }}></span>
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#fef2f2', borderRadius: '12px', border: '1px solid #fecdd3' }}>
          <div>
            <strong style={{ display: 'block', color: '#9f1239' }}>Logout</strong>
            <span style={{ fontSize: '0.85em', color: '#be123c' }}>Sign out of your account on this device.</span>
          </div>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#e11d48', margin: 0 }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;