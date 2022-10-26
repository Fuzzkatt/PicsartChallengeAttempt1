import React from 'react';
import './Parameters.css';

const Parameters = () => {
  return (
    <div className="container3">
      <table>
      <tr><td><label className="param" for="removeText">Remove text</label></td><td><input type="checkbox" className="removeText"/></td></tr>
      <tr><td><label for="ImageUpscale" className="param">Image Upscale</label></td><td><input  type="checkbox" className="ImageUpscale"/></td></tr>
      <tr><td><label for="removeBackground"className="param">Remove Background   </label></td><td><input type="checkbox" className="removeBackground"/></td></tr>
      <tr><td><label for="removeSplotches" className="param">Remove Splotches</label></td><td><input type="checkbox" className="removeSplotches"/></td></tr>
      <tr><td><label for="imageContrast" className="param">Image Contrast</label></td><td> <input type="range" min="1" max="100" className="imageContrast slider"/></td></tr>
      <tr><td><label className="param">Black & White Image</label></td><td> <input type="checkbox" className="BlackAndWhite"/></td></tr>
      </table>
      <button className="generate">Generate Image</button>
    </div>
  )
}

export default Parameters

