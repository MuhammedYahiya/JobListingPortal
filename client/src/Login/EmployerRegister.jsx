import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="p-4 ">
      <div className=" flex flex-col justify-center items-center w-full h-screen  ">
        <div className=" flex flex-col  border-4 p-5 overflow-y-scroll  min-h-[100vh] border-gray-300 custom-scrollbar w-[70%] shadow-[2px_2px_5px_1px_rgba(0,0,0,0.3)]">
          <div className="flex text-4xl font-bold text-zinc-500 p-2 mb-5 text-stroke-3 bg-gray-600 tracking-wider justify-center">
            Employer Registration
          </div>
          <form onSubmit={handleSubmit} className="flex items-center justify-center">
            <label className="font-semibold text-red-900">
              Your Profile Pic to be displayed
              <input
                type="file"
                name="profilePicture"
                onChange={handleImageChange}
                required
                className="text-gray-600 "
              />
            </label>
            <label className="font-semibold text-blue-800">
              Company Name*
              <input
                type="text"
                name="companyName"
                required
                placeholder="e.g., Amazon"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>
            <label className="font-semibold text-blue-800">
              Your Name*
              <input
                type="text"
                name="name"
                required
                placeholder="e.g., John Doe"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>
            <label className="font-semibold text-blue-800">
              Company Address*
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
                className=" text-gray-500 tracking-wider font-normal font-serif outline-gray-400"
              />
            </label>

            <label className="font-semibold text-blue-800">
              Country*
              <input
                type="text"
                name="country"
                required
                placeholder="eg: USA"
                className=" font-normal text-gray-500 tracking-wider font-serif outline-gray-400"
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
              Are you a hiring manager?
              <select name="hiringManager">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <label className="font-semibold text-blue-800">
              Your phone number
              <input
                type="tel"
                name="phone"
                required
                placeholder="eg: 09306695193"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>
            <label className="font-semibold text-blue-800">
              Your company's number of employees
              <select name="employees">
                <option value="1-10">1 to 10</option>
                <option value="11-50">11 to 50</option>
                <option value="51-149">50 to 149</option>
                <option value="150+">150+</option>
              </select>
            </label>
            <label className="font-semibold text-blue-800">
              Email Address*
              <input
                type="email"
                name="email"
                required
                placeholder="e.g., john@company.com"
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>
            <label className="font-semibold text-blue-800">
              Password*
              <input
                type="password"
                name="password"
                required
                className=" text-gray-500 tracking-wider font-serif font-normal outline-gray-400"
              />
            </label>

            <button
              type="submit"
              className=" flex justify-center font-semibold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployerRegister;
