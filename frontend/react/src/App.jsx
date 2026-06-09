import { useState } from 'react'
import welcomeImage from './assets/lema_welcome.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="welcome-container">
        <img src={welcomeImage} className="welcome" alt="welcome" />
        <div className="welcometext">
          <h1>Welcome here ...!</h1>
          <h3>This is Messaging app</h3>
        </div>
      </div>
    </>
  )
}

export default App
