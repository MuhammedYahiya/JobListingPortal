import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/employer/job/create",
        {
          companyName: data.name,
          // date: data.date,
          title: data.title,
          qualification: data.qualification,
          location: data.location,
          description: data.description,
          responsibility: data.responsibility,
          salary: data.salary,
          experience:data.experience,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Job registered successfully");
        navigate("/dashboard/employer");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering job  ");
    }
  };

  return (
    <div>
      <div>
        <ul className="flex font-semibold items-center gap-5 p-4 justify-end mr-5">
          <li>Home</li>
          <li>Companies</li>
          <li>Jobs</li>
        </ul>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl uppercase">
            ENTER The Job Details
          </h1>
          <p className="text-gray-400">You can change this later</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Company Name</label>
          <input type="text" className="my-2" id="name" name="name" />
          <label htmlFor="date">Date</label>
          <input type="text" className="my-2" id="date" name="date" />
          <label htmlFor="title">Job Title</label>
          <input type="text" className="my-2" id="title" name="title" />
          <label htmlFor="qualification">Qualifications</label>
          <input
            type="text"
            className="my-2"
            id="qualification"
            name="qualification"
          />
          <label htmlFor="experience">Experience Required</label>
          <input type="text" className="my-2" id="experience" name="experience" />
          <label htmlFor="location">Location</label>
          <input type="text" className="my-2" id="location" name="location" />
          <label htmlFor="salary">Salary</label>
          <input type="text" className="my-2" id="salary" name="salary" />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="my-2"
            id="description"
            name="description"
          />
          <label htmlFor="responsibility">Responsibility</label>
          <input
            type="text"
            className="my-2"
            id="responsibility"
            name="responsibility"
          />
          <div className="flex flex-row items-center gap-2 my-10 justify-center">
            <div
              className="bg-red-500 text-white cursor-pointer p-2 rounded-md hover:bg-red-700"
              onClick={() => navigate("/dashboard/employer")}
            >
              Cancel
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white cursor-pointer p-2 rounded-md hover:bg-blue-700 "
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreate;
