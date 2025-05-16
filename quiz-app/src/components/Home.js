import React from "react";
import "./Home.css"; // Ensure this CSS file exists
import f2Image from "../assets/f2.webp"; // Adjust the path based on your folder structure


function Home() {
  return (
    <div className="home-container">
      <h1 className="title">BRAIN TEASER</h1>
      
      <div className="description">
        <h2>DESCRIPTION OF THE PAGE</h2>
        <p>
          Brainteaser Quiz App is a fun and challenging platform designed to test and improve your cognitive skills. 
          The app features a variety of mind-bending puzzles, logical reasoning questions, and tricky riddles to keep your brain sharp. 
          With different difficulty levels, time-based challenges, and an engaging user experience, it’s perfect for anyone looking to boost 
          their problem-solving skills while having fun. Compete with friends, track your progress, and unlock new levels as you go. 
          Get ready to put your brain to the ultimate test! 🧠🔥
        </p>
      </div>

      {/* Add a GIF image */}
      <div className="gif-container">
        <img src={f2Image} alt="Quiz Time GIF" />
      </div>
    </div>
  );
}

export default Home; 