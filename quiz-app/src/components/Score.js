import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Score() {
  const [leaderboard, setLeaderboard] = useState([]);
  const score = localStorage.getItem("quizScore");
  const totalQuestions = localStorage.getItem("totalQuestions");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error("Error loading leaderboard:", err));
  }, []);

  return (
    <div className="score-container">
      <h2>Your Score: {score} / {totalQuestions}</h2>
      <h3>Leaderboard:</h3>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.player_name}: {entry.score}/{entry.total_questions}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Play Again</button>
    </div>
  );
}

export default Score;
