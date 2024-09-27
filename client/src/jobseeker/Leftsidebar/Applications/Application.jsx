import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../Login/UserContext";
import "./Application.css"; 

const Application = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { user } = useContext(UserContext); // Assuming user is in context

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/jobseeker/applications", {
          withCredentials: true, // Include credentials for authentication
        });

        if (response.data.success && Array.isArray(response.data.applications)) {
          setAppliedJobs(response.data.applications); // Set the list of applied jobs
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
      <h1>{user?.name}'s Applications</h1>
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
            {appliedJobs.map((application) => (
              <tr key={application._id}>
                <td>{application.job.title}</td>
                <td>{application.job.companyName}</td>
                <td>{application.job.location || 'N/A'}</td>
                <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                <td>{application.status || 'Pending'}</td>
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
