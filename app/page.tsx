"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // load external JS dynamically (your script.js)
    const script = document.createElement("script");
    script.src = "/script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // helper for mobile controls
  const triggerKey = (key: string) => {
    const event = new KeyboardEvent("keydown", { key });
    document.dispatchEvent(event);
  };

  return (
    <div>
      <div className="container">
        <div className="box" id="0" style={{ backgroundColor: "black" }}></div>
        <div id="food"></div>
      </div>

      {/* Mobile control buttons */}
      <div className="controls">
        <button className="btn up" onClick={() => triggerKey("ArrowUp")}>↑</button>
        <div className="mid-row">
          <button className="btn left" onClick={() => triggerKey("ArrowLeft")}>←</button>
          <button className="btn down" onClick={() => triggerKey("ArrowDown")}>↓</button>
          <button className="btn right" onClick={() => triggerKey("ArrowRight")}>→</button>
        </div>
      </div>

      <style jsx>{`
        .controls {
          position: fixed;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 100;
        }

        .mid-row {
          display: flex;
          gap: 12px;
        }

        .btn {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: 2px solid white;
          border-radius: 12px;
          font-size: 24px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn:active {
          transform: scale(0.9);
          background: #333;
        }

        @media (min-width: 800px) {
          .controls {
            display: none; /* hide buttons on desktop */
          }
        }
      `}</style>
    </div>
  );
}
