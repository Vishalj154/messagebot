import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword , signInWithPopup } from "firebase/auth";
import { auth,provider } from "./firebase";
import './index.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userinfo = await signInWithEmailAndPassword(
                auth,
                Email,
                password
            );
            console.log(userinfo.user);
            navigate("/profile");
            alert("Login successful");
        } catch (errr) {
            alert(errr.message);
        }
    };
    // handlegooglelogin
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // await axios.post(
            //     "http://localhost:5000/api/users/register",
            //     {
            //         uid: user.uid,
            //         username: user.displayName,
            //         email: user.email,
            //         phone: user.phoneNumber || ""
            //     }
            // );
            console.log(user);
            alert("Google login successful");
            navigate("/profile");
        } catch (err) {
            console.log(err);
            alert(err.message);

        }
    };
    return (
        <div className='signup-form'>
            <a href="\">back to home </a>
            <h1>Login here</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email: <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </label>
                <button className="submit" type="submit">Submit</button>
                <div>
                    <button className='google'
                        type="button"
                        onClick={handleGoogleLogin}>🌐 Continue with Google</button>
                </div>

            </form>
        </div>
    )
}

export default Login