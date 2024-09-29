import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function JobSeekerRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // const fileInput = e.target.elements.profilePhoto;

    // if (fileInput && fileInput.files.length > 0) {
    //   formData.append("profilePhoto", fileInput.files[0]);
    // }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/jobseeker/register",
        {
          email: data.email,
          password: data.password,
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          socialMediaLink: data.socialMediaLink,
          jobtitlename: data.jobtitlename,
          experience: data.experience,
          positionType: data.positionType,
        }
      );

      if (response.status === 200) {
        alert("Job Seeker registered successfully");
        navigate("/");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering job seeker");
    }
  };

  return (
    <div className="p-4 ">
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className=" flex flex-col  border-4 p-5 overflow-y-scroll  min-h-[100vh] border-gray-300 custom-scrollbar w-[70%] shadow-[2px_2px_5px_1px_rgba(0,0,0,0.3)]">
          <div className="flex text-4xl font-bold text-zinc-500 p-2 mb-5 text-stroke-3 bg-gray-600 tracking-wider justify-center">
            Job Seeker Registration
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <label className="font-semibold text-blue-800">
              Your Name*
              <input
                type="text"
                name="name"
                required
                placeholder="e.g., Jane Doe"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Address*
              <input
                type="text"
                name="address"
                required
                placeholder="eg: 1234 Elm St"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              City*
              <input
                type="text"
                name="city"
                required
                placeholder="eg: Springfield"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              State*
              <input
                type="text"
                name="state"
                required
                placeholder="eg: IL"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Country*
              <input
                type="text"
                name="country"
                required
                placeholder="eg: USA"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Pin Code*
              <input
                type="text"
                name="pinCode"
                required
                placeholder="eg: 12345"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Years of Experience
              <select name="experience">
                <option value="0-1">0 to 1</option>
                <option value="1-2">1 to 2</option>
                <option value="3-5">3 to 5</option>
                <option value="5-10">5 to 8</option>
              </select>
            </label>

            <label className="font-semibold text-blue-800">
              Job Title*
              <input
                type="text"
                name="jobtitlename"
                required
                placeholder="eg: software engineer"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Types of Position*
              <select name="positionType" required>
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </label>

            <label className="font-semibold text-blue-800">
              Social Media Link
              <input
                type="url"
                name="socialMediaLink"
                placeholder="https://www.linkedin.com/company/amazon/jobs/"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>
            <label className="font-semibold text-blue-800">
              Email Address*
              <input
                type="email"
                name="email"
                required
                placeholder="e.g., jane@example.com"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Resume
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Password*
              <input type="password" name="password" required />
            </label>
            <button type="submit" className="font-semibold">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerRegister;
