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
      <img src="https://logowik.com/content/uploads/images/discord-icon9600.logowik.com.webp" alt="Discord" className="social-icon" />
      </a>
    </div>
  );
};

export default SocialMediaLinks;