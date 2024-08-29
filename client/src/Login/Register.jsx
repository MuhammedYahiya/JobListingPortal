import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Register.css";

function Register() {
  const search = useLocation().search;
  const role = new URLSearchParams(search).get("role");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);

    try {
      // const data = await response.json();
      const response = await axios.post("http://localhost:8000/api/register", {
        email: data["username"],
        password: data["password"],
        name: data["name"],
      });

      console.log(response.data);

      if (response.status == 200) {
        alert("User registered successfully");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user");
    }

    navigate(`/`);
    // e.target.reset();
  };

  return (
    <div className="register-container">
      <h2>{role === "employer" ? "Employer" : "Job Seeker"} Registration</h2>
      <h2>Create an employer account</h2>
      <p>
        You haven't posted a job before, so you'll need to create an employer
        account.
      </p>

      {role === "employer" ? (
        <form onSubmit={handleSubmit}>
          <label>
            Your company's name*
            <input
              type="text"
              name="companyName"
              id="companyName"
              required
              placeholder="eg: Amazon"
            />
          </label>

          <label>
            Your company's number of employees
            <select name="employees">
              <option value="1-10">1 to 10</option>
              <option value="11-50">11 to 50</option>
              <option value="51-149">50 to 149</option>
              <option value="150+">150+</option>
            </select>
          </label>

          <label>
            Your first and last name*
            <input
              type="text"
              name="name"
              required
              placeholder="eg:Fiza Khan"
            />
          </label>

          <label>
            Email Address*
            <input
              type="email"
              name="email"
              required
              placeholder="eg: fizasoorajkhan@gmail.com"
            />
          </label>

          <label>
            Company Address*
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
            Are you a hiring manager?
            <select name="hiringManager">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label>
            How you heard about us
            <select name="referral">
              <option value="mail">Mail</option>
              <option value="web">Web</option>
              <option value="friend">Friend</option>
            </select>
          </label>

          <label>
            Your phone number
            <div className="phone-input">
              <select name="countryCode">
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                name="phone"
                required
                placeholder="eg: 09306695193"
              />
            </div>
          </label>
          <label>
            Username*
            <input
              type="email"
              name="username"
              required
              placeholder="eg: fizasoorajkhan@gmail.com"
            />
          </label>
          <label>
            Password*
            <input type="password" name="password" required placeholder="" />
          </label>

          <button type="submit" className="continue-button">
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Your name*
            <input type="text" name="name" required placeholder="eg: Enter Full Name" />

          </label>

          <label>
            Email Address*
            <input
              type="email"
              name="email"
              required
              placeholder="eg: fizasoorajkhan@gmail.com"
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
            Willingness to relocate ?
            <select name="hiringManager">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label>
            Upload Resume
            <input type="file" name="resume" />
          </label>

          <label>
            Username*
            <input
              type="email"
              name="username"
              required
              placeholder="eg: fizasoorajkhan@gmail.com"
            />
          </label>
          <label>
            Password*
            <input type="password" name="password" required placeholder="" />
          </label>

          <button type="submit" className="continue-button">
            Register
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
