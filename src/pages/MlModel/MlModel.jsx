import React from "react";
import './MlModel.css'

const quesans=[
    {
        id:1,
        ques:"What gaming platforms do you own?",
        ans :{ op1:"PC",
                op2:"PlayStation",
                op3:"Xbox",
                op4:"Android",
                op5:"IOS"}
    }
]

function MlModel(){
    return(
        <div className="mlmodel">
            <div className="question-box">
                <div className="start-text">
                    <div className="top">
                        <h1>Game Recommender</h1>
                    <div className="progress-dots">
                        <span className="progress-dot"></span>
                        <span className="progress-dot"></span>
                        <span className="progress-dot"></span>
                        <span className="progress-dot"></span>
                        <span className="progress-dot"></span>
                    </div>
                    </div>
                    <p className="question">What gaming platforms do you own? </p>
                    </div>
                    <div className="bottom">
                        <button className="btn-op">PC</button>
                        <button className="btn-op">PlayStation</button>
                        <button className="btn-op">Xbox</button>
                        <button className="btn-op">Android</button>
                        <button className="btn-op">Ios</button>
                    </div>

                
            </div>
        </div>
    )
}
export default MlModel