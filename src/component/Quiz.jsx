import React, { memo, useEffect, useState } from "react";
import Option from "./Option";
import Result from "./Result";
import './style.css';

function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let currentQuestion = quizData[index];

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    try {
      let data = await fetch("https://the-trivia-api.com/v2/questions");
      let res = await data.json();
      setQuizData(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  }

  function nextButtonClicked() {
    setIndex((prevIndex) => prevIndex + 1);
  }

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div>Error: Could not load questions. Please check your internet connection and try again.</div>;
  }

  return (
    <>
      {quizData.length > 0 ? (
        index === quizData.length ? (
          <Result score={score} length={quizData.length} />
        ) : (
          <div className="eachSet" key={currentQuestion.id}>
            <h2>Quiz App</h2>
            <h3>Question {index + 1}</h3>
            <p className="question">{currentQuestion.question.text}</p>
            <Option
              incorrectAns={currentQuestion.incorrectAnswers}
              correctAns={currentQuestion.correctAnswer}
              idx={index}
              incrementIdx={nextButtonClicked}
              score={score}
              setScore={setScore}
            />
            {index < quizData.length && (
              <button onClick={nextButtonClicked}>{"Skip >>"}</button>
            )}
          </div>
        )
      ) : (
        <div className="spinner"></div>
      )}
    </>
  );
}

export default memo(Quiz);
