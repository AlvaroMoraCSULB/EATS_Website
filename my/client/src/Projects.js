import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy project data
const projectsData = [
  {
    name: "Micromouse",
    description: "A small autonomous robot designed to solve a maze.",
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/9/90/Micromouse01.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/6CdI9LRkztk" }
    ]
  },
  {
    name: "Black Tape Following Robot",
    description: "A robot that follows a black tape path using sensors.",
    media: [
      { type: "image", src: "https://www.researchgate.net/profile/Aniket-Sahare/publication/357495368/figure/fig2/AS:1114214389477370@1640940798723/Black-line-following-robot.png" },
      { type: "video", src: "https://www.youtube.com/embed/LxctbExgZ9k" }
    ]
  },
  {
    name: "8x8 LED Matrix Cube",
    description: "An animated LED cube built from scratch with 3D soldering and Arduino logic.",
    media: [
      { type: "video", src: "https://www.youtube.com/embed/hqVpxCPFaQk" },
      { type: "image", src: "https://www.electronicwings.com/public/images/user_images/images/8x8_LED_Matrix.jpg" }
    ]
  },
  {
    name: "PCB Submarine with Electronics",
    description: "A 3D-printed submarine with motors and PCB for controlling depth and movement.",
    media: [
      { type: "image", src: "https://www.navalnews.com/wp-content/uploads/2021/04/UMEX-2021-Phoenix-International-Presents-Submarine-Rescue-Drone-3.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/SpFtlL1cdoY" }
    ]
  }
];

export default function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelectProject = (index) => {
    setSelectedProjectIndex(index);
    setMediaIndex(0);
  };

  const handleNextProject = () => {
    setSelectedProjectIndex((prev) => (prev + 1) % projectsData.length);
    setMediaIndex(0);
  };

  const handlePrevProject = () => {
    setSelectedProjectIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setMediaIndex(0);
  };

  const handleNextMedia = () => {
    setMediaIndex((prev) => (prev + 1) % projectsData[selectedProjectIndex].media.length);
  };

  const handlePrevMedia = () => {
    setMediaIndex((prev) => (prev - 1 + projectsData[selectedProjectIndex].media.length) % projectsData[selectedProjectIndex].media.length);
  };

  const selected = selectedProjectIndex !== null ? projectsData[selectedProjectIndex] : null;

  return (
    <div style={{ background: "#FFC107", minHeight: "100vh", padding: "30px", textAlign: "center" }}>
      <h1>Embedded Applications Technology Society</h1>

      {!selected ? (
        <>
          <h2>Projects</h2>
          <p>Explore the different engineering projects built by EATS members!</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", marginTop: "30px" }}>
            {projectsData.map((proj, idx) => (
              <div key={idx} onClick={() => handleSelectProject(idx)} style={{ cursor: "pointer", textAlign: "center" }}>
                <img src={proj.media[0].src} alt={proj.name} style={{ width: "160px", height: "120px", objectFit: "cover", borderRadius: "10px" }} />
                <button style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  border: "2px solid black",
                  fontSize: "16px",
                  backgroundColor: "#2196F3",
                  color: "white"
                }}>
                  {proj.name}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Project View */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: "40px" }}>
            {/* Project Navigation Arrows (Left/Right) */}
            <button onClick={handlePrevProject} style={arrowCircleStyle}><span style={arrowIconStyle}>◀</span></button>

            {/* Media + Description Side-by-Side */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              {/* Media Viewer */}
              <div style={{ textAlign: "center", marginRight: "30px" }}>
                {selected.media[mediaIndex].type === "image" ? (
                  <img src={selected.media[mediaIndex].src} alt={selected.name} style={{ maxWidth: "500px", borderRadius: "10px" }} />
                ) : (
                  <iframe
                    width="500"
                    height="315"
                    src={selected.media[mediaIndex].src}
                    title={selected.name}
                    frameBorder="0"
                    allowFullScreen
                    style={{ borderRadius: "10px" }}
                  ></iframe>
                )}

                {/* Slideshow Arrows BELOW the media */}
                <div style={{
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px"
                }}>
                  <button onClick={handlePrevMedia} style={arrowCircleStyle}><span style={arrowIconStyle}>◀</span></button>
                  <button onClick={handleNextMedia} style={arrowCircleStyle}><span style={arrowIconStyle}>▶</span></button>
                </div>
              </div>

              {/* Description Box */}
              <div style={{
                background: "#f5f5dc",
                border: "2px solid black",
                borderRadius: "15px",
                padding: "20px",
                width: "350px",
                textAlign: "left"
              }}>
                <h3 style={{ textAlign: "center" }}>{selected.name}</h3>
                <p>{selected.description}</p>
              </div>
            </div>

            {/* Right Arrow */}
            <button onClick={handleNextProject} style={arrowCircleStyle}><span style={arrowIconStyle}>▶</span></button>
          </div>

          {/* Back to Projects Button */}
          <div style={{ marginTop: "30px" }}>
            <button onClick={() => setSelectedProjectIndex(null)} style={{
              background: "white",
              color: "black",
              padding: "10px 20px",
              border: "2px solid black",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
              Back to Projects
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Reusable styles
const arrowCircleStyle = {
  backgroundColor: "white",
  border: "2px solid black",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer"
};

const arrowIconStyle = {
  fontSize: "18px",
  color: "black"
};
