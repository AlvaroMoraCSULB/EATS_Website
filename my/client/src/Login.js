import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const Login = () => {
  // State to store user input
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate(); // For redirecting users

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Send login request to the backend
	  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, userData);

      if (response.data.token) {
        // Store token and user role in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isOfficer", response.data.is_officer);

        alert("Login successful!");

		// Redirect to Home page after login
        navigate("/");
      }
    } catch (error) {
      // Show specific error message from the backend
      setError(error.response?.data?.message || "Invalid email or password. Try again.");
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
        <span className="menu-text">Login</span>
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

      {/* Login Form */}
      <div className="register-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message if login fails */}
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
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;