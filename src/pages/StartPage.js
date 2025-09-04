import React from "react";

/**
 * StartPage Component
 * 
 * The landing page where users select the quiz difficulty level.
 * Provides three difficulty options: Easy, Medium, and Hard.
 * 
 * @param {function} onStart - Callback function called when a difficulty is selected
 *                            Receives the difficulty level as a parameter
 */
function StartPage({ onStart }) {
  return (
    <div className="start-container" role="region" aria-label="Start quiz">
      <div className="card" style={{ animation: "fadeIn 250ms ease" }}>
        {/* Page header */}
        <h2 style={{ marginTop: 0 }}>Choose Difficulty</h2>
        <p style={{ color: "var(--muted)", marginTop: 0 }}>
          Pick one to begin your quiz.
        </p>
        
        {/* Difficulty selection buttons */}
        <div style={{ 
          display: "grid", 
          gap: 12, 
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" 
        }}>
          <button 
            className="btn-primary" 
            onClick={() => onStart("easy")} 
            aria-label="Start easy quiz"
          >
            Easy
          </button>
          <button 
            className="btn-primary" 
            onClick={() => onStart("medium")} 
            aria-label="Start medium quiz"
          >
            Medium
          </button>
          <button 
            className="btn-primary" 
            onClick={() => onStart("hard")} 
            aria-label="Start hard quiz"
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
