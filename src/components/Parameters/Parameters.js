import React from 'react';
import './Parameters.css';

const Parameters = () => {
  return (
    <div className="container3">
      <ul className="list">
        <div className="param">Remove text</div>
        <div className="param">Image Upscale</div>
        <div className="param">Remove Background</div>
        <div className="param">De-noising/Remove Splotches</div>
        <div className="param">Image Contrast</div>
        <div className="param">Black & White Image</div>
      </ul>
      <button className="generate">Generate Image</button>
    </div>
  )
}

export default Parameters