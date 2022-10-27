import Instructions from './components/Instructions/Instructions';
import Image from './components/Image/Image';
import Parameters from './components/Parameters/Parameters';
import Preview from './components/Preview/Preview';
import axios from "axios";
import React, { useState } from 'react'
import './App.css';

function App() {

  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	function handleUpscale(event) {
    event.preventDefault()
    console.log("test1")

    const url = 'http://localhost:3000/upscale';
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name)
    console.log(selectedFile)
    console.log(formData)

    fetch(url, {
      method: 'POST',
      body: formData,
    }).then((response) => {
      response.json().then((body) => {
        console.log(response.data)
      });
    });
  }
    
  function handleAdjust(event) {
    event.preventDefault()
    console.log("test1")

    const url = 'http://localhost:3000/adjust';
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name)
    console.log(selectedFile)
    console.log(formData)

    fetch(url, {
      method: 'POST',
      body: formData,
    }).then((response) => {
      response.json().then((body) => {
        console.log(response.data)
      });
    });

  }

  return(
    <div>
        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Conversion takes roughly one minute per page, please be patient!</p>
            <p>Resultant file will be stored at /flask/backend/[file_name]_fixed.pdf when finished</p>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={handleUpscale}>Upscale</button>
        </div>
        <div>
          <button onClick={handleAdjust}>Upscale + Adjust</button>
        </div>
      </div>
    )
};


export default App;
