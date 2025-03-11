import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // State to store user input (email, username, password)
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // State to store registration success/error messages
  const [message, setMessage] = useState("");

  // Function to update state when input fields change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      // Sends user data to backend for registration
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, userData);
      
      // Show success message
      setMessage(`Registration successful! ${response.data.is_officer ? "You are registered as an officer." : "You are registered as a regular user."}`);
    } catch (error) {
      // Show specific error message from the backend
      setMessage(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div>
      <h1>Embedded Applications Technology Society</h1>

      {/* Hamburger Menu Structure */}
      <div className="hamburger-menu">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <span className="menu-text">Register</span>
        <nav className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/officers">Officers</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/files">Files</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/maps">Maps</Link></li>
            <li><Link to="/donations">Donations</Link></li>
          </ul>
        </nav>
      </div>

      {/* Registration Form */}
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        {/* Display success/error messages */}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;