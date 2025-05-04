import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import SocialMediaLinks from "./SocialMediaLinks"; 

const Home = () => {
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
        <span className="menu-text">Home</span>
        <nav className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/files">Files</Link></li>
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
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Social Media Links Section */}
      <div className="social-links-wrapper">
      <SocialMediaLinks />
    </div>
    </div>
  );
};

export default Home;
