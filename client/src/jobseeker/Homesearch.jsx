import React, { useState, useEffect } from "react";
import Leftsidebar from "./Leftsidebar/Leftsidebar";
import "./Homesearch.css";
import axios from "axios";

function Homesearch() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [resumeFile, setResumeFile] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  const [filters, setFilters] = useState({
    jobRole: "",

    location: "",
    experience: "",
  });

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        // Fetch jobs based on the filters
       
        const response = await axios.get("http://localhost:8000/api/jobs", {
          params: {
            jobRole: filters.jobRole,
            jobType: filters.jobType,
            location: filters.location,
            experience: filters.experience,
          },
          withCredentials: true,
        });
        
        setJobs(response.data.jobs);

        // Fetch the applied jobs list
        
        const appliedResponse = await axios.get(
          "http://localhost:8000/api/jobseeker/applications",
          { withCredentials: true }
        );

        console.log("Applied jobs response:", appliedResponse.data);

        if (Array.isArray(appliedResponse.data.applications)) {
          const appliedJobIds = new Set(
            appliedResponse.data.applications.map((application) => application.job._id) // Access job._id
          );
          setAppliedJobs(appliedJobIds); // Store the job ids in the appliedJobs state
        } else {
          console.error("Unexpected response format: ", appliedResponse.data);
        }
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleApply = async (jobId) => {
    if (!resumeFile) {
      alert("Please select a resume file before applying.");
      return;
    }
    setIsApplying(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobId", jobId);

      await axios.post(
        `http://localhost:8000/api/jobseeker/job/${jobId}/apply`,
        formData,
        { withCredentials: true }
      );

      setAppliedJobs((prev) => new Set(prev).add(jobId));
      setResumeFile(null);
      alert(`Successfully applied to job!`);
    } catch (error) {
      console.error("Error applying for the job", error);
      if (error.response) {
        const statusCode = error.response.status;
        const message =
          statusCode === 400
            ? "Error Code: 400 - Bad Request. Please check the resume file or job details."
            : statusCode === 500
            ? "Error Code: 500 - Server Error. Please try again later."
            : `Error Code: ${statusCode} - Unexpected error. Please try again.`;
        alert(message);
      } else {
        alert(
          "Error Code: 1002 - Network error. Please check your connection."
        );
      }
    } finally {
      setIsApplying(false);
    }
  };

  const parseExperienceRange = (range) => {
    const [min, max] = range.split("-").map((str) => parseInt(str, 10));
    return { min: min || 0, max: max || Infinity };
  };

  const filteredJobs = jobs.filter((job) => {
    const jobExperience = parseInt(job.experience, 10); // Convert job experience to a number
    const { min, max } = filters.experience
      ? parseExperienceRange(filters.experience)
      : { min: 0, max: Infinity };

    return (
      (filters.jobRole
        ? job.title.toLowerCase().includes(filters.jobRole.toLowerCase())
        : true) &&
      (filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true) &&
      (filters.experience ? jobExperience >= min && jobExperience <= max : true)
    );
  });

  return (
    <div className="homesearch-container">
      <Leftsidebar />
      <div className="main-content flex flex-col items-center">
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
              <option value="Software Engineer">Software Engineer</option>
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
              <option value="5-6 years">5-6 years</option>
              <option value="6-7 years">6-7 years</option>
              <option value="8+ years">8+ years</option>
            </select>
            <button className="search-button">Search</button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="jobs-list w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
            <p>No jobs found matching your criteria.</p>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {job.companyName}
                </h2>
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
                  <strong>Experience: </strong>
                  {job.experience} years
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

                {/* File input for resume */}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="mb-4"
                />
                <button
                  className="bg-green-500 text-white p-2 mt-4 rounded-lg"
                  onClick={() => handleApply(job._id)}
                  disabled={appliedJobs.has(job._id)}
                >
                  {appliedJobs.has(job._id) ? "APPLIED" : "APPLY"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Homesearch;
