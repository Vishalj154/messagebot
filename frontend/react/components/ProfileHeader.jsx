import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { useToast } from '../src/context/ToastContext';
import "./ProfileHeader.css";

const ProfileHeader = () => {
    const { user, profile, logout, updateProfileData } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [phoneInput, setPhoneInput] = useState("");
    const [updating, setUpdating] = useState(false);

    const handleAddPhone = async () => {
        const phoneDigits = phoneInput.replace(/\D/g, "");
        if (phoneDigits.length < 10) {
            showToast("Please enter a valid 10-digit phone number.", "error");
            return;
        }

        setUpdating(true);
        try {
            // Update Firestore users/{uid} document directly using updateDoc via AuthContext
            await updateProfileData({
                phone: phoneDigits,
                updatedAt: new Date().toISOString()
            });

            showToast("Phone number updated successfully in Firestore!", "success");
        } catch (err) {
            console.error("ProfileHeader: failed to update phone in Firestore", err);
            showToast("Failed to update phone number in Firestore.", "error");
        } finally {
            setUpdating(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            showToast("Logged out successfully.", "success");
            navigate('/login');
        } catch (err) {
            console.error("ProfileHeader: logout failed", err);
            showToast("Failed to log out.", "error");
        }
    };

    if (!user) {
        return (
            <div className="profile-header">
                <h2>Loading user...</h2>
            </div>
        );
    }

    const displayName = profile?.displayName || user.displayName || "Chattrix User";
    const email = profile?.email || user.email || "";
    const phone = profile?.phone || "";
    const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    const photoURL = profile?.photoURL || user.photoURL || defaultAvatar;

    return (

        <div className='profile-header'>
            <button
                type="button"
                className="back-to-home"
                onClick={() => navigate('/app/chats')}>
                Back to Chats
            </button>
            <h1>My Profile</h1>
            <img
                src={photoURL}
                alt="Profile Avatar"
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4dc0b5' }}
            />
            <h3>Name: {displayName}</h3>
            <p>Email: {email}</p>

            {phone ? (
                <p>Phone: {phone}</p>
            ) : (
                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        className="input-field"
                        style={{ maxWidth: '250px', textAlign: 'center' }}
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        disabled={updating}
                    />

                    <button
                        className={`btn-primary ${updating ? 'loading' : ''}`}
                        style={{ maxWidth: '150px', padding: '8px 16px', fontSize: '0.95em' }}
                        onClick={handleAddPhone}
                        disabled={updating}
                    >
                        {updating ? <div className="spinner"></div> : "Save Phone"}
                    </button>
                </div>
            )}

            <button
                type='button'
                className="btn-primary"
                style={{ marginTop: '20px', backgroundColor: '#e11d48', maxWidth: '150px' }}
                onClick={handleLogout}
                disabled={updating}
            >
                Logout
            </button>
        </div>
    )
}

export default ProfileHeader;