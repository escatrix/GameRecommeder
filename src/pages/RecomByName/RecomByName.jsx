import React, { useState } from "react";
import axios from "axios";
import "./RecomByName.css";

import gameData from '../../game.json';


const gameLookup = new Map(gameData.map(game => [game.name, game]));

export default function RecomByName() {
  const [name, setName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  

  const [searchedGame, setSearchedGame] = useState(null); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");
    setRecommendations([]);
    setSearchedGame(null); 

    try {
      // API call using the proxy (relative path)
      const response = await axios.get(`/recommend/name/?game_name=${name}&n=5`);

   
      const apiRecs = response.data.recommendations || [];
      const searchedGameName = response.data.searched_game;

      // 1. Find and set the full data for the searched game
      if (searchedGameName) {
        const fullSearchedGame = gameLookup.get(searchedGameName);
        setSearchedGame(fullSearchedGame || { name: searchedGameName });
      }

      // 2. Find and set the full data for the recommendations
      const fullRecommendations = apiRecs.map(rec => {
        const gameDetails = gameLookup.get(rec.game);

        if (gameDetails) {
          // Merge API data (rank, similarity) with JSON data
          return { ...gameDetails, ...rec }; 
        }
        // Fallback to just API data if not found in JSON
        return rec; 
      });

      setRecommendations(fullRecommendations);

    } catch (err) {
      console.error("API Error:", err);
      setError("Could not fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <div className="game-card" style={{maxWidth: '350px', margin: '16px auto'}}>
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
  );
}