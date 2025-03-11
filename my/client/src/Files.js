import React from "react";
import "./App.css";

const Files = () => {
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
        <span className="menu-text">Files</span>
        <nav className="menu">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>
            <li><a href="officers.html">Officers</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="videos.html">Videos</a></li>
            <li><a href="files.html">Files</a></li>
            <li><a href="forum.html">Forum</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="analytics.html">Analytics</a></li>
            <li><a href="maps.html">Maps</a></li>
            <li><a href="donations.html">Donations</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Files;