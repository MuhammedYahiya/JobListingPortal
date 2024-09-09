import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <ul className="flex font-semibold items-center gap-5 p-4 justify-end mr-5">
          <li>Home</li>
          <li>Companies</li>
          <li>Jobs</li>
        </ul>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">ENTER YOUR COMPANY NAME</h1>
          <p className="text-gray-300">You can change this later</p>
        </div>

        <label>Company Name</label>
        <input type="text" className="my-2" placeholder="Name" />
        <label>Date</label>
        <input type="text" className="my-2" placeholder="Date" />
        <div className="flex flex-row items-center gap-2 my-10">
    <div className="bg-gray-300 text-white cursor-pointer p-2" onClick={() => navigate("/dashboard/employer")}>Cancel</div>
    <div className="bg-gray-300 text-white cursor-pointer p-2" >Continue</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
