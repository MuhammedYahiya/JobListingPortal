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
    if (!isLogin) {
      setIsLogin(true);
      alert("You have registered successfully!");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login-page flex flex-col">
      <div className="navbar bg-slate-600">{/* make navbar */}</div>
      <div className="login-div flex flex-row">
        <div className="login-left flex flex-1 p-4 justify-center items-center  ">
          <form className="flex flex-col gap-8  p-4 " onSubmit={handleSubmit}>
            <div className="flex justify-start">
              <img className="h-10 w-10" src={JOB} alt="" />
              <div className="font-semibold font-serif text-blue-600 tracking-wide">
                JobGene
              </div>
            </div>

            <div className="font-bold text-5xl flex justify-center text-gray-800 italic font-serif ">
              {isLogin ? "Login" : "Register"}
            </div>

            {!isLogin && (
              <>
                <div className="flex gap-2">
                  <label className="font-bold">Name:</label>
                  <input
                    type="text"
                    className="border-gray-500 border-2 rounded-lg w-full pl-2 font-medium"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <label className="font-bold">Age:</label>
                  <input
                    type="number"
                    className="border-gray-500 border-2 rounded-lg w-full pl-2 font-medium"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <label className="font-bold">Contact:</label>
                  <input
                    type="tel"
                    className="border-gray-500 border-2 rounded-lg w-full pl-2 font-medium"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <label className="font-bold">Role:</label>
                  <select
                    className="border-gray-500 border-2 rounded-lg w-full pl-2 font-medium"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="jobSeeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
              </>
            )}

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

            <button
              className="text-white bg-green-500 p-3 font-bold tracking-wider hover:bg-green-700"
              type="submit"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <div className="flex flex-row gap-2 text-blue-500 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <div
                className="text-white bg-blue-500 p-2 cursor-pointer hover:bg-blue-700"
                onClick={handleToggleForm}
              >
                {isLogin ? "Register here." : "Login here."}
              </div>
            </div>
          </form>
        </div>
        <div className="login-right flex-1 p-4">
          <img className="" src={Welcome} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
