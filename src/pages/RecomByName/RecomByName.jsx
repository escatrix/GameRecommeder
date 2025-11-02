import React, { useState } from "react";
import axios from "axios";
import "./RecomByName.css";

export default function RecomByName() {
  const [name, setName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [searchedGame, setSearchedGame] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      // Fetch data from your API
      const response = await axios.get(`/recommend/name/?game_name=${name}&n=5`);

;


      // Destructure API data
      setSearchedGame(response.data.searched_game);
      setRecommendations(response.data.recommendations || []);
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
        <h3 className="searched">Results for: {searchedGame}</h3>
      )}

      <div className="recommendations">
        {recommendations.length > 0 ? (
          <div className="cards-container">
            {recommendations.map((game, index) => (
              <div key={index} className="game-card">
                <div className="game-rank">#{game.rank}</div>
                <h4>{game.game}</h4>
                <p>Similarity: {game.similarity.toFixed(2)}%</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="no-recom">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
}
