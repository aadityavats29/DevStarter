import React from 'react'
import deepankar2 from './images/Deep1.jpeg';
import Dhruv from './images/Dhruv.png';
import Dev from './images/Dev.jpg';
import Dishant from './images/Dishant.png';
import './about.css';
import Team from './Team';
import Contact from '../ContactUs/Contact';
import Footer from '../Footer/Footer.jsx';
const About = () => {
  return (
    <>
        <section id="experts">
            <h1 style={{color:'white'}}>Community Experts</h1>
            <p>Replenish man have thing gathering lights yieding shall you</p>
            <div className="expert-box">
                <Team imgsrc={Dhruv} name={"Dhruv Seth"} help={"Full-Stack Developer"}/>
                <Team imgsrc={deepankar2} name={"Deepankar Garg"} help={"Frontend Developer"}/>
                <Team imgsrc={Dev} name={"Dev Bhatia"} help={"DSA & Frontend"}/>
                <Team imgsrc={Dishant} name={"Dishant"} help={"Frontend"}/>
            </div>
        </section>
        <Contact/>
        <Footer/>
    </>
  )
}

export default About;