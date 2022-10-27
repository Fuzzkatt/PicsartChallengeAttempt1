import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="container1">
      <div className="title">Instructions: </div>
      <div className="instruction">1. Upload Image</div>
      <div className="instruction">2. Pick either Upscale or Upscale + Adjust </div>
      <div className="instruction">3. Wait for processing to finish</div>
      <div className="instruction">4. Open processed file in backend/ folder </div>
    </div>
  )
}

export default Instructions