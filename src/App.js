import Instructions from './components/Instructions/Instructions';
import Image from './components/Image/Image';
import Preview from './components/Preview/Preview';
import React, { useState } from 'react'
import './App.css';

function App() {

  const [selectedFile, setSelectedFile] = useState("please select a file");
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	function handleSubmission(event) {
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

  return(
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
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
        <button onClick={handleSubmission}>Submit</button>
      </div>
      <div>
        <Instructions/>
        <div className="threeColumn">
          <Image file={selectedFile.name}/>
          // something belongs here
          <Preview/>
        </div>
      </div>
    </div>
    )
};


export default App;
