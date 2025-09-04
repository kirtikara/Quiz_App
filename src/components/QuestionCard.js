import React, { useEffect, useRef } from "react";

function QuestionCard({ question, options, selectedIndex, onSelect, disabled }) {
  const firstBtnRef = useRef(null);

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, [question]);

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, animation: "fadeIn 250ms ease" }}>
      <h2 style={{ marginTop: 0 }}>{question}</h2>
      <div
        className="options"
        role="listbox"
        aria-label="Answer options"
        style={{ display: "grid", gap: 8 }}
      >
        {options.map((opt, idx) => (
          <button
            key={idx}
            ref={idx === 0 ? firstBtnRef : null}
            onClick={() => onSelect(idx)}
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: selectedIndex === idx ? "#e6f4ff" : "#fff",
              cursor: "pointer",
            }}
            aria-pressed={selectedIndex === idx}
            aria-disabled={!!disabled}
            disabled={disabled}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;


