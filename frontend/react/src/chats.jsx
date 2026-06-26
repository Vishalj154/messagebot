import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useToast } from "./context/ToastContext";
import "./index.css";

const Chats = () => {
  const { user, profile, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

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

  const displayName = profile?.displayName || user?.displayName || "Chattrix User";
  const userEmail = profile?.email || user?.email || "";
  const phone = profile?.phone || "";
  const avatar = profile?.photoURL || user?.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  return (
    <div style={{ display: "flex", width: "90vw", maxWidth: "1200px", height: "80vh", backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.05)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.4)" }}>
      
      {/* Sidebar Section */}
      <div style={{ width: "300px", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", backgroundColor: "rgba(249, 250, 251, 0.5)", boxSizing: "border-box" }}>
        
        {/* User profile details header */}
        <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #e5e7eb" }}>
          <img src={avatar} alt="Avatar" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "2px solid #4dc0b5", objectFit: "cover" }} />
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexGrow: 1 }}>
            <h4 style={{ margin: 0, color: "#1f2937", fontWeight: 600, fontSize: "0.95em" }}>{displayName}</h4>
            <span style={{ fontSize: "0.8em", color: "#6b7280" }}>{userEmail}</span>
          </div>
        </div>

        {/* Channels/Chats list stub */}
        <div style={{ flexGrow: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto" }}>
          <span style={{ fontSize: "0.8em", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af", letterSpacing: "0.05em" }}>Active Chats</span>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "12px", backgroundColor: "#ffffff", boxShadow: "0 2px 6px rgba(0,0,0,0.02)", cursor: "pointer", transition: "transform 0.2s ease" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10b981" }}></div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "0.9em", color: "#1f2937" }}>General Lounge</strong>
                <span style={{ fontSize: "0.7em", color: "#9ca3af" }}>12:45 PM</span>
              </div>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.8em", color: "#6b7280", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>Welcome to Chattrix! Start texting...</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "12px", cursor: "not-allowed", opacity: 0.7 }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#9ca3af" }}></div>
            <div style={{ flexGrow: 1 }}>
              <strong style={{ fontSize: "0.9em", color: "#4b5563" }}>Vishal (Architect)</strong>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.8em", color: "#9ca3af" }}>Offline</p>
            </div>
          </div>
        </div>

        {/* Sidebar Footer controls */}
        <div style={{ padding: "20px", borderTop: "1px solid #e5e7eb", display: "flex", gap: "10px" }}>
          <button className="btn-primary" style={{ padding: "8px 12px", fontSize: "0.9em", margin: 0 }} onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="btn-primary" style={{ padding: "8px 12px", fontSize: "0.9em", backgroundColor: "#e11d48", margin: 0 }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Conversation Window Placeholder */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", backgroundColor: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "450px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(77, 192, 181, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
            <svg style={{ width: "40px", height: "40px", color: "#4dc0b5" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <h2 style={{ margin: "0 0 12px 0", color: "#1f2937" }}>Welcome to Chattrix Lounge!</h2>
          <p style={{ margin: "0 0 24px 0", color: "#6b7280", lineHeight: 1.5, fontSize: "0.95em" }}>
            Hello, <strong>{displayName}</strong>! You have successfully completed your authentication setup.
          </p>
          <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px dashed #e5e7eb", textAlign: "left" }}>
            <span style={{ fontSize: "0.75em", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Firestore Profile Info</span>
            <div style={{ marginTop: "8px", fontSize: "0.85em", color: "#4b5563", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div><strong>UID:</strong> <code style={{ fontSize: "0.9em" }}>{user?.uid}</code></div>
              <div><strong>Phone:</strong> {phone}</div>
              <div><strong>Status:</strong> <span style={{ color: "#10b981", fontWeight: 600 }}>Online</span></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Chats;
