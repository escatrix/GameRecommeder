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


const gameLookup = new Map(gameData.map(game => [game.name, game]));


function RecomByFeatures() {
   
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({
        platforms: [],
        genres: [],
        tags: []
    });
    const [recommendations, setRecommendations] = useState([]);
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

  
    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setRecommendations([]);

      
        const API_URL = '/recommend/features/';
        
        const requestBody = {
            platforms: selections.platforms,
            genres: selections.genres,
            tags: selections.tags,
            n: 6 
        };

        try {
            const response = await axios.post(API_URL, requestBody, {
                headers: {
                    'accept': 'application/json'
                }
            });
            
            // --- NEW: Process the recommendations ---
            const apiRecs = response.data.recommendations || [];
            
            // Map over the API results and find the full data in our JSON
            const fullRecommendations = apiRecs.map(rec => {
                // Find the game in lookup map
                const gameDetails = gameLookup.get(rec.game);

                if (gameDetails) {
                
                    return { ...gameDetails, ...rec };
                }
                
                
                return rec; 
            });

            setRecommendations(fullRecommendations);

        } catch (err) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        if (currentStep < QUESTIONS_DATA.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setSelections({ platforms: [], genres: [], tags: [] });
        setRecommendations([]);
        setError(null);
        setIsLoading(false);
    };

  
    if (isLoading) {
        return (
            <div className="mlmodel">
                <div className="question-box">
                    <h2>Fetching recommendations...</h2>
                    <div className="loader"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mlmodel">
                <div className="question-box">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button className="nav-btn" onClick={handleReset}>Try Again</button>
                </div>
            </div>
        );
    }


    if (recommendations.length > 0) {
        return (
            <div className="mlmodel">
                <div className="results-box">
                    <h2>Here are your recommendations!</h2>
                    <div className="recommendation-list">
                        {recommendations.map(game => (
                            <div key={game.rank} className="game-card">
                                {game.background_image && (
                                    <img 
                                        src={game.background_image} 
                                        alt={game.name || game.game} 
                                        className="game-card-img" 
                                    />
                                )}
                                <div className="game-card-content">
                                    <h3>{game.name || game.game}</h3>
                                    
                                   
                                    <p className="game-card-similarity">
                                        <strong>Similarity:</strong> {game.similarity.toFixed(2)}%
                                    </p>

                                    
                                    {game.rating && <p><strong>Rating:</strong> {game.rating}</p>}
                                    {game.genres && <p><strong>Genres:</strong> {game.genres}</p>}
                                    {game.released && <p><strong>Released:</strong> {game.released}</p>}
                                    {game.platforms && <p className="game-card-platforms"><strong>Platforms:</strong> {game.platforms}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="nav-btn" onClick={handleReset}>Start Over</button>
                </div>
            </div>
        );
    }

    const currentQuestion = QUESTIONS_DATA[currentStep];

    return (
        <div className="mlmodel">
            <div className="question-box">
                <div className="start-text">
                    <div className="top">
                        <h1>Game Recommender</h1>
                        <div className="progress-dots">
                            {QUESTIONS_DATA.map((_, index) => (
                                <span 
                                    key={index} 
                                    className={`progress-dot ${index === currentStep ? 'active' : ''}`}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <p className="question">{currentQuestion.question}</p>
                </div>

                <div className="bottom">
                    {currentQuestion.options.map(option => (
                        <button 
                            key={option}
                            className={`btn-op ${selections[currentQuestion.id].includes(option) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(currentQuestion.id, option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="nav-buttons">
                    <button 
                        className="nav-btn" 
                        onClick={handleBack}
                        disabled={currentStep === 0}
                    >
                        Back
                    </button>
                    <button 
                        className="nav-btn" 
                        onClick={handleNext}
                    >
                        {currentStep === QUESTIONS_DATA.length - 1 ? 'Get Recommendations' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecomByFeatures;