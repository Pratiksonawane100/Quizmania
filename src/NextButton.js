import React, { useState } from "react";
import "./App.css"; // Import the CSS file

export default function NextButton({ dispatch, answer, index, numq }) {
  const [isSubmitHidden, setIsSubmitHidden] = useState(false);
  if (answer === null) return null;
  if (index < numq - 1)
    return (
      <div
        className="next-button-container"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        <button>Next</button>
      </div>
    );
  if (index === numq - 1)
    return (
      <div
        className={`submit-button ${isSubmitHidden ? "hidden" : ""}`}
        onClick={() => {
          dispatch({ type: "Finished" });
          setIsSubmitHidden(true);
        }}
      >
        <button>Submit</button>
      </div>
    );
}
