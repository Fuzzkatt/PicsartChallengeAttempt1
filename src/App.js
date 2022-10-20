import Instructions from './components/Instructions/Instructions';
import Image from './components/Image/Image';
import Parameters from './components/Parameters/Parameters';
import Preview from './components/Preview/Preview';
import axios from "axios";
import { useState } from 'react'
import './App.css';

function App() {

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

   {/* new line start*/}
<p>Test to connect with python backend </p><button onClick={getData}>Click me</button>
{profileData && <div>
    <p>Profile name: {profileData.profile_name}</p>
    <p>About me: {profileData.about_me}</p>
</div>}
 {/* end of new line */}

 {/* new line start*/}
<p>removebg </p><button onClick={removeBackground}>Click me</button>
{removeBg && <div>
    <p>pressed button, awaiting response</p>
    {removeBg.url_and_stuff}
</div>}
{/* end of new line */}

    <Instructions/>
    <div className="threeColumn">
      <Image/>
      <Parameters/>
      <Preview/>
    </div>
    </div>

  );
}

export default App;
