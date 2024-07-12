import React from "react";
import "./css/Progress.css";
export default function Progress({ index, numq, points, maxPossiblePoints }) {
  return (
    <header>
      <div>
        <progress max={numq} value={index + 1} />
      </div>
      <div className="score">
        <p style={{ display: "flex" }}>
          Question &nbsp; <strong>{index + 1}</strong>/{numq}
        </p>
        <p>
          Score &nbsp; <strong>{points}</strong>/{maxPossiblePoints}
        </p>
      </div>
    </header>
  );
}
