import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useToast } from './context/ToastContext'
import axios from 'axios'
import './index.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const { login, loginWithGoogle } = useAuth()
    const { showToast } = useToast()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const userinfo = await login(email, password)
            console.log(userinfo.user)
            showToast("Login successful!", "success")
            navigate("/profile")
        } catch (err) {
            console.error(err)
            let message = err.message
            if (err.code === "auth/invalid-credential") {
                message = "Invalid email or password. Please try again."
            } else if (err.code === "auth/user-not-found") {
                message = "No account found with this email."
            } else if (err.code === "auth/wrong-password") {
                message = "Incorrect password. Please try again."
            }
            showToast(message, "error")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const result = await loginWithGoogle()
            const user = result.user

            // Register/check user in the backend
            await axios.post(
                "http://localhost:5000/api/users/register",
                {
                    uid: user.uid,
                    username: user.displayName || user.email.split('@')[0],
                    email: user.email,
                    phone: user.phoneNumber || ""
                }
            )
            
            console.log(user)
            showToast("Google login successful!", "success")
            navigate("/profile")
        } catch (err) {
            console.error(err)
            showToast(err.message || "Failed to login with Google.", "error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='auth-card'>
            <Link to="/" className="back-to-home">back to home</Link>
            <h1>Login here</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className="toggle-password-button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            disabled={loading}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
                    <Link to="/forgot-password" style={{ fontSize: '0.9em', color: '#4dc0b5', textDecoration: 'none', fontWeight: '500' }}>
                        Forgot Password?
                    </Link>
                </div>

                <button className={`btn-primary ${loading ? 'loading' : ''}`} type="submit" disabled={loading}>
                    {loading ? <div className="spinner"></div> : "Submit"}
                </button>

                <div className="divider">
                    <span>or</span>
                </div>

                <button className={`btn-google ${loading ? 'loading' : ''}`}
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}>
                    <img src="https://www.google.com/favicon.ico" alt="Google icon" /> Continue with Google
                </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.95em', color: '#555' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#4dc0b5', textDecoration: 'none', fontWeight: '600' }}>
                    Sign Up
                </Link>
            </div>
        </div>
    )
}

export default Login