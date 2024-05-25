import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Team = (props) => {
  return (
    <>
        <div className="profile">
            <img src={props.imgsrc} alt=""/>
            <h6 style={{color:"black"}}>{props.name}</h6>
            <p style={{color:'black'}}>{props.help}</p>
            <div style={{color:'black'}} className="pro-links">
                <FaFacebook className='i'/>
                <FaInstagram className='i'/>
                <FaLinkedin className='i'/>
            </div>
        </div>
    </>
  )
}

export default Team