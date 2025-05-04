import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const officers = [
  {
    name: "Jeffrey Madrid",
    title: "President",
    bio: "Jeffrey Madrid leads the society with a strong vision for innovation and collaboration.",
    videoLink: "http://localhost:5000/officer_videos/Jeffrey.mp4",
  },
  {
    name: "Brody Liudzius",
    title: "Vice President",
    bio: "Brody Liudzius supports project execution and fosters a strong team culture.",
    videoLink: "http://localhost:5000/officer_videos/Brody.mp4",
  },
  {
    name: "Andres Valladares",
    title: "Treasurer",
    bio: "Andres Valladares manages the society's finances and ensures transparency.",
    videoLink: "http://localhost:5000/officer_videos/Andres.mp4",
  },
  {
    name: "Adan Arevalo",
    title: "Secretary",
    bio: "Adan Arevalo keeps detailed records and ensures effective communication.",
    videoLink: "",
  },
  {
    name: "Luis Arevalo",
    title: "Project Manager",
    bio: "Luis Arevalo organizes and oversees major projects for the society.",
    videoLink: "",
  }
];

const Officers = () => {
  return (
    <div>
      <h1>Embedded Applications Technology Society</h1>

      {/* Hamburger Menu */}
      <div className="hamburger-menu">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <span className="menu-text">Officers</span>
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

      {/* Officers Section */}
      <div className="officers-container">
        {officers.map((officer, index) => (
          <div key={index} className="officer-card">
            <h2>{officer.title}</h2>
            <p><strong>Biography:</strong> {officer.bio}</p>
            {officer.videoLink && (
              <video width="100%" height="auto" controls>
                <source src={officer.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <h3>{officer.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Officers;
