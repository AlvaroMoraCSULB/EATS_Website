import { useState } from "react";
import { useNavigate } from "react-router-dom";

// YouTube video ID + title data
const videoData = [
  { id: "eumKLXNlM0U", title: "How To Install and Use STM IDEs" },
  { id: "l2yrDmrPW70", title: "How to Program a Traffic Light using LEDs" },
  { id: "yi29dbPnu28", title: "How to Program Arduino" },
  { id: "QfgBTVno6Zg", title: "Intro to Embedded Systems" },
  { id: "W6mixXsn-Vc", title: "How to Use a Breadboard" },
  { id: "1WnGv-DPexc", title: "Servo Motors Explained" },
  { id: "TZ_I9gQHgv4", title: "How do RC cars work?" },
  { id: "a9VxTE3-bbA", title: "Intro to basic electronics" },
  { id: "SpFtlL1cdoY", title: "Breadboard Project: Electronic Dice" },
  { id: "hqVpxCPFaQk", title: "Breadboard Project: RGB lights" },
];

export default function Videos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAZ, setSortAZ] = useState(false);

  const filteredVideos = videoData
    .filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortAZ ? a.title.localeCompare(b.title) : 0);

  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#ecaa00", minHeight: "100vh" }}>
      <h1>Videos</h1>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid black"
        }}
      />

      {/* Sort Button */}
      <div style={{ 
        marginBottom: "20px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "10px" 
      }}>
        <span style={{ fontSize: "16px", fontWeight: "500" }}>Sort by:</span>
        <button
          onClick={() => setSortAZ(prev => !prev)}
          style={{
            padding: "8px 16px",
            borderRadius: "5px",
            border: "1px solid black",
            background: sortAZ ? "#4CAF50" : "#fff",
            color: sortAZ ? "white" : "black",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          {sortAZ ? (
            <>
              <span>Title (A-Z)</span>
              <span>↓</span>
            </>
          ) : (
            <>
              <span>Default Order</span>
              <span>↕</span>
            </>
          )}
        </button>
      </div>

      {/* Videos Grid */}
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
        {filteredVideos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          filteredVideos.map(video => (
            <div
              key={video.id}
              style={{ 
                cursor: "pointer", 
                textAlign: "center", 
                width: "200px",
                transition: "transform 0.2s ease",
                ":hover": {
                  transform: "scale(1.05)"
                }
              }}
              onClick={() => navigate(`/videos/${video.id}`)}
            >
              {/* YouTube Thumbnail Image */}
              <img 
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                alt={video.title}
                style={{ 
                  width: "100%", 
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
              />
              <p style={{ 
                marginTop: "8px", 
                fontWeight: "500",
                color: "#333"
              }}>
                {video.title}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}