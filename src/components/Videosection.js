import React from 'react';
import './Videosection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/Videos/Comp1.mp4' autoPlay loop muted />
    </div>
  );
}

export default HeroSection;