import React, { useEffect, useState } from "react";
import axios from "axios";
//import "./Files.css";

const Files = () => {
  const [isOfficer, setIsOfficer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Only check officer status when needed (during upload)
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/files`);
      setFiles(res.data);
    } catch (err) {
      console.error("File fetch error:", err);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(`${process.env.REACT_APP_API_URL}/api/files/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      alert("Upload successful!");
      fetchFiles();
    } catch (err) {
      if (err.response?.status === 403) {
        setIsOfficer(false);
        alert("Officer privileges required for uploads");
      } else {
        alert(`Upload failed: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  return (
    <div className="files-container">
      {/* Upload section always visible - auth check happens on submission */}
      <div className="upload-section">
        <input 
          type="file" 
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="file-list">
        <h3>Available Files</h3>
        <ul>
          {files.map((file) => (
            <li key={file}>
              <a href={`${process.env.REACT_APP_PUBLIC_URL}/uploads/${file}`} 
                 target="_blank" 
                 rel="noopener noreferrer">
                {file.split('-').slice(1).join('-')}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Files;