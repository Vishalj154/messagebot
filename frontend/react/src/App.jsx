import { Routes, Route, useNavigate } from 'react-router-dom'
import welcomeImage from './assets/lema_welcome.png'
import './App.css'
import Signup from './signup'
import Login from './login'
import ForgotPassword from './forgot-password'
import SetupProfile from './setup-profile'
import Chats from './chats'
import SearchPage from './SearchPage'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
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

      {/* Guest-only Auth Routes (Redirects authenticated users automatically) */}
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

      {/* First-time Profile Setup Route (Restricted to logged-in users with incomplete profiles) */}
      <Route 
        path="/setup-profile" 
        element={
          <AuthGuard requireAuth={true} isSetupProfile={true}>
            <SetupProfile />
          </AuthGuard>
        } 
      />

      {/* Protected App Routes (Restricted to logged-in users with complete profiles) */}
      <Route 
        path="/app/chats" 
        element={
          <AuthGuard requireAuth={true} isSetupProfile={false}>
            <Chats />
          </AuthGuard>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <AuthGuard requireAuth={true} isSetupProfile={false}>
            <Profile />
          </AuthGuard>
        } 
      />
      <Route 
        path="/search" 
        element={
          <AuthGuard requireAuth={true} isSetupProfile={false}>
            <SearchPage />
          </AuthGuard>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <AuthGuard requireAuth={true} isSetupProfile={false}>
            <Settings />
          </AuthGuard>
        } 
      />
    </Routes>
  )
}

export default App
