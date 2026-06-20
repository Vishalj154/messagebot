import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import './index.css'

const Login = () => {
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();
        const userinfo = new signInWithEmailAndPassword(
            auth,
            Email,
            password
        );
        console.log(userinfo.user);
        alert("Login successful")
    }
    
  return (
    <div className='signup-form'>
        <h1>Login here</h1>
        <label >
            Email: <input type="email" value={Email} onChange={(e)=> setEmail(e.target.value)  } required/>
        </label>
        <label >
            Password: <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)  } required/>
        </label>
            <button className="submit" onClick={handleSubmit} type="button">Submit</button>
    </div>
    
  )
}

export default Login