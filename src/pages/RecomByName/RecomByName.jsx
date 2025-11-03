import React, { useState } from "react";
import axios from "axios";
import "./RecomByName.css";

import gameData from '../../game.json';



export default function RecomByName() {
  const [name, setName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [searchedGame, setSearchedGame] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");
    setRecommendations([]);
    setSearchedGame(null); 

    axios.get(`https://game-recommendation-system-vpw3.onrender.com/recommend/name/?game_name=${name}&n=6`)
      .then(response => {
        
        const apiRecs = response.data.recommendations || [];
        const searchedGameName = response.data.searched_game;

        if (searchedGameName) {
          const fullSearchedGame = gameData.find(game => game.name === searchedGameName);
          setSearchedGame(fullSearchedGame || { name: searchedGameName });
        }

        const fullRecommendations = apiRecs.map(rec => {
          const gameDetails = gameData.find(game => game.name === rec.game);

          if (gameDetails) {
            return { ...gameDetails, ...rec }; 
          }
          return rec; 
        });

        setRecommendations(fullRecommendations);
        setLoading(false); 
      })
      .catch(err => {
        console.error("API Error:", err);
        setError("Could not fetch recommendations. Please try again.");
        setLoading(false); 
      });
      

  };

  return (
    <div className="badawala">
    <div className="recom-container">
      <h2 className="recom-title">Recommend Games by Name</h2>

      <form onSubmit={handleSubmit} className="recom-form">
        <input
          type="text"
          value={name}
          placeholder="Enter Game Name"
          onChange={(e) => setName(e.target.value)}
          className="recom-input"
        />
        <button type="submit" className="recom-btn" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {searchedGame && (
        <div className="searched-game-section">
          <h3>Results for:</h3>
          <div className="game-card" >
            {searchedGame.background_image && (
              <img 
                src={searchedGame.background_image} 
                alt={searchedGame.name} 
                className="game-card-img" 
              />
            )}
            <div className="game-card-content">
              <h3>{searchedGame.name}</h3>
              {searchedGame.rating && <p><strong>Rating:</strong> {searchedGame.rating}</p>}
              {searchedGame.genres && <p><strong>Genres:</strong> {searchedGame.genres}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div className="recommendations">
        {recommendations.length > 0 && (
          <h3 className="recommendations-title">Games similar to {searchedGame.name}:</h3>
        )}
        <div className="cards-container">
          {recommendations.map((game) => (
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
                
                {game.rank && <p><strong>Rank:</strong> {game.rank}</p>}
                {game.rating && <p><strong>Rating:</strong> {game.rating}</p>}
                {game.genres && <p><strong>Genres:</strong> {game.genres}</p>}
                {game.released && <p><strong>Released:</strong> {game.released}</p>}
              </div>
            </div>
          ))}
        </div>
        
        {!loading && !searchedGame && (
          <p className="no-recom">Enter a game name to get recommendations.</p>
        )}
      </div>
    </div>
    </div>
  );
}