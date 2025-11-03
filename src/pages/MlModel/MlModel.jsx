import React from "react";
import './MlModel.css';
import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { HiOutlineSparkles } from 'react-icons/hi';

function MlModel() {
  return (

    <div className="mlmodel">
      
 
      <div className="ai-tag">AI Powered Recommendations</div>

      <div className="head-recom">
        <h1>Game Recommender</h1>
       
        <p>Discover your next favorite game with intelligent search and personalized recommendations</p>
      </div>


      <div className="twomodel">
        

        <div className="box">
          <FaSearch className="box-icon" />
          <div className="searchbyname">
            <h4>Search Game By Name</h4>
          </div>

          <p className="box-description">
            Find games instantly by searching their titles and get similar recommendations
          </p>
          <Link to="./RecomByName">
            <button className="trynowbtn">
              Try Now
            </button>
          </Link>
        </div>
        
        
        <div className="box">
         <HiOutlineSparkles className="box-icon"/>
          <div className="searchbytag"> 
            <h4>Search Game By Features</h4>
          </div>
         
          <p className="box-description">
            Discover games based on genres, themes, gameplay mechanics, and more
          </p>
          <Link to="./RecomByFeatures">
            <button className="trynowbtn">
              Try Now
            </button>
          </Link>
        </div>

      </div>

      <div className="footer-text-ml">
        Powered by advanced machine learning algorithms
      </div>
    </div>
  );
}

export default MlModel;