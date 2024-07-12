import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import "./App.css";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import Background from "./Background"; // Import the Background component

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "Fail",
      };
    case "start":
      return {
        ...state,
        status: "Active",
        secondsRemaining: state.questions.length * 10,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.answer
            ? state.points + question.points
            : state.points,
      };
    }
    case "Finished":
      return {
        ...state,
        status: "Finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "Finished" : state.status,
      };
    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  let numq = questions.length;
  let maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="App">
        {status === "Active" && (
          <Progress
            index={index}
            numq={numq}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}

        {status === "ready" && (
          <div>
            <Background />
            <StartScreen numq={numq} dispatch={dispatch} />
          </div>
        )}
        {/* {status === "Finished" && (
          <StartScreen numq={numq} dispatch={dispatch} />
        )} */}
        {status === "Finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "Active" && (
          <div>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numq={numq}
              />
            </Footer>
          </div>
        )}
      </div>
    </>
  );
}
