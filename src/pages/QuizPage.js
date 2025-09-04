import React, { useEffect, useMemo, useRef, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

function QuizPage({ questions, answers, onAnswer, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const timerRef = useRef(null);
  const total = questions.length;
  const current = questions[currentIndex];

  const selectedIndex = useMemo(
    () => answers[currentIndex]?.selectedIndex ?? null,
    [answers, currentIndex]
  );

  function handleSelect(idx) {
    onAnswer(currentIndex, idx);
  }

  function next() {
    if (selectedIndex === null) return;
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
    } else {
      onFinish();
    }
  }

  function previous() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  // Timer: 30 seconds per question, auto-lock answer and auto-next
  useEffect(() => {
    if (total === 0) return;
    setSecondsLeft(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, total]);

  useEffect(() => {
    if (total === 0) return;
    if (secondsLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      // If no selection, lock as unanswered (-1) so summary shows "Not answered"
      if (selectedIndex === null) {
        onAnswer(currentIndex, -1);
      }
      // inline next() to avoid extra deps
      if (currentIndex + 1 < total) {
        setCurrentIndex((i) => i + 1);
      } else {
        onFinish();
      }
    }
  }, [secondsLeft, selectedIndex, currentIndex, total, onAnswer, onFinish]);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><strong>Question {currentIndex + 1}</strong> of {total}</div>
        <div style={{ minWidth: 200 }}>
          <ProgressBar showLabel current={currentIndex + (selectedIndex !== null ? 1 : 0)} total={total} />
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 14, color: "var(--muted)" }} aria-live="polite">Time left: {secondsLeft}s</div>

      <div className="card">
        <QuestionCard
          question={current.question}
          options={current.options}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          disabled={secondsLeft <= 0}
        />
      </div>

      <div className="buttons">
        <button onClick={previous} disabled={currentIndex === 0}>Previous</button>
        <button className="btn-primary" onClick={next} disabled={selectedIndex === null}>
          {currentIndex + 1 === total ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;


