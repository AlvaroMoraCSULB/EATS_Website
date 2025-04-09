// Updated Files.js
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const Files = () => {
  const [userEmail, setUserEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };
    fetchUserData();
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post("http://localhost:5000/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

      alert("File uploaded successfully");
      fetchFiles();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setFiles(response.data);
    } catch (err) {
      console.error("Fetching files failed", err);
    }
  };

  return (
    <div>
      <h1>Embedded Applications Technology Society</h1>
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
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/officers">Officers</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/videos">Videos</a></li>
            <li><a href="/files">Files</a></li>
            <li><a href="/forum">Forum</a></li>
            <li><a href="/calendar">Calendar</a></li>
            <li><a href="/analytics">Analytics</a></li>
            <li><a href="/maps">Maps</a></li>
            <li><a href="/donations">Donations</a></li>
          </ul>
        </nav>
      </div>

      {userEmail === "eatsrules123@gmail.com" && (
        <div className="upload-container">
          <h3>Upload a File</h3>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload</button>
        </div>
      )}

      <div>
        <h3>Available Files</h3>
        <ul>
          {files.map((file, idx) => (
            <li key={idx}>
              <a href={`http://localhost:5000/uploads/${file}`} target="_blank" rel="noopener noreferrer">
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Files;
