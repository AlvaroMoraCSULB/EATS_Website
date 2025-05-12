import { useParams, useNavigate } from "react-router-dom";

export default function VideoPlayer() {
  const { videoId } = useParams(); // Extract video ID from URL
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#ecaa00", minHeight: "100vh" }}>
      <h1>Videos</h1>

      {/* Embedded YouTube Video */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe 
          width="800" 
          height="450" 
          src={`https://www.youtube.com/embed/${videoId}`} // Embeds the selected YouTube video
          title="YouTube Video"
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Back to Videos Button */}
      <button 
        onClick={() => navigate("/videos")} // Navigate back to Videos page
        style={{ marginTop: "20px", padding: "10px 20px", background: "lightblue", border: "1px solid black", cursor: "pointer" }}
      >
        Back to Videos
      </button>
    </div>
  );
}