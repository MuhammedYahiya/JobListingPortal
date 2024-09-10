import React from 'react';
import Leftsidebar from './Leftsidebar/Leftsidebar';
import './Homesearch.css';

function Homesearch() {
  const user = {
    profilePicture: "https://via.placeholder.com/80",
    name: "John Doe",
    role: "Job Seeker",
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
  };

  return (
    <div className="homesearch-container">
      <Leftsidebar user={user} />
      
      <div className="main-content">
        <div className="search-bar">
          <h1>Your ideal job awaits, start the search</h1>
          <p>Get the latest job openings that best suit you!</p>
          <div className="search-controls">
            <select className="search-dropdown">
              <option>Job role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>iOS Developer</option>
              <option>Android Developer</option>
              <option>Developer Advocate</option>
            </select>
            <select className="search-dropdown">
              <option>Job Type</option>
              <option>Full time</option>
              <option>Part time</option>
            </select>
            <select className="search-dropdown">
              <option>Location</option>
              <option>Delhi</option>
              <option>Pune</option>
              <option>Bangalore</option>
            </select>
            <select className="search-dropdown">
              <option>Experience</option>
              <option>0-2 years</option>
              <option>3-5 years</option>
              <option>5-8 years</option>
            </select>
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homesearch;
