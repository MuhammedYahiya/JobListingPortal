

import React from 'react';
import './Jobcard.css'; 

function Jobcard({ job }) {
  return (
    <div className="job-card">
      <h2 className="job-title">{job.title}</h2>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <p className="job-experience">Experience: {job.experience}</p>
      <button className="apply-button">Apply Now</button>
    </div>
  );
}

export default Jobcard;
