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
      <div className="home-container">
        <h1>Welcome to Job Genie</h1>
        <img src={welcome} alt="Welcome to Job Genie" />

        <div className="role-selector">
          <label style={{ color: "green" }} htmlFor="employer">
            <input
              type="radio"
              id="employer"
              value="employer"
              checked={role === "employer"}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Find a skilled individual to do the job"
            />
            Find a skilled individual to do the job
          </label>
          <label style={{ color: "green" }} htmlFor="jobseeker">
            <input
              type="radio"
              id="jobseeker"
              value="jobseeker"
              checked={role === "jobseeker"}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Your dream job is waiting for you"
            />
            Your dream job is waiting for you
          </label>
        </div>
        <div className="action-buttons">
          <button onClick={() => handleNavigation("login")} disabled={!role}>
            Login
          </button>
          <button onClick={() => handleNavigation("register")} disabled={!role}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
