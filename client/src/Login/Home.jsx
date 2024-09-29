import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import welcome from "../assests/Welcome.png";
import Navbar from "./Navbar/Navbar";
import JobSeeker from "../assests/Jobseeker.jpg";
import Employer from "../assests/Jobseeker.jpeg";

function Home() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // const handleNavigation = (action) => {
  //   if (!role) {
  //     alert("Please select a role before proceeding.");
  //   } else {
  //     const path = `/${action}/${role}`;
  //     navigate(path);
  //   }
  // };

  const handleNavigation = (role, action) => {
    const path = `/${action}/${role}`;
    navigate(path);
  };

  return (
    <div className="flex flex-col">
      <div className="container-full">
        <Navbar />
        <div className="content-container">
          <div className="job-board-title">
            <div className="job-board-title-item font-bold text-5xl text-green-500">
              #1
            </div>
            <div className="job-board-title-item font-bold text-4xl text-red-500">
              JOB BOARD
            </div>
          </div>

          <div className="job-board-subtitle">
            <div className="font-bold text-4xl text-gray-500">FOR HIRING</div>
            <div className="font-bold text-5xl text-gray-700">OR</div>
            <div className="font-bold text-4xl text-gray-500">
              FIND YOUR DREAM JOB
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center p-4">
        <div className="  bg-white  p-[20px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.3)] items-center flex flex-col w-[80%] ">
          <h1 className="font-sans font-bold  text-teal-600 text-6xl">
            Welcome to Job Genie
          </h1>
          <div className="flex w-full p-4 ">
            <div className="flex-1 flex  items-center gap-4 justify-center">
              <div className="flex flex-col">
                <img
                  className="p-4 w-[500px] h-[400px] object-cover"
                  src={Employer}
                  alt=""
                />
                <div className="flex gap-2">
                  <button
                    className="bg-emerald-500 hover:bg-emerald-600 font-bold"
                    onClick={() => handleNavigation("employer", "login")}
                  >
                    Login
                  </button>
                  <button
                    className="bg-emerald-500 hover:bg-emerald-600 font-bold"
                    onClick={() => handleNavigation("employer", "register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center  gap-4 items-center">
              <div className="flex flex-col">
                <img
                  className="p-4 w-[500px] h-[400px]"
                  src={JobSeeker}
                  alt=""
                />
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 font-bold"
                    onClick={() => handleNavigation("jobseeker", "login")}
                  >
                    Login
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 font-bold"
                    onClick={() => handleNavigation("jobseeker", "register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
