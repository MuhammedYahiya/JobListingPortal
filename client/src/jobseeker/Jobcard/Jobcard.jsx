
import React from 'react';
import './Jobcard.css'; 

const Jobcard = ({ logo, company, title, type, schedule, salary, location, timeAgo }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={logo} alt={`${company} logo`} className="company-logo" />
        <button className="save-btn">Save</button>
      </div>
      <div className="job-card-body">
        <h4>{company}</h4>
        <p className="time-ago">{timeAgo}</p>
        <h3 className="job-title">{title}</h3>
        <div className="job-tags">
          <span className="job-type">{type}</span>
          <span className="job-schedule">{schedule}</span>
        </div>
        <div className="job-details">
          <p className="salary">{salary}</p>
          <p className="location">{location}</p>
        </div>
      </div>
      <button className="apply-btn">Apply now</button>
    </div>
  );
};

export default Jobcard;


