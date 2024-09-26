import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployerProfileJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [candidates, setCandidates] = useState([]); // Store candidates data
  const [selectedJobId, setSelectedJobId] = useState(null); // Track selected job ID for candidates

  const handleViewCandidates = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/employer/job/${jobId}/candidates`,
        { withCredentials: true }
      );

      setCandidates(response.data.applications);
      setSelectedJobId(jobId); // Track which job's candidates are shown
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employer/jobs",
          { withCredentials: true }
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:8000/api/employer/jobs/${jobId}`, {
        withCredentials: true,
      });
      // Remove job from state after successful deletion
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Posted Jobs</h1>
      <div className="grid grid-cols-1  gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{job.companyName}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Job Title: </strong>
              {job.title}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location: </strong>
              {job.location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Salary: </strong>
              {job.salary}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Qualification: </strong>
              {job.qualification}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Date Posted: </strong>
              {job.date}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description: </strong>
              {job.description}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Responsibility: </strong>
              {job.responsibility}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 text-white p-2 mt-4 rounded-lg"
              >
                Delete Job
              </button>
              <button
                className="bg-green-500 text-white p-2 mt-4 rounded-lg"
                onClick={() => handleViewCandidates(job._id)}
              >
                View Candidates
              </button>
            </div>
            {/* Show candidates if the job has been selected */}
            {selectedJobId === job._id && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Applied Candidates</h3>
                {candidates.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {candidates.map((application) => (
                      // console.log(application.jobseeker.resume)
                      <li key={application._id}>
                        <div className="flex flex-col">
                          <span>
                            {application.jobseeker.name} -{" "}
                            {application.jobseeker.email}
                          </span>
                          {/* Add the resume link */}
                          {application.resume ? (
                            <a
                              href={application.resume} // Use the resume URL from the response
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Resume
                            </a>
                          ) : (
                            <p>No resume provided</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No candidates have applied yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerProfileJobs;
