import React from "react";
import "./css/FinishScreen.css"; // Ensure you import the CSS file

export default function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 60 && percentage < 80) emoji = "🥉";
  if (percentage >= 40 && percentage < 60) emoji = "🎉";
  if (percentage < 40) emoji = "😥";

  return (
    <>
      <div className="finish-screen">
        <p>
          <span>{emoji}</span>&nbsp; You Scored&nbsp;
          <strong>{points}</strong>&nbsp; Out Of {maxPossiblePoints} (
          {Math.ceil(percentage)}%)
        </p>
      </div>
      <span>Highscore: {highscore} points</span>
      <button className="re" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}
