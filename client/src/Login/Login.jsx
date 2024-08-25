import React from "react";
import Welcome from "./Welcome.jpg";

const Login = () => {
  return (
    <div className="login-div flex flex-row">
      <div className="login-left flex-1 p-4">
        <span className="p-2 bg-slate-600 text-white font-serif font-semibold">
          JobPortal
        </span>
        <div className="flex flex-row gap-4 justify-end p-4 font-serif font-semibold text-white">
          <button className="bg-blue-600 p-2">POST A JOB</button>
          <button className="bg-green-600 p-2">WANT A JOB</button>
        </div>

        <div className="flex font-bold text-5xl justify-center mt-20 text-gray-800 italic font-serif ">
          Create an account{" "}
        </div>
        <div className="flex font-bold text-xl justify-center mt-5 text-gray-700 italic font-serif">
          {" "}
          for tools to help you
        </div>
        <div className="flex flex-col mt-10 gap-5">
          <button className=" border-gray-500  border-2 text-2xl font-bold p-3 text-blue-500 tracking-wider">
            Employer
          </button>
          <button className=" border-gray-500 border-2 text-2xl font-bold p-3 text-blue-500 tracking-wider">
            Jobseeker
          </button>
        </div>
      </div>
      <div className="login-right flex-1 p-4">
        <img className="" src={Welcome} alt="" />
      </div>
    </div>
  );
};

export default Login;
