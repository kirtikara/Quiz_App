import React from "react";
import ResultCard from "../components/ResultCard";

function ResultPage({ questions, answers, score, onRestart, highScores = [] }) {
  const total = questions.length;
  return (
    <div className="results-container">
      <div className="card" style={{ animation: "fadeIn 250ms ease" }}>
        <ResultCard score={score} total={total} onRestart={onRestart} />
      </div>

      <div className="result-card" style={{ animation: "fadeIn 250ms ease" }}>
        <h3>Summary</h3>
        <ol>
          {questions.map((q, idx) => {
            const ans = answers[idx];
            const isCorrect = ans && ans.selectedIndex === ans.correctIndex;
            return (
              <li key={q.id} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 600 }}>{q.question}</div>
                <div>
                  <span className={isCorrect ? "correct" : "wrong"}>
                    {isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>
                <div>
                  <strong>Your answer:</strong> {typeof ans?.selectedIndex === "number" ? q.options[ans.selectedIndex] : "Not answered"}
                </div>
                <div>
                  <strong>Correct answer:</strong> {q.options[q.answerIndex]}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

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


