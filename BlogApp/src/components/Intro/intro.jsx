import React from 'react';
import './intro.css';
import img from './right.jpeg';
import About from './About us/About';
const Intro = ()=>{
    return (<>
        <div className="biggy">
            <div className="left">
                <h1>
                    <button className="buttonTexture" data-text="Awesome">
                        <span className="actual-text">&nbsp;Quill&nbsp;-&nbsp;Quest,&nbsp;</span>
                        <span aria-hidden="true" className="hover-text">&nbsp;Quill&nbsp;-&nbsp;Quest,&nbsp;</span>
                    </button>
                <br/> Your Way</h1>
                <span className='span'><img src={img} alt="" className='tor hidden'/></span>
                <p>Build and grow your website with the best way to Quill-Quest. Lightning-fast hosting, intuitive, flexible editing, and everything you need to grow your site and audience, baked right in.</p>
                <button class="button2">Get Started</button>
            </div>
            <div className="right w-[30%] tohid">
                <img src={img} alt="" className='tor'/>
            </div>
        </div>
        <About/>
    </>)
}
export default Intro;   