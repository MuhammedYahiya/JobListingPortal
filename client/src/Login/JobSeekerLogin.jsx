import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import "./JobseekerLogin.css";
import Login from "../assests/Login.png";

function JobSeekerLogin() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/jobseeker/login",
        {
          email,
          password,
          role: "jobseeker",
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Job Seeker login successful");
        setUser(response.data.user);
        navigate("/dashboard/Homesearch");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging in");
    }
  };

  return (
    <div
      className="flex justify-center items-center w-full min-h-screen bg-cover bg-center "
      style={{ backgroundImage: `url(${Login})` }}
    >
      <div className="flex items-center w-full min-h-[100vh] backdrop-blur justify-end  ">
        <div className="bg-[#00000066] p-6 rounded-md mr-60 flex flex-col gap-6 ">
          <h2 className="text-white font-sans p-2 text-xl">JobSeeker Login</h2>
          <form onSubmit={handleSubmit} className="items-center">
            <input type="email" name="email" placeholder="Email" className="text-gray-700 font-medium font-sans tracking-wider" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              
              required
            />
            <button type="submit" className="hover:bg-blue-800">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default JobSeekerLogin;
