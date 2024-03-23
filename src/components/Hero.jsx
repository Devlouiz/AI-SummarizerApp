import React from 'react';
import { logo } from "../assets";
import summLogo from '../assets/summbuddy.png';

const Hero = () => {
  return (
    <div className='hero w-full flex justify-center
    items-center flex-col'>
        <div className='navba flex justify-between items-center
        flex-row w-full py-5'>
            <img src={summLogo} alt="summbuddy"
            className='w=28 object-contain' />
            <button 
            className='black_btn'
            type='button'
            onClick={() => window.open("")}>github</button>
        </div>
        <h1 
        className='head_text'>Summarize Articles with 
        <br />
        <span className='orange_gradient'>SummBuddy 2.0</span>
        </h1>
        <p className='desc'>Simplify your reading with SummBuddy 2.0, an
            open-source article summarizer that transform lenghty
            articles into clear and concise summaries.
        </p>
    </div>
  )
}

export default Hero