import React from 'react'
import { auth } from '../src/firebase'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';


const ProfileHeader = () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (!user)
            console.log(user);
            console.log(uid);
            return;

        axios.get(`http://localhost:5000/api/users/register/${uid}`)
            .then((res) => {
                console.log(res.data);
                setUserData(res.data);

            })
            .catch((err) => {
                console.log(err);

            });
    }, [uid]);
    if (!user) {
        return <h2>loading....</h2>
    }


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
            <p>phone : {userData?.phone}</p>
            <button type='button' onClick={handlelogout}>Logout</button>
        </div>
    )
}

export default ProfileHeader