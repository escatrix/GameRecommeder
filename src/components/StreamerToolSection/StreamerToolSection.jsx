import React from "react";
import "./StreamerToolSection.css";
import img1 from "../../assets/white.jpg";
import img2 from "../../assets/black.jpg";

function StreamerToolSection() {
  return (
    <section className="streamer-section">
      <div className="streamer-content">
        <h1>
          Top <span>#10 Streamer Tool</span>
        </h1>
        <p>
          Do like 90,521 streamers and give an interesting introduction of who
          you are and unlock powerful tools to involve your audience in your
          content. This Game Recommender is one of the most popular streamer tools on Twitch.
        </p>

        
      </div>

      <div className="streamer-images">
        <img src={img1} alt="Streamer Tool White" className="img1" />
        <img src={img2} alt="Streamer Tool Dark" className="img2" />
      </div>

      
    </section>
  );
}

export default StreamerToolSection;
