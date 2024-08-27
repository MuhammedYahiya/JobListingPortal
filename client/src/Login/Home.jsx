import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import welcome from '../assests/Welcome.png'

function Home() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) {
      alert("Please select a role before proceeding.");
    } else {
      navigate(`/login?role=${role}`);
    }
  };

  const handleRegister = () => {
    if (!role) {
      alert("Please select a role before proceeding.");
    } else {

      navigate(`/register?role=${role}`);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Job Portal</h1>
      <img src={welcome}/>

  
      <div className="role-selector">
      <label>
          <input
            type="radio"
            value="employer"
            checked={role === 'employer'}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Select Employer role"
          />
          Employer
        </label>
        <label>
          <input
            type="radio"
            value="jobseeker"
            checked={role === 'jobseeker'}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Select Job Seeker role"
          />
          Job Seeker
        </label>

      </div>
      <div className="action-buttons">
        <button onClick={handleLogin} disabled={!role}>
          Login
        </button>
        <button onClick={handleRegister} disabled={!role}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;
