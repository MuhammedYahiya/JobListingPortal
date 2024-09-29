import React from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const EmployerProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen py-10 px-4">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold p-3 bg-gradient-to-r from-cyan-300 to-cyan-600 mb-4 text-white">{user.name} </h1>
          <div className="text-2xl gradient-text  italic uppercase font-bold">
            {user.positionType} - {user.companyName}
          </div>
        </div>

        {/* Profile Image */}
        {user.profilePicture && (
          <div className="flex justify-center mb-8">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-[200px] h-[200px] rounded-full object-cover border-4 border-gray-500"
            />
          </div>
        )}

        {/* Profile Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-3xl font-serif">Email:</p>
            <p className="text-xl font-medium text-zinc-500 italic ">{user.email}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-3xl font-serif">Hiring Manager:</p>
            <p className="text-xl font-medium  text-zinc-500 italic">{user.hiringManager}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-3xl font-serif">Contact:</p>
            <p className="text-xl font-medium  text-zinc-500 italic">{user.phone}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-3xl font-serif">Employees:</p>
            <p className="text-xl font-medium  text-zinc-500 italic">{user.employees}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-3xl font-serif">Company Address:</p>
            <p className="text-lg  text-zinc-500 italic">
              {user.address}, {user.city}, {user.state}, {user.country}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-3xl font-serif">Social Media Link:</p>
            <p className="text-lg font-medium text-blue-500 underline">
              <a href={user.socialMediaLink} target="_blank" rel="noreferrer">
                {user.socialMediaLink}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
