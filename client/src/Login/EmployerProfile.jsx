import React from "react";

import { UserContext } from "./UserContext";
import { useContext } from "react";

const EmployerProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col  bg-white">
      <div className="text-5xl p-2 font-bold text-blue-600 my-8 ml-10">Profile</div>
      {user.image && <img src={user.image} alt="Profile" className="w-40 h-40 rounded-full object-cover" />}
      <div className=" text-xl flex flex-col gap-4 p-2">
        <p className="ml-12 text-5xl text-slate-600 font-serif font-semibold">{user.name}</p>
        <p className="uppercase ml-20 font-serif italic text-lime-500 font-bold">
          ({user.positionType} - {user.companyName})
        </p>
        <p>Hiring Manager- {user.hiringManager}</p>
        <p>
          Company Address - {user.address}, {user.city}, {user.state}, {user.country}
        </p>
        <p>Contact: - {user.phone}</p>
        <p>
          Total employees working -{">"} {user.employees}
        </p>
        <p>Social Media Link - {user.socialMediaLink}</p>
      </div>
    </div>
  );
};

export default EmployerProfile;