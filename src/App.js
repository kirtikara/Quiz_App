import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import StartPage from "./pages/StartPage";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]); // {questionId, selectedIndex, correctIndex}
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [highScores, setHighScores] = useState(() => {
    try {
      const raw = localStorage.getItem("highScores");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/questions.json")
      .then((r) => r.json())
      .then((data) => {
        const pool = data.filter((q) => q.difficulty === difficulty);
        // Shuffle pool then take first 5 for this run
        for (let i = pool.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const filtered = pool.slice(0, 5);
        setQuestions(filtered);
        setAnswers(Array.from({ length: filtered.length }, () => null));
      })
      .catch(() => {
        setQuestions([]);
        setAnswers([]);
      });
  }, [difficulty]);

  function recordAnswer(questionIndex, selectedIndex) {
    setAnswers((prev) => {
      const next = [...prev];
      const q = questions[questionIndex];
      next[questionIndex] = {
        questionId: q.id,
        selectedIndex,
        correctIndex: q.answerIndex,
      };
      return next;
    });
  }

  function finishQuiz() {
    const totalScore = answers.reduce((acc, ans) => {
      if (!ans) return acc;
      return acc + (ans.selectedIndex === ans.correctIndex ? 1 : 0);
    }, 0);
    setScore(totalScore);
    // persist high score
    const entry = {
      date: new Date().toISOString(),
      difficulty,
      score: totalScore,
      total: questions.length,
    };
    const next = [entry, ...highScores].slice(0, 5);
    setHighScores(next);
    try { localStorage.setItem("highScores", JSON.stringify(next)); } catch {}
    navigate("/results");
  }

  function restartQuiz() {
    setAnswers(Array.from({ length: questions.length }, () => null));
    setScore(0);
    navigate("/quiz");
  }

  function startWithDifficulty(level) {
    setDifficulty(level);
    setScore(0);
    navigate("/quiz");
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="brand">Quiz App</h1>
      </div>
      <div className="panel">
      <Routes>
        <Route path="/" element={<StartPage onStart={startWithDifficulty} />} />
        <Route
          path="/quiz"
          element={
            <QuizPage
              questions={questions}
              answers={answers}
              onAnswer={recordAnswer}
              onFinish={finishQuiz}
            />
          }
        />
        <Route
          path="/results"
          element={
            <ResultPage
              questions={questions}
              answers={answers}
              score={score}
              highScores={highScores}
              onRestart={restartQuiz}
            />
          }
        />
        <Route path="*" element={<div style={{ textAlign: "center" }}>Go to <a href="/">Start</a></div>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
