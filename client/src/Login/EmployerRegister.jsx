import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { useState } from "react";

function EmployerRegister() {
  const [imageBase64, setImageBase64] = useState("");

  // Convert the image to Base64 when selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); // Set the image in Base64 format
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/employer/register",
        {
          email: data.email,
          password: data.password,
          name: data.name,
          companyName: data.companyName,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          positionType: data.positionType,
          socialMediaLink: data.socialMediaLink,
          hiringManager: data.hiringManager,
          phone: data.phone,
          employees: data.employees,
          profilePicture: imageBase64,
        }
      );

      if (response.status === 200) {
        alert("Employer registered successfully");
        navigate("/");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering employer");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center w-full min-h-[100vh]">
      {/* container-full */}
      <div className=" flex flex-col justify-center items-center border-4 p-5  min-h-[100vh]">
      {/* register-container */}
        <div className="text-2xl">Employer Registration</div>
        <form onSubmit={handleSubmit}>
          <label>
            Your Profile Pic to be displayed
            <input
              type="file"
              name="profilePicture"
              onChange={handleImageChange}
              required
            />
          </label>
          <label>
            Company Name*
            <input
              type="text"
              name="companyName"
              required
              placeholder="e.g., Amazon"
            />
          </label>
          <label>
            Your Name*
            <input
              type="text"
              name="name"
              required
              placeholder="e.g., John Doe"
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
            Your phone number
            <input
              type="tel"
              name="phone"
              required
              placeholder="eg: 09306695193"
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
            Email Address*
            <input
              type="email"
              name="email"
              required
              placeholder="e.g., john@company.com"
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

export default EmployerRegister;
