import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const officers = [
  {
    name: "Jeffrey Madrid",
    title: "President",
    bio: "Jeffrey Madrid leads the society with a strong vision for innovation and collaboration.",
    videoFile: "jeffrey.mp4",
  },
  {
    name: "Brody Liudzius",
    title: "Vice President",
    bio: "Brody Liudzius supports project execution and fosters a strong team culture.",
    videoFile: "brody.mp4",
  },
  {
    name: "Andres Valladares",
    title: "Treasurer",
    bio: "Andres Valladares manages the society's finances and ensures transparency.",
    videoFile: "andres.mp4",
  },
  {
    name: "Adan Arevalo",
    title: "Secretary",
    bio: "Adan Arevalo keeps detailed records and ensures effective communication.",
    videoFile: null,
  },
  {
    name: "Luis Arevalo",
    title: "Project Manager",
    bio: "Luis Arevalo organizes and oversees major projects for the society.",
    videoFile: null,
  }
];

const Officers = () => {
  return (
    <div>
      {/* Officers Section */}
      <div className="officers-container">
        {officers.map((officer, index) => (
          <div key={index} className="officer-card">
            <h2>{officer.title}</h2>
            <p><strong>Biography:</strong> {officer.bio}</p>
            {officer.videoFile && (
              <video width="100%" height="auto" controls>
                <source 
                  src={`${process.env.PUBLIC_URL}/officer_videos/${officer.videoFile}`} 
                  type="video/mp4" 
                />
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