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

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
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
      });

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
    <div className="container-full min-h-[100vh]">
      <div className="register-container min-h-[100vh]">
        <h2>Job Seeker Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Your Name*
            <input
              type="text"
              name="name"
              required
              placeholder="e.g., Jane Doe"
            />
          </label>

          <label>
            Address*
            <input
              type="text"
              name="address"
              required
              placeholder="eg: 1234 Elm St"
            />
          </label>

          <label>
            City*
            <input
              type="text"
              name="city"
              required
              placeholder="eg: Springfield"
            />
          </label>

          <label>
            State*
            <input type="text" name="state" required placeholder="eg: IL" />
          </label>

          <label>
            Country*
            <input type="text" name="country" required placeholder="eg: USA" />
          </label>

          <label>
            Pin Code*
            <input
              type="text"
              name="pinCode"
              required
              placeholder="eg: 12345"
            />
          </label>

          <label>
            Years of Experience
            <select name="experience">
              <option value="0-1">0 to 1</option>
              <option value="1-2">1 to 2</option>
              <option value="3-5">3 to 5</option>
              <option value="5-10">5 to 8</option>
            </select>
          </label>

          <label>
            Job Title*
            <input
              type="text"
              name="jobtitlename"
              required
              placeholder="eg: software engineer"
            />
          </label>

          <label>
            Types of Position*
            <select name="positionType" required>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </label>

          <label>
            Social Media Link
            <input
              type="url"
              name="socialMediaLink"
              placeholder="https://www.linkedin.com/company/amazon/jobs/"
            />
          </label>
          <label>
            Email Address*
            <input
              type="email"
              name="email"
              required
              placeholder="e.g., jane@example.com"
            />
          </label>
          <label>
            Password*
            <input type="password" name="password" required />
          </label>
          <button type="submit" className="continue-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerRegister;