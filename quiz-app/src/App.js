
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Score from "./components/Score";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", backgroundColor: "#f00", color: "#fff" }}>
          <h1>BRAIN TEASER</h1>
          <div>
            <Link to="/" style={{ marginRight: "15px", color: "#fff", textDecoration: "none" }}>HOME</Link>
            <Link to="/quiz" style={{ color: "#fff", textDecoration: "none" }}>QUIZ</Link>
          </div>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/score" element={<Score />} /> {/* Ensure Score is used */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
