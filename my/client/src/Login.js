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