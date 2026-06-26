import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { useToast } from "./context/ToastContext";
import "./index.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    setLoading(true);
    try {
      // 2. Firebase Password Reset API
      await sendPasswordResetEmail(auth, email);
      showToast("Password reset email sent! Check your inbox.", "success");
      
      // Redirect to login after a brief delay so they see the toast
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      
      // Friendly Firebase Auth error mapping
      let errorMessage = "Failed to send password reset email. Please try again.";
      if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "The email address is badly formatted.";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
      }
      
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <a href="/" className="back-to-home">back to home</a>
      <h1>Reset Password</h1>
      <p style={{ textAlign: "center", color: "#555", fontSize: "0.95em", marginTop: "-10px", marginBottom: "20px" }}>
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your registered email"
            disabled={loading}
          />
        </div>

        <button 
          className={`btn-primary ${loading ? "loading" : ""}`} 
          type="submit" 
          disabled={loading}
        >
          {loading ? <div className="spinner"></div> : "Send Reset Link"}
        </button>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button 
            type="button" 
            className="back-to-home" 
            style={{ background: "none", border: "none", cursor: "pointer", display: "inline" }} 
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
