import React, { useState, useEffect } from "react";
import Leftsidebar from "./Leftsidebar/Leftsidebar";
import "./Homesearch.css";
import axios from "axios";

function Homesearch() {
  const [filters, setFilters] = useState({
    jobRole: "",
    jobType: "",
    location: "",
    experience: "",
  });

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set()); // Use Set to track applied jobs
  const [resumeFile, setResumeFile] = useState(null); // State to store the selected resume file

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/jobs", {
          withCredentials: true,
        });
        setJobs(response.data.jobs);

        // Fetch applied jobs
        const appliedResponse = await axios.get("http://localhost:8000/api/jobseeker/applications", {
          withCredentials: true,
        });
        const appliedJobIds = appliedResponse.data.map(application => application.job);
        setAppliedJobs(new Set(appliedJobIds)); // Store the applied job IDs as a Set
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]); // Store the selected file in state
  };

  const handleApply = async (jobId) => {
    if (!resumeFile) {
      alert("Please select a resume file before applying.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile); // Append the resume file

      // Make the API call to apply for the job
      await axios.post(
        `http://localhost:8000/api/jobseeker/job/${jobId}/apply`,
        formData,
        {
          withCredentials: true,
        }
      );

      // Update the appliedJobs state to reflect that this job has been applied for
      setAppliedJobs((prev) => new Set(prev).add(jobId)); // Add jobId to the Set
      setResumeFile(null); // Reset resume file after successful application
    } catch (error) {
      console.error("Error applying for the job", error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
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

      <div className="main-content flex flex-col items-center">
        {/* Search Bar */}
        <div className="search-bar w-full text-center mb-8">
          <h1>Your ideal job awaits, start the search</h1>
          <p>Get the latest job openings that best suit you!</p>
          <div className="search-controls flex justify-center gap-4 mt-4">
            <select
              className="search-dropdown"
              name="jobRole"
              value={filters.jobRole}
              onChange={handleFilterChange}
            >
              <option value="">Job role</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="iOS Developer">iOS Developer</option>
              <option value="Android Developer">Android Developer</option>
              <option value="Developer Advocate">Developer Advocate</option>
            </select>
            <select
              className="search-dropdown"
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
            >
              <option value="">Job Type</option>
              <option value="Full time">Full time</option>
              <option value="Part time">Part time</option>
            </select>
            <select
              className="search-dropdown"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="">Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Bangalore">Bangalore</option>
            </select>
            <select
              className="search-dropdown"
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
            >
              <option value="">Experience</option>
              <option value="0-2 years">0-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-8 years">5-8 years</option>
            </select>
            <button className="search-button">Search</button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="jobs-list w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
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
                {new Date(job.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Description: </strong>
                {job.description}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Responsibility: </strong>
                {job.responsibility}
              </p>

              {/* File input for resume */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange} // Update resume file on change
                className="mb-4"
              />
              <button
                className="bg-green-500 text-white p-2 mt-4 rounded-lg"
                onClick={() => handleApply(job._id)}
                disabled={appliedJobs.has(job._id)} // Disable if already applied
              >
                {appliedJobs.has(job._id) ? "APPLIED" : "APPLY"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homesearch;
