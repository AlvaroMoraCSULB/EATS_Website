import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Slideshow from "./components/Slideshow";

const Home = () => {
  const slides = [
    {
      url: "/slide1.jpg",
      caption: "..."
    },
    {
      url: "/slide2.jpg",
      caption: "..."
    },
    {
      url: "/slide3.jpg",
      caption: "..."
    },
    {
      url: "/slide4.jpg",
      caption: "..."
    },
    {
      url: "/slide5.jpg",
      caption: "..."
    },
    {
      url: "/slide6.jpg",
      caption: "..."
    }
  ];

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
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/files">Files</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/officers">Officers</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/items">Items</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/maps">Maps</Link></li>
            <li><Link to="donations">Donations</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Slideshow with direct public folder paths */}
      <Slideshow images={slides} interval={10000} />
    </div>
  );
};

export default Home;