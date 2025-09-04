import React from "react";

/**
 * ResultCard Component
 * 
 * Displays the quiz score and provides a restart button.
 * This is a simple card component used in the results page.
 * 
 * @param {number} score - Number of correct answers
 * @param {number} total - Total number of questions
 * @param {function} onRestart - Callback function when restart button is clicked
 */
function ResultCard({ score, total, onRestart }) {
  return (
    <div style={{ 
      padding: 16, 
      border: "1px solid #ddd", 
      borderRadius: 8 
    }}>
      {/* Score display header */}
      <h2 style={{ marginTop: 0 }}>Your Score</h2>
      
      {/* Score fraction display */}
      <p>
        {score} / {total}
      </p>
      
      {/* Restart quiz button */}
      <button
        style={{ 
          padding: "10px 12px", 
          borderRadius: 6, 
          cursor: "pointer" 
        }}
        onClick={onRestart}
      >
        Restart
      </button>
    </div>
  );
}

export default ResultCard;


