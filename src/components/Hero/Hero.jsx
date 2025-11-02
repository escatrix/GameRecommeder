import React from "react";
import { useState } from "react";
import './Hero.css'
import laptopImg from '../../assets/laptop.png'
import { Navigate, useNavigate } from "react-router-dom";

function Hero(){
  const navigate = useNavigate();
  const [isLoggedIn ,setisLoggedIn] = useState(false)
    return(
           <section className="hero">
      
      <div className="background-dots">
        
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
        <span className="dot dot3"></span>
        <span className="dot dot4"></span>
        <span className="dot dot5"></span>
        <span className="dot dot6"></span>
        <span className="dot dot7"></span>
        <span className="dot dot8"></span>

      </div>

      <div className="hero-content">
        <div className="hero-left">
          <img src={laptopImg} alt="Gaming Laptop" className="laptop-img" />
        </div>

        <div className="hero-right">
          <h1>Your Life In Games</h1>
          <p>
            Categorize all the games you've played, are playing and want to play
            — across all platforms. Share your unique journey in games and
            connect with more of what you love.
          </p>

          {!isLoggedIn && (
            <div className="buttons">
              <button
                className="email-btn"
                onClick={() => navigate("/signup")}
              >
                Sign up with Email
              </button>
            </div>
          )}


          <p className="footer1">
            It’s free – used by 90,521 gamers, creators & developers
          </p>
        </div>
      </div>
    </section>
    )
}



export default Hero