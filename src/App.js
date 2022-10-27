import Instructions from './components/Instructions/Instructions';
import Image from './components/Image/Image';
import React, { useState } from 'react'
import './App.css';

function App() {

  const [selectedFile, setSelectedFile] = useState("please select a file");
	const [isSelected, setIsSelected] = useState(false);
  const [prompt, setPrompt] = useState("Select your file to process")

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
    setPrompt("Pick upscale or upscale + adjust")
	};

	function handleUpscale(event) {
    event.preventDefault()

    setPrompt("Your file is currently processing. Please be patient, processing can take up to one minute per page!")

    const url = 'http://localhost:3000/upscale';
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name)
    fetch(url, {
      method: 'POST',
      body: formData,
    }).then((response) => {
      response.json().then((body) => {
        console.log(response.data)
      });
      setPrompt("Thank you for waiting! Your file is ready at backend/" + selectedFile.name.slice(0, -4) + "_fixed.pdf")
    });

  }
    
  function handleAdjust(event) {
    event.preventDefault()

    setPrompt("Your file is currently processing. Please be patient, processing can take up to one minute per page!")

    const url = 'http://localhost:3000/adjust';
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name)

    fetch(url, {
      method: 'POST',
      body: formData,
    }).then((response) => {
      response.json().then((body) => {
        console.log(response.data)
      });
      setPrompt("Thank you for waiting! Your file is ready at backend/" + selectedFile.name.slice(0, -4) + "_fixed.pdf")
    });

  }

  return(
    <div>
      <div>
        <Instructions/>
        <div className="threeColumn">

          <div className="ImageContainer">
            <Image file={selectedFile.name}/>
            <input type="file" name="file" onChange={changeHandler} />
          </div>

          <div>
            <p> {prompt} </p>
          </div>

          <div className="parameters">
            <button onClick={handleUpscale} className="parameterButton">Upscale</button>
            <button onClick={handleAdjust} className="parameterButton">Upscale + Adjust</button>
          </div>

        </div>
      </div>
    </div>
    )
};


export default App;
