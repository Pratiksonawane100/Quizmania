import React from "react";
import "./App.css"; // Import the CSS file

export default function Question({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={option}
            disabled={hasAnswered}
            className={`option-button ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.answer
                  ? "correct"
                  : index === answer
                  ? "wrong"
                  : ""
                : ""
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
