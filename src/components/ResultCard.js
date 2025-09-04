import React from "react";

function ResultCard({ score, total, onRestart }) {
  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>Your Score</h2>
      <p>
        {score} / {total}
      </p>
      <button
        style={{ padding: "10px 12px", borderRadius: 6, cursor: "pointer" }}
        onClick={onRestart}
      >
        Restart
      </button>
    </div>
  );
}

export default ResultCard;


