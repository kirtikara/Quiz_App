import React from "react";

function ProgressBar({ current, total, showLabel = false }) {
  const safeTotal = total > 0 ? total : 0;
  const cappedCurrent = Math.min(Math.max(current, 0), safeTotal);
  const percent = safeTotal > 0 ? Math.round((cappedCurrent / safeTotal) * 100) : 0;
  return (
    <div>
      {showLabel && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>
          <span>Progress</span>
          <span>{cappedCurrent}/{safeTotal}</span>
        </div>
      )}
      <div className="progress" style={{ position: "relative", overflow: "hidden" }} aria-label="Progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} role="progressbar">
        <div
          className="progress-bar"
          style={{
            width: `${percent}%`,
            transition: "width 200ms",
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--text)" }}>
          {percent}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;


