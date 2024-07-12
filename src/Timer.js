import React, { useEffect } from "react";
import "./css/Timer.css"; // Import your CSS file

export default function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer-container">
      <div className="timer-value">
        {min < 10 && "0"}
        {min}:{seconds < 10 && "0"}
        {seconds}
      </div>
    </div>
  );
}
