import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState(""); // Store player's name
  const [hasStarted, setHasStarted] = useState(false); // Track quiz state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.map((q) => ({ ...q, options: JSON.parse(q.options) })));
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleStart = () => {
    if (playerName.trim() !== "") {
      setHasStarted(true);
    } else {
      alert("Please enter your name before starting the quiz.");
    }
  };

  const handleAnswer = (selectedOption) => {
    let newScore = score;
    if (selectedOption === questions[currentQuestion].answer) {
      newScore += 1;
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setScore(newScore);
    } else {
      saveScore(playerName, newScore, questions.length);
    }
  };

  // Send score and name to MySQL via backend
  const saveScore = async (playerName, score, totalQuestions) => {
    try {
      await axios.post("http://localhost:5000/api/save-score", { playerName, score, totalQuestions });
      localStorage.setItem("quizScore", score);
      localStorage.setItem("totalQuestions", totalQuestions);
      navigate("/score");
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Failed to save score.");
    }
  };

  return (
    <div className="quiz-container">
      {!hasStarted ? (
        <div>
          <h2>Welcome to the Brain Teaser Quiz!</h2>
          <label>
            Enter your name:
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your Name"
            />
          </label>
          <button onClick={handleStart}>Start Quiz</button>
        </div>
      ) : (
        <>
          {questions.length > 0 ? (
            <>
              <h2>{questions[currentQuestion].question}</h2>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>Loading questions...</p>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
