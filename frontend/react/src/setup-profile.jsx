import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useToast } from "./context/ToastContext";
import { uploadToCloudinary } from "./services/cloudinaryService";
import "./index.css";

const SetupProfile = () => {
  const { user, profile, updateProfileData, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // New state for photo upload
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhone(user.phoneNumber || "");
      setPhotoPreview(user.photoURL || "");
    }
  }, [user]);

  // Handle file selection — show local preview immediately
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file.", "error");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      showToast("Image must be smaller than 5MB.", "error");
      return;
    }

    setPhotoFile(file);
    // Show local preview instantly, before upload finishes
    setPhotoPreview(URL.createObjectURL(file));
  };

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
      let finalPhotoURL = user.photoURL;

      // If user picked a new photo, upload it to Cloudinary first
      if (photoFile) {
        setUploadingPhoto(true);
        try {
          finalPhotoURL = await uploadToCloudinary(photoFile);
        } catch (uploadErr) {
          showToast(uploadErr.message || "Photo upload failed. Try again.", "error");
          setLoading(false);
          setUploadingPhoto(false);
          return;
        }
        setUploadingPhoto(false);
      }

      // Fall back to generated avatar only if no photo exists at all
      if (!finalPhotoURL) {
        finalPhotoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName.trim())}&background=random`;
      }

      await updateProfileData({
        displayName: displayName.trim(),
        phone: phoneDigits,
        photoURL: finalPhotoURL,
        createdAt: profile?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isOnline: true,
        lastSeen: new Date().toISOString(),
        provider: user.providerData?.[0]?.providerId || "password"
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
        {/* Photo upload section */}
        <div className="form-group" style={{ textAlign: "center" }}>
          <label htmlFor="photoUpload" style={{ cursor: "pointer", display: "inline-block" }}>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                margin: "0 auto 10px",
                overflow: "hidden",
                border: "2px solid #4dc0b5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f3f4f6",
                position: "relative"
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: "0.8em", color: "#9ca3af" }}>Add Photo</span>
              )}
              {uploadingPhoto && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            <span style={{ fontSize: "0.85em", color: "#4dc0b5", fontWeight: 600 }}>
              {photoPreview ? "Change Photo" : "Upload Photo"}
            </span>
          </label>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            onChange={handlePhotoChange}
            disabled={loading}
            style={{ display: "none" }}
          />
        </div>

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

      <div style={{ textAlign: "center", marginTop: "12px", fontSize: "0.9em", color: "#6b7280" }}>
        Logged in as <strong>{user?.email}</strong>
        <br />
        <button
          type="button"
          onClick={async () => {
            await logout();
            navigate("/");
          }}
          style={{
            background: "none",
            border: "none",
            color: "#ef4444",
            cursor: "pointer",
            fontWeight: "600",
            marginTop: "6px",
            fontSize: "0.95em"
          }}
        >
          Log out & go back
        </button>
      </div>
    </div>
  );
};

export default SetupProfile;
