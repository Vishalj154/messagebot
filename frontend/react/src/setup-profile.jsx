import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useToast } from "./context/ToastContext";
import "./index.css";

const SetupProfile = () => {
  const { user, profile, updateProfileData } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhone(user.phoneNumber || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!displayName.trim() || displayName.length < 3) {
      showToast("Display name must be at least 3 characters long.", "error");
      setLoading(false);
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      showToast("Please enter a valid 10-digit phone number.", "error");
      setLoading(false);
      return;
    }

    try {
      // Update profile info in Firestore (which updates cache in AuthContext)
      await updateProfileData({
        displayName: displayName.trim(),
        phone: phoneDigits,
        photoURL: user.photoURL || null,
        updatedAt: new Date().toISOString()
      });

      showToast("Profile set up successfully!", "success");
      navigate("/app/chats");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to set up profile. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Set Up Profile</h1>
      <p style={{ textAlign: "center", color: "#555", fontSize: "0.95em", marginTop: "-10px", marginBottom: "15px" }}>
        Please complete your profile details before proceeding to Chattrix.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            className="input-field"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            placeholder="Enter your display name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            className="input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your 10-digit phone"
            disabled={loading}
          />
        </div>

        <button 
          className={`btn-primary ${loading ? "loading" : ""}`} 
          type="submit" 
          disabled={loading}
        >
          {loading ? <div className="spinner"></div> : "Complete Setup"}
        </button>
      </form>
    </div>
  );
};

export default SetupProfile;
