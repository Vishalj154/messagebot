import React, { useState } from 'react'
import './index.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            alert("Enter a valid email");
            return;
        }
        if (phone.length < 10) {
            alert("phone length must be 10 characters")
        }
        if (password.length <= 5) {
            alert("password length should be at least 6 characters")
        }
        if (password != confirmPassword) {
            alert("confirmpassword should be same as password")
        }

        try {
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const uid = userCredential.user.uid;

            // await axios.post(
            //     "http://localhost:5000/api/users/register",
            //     {
            //         uid,
            //         username,
            //         email,
            //         phone
            //     }
            // );
            console.log("Firebase UID:", uid);
            alert("User Registered Successfully");

        }
        catch (err) {
            alert(err.message);
        }
    };
    return (

        <div className="signup-form">
            <h2>Sign Up here</h2>
            <label>
                Username:
                <input value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Phone:
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </label>
            <button className="submit" onClick={handleSubmit} type="button">Submit</button>
            <div>
                <button className='google' type="button">🌐 Continue with Google</button>
            </div>

        </div>
    )
}

export default Signup