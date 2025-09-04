import React from "react";
import ResultCard from "../components/ResultCard";

/**
 * ResultPage Component
 * 
 * Displays the quiz results including:
 * - Final score and restart option
 * - Detailed question-by-question summary
 * - High scores leaderboard
 * 
 * @param {Array} questions - Array of question objects
 * @param {Array} answers - Array of user answers with correctness info
 * @param {number} score - Number of correct answers
 * @param {function} onRestart - Callback to restart the quiz
 * @param {Array} highScores - Array of high score entries (default: [])
 */
function ResultPage({ questions, answers, score, onRestart, highScores = [] }) {
  const total = questions.length;
  
  return (
    <div className="results-container">
      {/* Score card with restart button */}
      <div className="card" style={{ animation: "fadeIn 250ms ease" }}>
        <ResultCard score={score} total={total} onRestart={onRestart} />
      </div>

      {/* Detailed question summary */}
      <div className="result-card" style={{ animation: "fadeIn 250ms ease" }}>
        <h3>Summary</h3>
        <ol>
          {questions.map((q, idx) => {
            const ans = answers[idx];
            // Check if the answer was correct
            const isCorrect = ans && ans.selectedIndex === ans.correctIndex;
            
            return (
              <li key={q.id} style={{ marginBottom: 10 }}>
                {/* Question text */}
                <div style={{ fontWeight: 600 }}>{q.question}</div>
                
                {/* Correctness indicator */}
                <div>
                  <span className={isCorrect ? "correct" : "wrong"}>
                    {isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>
                
                {/* User's answer (or "Not answered" if no selection) */}
                <div>
                  <strong>Your answer:</strong> {
                    typeof ans?.selectedIndex === "number" 
                      ? q.options[ans.selectedIndex] 
                      : "Not answered"
                  }
                </div>
                
                {/* Correct answer */}
                <div>
                  <strong>Correct answer:</strong> {q.options[q.answerIndex]}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* High scores leaderboard */}
      <div className="result-card" style={{ animation: "fadeIn 250ms ease" }}>
        <h3>High Scores</h3>
        {highScores.length === 0 ? (
          <div>No high scores yet.</div>
        ) : (
          <ol>
            {highScores.map((h, i) => (
              <li key={i}>
                {new Date(h.date).toLocaleString()} - {h.difficulty} - {h.score}/{h.total}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default ResultPage;


