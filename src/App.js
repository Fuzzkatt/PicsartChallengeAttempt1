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

	function handleSubmission() {
    console.log("test1")
    console.log(selectedFile.name)
    axios({
      method: "POST",
      url:"/upscale",
      data: {
        pdf_file: selectedFile.name
      }
    })
    .then((response) => {
      const res=response.data
      console.log("success!")
      console.log(res)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

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
      </div>
    )
};

{/*}
    const [profileData, setProfileData] = useState(null);
    const [removeBg, setRemoveBg] = useState(null);

    function getData() {
      axios({
        method: "GET",
        url:"/profile",
      })
      .then((response) => {
        const res =response.data
        setProfileData(({
          profile_name: res.name,
          about_me: res.about}))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}

    function removeBackground() {
      setRemoveBg(true);
      axios({
        method: "POST",
        url:"/removebg",
        data: {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBH5nllkqEGDOe6T4FLPZwBRwgLWxyE2eztA&usqp=CAU"
        }
      })
      .then((response) => {
        const res=response.data
        console.log("hello here")
        console.log(res)
        setRemoveBg(({
          url_and_stuff: res}))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}

  return (

   <div>

<p>Test to connect with python backend </p><button onClick={getData}>Click me</button>
{profileData && <div>
    <p>Profile name: {profileData.profile_name}</p>
    <p>About me: {profileData.about_me}</p>
</div>}

<p>removebg </p><button onClick={removeBackground}>Click me</button>
{removeBg && <div>
    <p>pressed button, awaiting response</p>
    {removeBg.url_and_stuff}
</div>}

    <Instructions/>
    <div className="threeColumn">
      <Image/>
      <Parameters/>
      <Preview/>
    </div>
    </div>

  );
*/}

export default App;
