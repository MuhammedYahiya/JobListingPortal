import React from 'react';
import Leftsidebar from './Leftsidebar/Leftsidebar';
import './Homesearch.css';
import Jobcard from './Jobcard/Jobcard';

function Homesearch() {
  const user = {
    profilePicture: "https://via.placeholder.com/80",
    name: "John Doe",
    role: "Job Seeker",
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
  };

  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'New York, USA', type: 'Full Time', experience: '0-2 years' },
    { id: 2, title: 'Backend Developer', company: 'CodeCrafters', location: 'Pune, India', type: 'Part Time', experience: '2-4 years' },
    { id: 3, title: 'iOS Developer', company: 'Mobile Innovators', location: 'San Francisco, USA', type: 'Contract', experience: '5-8 years' },
    
  ];

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
        <div className="job-listings">
          {jobs.map((job) => (
            <Jobcard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homesearch;
