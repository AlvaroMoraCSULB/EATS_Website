import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const Slideshow = ({ images, interval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, interval]); 

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div 
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image.url})` }}
        >
          {image.caption && <div className="slide-caption">{image.caption}</div>}
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button className="slideshow-arrow left-arrow" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="slideshow-arrow right-arrow" onClick={goToNext}>
        &#10095;
      </button>
      
      <div className="slideshow-dots">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;