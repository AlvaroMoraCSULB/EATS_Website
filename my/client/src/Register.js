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