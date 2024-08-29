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
      <Navbar/>
      <div className="home-container">
        <h1>Welcome to Job Portal</h1>
        <img src={welcome} />

        <div className="role-selector">
          <label>
            <input
              type="radio"
              value="employer"
              checked={role === "employer"}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Select Employer role"
            />
            Employer
          </label>
          <label>
            <input
              type="radio"
              value="jobseeker"
              checked={role === "jobseeker"}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Select Job Seeker role"
            />
            Job Seeker
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
