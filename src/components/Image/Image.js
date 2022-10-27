import React from 'react';
import './Image.css';
const Image = (props) => {
  return (
    <div className="container2">
       <img src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png" alt="" className="photograph"/>
    </div>
  )
}

Image.defaultProps = {
  file: "Please select a file"
}

export default Image
