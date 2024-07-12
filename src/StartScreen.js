import React from "react";
import "./App.css"; // Import your CSS file

export default function StartScreen({ numq, dispatch }) {
  return (
    <div className="start-screen">
      <h2>Welcome To QuizMania!</h2>
      <h3>
        "Embark on the Coding Programming Quiz featuring {numq} questions to
        test your knowledge."
      </h3>
      <button
        className="start-button"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
