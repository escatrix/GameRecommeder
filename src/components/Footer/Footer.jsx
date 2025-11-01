import React from "react";
import './Footer.css';


function Footer(){
    return(
        <div className="footer">
            <div className="nickname">
                <div className="claim">
                    <h1>Claim your Nickname!</h1>
                    <p>Join the world’s most authentic gaming community and enrich your life in games</p>
                    <button className="btn">Sign Up With Email</button>
                </div>
            </div>
            <div className="about">
                <div className="card">
                    <div className="explore">
                        <h4>Explore</h4>
                    </div>
                    <div className="content">
                        <p>About</p>
                        <p>RankOne Insights</p>
                        <p>Terms</p>
                    </div>
                </div>
                <div className="card">
                    <div className="explore">
                        <h4>Support</h4>
                    </div>
                    <div className="content">
                        <p>Discord#support</p>
                        <p>FAQ</p>
                    </div>
                </div>
                <div className="card">
                    <div className="explore">
                        <h4>Legal</h4>
                    </div>
                    <div className="content">
                        <p>Terms</p>
                        <p>Cookies Settings</p>
                    </div>
                </div>
            </div>
            <div className="contact">
                <h4>Follow Us</h4>
                <div className="line"></div>
                <div className="symbols">
                    
                </div>
            </div>
        </div>
    )
}

export default Footer