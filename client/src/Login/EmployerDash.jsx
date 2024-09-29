import React from "react";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const EmployerDash = () => {
  const [popoverOpenFor, setPopoverOpenFor] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [editJobData, setEditJobData] = useState(null);

  const handleEditJob = (job) => {
    setEditJobData(job); // Set the job data in state to allow editing
  };

  const handleChange = (e) => {
    setEditJobData({ ...editJobData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (jobId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/employer/job/edit/${jobId}`,
        editJobData,
        { withCredentials: true }
      );
      alert("Job updated successfully");
      setEditJobData(null); // Reset after saving
      setPopoverOpenFor(null); // Close popover after saving
    } catch (error) {
      console.error("Error updating job", error);
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

  const togglePopover = (jobId) => {
    setPopoverOpenFor((prev) => (prev === jobId ? null : jobId)); // Toggle for specific job
  };

  const navigate = useNavigate();

  const onHandleClick = () => {
    navigate("/dashboard/employer/profile");
  };

  const onHandleClickJob = () => {
    navigate("/dashboard/employer/jobs");
  };

  return (
    <div>
      <div>
        <ul className="flex font-semibold items-center gap-5 p-4 justify-end mr-5 font-serif">
          <li className="hover:cursor-pointer hover:text-xl hover:text-teal-600">
            Home
          </li>
          <li
            className="hover:cursor-pointer hover:text-xl hover:text-teal-600 "
            onClick={onHandleClickJob}
          >
            Jobs
          </li>
          <li
            className="hover:cursor-pointer hover:text-xl hover:text-teal-600"
            onClick={onHandleClick}
          >
            Profile
          </li>
          <li className="hover:cursor-pointer hover:text-xl hover:text-teal-600">
            <NavLink to="/">Logout</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center px-24 justify-center">
        <div className=" w-full my-20 p-4">
          <div className="flex flex-row justify-between ">
            <input
              className="p-3 border-gray-800 border-1"
              placeholder="Filter by name"
            />
            <button
              onClick={() => navigate("/dashboard/employer/create")}
              className="w-[200px] bg-gray-800 text-white rounded-lg hover:bg-gray-600"
            >
              New Job
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full ">
          <table className=" w-full text-center">
            <thead>
              <tr className="bg-slate-200">
                <th className="p-4">S.No</th>
                <th>Company Name</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id} className="bg-white hover:bg-gray-200">
                  <td className="p-4">{index + 1}</td>
                  <td className="text-black font-semibold uppercase tracking-wider font-sans">{job.companyName}</td>
                  <td>{job.date}</td>
                  <td>
                    <div
                      className="cursor-pointer flex justify-center"
                      onClick={() => togglePopover(job._id)}
                    >
                      <FiAlignJustify />
                    </div>

                    {popoverOpenFor === job._id && (
                      <div className="absolute z-10 bg-white border border-gray-300 p-2 rounded shadow-lg mt-2">
                        <button
                          className=" text-white bg-gray-700 hover:bg-gray-100 hover:text-gray-600 p-2 block w-full text-left text-sm "
                          onClick={() => handleEditJob(job)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-gray-500 mb-10 mt-5">
            A list of your recent registered jobs
          </div>
        </div>
      </div>

      {editJobData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center ">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              name="companyName"
              id="name"
              value={editJobData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="mb-3 p-2 border rounded w-full"
            />
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={editJobData.title}
              onChange={handleChange}
              placeholder="title"
              className="mb-3 p-2 border rounded w-full"
            />
            <label htmlFor="qualification">Qualifications</label>
            <input
              type="text"
              name="qualification"
              id="qualification"
              value={editJobData.qualification}
              onChange={handleChange}
              placeholder="title"
              className="mb-3 p-2 border rounded w-full"
            />
            <label htmlFor="qualification">Experience</label>
            <input
              type="text"
              name="experience"
              id="experience"
              value={editJobData.experience}
              onChange={handleChange}
              placeholder="title"
              className="mb-3 p-2 border rounded w-full"
            />
            <label htmlFor="location">location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={editJobData.location}
              onChange={handleChange}
              placeholder="title"
              className="mb-3 p-2 border rounded w-full"
            />
            <label htmlFor="salary">salary</label>
            <input
              type="text"
              name="salary"
              id="salary"
              value={editJobData.salary}
              onChange={handleChange}
              placeholder="title"
              className="mb-3 p-2 border rounded w-full"
            />
            <label htmlFor="responsibility">responsibility</label>
            <input
              type="text"
              name="responsibility"
              id="responsibility"
              value={editJobData.responsibility}
              onChange={handleChange}
              placeholder="title"
              className="mb-3 p-2 border rounded w-full"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleSaveEdit(editJobData._id)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditJobData(null)} // Close the edit form
                className="bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDash;
