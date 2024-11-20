import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
  // State to store form input values
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Prepare data for API
    const userData = {
      name: form.name, // Include name in the data sent to the backend
      email: form.email,
      password: form.password
    };

    try {
      // Send POST request to the /register endpoint
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert('User registered successfully!');
        // Redirect to login page or next page
        window.location.href = '/login'; // Assuming you have a login route
      } else {
        const result = await response.json();
        alert(result.error || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="background">
      {/* Radial gradient background */}
      <div className="radial-gradient-background"></div>

      <div className="container">
        <div>CardioSense</div>
        <div className="signtext">Create Account</div>

        <form className="container2" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name"
            type="text"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            type="text"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            type="password"
            required
          />
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <button className='button' type="submit">Signup</button>
        </form>

        <div className="footer">
          Already Registered?
          <Link to="/login"> Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;