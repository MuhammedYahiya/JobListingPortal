import React, { useState } from "react";
import Leftsidebar from "./Leftsidebar/Leftsidebar";
import "./Homesearch.css";
import Jobcard from "./Jobcard/Jobcard";

function Homesearch() {
  const [filters, setFilters] = useState({
    jobRole: "",
    jobType: "",
    location: "",
    experience: "",
  });

  const jobData = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "New York, USA",
      type: "Full Time",
      experience: "0-2 years",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "CodeCrafters",
      location: "Pune, India",
      type: "Part Time",
      experience: "2-4 years",
    },
    {
      id: 3,
      title: "iOS Developer",
      company: "Mobile Innovators",
      location: "San Francisco, USA",
      type: "Contract",
      experience: "5-8 years",
    },
  ];
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredJobs = jobData.filter((job) => {
    return (
      (filters.jobRole ? job.title.includes(filters.jobRole) : true) &&
      (filters.jobType ? job.type === filters.jobType : true) &&
      (filters.location ? job.location.includes(filters.location) : true) &&
      (filters.experience ? job.experience.includes(filters.experience) : true)
    );
  });

  return (
    <div className="homesearch-container">
      <Leftsidebar />

      <div className="main-content">
        <div className="search-bar">
          <h1>Your ideal job awaits, start the search</h1>
          <p>Get the latest job openings that best suit you!</p>
          <div className="search-controls">
            <select
              className="search-dropdown"
              name="jobRole"
              value={filters.jobRole}
              onChange={handleFilterChange}
            >
              <option>Job role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>iOS Developer</option>
              <option>Android Developer</option>
              <option>Developer Advocate</option>
            </select>
            <select
              className="search-dropdown"
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
            >
              <option>Job Type</option>
              <option>Full time</option>
              <option>Part time</option>
            </select>
            <select
              className="search-dropdown"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option>Location</option>
              <option>Delhi</option>
              <option>Pune</option>
              <option>Bangalore</option>
            </select>
            <select
              className="search-dropdown"
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
            >
              <option>Experience</option>
              <option>0-2 years</option>
              <option>3-5 years</option>
              <option>5-8 years</option>
            </select>
            <button className="search-button">Search</button>
          </div>
        </div>
        <div className="job-card-container">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => <Jobcard key={index} {...job} />)
          ) : (
            <p>No jobs found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homesearch;
