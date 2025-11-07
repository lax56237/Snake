"use client";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/script.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/style.css" />
      <div className="game-wrapper">
        <div className="scoreboard">
          <h2>🐍 Snake Game</h2>
          <p id="scoreDisplay">Score: 0</p>
        </div>
        <div className="container">
          <div className="box" id="0" style={{ backgroundColor: "black" }}></div>
          <div id="food"></div>
        </div>
      </div>
    </>
  );
}
