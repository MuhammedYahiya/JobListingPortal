import React from "react";
import Welcome from "./Welcome.jpg";
import { useState } from "react";
import JOB from "./Jobgenie.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("  ");
    setPassword("");
    setRole("");
  };
  return (
    <div className="login-div flex flex-row">
      <div className="login-left flex flex-1 p-4 justify-center items-center">
        <form className="flex flex-col gap-8  p-4 " onSubmit={handleSubmit}>
          <div className="flex justify-start">
            <img className="h-10 w-10" src={JOB} alt="" />
            <div className="font-semibold font-serif text-blue-600 tracking-wide">
              JobGene
            </div>
          </div>

          <div className="font-bold text-5xl justify-center text-gray-800 italic font-serif ml-[100px]">
            Login
          </div>

          <div className=" flex gap-2">
            <label className="font-bold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-500 border-2 rounded-lg w-full pl-2 font-medium"
              required
            />
          </div>
          <div className=" flex gap-2">
            <label className="font-bold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-500 border-2 rounded-lg w-full pl-2 font-medium"
              required
            />
          </div>
          <div className=" flex gap-2">
            <label className="font-bold">Role:</label>
            <select
              className="border-gray-500 border-2 rounded-lg w-full pl-2 font-medium"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Select"></option>
              <option value="jobSeeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <button
            className="text-white bg-green-500 p-3 font-bold tracking-wider"
            type="submit"
          >
            Login
          </button>
          <div className="flex flex-row gap-2 text-blue-500 font-medium">
            Don't have an account?
            <button className="text-white bg-blue-500 p-2">
              Register here.
            </button>
          </div>
        </form>
      </div>
      <div className="login-right flex-1 p-4">
        <img className="" src={Welcome} alt="" />
      </div>
    </div>
  );
};

export default Login;
