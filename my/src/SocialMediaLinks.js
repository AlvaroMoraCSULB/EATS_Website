import React from "react";
import "./App.css";

const SocialMediaLinks = () => {
  return (
    <div className="social-media-links">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="X (Twitter)" className="social-icon" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" className="social-icon" />
      </a>
      <a href="https://discord.gg/yourinvite" target="_blank" rel="noopener noreferrer">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Discord_logo.svg" alt="Discord" className="social-icon" />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
