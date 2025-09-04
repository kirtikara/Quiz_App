import React from "react";

/**
 * ProgressBar Component
 * 
 * A reusable progress bar component with accessibility features.
 * Displays progress as both a visual bar and percentage text.
 * 
 * @param {number} current - Current progress value
 * @param {number} total - Total progress value (denominator)
 * @param {boolean} showLabel - Whether to show the progress label and fraction
 */
function ProgressBar({ current, total, showLabel = false }) {
  // Ensure total is never negative or zero to prevent division by zero
  const safeTotal = total > 0 ? total : 0;
  
  // Clamp current value between 0 and safeTotal to prevent overflow
  const cappedCurrent = Math.min(Math.max(current, 0), safeTotal);
  
  // Calculate percentage with safe division
  const percent = safeTotal > 0 ? Math.round((cappedCurrent / safeTotal) * 100) : 0;
  
  return (
    <div>
      {/* Optional progress label showing current/total fraction */}
      {showLabel && (
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          fontSize: 12, 
          color: "var(--muted)", 
          marginBottom: 4 
        }}>
          <span>Progress</span>
          <span>{cappedCurrent}/{safeTotal}</span>
        </div>
      )}
      
      {/* Progress bar container with accessibility attributes */}
      <div 
        className="progress" 
        style={{ position: "relative", overflow: "hidden" }} 
        aria-label="Progress" 
        aria-valuemin={0} 
        aria-valuemax={100} 
        aria-valuenow={percent} 
        role="progressbar"
      >
        {/* Visual progress bar */}
        <div
          className="progress-bar"
          style={{
            width: `${percent}%`,
            transition: "width 200ms", // Smooth animation when progress changes
          }}
        />
        
        {/* Percentage text overlay */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          fontSize: 12, 
          color: "var(--text)" 
        }}>
          {percent}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;


