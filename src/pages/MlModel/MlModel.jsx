import React from "react";
import './MlModel.css'
import { Link } from "react-router-dom";

function MlModel(){
    return(
        <div className="mlmodel">
            <div className="heading">
                <h1>Game Recommender</h1>
            </div>
            <div className="twomodel">
                <div className="box">
                    <div className="searchbyname">
                        <h4>Search Game By Name</h4>
                    </div>
                    <Link to="./RecomByName">
                    <button className="trynowbtn">
                        Try Now
                    </button>
                    </Link>

                </div>
                 <div className="box">
                    <div className="searchbytag">
                        <h4>Search Game By Features</h4>
                    </div>
                     <div>
                   <Link to="./RecomByFeatures">
                   <button className="trynowbtn">
                    Try Now
                   </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default MlModel