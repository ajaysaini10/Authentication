import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './authstyle.css';

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleVerification = async () => {
    const response = await fetch('http://localhost:3000/verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form), // form contains email and password
    });
  
    const result = await response.json();
  
    if (response.ok) {
      // Verification successful, redirect to the next page
      window.location.href = 'http://127.0.0.1:5173/'; // Or use React Router's `useNavigate` hook
    } else {
      // Show error message
      alert(result.error);
    }
  };

  return (
    <div className="background">
   
      <div className="radial-gradient-background"></div>
      <div className="container">
        <div>CardioSense</div>
        <div className="signtext">Sign in to your Account</div>
        <input 
          name="email"
          value={form.email} 
          onChange={handleInputChange} 
          placeholder="Enter Email" 
          type="text" 
        />
        <input 
          name="password"
          value={form.password} 
          onChange={handleInputChange} 
          placeholder="Enter Password" 
          type="password" 
        />
        <button onClick={handleVerification}>Login</button>

        <div className="footer">
          New to CardioSense?
          <Link to="/register"> Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;