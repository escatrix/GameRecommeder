import React, { useState } from "react";
import axios from "axios";
import './RecomByFeatures.css';

import gameData from '../../game.json';


const QUESTIONS_DATA = [
    {
        id: "platforms",
        question: "What platform would you prefer?",
        options: [
            "PC", "macOS", "PlayStation 4", "Nintendo Switch", "iOS", "Android"
        ],
    },
    {
        id: "genres",
        question: "What Genre Would you like?",
        options: [
            "Indie", "Action", "Adventure", "Casual", "RPG",
            "Strategy", "Simulation", "Shooter", "Arcade", "Puzzle"
        ],
    },
    {
        id: "tags",
        question: "Select Additional tags:",
        options: [
            "Singleplayer", "Multiplayer", "RPG", "2D", "Atmospheric",
            "Co-op", "Horror", "Story Rich", "Free to Play",
            "cooperative", "First-Person", "Fantasy"
        ],
    }
];


function RecomByFeatures() {

    const [selections, setSelections] = useState({
        platforms: [],
        genres: [],
        tags: []
    });
    const [gameResults, setGameResults] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleOptionClick = (questionId, option) => {
        setSelections(prevSelections => {

            const currentOptions = prevSelections[questionId];
            
            let newOptions;
            if (currentOptions.includes(option)) {

                newOptions = currentOptions.filter(item => item !== option);
            } else {

                newOptions = [...currentOptions, option];
            }

            return {
                ...prevSelections, 
                [questionId]: newOptions 
            };
        });
    };


    const handleSubmit = () => {
        setIsLoading(true);
        setError(null);
        setGameResults([]);

        const API_URL = '/recommend/features/';
        

        const requestBody = {
            platforms: selections.platforms,
            genres: selections.genres,
            tags: selections.tags,
            n: 6 
        };

        axios.post(API_URL, requestBody)
        .then(response => {
            const apiRecs = response.data.recommendations || [];

            
            const fullGameDetails = apiRecs.map(apiGame => {
                const gameDetails = gameData.find(game => game.name === apiGame.game);

                if (gameDetails) {
                    return {
                        ...gameDetails, 
                        similarity: apiGame.similarity 
                    };
                } else {

                    return {
                        name: apiGame.game,
                        similarity: apiGame.similarity,
                        background_image: null, 
                    };
                }
            });

            
            setGameResults(fullGameDetails); 
            setIsLoading(false);
        })
        .catch(err => {

            setError(err.message || "Something went wrong!");
            setIsLoading(false);
        });
    };


    const handleReset = () => {
        setSelections({ platforms: [], genres: [], tags: [] });
        setGameResults([]);
        setError(null);
        setIsLoading(false);
    };
    if (gameResults.length > 0) {
        return (
            <div className="badawala">
            <div className="app-container">
                <h2>Here are your recommendations!</h2>
                <div className="results-area">
                    
                    {gameResults.map((game, index) => (
                        <div key={index} className="game-box">
                            {game.background_image && (
                                <img src={game.background_image} alt={game.name} className="game-image" />
                            )}
                            <div className="game-info">
                                <h3>{game.name}</h3>
                                <p>Match: {(game.similarity).toFixed(0)}%</p>
                                {game.rating && <p>Rating: {game.rating}</p>}
                                {game.genres && <p>Genres: {game.genres}</p>}
                            </div>
                        </div>
                    ))}
                </div>
                
                <button className="submit-button" onClick={handleReset}>
                    Start Over
                </button>
            </div>
            </div>
        );
    }
        return (
            <div className="badawala">
        <div className="app-container">
            <h1>Game Recommender</h1>
            <p>Select your preferences below.</p>
            {QUESTIONS_DATA.map(question => (
                <div key={question.id} className="question-area">
                    <h2>{question.question}</h2>
                    <div className="button-area">
                        {question.options.map(option => (
                            <button 
                                key={option}
                                className={`option-button ${selections[question.id].includes(option) ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(question.id, option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <hr />
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get Recommendations'}
            </button>
        </div>
        </div>
    );
}

export default RecomByFeatures;