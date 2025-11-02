import React from "react";
import "./TrendingGamePage.css";

import game1 from "../../assets/silksong.jpg";
import game2 from "../../assets/expedition.png";
import game3 from "../../assets/ghostofyotei.jpg";
import game4 from "../../assets/eldenring.jpg";

function TrendingGamePage() {
  const games = [
    {
      id: 1,
      img: game1,
      title: "Hollow Knight: Silksong",
      date: "4 Sep, 2025",
      platforms: "Series X|S, PS4, Linux, Switch 2, PC, PS5, Mac, XONE, Switch",
    },
    {
      id: 2,
      img: game2,
      title: "Clair Obscur: Expedition 33",
      date: "24 Apr, 2025",
      platforms: "Series X|S, PC, PS5",
    },
    {
      id: 3,
      img: game3,
      title: "Ghost of Yotei",
      date: "2 Oct, 2025",
      platforms: "PS5",
    },
    {
      id: 4,
      img: game4,
      title: "Elden Ring",
      date: "25 Feb, 2022",
      platforms: "Series X|S, PS4, Switch 2, PC, PS5, XONE",
    },
  ];

  return (
    <section className="trending-section">
      <div className="trending-header">
        <div>
          <h1>Trending games on Rankone</h1>
          <p>
            Discover the weekly and monthly top trending games on PC, Nintendo
            Switch, PS5 and Xbox S|X.
          </p>
        </div>
        <button>See all trending games</button>
      </div> 

      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="trengame-card">
            <img src={game.img} alt={game.title} />
            <h3>{game.title}</h3>
            <p className="release-date">{game.date}</p>
            <p className="platforms">{game.platforms}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingGamePage;
