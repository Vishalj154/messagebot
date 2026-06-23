import React from 'react'
import { auth } from '../src/firebase'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./ProfileHeader.css";


const ProfileHeader = () => {
    const user = auth.currentUser;
    const uid = user?.uid;

    const [userData, setUserData] = useState(null)
    const [phone, setPhone] = useState("");

    if (!user) {
        return <h2>loading....</h2>
    }


    const handleAddPhone = async () => {
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

            alert("Phone updated successfully");
        } catch (err) {
            console.log(err);
            alert("Failed to update phone");
        }
    };

    useEffect(() => {
        if (!user) {
            return;

        }
        console.log(uid);


        axios.get(`http://localhost:5000/api/users/${uid}`)
            .then((res) => {
                console.log(res.data);
                setUserData(res.data);

            })
            .catch((err) => {
                console.log(err);

            });
    }, [uid, user]);



    const navigate = useNavigate();
    const handlelogout = async () => {
        await signOut(auth);
        navigate('/login');
    };
    return (
        <div className='profile-header'>
            <h1>My Profile</h1>
            <img src={user.photoURL} alt="" />
            <h3>Name : {user.displayName}</h3>
            <p>Email : {user.email} </p>

            {userData?.phone ? (
                <p>Phone : {userData.phone}</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <button onClick={handleAddPhone}>
                        Save Phone
                    </button>
                </>
            )}
            <button type='button' onClick={handlelogout}>Logout</button>
        </div>
    )
}

export default ProfileHeader