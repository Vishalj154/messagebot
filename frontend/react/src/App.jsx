import { Routes, Route, useNavigate } from 'react-router-dom'
import welcomeImage from './assets/lema_welcome.png'
import './App.css'
import Signup from './signup'
import Login from './login'
import ForgotPassword from './forgot-password'
import Profile from '../components/Profile'
import AuthGuard from '../components/AuthGuard'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <img src={welcomeImage} className="welcome-image" alt="welcome" />

      <div className="welcometext">
        <h1>Welcome to Chattrix</h1>

        <p style={{ fontSize: '1.2rem', marginTop: '1rem', marginBottom: '2rem' }}>
          Share messages, photos and videos securely.
        </p>

        <button onClick={() => navigate('/signup')}>Sign Up</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Guest-only Auth Routes */}
      <Route 
        path="/signup" 
        element={
          <AuthGuard requireAuth={false}>
            <Signup />
          </AuthGuard>
        } 
      />
      <Route 
        path="/login" 
        element={
          <AuthGuard requireAuth={false}>
            <Login />
          </AuthGuard>
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <AuthGuard requireAuth={false}>
            <ForgotPassword />
          </AuthGuard>
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/profile" 
        element={
          <AuthGuard requireAuth={true}>
            <Profile />
          </AuthGuard>
        } 
      />
    </Routes>
  )
}

export default App

