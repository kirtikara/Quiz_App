import React, { useEffect, useRef } from "react";

/**
 * QuestionCard Component
 * 
 * Displays a single quiz question with multiple choice options.
 * Handles keyboard navigation and accessibility features.
 * 
 * @param {string} question - The question text to display
 * @param {string[]} options - Array of answer options
 * @param {number|null} selectedIndex - Index of currently selected option (null if none)
 * @param {function} onSelect - Callback function when an option is selected
 * @param {boolean} disabled - Whether the options are disabled (e.g., when timer expires)
 */
function QuestionCard({ question, options, selectedIndex, onSelect, disabled }) {
  // Ref to the first option button for keyboard focus management
  const firstBtnRef = useRef(null);

  /**
   * Effect to focus the first option when question changes
   * This improves keyboard navigation and accessibility
   */
  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, [question]);

  return (
    <div style={{ 
      padding: 16, 
      border: "1px solid #ddd", 
      borderRadius: 8, 
      animation: "fadeIn 250ms ease" 
    }}>
      {/* Question text */}
      <h2 style={{ marginTop: 0 }}>{question}</h2>
      
      {/* Answer options container with accessibility attributes */}
      <div
        className="options"
        role="listbox"
        aria-label="Answer options"
        style={{ display: "grid", gap: 8 }}
      >
        {options.map((opt, idx) => (
          <button
            key={idx}
            ref={idx === 0 ? firstBtnRef : null} // Focus management for first option
            onClick={() => onSelect(idx)}
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              // Visual feedback for selected option
              background: selectedIndex === idx ? "#e6f4ff" : "#fff",
              cursor: "pointer",
            }}
            aria-pressed={selectedIndex === idx} // Accessibility: indicates selection state
            aria-disabled={!!disabled} // Accessibility: indicates disabled state
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


