const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "harsha@123", // Change to your MySQL password
  database: "quiz_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// ✅ API to Fetch Quiz Questions
app.get("/api/questions", (req, res) => {
  db.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(results);
  });
});

// ✅ API to Save Score
app.post("/api/save-score", (req, res) => {
  const { playerName, score, totalQuestions } = req.body;
  
  if (!playerName || score === undefined || !totalQuestions) {
    return res.status(400).json({ error: "Missing data" });
  }

  const query = "INSERT INTO scores (player_name, score, total_questions) VALUES (?, ?, ?)";
  db.query(query, [playerName, score, totalQuestions], (err, result) => {
    if (err) {
      console.error("Error saving score:", err);
      res.status(500).json({ error: "Database insert failed" });
      return;
    }
    res.json({ message: "Score saved successfully", id: result.insertId });
  });
});

// ✅ API to Get Leaderboard
app.get("/api/leaderboard", (req, res) => {
  db.query("SELECT * FROM scores ORDER BY score DESC, timestamp DESC LIMIT 10", (err, results) => {
    if (err) {
      console.error("Error fetching leaderboard:", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
