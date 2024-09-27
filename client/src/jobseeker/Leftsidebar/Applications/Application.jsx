import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../Login/UserContext";
import "./Application.css";

const Application = () => {
  const { user } = useContext(UserContext); // Accessing user context
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/jobseeker/applications", {
          withCredentials: true,
        });
        if (Array.isArray(response.data)) {
          setAppliedJobs(response.data); // Store the applied jobs
        } else {
          console.error("Unexpected response format: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching applied jobs", error);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="application-container">
      <h1>{user.name}'s Applications</h1>
      {appliedJobs.length > 0 ? (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>{new Date(job.dateApplied).toLocaleDateString()}</td>
                <td>{job.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have not applied for any jobs yet.</p>
      )}
    </div>
  );
};

export default Application;
