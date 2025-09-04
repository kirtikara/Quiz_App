import React, { useEffect, useMemo, useRef, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

/**
 * QuizPage Component
 * 
 * The main quiz interface that handles:
 * - Question navigation (previous/next)
 * - Timer countdown (30 seconds per question)
 * - Answer selection and validation
 * - Auto-advance when timer expires
 * - Progress tracking
 * 
 * @param {Array} questions - Array of question objects
 * @param {Array} answers - Array of user answers (null for unanswered)
 * @param {function} onAnswer - Callback when user selects an answer
 * @param {function} onFinish - Callback when quiz is completed
 */
function QuizPage({ questions, answers, onAnswer, onFinish }) {
  // Current question index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Timer countdown in seconds (30 seconds per question)
  const [secondsLeft, setSecondsLeft] = useState(30);
  
  // Ref to store the timer interval ID for cleanup
  const timerRef = useRef(null);
  
  // Total number of questions
  const total = questions.length;
  
  // Current question object
  const current = questions[currentIndex];

  // Get the selected answer index for the current question
  // Returns null if no answer has been selected
  const selectedIndex = useMemo(
    () => answers[currentIndex]?.selectedIndex ?? null,
    [answers, currentIndex]
  );

  /**
   * Handles answer selection for the current question
   * @param {number} idx - Index of the selected answer option
   */
  function handleSelect(idx) {
    onAnswer(currentIndex, idx);
  }

  /**
   * Advances to the next question or finishes the quiz
   * Only allows advancement if an answer has been selected
   */
  function next() {
    if (selectedIndex === null) return; // Prevent advancement without selection
    
    if (currentIndex + 1 < total) {
      // Move to next question
      setCurrentIndex((i) => i + 1);
    } else {
      // Quiz completed, finish it
      onFinish();
    }
  }

  /**
   * Goes back to the previous question
   * Only allows going back if not on the first question
   */
  function previous() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  /**
   * Timer Effect - Resets and starts timer for each question
   * 
   * This effect runs when the current question changes:
   * 1. Resets timer to 30 seconds
   * 2. Clears any existing timer
   * 3. Starts a new countdown timer
   * 4. Cleans up timer on unmount or question change
   */
  useEffect(() => {
    if (total === 0) return; // No questions available
    
    setSecondsLeft(30); // Reset timer for new question
    
    // Clear any existing timer
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Start new countdown timer
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, total]);

  /**
   * Timer Expiration Effect - Handles what happens when time runs out
   * 
   * This effect runs when secondsLeft reaches 0:
   * 1. Stops the timer
   * 2. If no answer was selected, records it as unanswered (-1)
   * 3. Auto-advances to next question or finishes quiz
   */
  useEffect(() => {
    if (total === 0) return; // No questions available
    
    if (secondsLeft <= 0) {
      // Stop the timer
      if (timerRef.current) clearInterval(timerRef.current);
      
      // If no selection was made, record as unanswered
      if (selectedIndex === null) {
        onAnswer(currentIndex, -1); // -1 indicates no answer
      }
      
      // Auto-advance to next question or finish quiz
      if (currentIndex + 1 < total) {
        setCurrentIndex((i) => i + 1);
      } else {
        onFinish();
      }
    }
  }, [secondsLeft, selectedIndex, currentIndex, total, onAnswer, onFinish]);

  // Early return if no questions are available
  if (total === 0) {
    return (
      <div className="quiz-container">
        <div className="card" style={{ animation: "fadeIn 250ms ease" }}>
          <h3 style={{ marginTop: 0 }}>No questions available</h3>
          <p style={{ color: "var(--muted)" }}>
            We couldn't find questions for this selection. Please go back and try another difficulty.
          </p>
          <div className="buttons">
            <a className="btn-primary" href="/">Back to Start</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Quiz header with question counter and progress bar */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <div>
          <strong>Question {currentIndex + 1}</strong> of {total}
        </div>
        <div style={{ minWidth: 200 }}>
          <ProgressBar 
            showLabel 
            current={currentIndex + (selectedIndex !== null ? 1 : 0)} 
            total={total} 
          />
        </div>
      </div>

      {/* Timer display with live region for screen readers */}
      <div 
        style={{ 
          marginTop: 8, 
          fontSize: 14, 
          color: "var(--muted)" 
        }} 
        aria-live="polite"
      >
        Time left: {secondsLeft}s
      </div>

      {/* Question card */}
      <div className="card">
        <QuestionCard
          question={current.question}
          options={current.options}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          disabled={secondsLeft <= 0} // Disable when timer expires
        />
      </div>

      {/* Navigation buttons */}
      <div className="buttons">
        <button 
          onClick={previous} 
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button 
          className="btn-primary" 
          onClick={next} 
          disabled={selectedIndex === null}
        >
          {currentIndex + 1 === total ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;


