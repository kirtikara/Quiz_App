import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import StartPage from "./pages/StartPage";

/**
 * Main App Component
 * 
 * This is the root component that manages the overall application state and routing.
 * It handles:
 * - Question loading and filtering by difficulty
 * - Answer tracking and scoring
 * - High score persistence in localStorage
 * - Navigation between different pages
 */
function App() {
  // State for storing filtered questions based on selected difficulty
  const [questions, setQuestions] = useState([]);
  
  // State for tracking user answers - each answer contains:
  // {questionId, selectedIndex, correctIndex}
  const [answers, setAnswers] = useState([]);
  
  // Current quiz score (number of correct answers)
  const [score, setScore] = useState(0);
  
  // Selected difficulty level (easy, medium, hard)
  const [difficulty, setDifficulty] = useState("easy");
  
  // High scores persisted in localStorage, initialized with error handling
  const [highScores, setHighScores] = useState(() => {
    try {
      const raw = localStorage.getItem("highScores");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  
  // React Router navigation hook
  const navigate = useNavigate();

  /**
   * Effect to load and filter questions when difficulty changes
   * 
   * This effect:
   * 1. Fetches questions from the public/questions.json file
   * 2. Filters questions by the selected difficulty level
   * 3. Shuffles the filtered questions using Fisher-Yates algorithm
   * 4. Takes the first 5 questions for the quiz
   * 5. Initializes the answers array with null values
   */
  useEffect(() => {
    fetch("/questions.json")
      .then((r) => r.json())
      .then((data) => {
        // Filter questions by selected difficulty
        const pool = data.filter((q) => q.difficulty === difficulty);
        
        // Shuffle the pool using Fisher-Yates algorithm for randomization
        for (let i = pool.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        
        // Take first 5 questions for this quiz session
        const filtered = pool.slice(0, 5);
        setQuestions(filtered);
        
        // Initialize answers array with null values (no answers yet)
        setAnswers(Array.from({ length: filtered.length }, () => null));
      })
      .catch(() => {
        // Handle fetch errors gracefully
        setQuestions([]);
        setAnswers([]);
      });
  }, [difficulty]);

  /**
   * Records a user's answer for a specific question
   * @param {number} questionIndex - Index of the question in the questions array
   * @param {number} selectedIndex - Index of the selected answer option
   */
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

  /**
   * Finishes the quiz and calculates the final score
   * 
   * This function:
   * 1. Calculates the total score by counting correct answers
   * 2. Creates a high score entry with timestamp and difficulty
   * 3. Updates the high scores list (keeps top 5)
   * 4. Persists high scores to localStorage
   * 5. Navigates to the results page
   */
  function finishQuiz() {
    // Calculate total score by counting correct answers
    const totalScore = answers.reduce((acc, ans) => {
      if (!ans) return acc;
      return acc + (ans.selectedIndex === ans.correctIndex ? 1 : 0);
    }, 0);
    setScore(totalScore);
    
    // Create high score entry with metadata
    const entry = {
      date: new Date().toISOString(),
      difficulty,
      score: totalScore,
      total: questions.length,
    };
    
    // Update high scores (keep top 5, add new entry at the beginning)
    const next = [entry, ...highScores].slice(0, 5);
    setHighScores(next);
    
    // Persist to localStorage with error handling
    try { 
      localStorage.setItem("highScores", JSON.stringify(next)); 
    } catch {
      // Silently fail if localStorage is not available
    }
    
    navigate("/results");
  }

  /**
   * Restarts the quiz by resetting answers and score
   * Navigates back to the quiz page
   */
  function restartQuiz() {
    setAnswers(Array.from({ length: questions.length }, () => null));
    setScore(0);
    navigate("/quiz");
  }

  /**
   * Starts a new quiz with the specified difficulty level
   * @param {string} level - Difficulty level (easy, medium, hard)
   */
  function startWithDifficulty(level) {
    setDifficulty(level);
    setScore(0);
    navigate("/quiz");
  }

  return (
    <div className="app">
      {/* Application header with branding */}
      <div className="app-header">
        <h1 className="brand">Quiz App</h1>
      </div>
      
      {/* Main content panel with routing */}
      <div className="panel">
        <Routes>
          {/* Start page - difficulty selection */}
          <Route path="/" element={<StartPage onStart={startWithDifficulty} />} />
          
          {/* Quiz page - main quiz interface */}
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
          
          {/* Results page - score display and high scores */}
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
          
          {/* 404 fallback route */}
          <Route path="*" element={<div style={{ textAlign: "center" }}>Go to <a href="/">Start</a></div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
