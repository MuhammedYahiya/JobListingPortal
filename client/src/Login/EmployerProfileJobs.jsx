import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployerProfileJobs = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/employer/jobs', { withCredentials: true }); 
            setJobs(response.data.jobs);
          } catch (error) {
            console.error("Error fetching jobs", error);
          }
        };
    
        fetchJobs();
      }, []);

      const handleDelete = async (jobId) => {
        try {
          await axios.delete(`http://localhost:8000/api/employer/jobs/${jobId}`, { withCredentials: true });
          // Remove job from state after successful deletion
          setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        } catch (error) {
          console.error("Error deleting job", error);
        }
      };

      
  return (
    <div className="container mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Posted Jobs</h1>
    <div className="grid grid-cols-1  gap-6">
      {jobs.map(job => (
        <div key={job._id} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">{job.companyName}</h2>
          <p className="text-gray-600 mb-2"><strong>Job Title: </strong>{job.title}</p>
          <p className="text-gray-600 mb-2"><strong>Location: </strong>{job.location}</p>
          <p className="text-gray-600 mb-2"><strong>Salary: </strong>{job.salary}</p>
          <p className="text-gray-600 mb-2"><strong>Qualification: </strong>{job.qualification}</p>
          <p className="text-gray-600 mb-2"><strong>Date Posted: </strong>{job.date}</p>
          <p className="text-gray-600 mb-2"><strong>Description: </strong>{job.description}</p>
          <p className="text-gray-600 mb-2"><strong>Responsibility: </strong>{job.responsibility}</p>
          <button 
              onClick={() => handleDelete(job._id)} 
              className="bg-red-500 text-white p-2 mt-4 rounded-lg"
            >
              Delete Job
            </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default EmployerProfileJobs