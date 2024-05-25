import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaEnvelopeOpenText } from "react-icons/fa";
import './contact.css';
import Map from './Map';
const Contact = () => {
  return (
    <>  
        <section className="about-home bg-blue-900 h-[180px] pt-0">
            <h2>Contact Us</h2>
        </section>
        <hr/>
        <section className="contact bg-black text-white">
            <div className="get-in">
                <h2>Get in touch</h2>
                <p>Looking for help? Fill the form and start a new adventure.</p>
                <div className="getin-details">
                    <h3>Headquaters</h3>
                    <div>
                        <FaHome className='get'/>
                        <p>Chitkara University,Rajpura,Punjab</p>
                    </div>

                    <h3>Phone number</h3>
                    <div>
                        <IoCall className='get'/>
                        <p>95115XXXXX<br/>62801XXXXX</p>
                    </div>
                    <h3>Support</h3>
                    <div>
                        <FaEnvelopeOpenText className='get'/>                    
                        <p>xyz@gmail.com <br/> abc@gmail.com</p>
                    </div>
                    <h3>Follow Us</h3>
                    <div className="pro-links justify-start">
                        <FaFacebook className='i'/>
                        <FaInstagram className='i'/>
                        <FaLinkedin className='i'/>
                        {/* <i className="fab fa-behance"></i> */}
                    </div>
                </div>
            </div>
            <div className="form">
                <h4>Let's Connect</h4>
                <p>Manage Reputation Manage Reputation Manage Reputation</p>
                <div className="form-row">
                    <input type="text" placeholder="Your Name"/>
                    <input type="text" placeholder="Email"/>
                </div>
                <div className="form-col">
                    <input type="text" placeholder="Subject"/>
                </div>
                <div className="form-col">
                    <textarea name="" id="" cols="30" rows="8" placeholder="How can we help?"></textarea>
                </div>
                <div className="form-col">
                    <button>Send Message</button>
                </div>  
            </div>
        </section>
        <Map/>
    </>
  )
}

export default Contact
