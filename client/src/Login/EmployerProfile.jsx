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
          <h1 className="text-5xl font-bold text-blue-700 mb-4">{user.name} </h1>
          <div className="text-2xl text-gray-500 italic uppercase">
            {user.positionType} - {user.companyName}
          </div>
        </div>

        {/* Profile Image */}
        {user.profilePicture && (
          <div className="flex justify-center mb-8">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />
          </div>
        )}

        {/* Profile Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg">
          <div>
            <p className="font-semibold text-gray-700">Name:</p>
            <p className="text-xl font-medium text-gray-900">{user.name}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Hiring Manager:</p>
            <p className="text-xl font-medium text-gray-900">{user.hiringManager}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Contact:</p>
            <p className="text-xl font-medium text-gray-900">{user.phone}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Employees:</p>
            <p className="text-xl font-medium text-gray-900">{user.employees}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Company Address:</p>
            <p className="text-lg text-gray-900">
              {user.address}, {user.city}, {user.state}, {user.country}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Social Media Link:</p>
            <p className="text-lg text-blue-500 underline">
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
