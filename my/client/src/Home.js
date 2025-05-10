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
     
      
      {/* Slideshow with direct public folder paths */}
      <Slideshow images={slides} interval={10000} />
    </div>
  );
};

export default Home;