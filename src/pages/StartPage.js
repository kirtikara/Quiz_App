import React from "react";

/**
 * StartPage Component
 * 
 * The landing page where users select the quiz difficulty level.
 * Provides three difficulty options: Easy, Medium, and Hard.
 * 
 * @param {function} onStart - Callback function called when a difficulty is selected
 *                            Receives the difficulty level as a parameter
 */
function StartPage({ onStart }) {
  return (
    <div className="start-container" role="region" aria-label="Start quiz">
      <div className="card" style={{ 
        animation: "fadeIn 250ms ease",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        {/* Page header with enhanced styling */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ 
            marginTop: 0, 
            marginBottom: "16px",
            fontSize: "2.5rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, var(--primary) 0%, var(--success) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            🧠 Quiz Challenge
          </h1>
          <h2 style={{ 
            margin: 0, 
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--text)"
          }}>
            Choose Your Difficulty
          </h2>
          <p style={{ 
            color: "var(--muted)", 
            marginTop: "8px",
            fontSize: "1.1rem"
          }}>
            Test your knowledge with our interactive quiz!
          </p>
        </div>
        
        {/* Difficulty selection buttons with enhanced styling */}
        <div style={{ 
          display: "grid", 
          gap: 16, 
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          marginTop: "24px"
        }}>
          <button 
            className="btn-primary difficulty-btn" 
            onClick={() => onStart("easy")} 
            aria-label="Start easy quiz"
            style={{
              padding: "20px 24px",
              fontSize: "18px",
              fontWeight: "700",
              background: "linear-gradient(135deg, var(--success) 0%, #16a34a 100%)",
              border: "none",
              borderRadius: "16px",
              color: "#fff",
              cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              🟢 Easy
            </span>
          </button>
          <button 
            className="btn-primary difficulty-btn" 
            onClick={() => onStart("medium")} 
            aria-label="Start medium quiz"
            style={{
              padding: "20px 24px",
              fontSize: "18px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              border: "none",
              borderRadius: "16px",
              color: "#fff",
              cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 20px rgba(245, 158, 11, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              🟡 Medium
            </span>
          </button>
          <button 
            className="btn-primary difficulty-btn" 
            onClick={() => onStart("hard")} 
            aria-label="Start hard quiz"
            style={{
              padding: "20px 24px",
              fontSize: "18px",
              fontWeight: "700",
              background: "linear-gradient(135deg, var(--danger) 0%, #dc2626 100%)",
              border: "none",
              borderRadius: "16px",
              color: "#fff",
              cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              🔴 Hard
            </span>
          </button>
        </div>
        
        {/* Additional info */}
        <div style={{ 
          marginTop: "32px", 
          padding: "16px", 
          background: "rgba(99, 102, 241, 0.1)", 
          borderRadius: "12px",
          border: "1px solid rgba(99, 102, 241, 0.2)"
        }}>
          <p style={{ 
            margin: 0, 
            color: "var(--muted)", 
            fontSize: "14px",
            lineHeight: 1.5
          }}>
            💡 <strong>Tip:</strong> Each quiz has 5 questions with a 30-second timer per question. 
            Good luck! 🍀
          </p>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
