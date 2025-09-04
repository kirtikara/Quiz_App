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
    <div className="quiz-card" style={{ 
      padding: 20, 
      border: "1px solid #ddd", 
      borderRadius: 12, 
      animation: "fadeIn 250ms ease",
      position: "relative"
    }}>
      {/* Question text with enhanced styling */}
      <h2 style={{ 
        marginTop: 0, 
        marginBottom: 20,
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--text)",
        lineHeight: 1.4
      }}>
        {question}
      </h2>
      
      {/* Answer options container with accessibility attributes */}
      <div
        className="options"
        role="listbox"
        aria-label="Answer options"
        style={{ display: "grid", gap: 12 }}
      >
        {options.map((opt, idx) => (
          <button
            key={idx}
            ref={idx === 0 ? firstBtnRef : null} // Focus management for first option
            onClick={() => onSelect(idx)}
            className={`option-button ${selectedIndex === idx ? 'selected' : ''}`}
            style={{
              textAlign: "left",
              padding: "14px 16px",
              borderRadius: 12,
              border: "2px solid rgba(0,0,0,0.1)",
              background: selectedIndex === idx 
                ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)" 
                : "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
              color: selectedIndex === idx ? "#fff" : "#000",
              cursor: disabled ? "not-allowed" : "pointer",
              fontWeight: 500,
              fontSize: "16px",
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: selectedIndex === idx 
                ? "0 4px 20px rgba(99, 102, 241, 0.4)" 
                : "0 2px 8px rgba(0,0,0,0.1)",
              opacity: disabled ? 0.6 : 1,
              transform: selectedIndex === idx ? "scale(1.02)" : "scale(1)",
            }}
            aria-pressed={selectedIndex === idx} // Accessibility: indicates selection state
            aria-disabled={!!disabled} // Accessibility: indicates disabled state
            disabled={disabled}
          >
            <span style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px" 
            }}>
              <span style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: selectedIndex === idx ? "rgba(255,255,255,0.2)" : "var(--primary)",
                color: selectedIndex === idx ? "#fff" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;


