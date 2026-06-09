import { useState } from 'react'
import welcomeImage from './assets/lema_welcome.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div className="welcome-container">
        <img src={welcomeImage} className="welcome-image" alt="welcome" />

        <div className="welcometext">
          <h1>Welcome to Chattrix</h1>

          <p style={{ fontSize: '1.2rem', marginTop: '1rem' , marginBottom: '2rem' }}>
            Share messages, photos and videos securely.
          </p>

          <button>Sign Up</button>
          <button>Login</button>
        </div>
      </div>
    </>
  )
}

export default App
