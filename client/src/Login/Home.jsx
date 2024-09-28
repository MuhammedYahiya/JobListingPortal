import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import welcome from "../assests/Welcome.png";
import Navbar from "./Navbar/Navbar";

function Home() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (action) => {
    if (!role) {
      alert("Please select a role before proceeding.");
    } else {
      const path = `/${action}/${role}`;
      navigate(path);
    }
  };

  return (
    <div className="container-full">
      <Navbar />
      <div className="content-container">
        {/* Job Board Title Section */}
        <div className="job-board-title">
          <div className="job-board-title-item font-bold text-9xl text-green-500">
            #1
          </div>
          <div className="job-board-title-item font-bold text-7xl text-red-500">
            JOB BOARD
          </div>
        </div>

        <div className="job-board-subtitle">
          <div className="font-bold text-5xl text-gray-500">FOR HIRING</div>
          <div className="font-bold text-7xl text-gray-700">OR</div>
          <div className="font-bold text-5xl text-gray-500">
            FIND YOUR DREAM JOB
          </div>
        </div>

        {/* Centered Welcome Image */}
        <div className="home-container">
          <h1 className="font-sans font-bold italic text-gray-600 text-6xl">
            Welcome to Job Genie
          </h1>
          <div className="image-container">
            <img src={welcome} alt="Welcome" className="welcome-image" />
          </div>

          {/* Role Selector */}
          <div className="role-selector">
            <label style={{ color: "green" }}>
              <input
                type="radio"
                value="employer"
                checked={role === "employer"}
                onChange={(e) => setRole(e.target.value)}
                aria-label="Find a skilled individual to do the job"
              />
              Find a skilled individual to do the job
            </label>
            <label style={{ color: "green" }}>
              <input
                type="radio"
                value="jobseeker"
                checked={role === "jobseeker"}
                onChange={(e) => setRole(e.target.value)}
                aria-label="Your dream job is waiting for you"
              />
              Your dream job is waiting for you
            </label>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={() => handleNavigation("login")} disabled={!role}>
              Login
            </button>
            <button
              onClick={() => handleNavigation("register")}
              disabled={!role}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
