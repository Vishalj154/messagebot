import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useToast } from "./context/ToastContext";
import { chatService } from "./services/chat.service";
import MessageList from "./components/chat/MessageList";
import ChatInput from "./components/chat/ChatInput";
import "./index.css";

const Chats = () => {
  const { user, profile, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // For now, we will use a single global chat room until search/direct messaging is fully built
  const [activeChatId, setActiveChatId] = useState("global_lounge");

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
  const avatar = profile?.photoURL || user?.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  return (
    <div style={{ display: "flex", width: "95vw", maxWidth: "1200px", height: "85vh", backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(12px)", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.05)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.4)" }}>
      
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

        {/* Channels/Chats list */}
        <div style={{ flexGrow: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto" }}>
          <span style={{ fontSize: "0.8em", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af", letterSpacing: "0.05em" }}>Active Chats</span>
          
          <div 
            onClick={() => setActiveChatId("global_lounge")}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px", 
              padding: "12px", 
              borderRadius: "12px", 
              backgroundColor: activeChatId === "global_lounge" ? "#ffffff" : "transparent", 
              boxShadow: activeChatId === "global_lounge" ? "0 2px 6px rgba(0,0,0,0.05)" : "none",
              border: activeChatId === "global_lounge" ? "1px solid #e5e7eb" : "1px solid transparent",
              cursor: "pointer", 
              transition: "all 0.2s ease" 
            }}
          >
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#4dc0b5", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
              #
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "0.95em", color: "#1f2937" }}>Global Lounge</strong>
              </div>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.8em", color: "#6b7280", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>Public discussion</p>
            </div>
          </div>

          <button className="btn-primary" style={{ marginTop: "10px", fontSize: "0.85em", padding: "8px" }} onClick={() => navigate("/search")}>
            + Search Users
          </button>
        </div>

        {/* Sidebar Footer controls */}
        <div style={{ padding: "20px", borderTop: "1px solid #e5e7eb", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn-primary" style={{ padding: "8px 12px", fontSize: "0.9em", margin: 0, flex: "1 1 calc(50% - 5px)" }} onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="btn-primary" style={{ padding: "8px 12px", fontSize: "0.9em", margin: 0, flex: "1 1 calc(50% - 5px)" }} onClick={() => navigate("/settings")}>
            Settings
          </button>
          <button className="btn-primary" style={{ padding: "8px 12px", fontSize: "0.9em", backgroundColor: "#e11d48", margin: 0, flex: "1 1 100%" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Conversation Window */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
        {/* Chat Header */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#f9fafb" }}>
          <div>
            <h3 style={{ margin: 0, color: "#1f2937", fontSize: "1.1em" }}>
              {activeChatId === "global_lounge" ? "Global Lounge" : "Chat Room"}
            </h3>
            <span style={{ fontSize: "0.8em", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }}></div>
              Online
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <MessageList chatId={activeChatId} />

        {/* Input Area */}
        <ChatInput chatId={activeChatId} />
      </div>

    </div>
  );
};

export default Chats;
