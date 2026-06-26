import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { useToast } from '../src/context/ToastContext';
import "./ProfileHeader.css";

const ProfileHeader = () => {
    const { user, logout } = useAuth();
    const { showToast } = useToast();
    const uid = user?.uid;

    const [userData, setUserData] = useState(null)
    const [phone, setPhone] = useState("");

    const handleAddPhone = async () => {
        if (!phone || phone.replace(/\D/g, "").length < 10) {
            showToast("Please enter a valid 10-digit phone number.", "error");
            return;
        }
        try {
            const res = await axios.put(
                "http://localhost:5000/api/users/update-phone",
                {
                    uid: user.uid,
                    phone: phone
                }
            );

            console.log(res.data);

            setUserData({
                ...userData,
                phone: phone
            });

            showToast("Phone updated successfully!", "success");
        } catch (err) {
            console.error(err);
            showToast("Failed to update phone number.", "error");
        }
    };

    useEffect(() => {
        if (!uid) return;

        console.log("Fetching details for user UID:", uid);

        axios.get(`http://localhost:5000/api/users/${uid}`)
            .then((res) => {
                console.log(res.data);
                setUserData(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch backend user data:", err);
            });
    }, [uid]);

    const navigate = useNavigate();
    const handlelogout = async () => {
        try {
            await logout();
            showToast("Logged out successfully.", "success");
            navigate('/login');
        } catch (err) {
            console.error(err);
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

    // Fallback if avatar URL is missing
    const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

    return (
        <div className='profile-header'>
            <h1>My Profile</h1>
            <img 
                src={user.photoURL || defaultAvatar} 
                alt="Profile Avatar" 
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <h3>Name: {user.displayName || userData?.username || "Chattrix User"}</h3>
            <p>Email: {user.email}</p>

            {userData?.phone ? (
                <p>Phone: {userData.phone}</p>
            ) : (
                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        className="input-field"
                        style={{ maxWidth: '250px', textAlign: 'center' }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <button className="btn-primary" style={{ maxWidth: '150px', padding: '8px 16px', fontSize: '0.95em' }} onClick={handleAddPhone}>
                        Save Phone
                    </button>
                </div>
            )}
            
            <button 
                type='button' 
                className="btn-primary" 
                style={{ marginTop: '20px', backgroundColor: '#e11d48', maxWidth: '150px' }} 
                onClick={handlelogout}
            >
                Logout
            </button>
        </div>
    )
}

export default ProfileHeader