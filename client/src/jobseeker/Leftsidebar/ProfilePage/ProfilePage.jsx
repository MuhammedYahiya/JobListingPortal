import React, { useContext, useState } from "react";
import { UserContext } from "../../../Login/UserContext";
import Leftsidebar from "../Leftsidebar"; 
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext); 
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name || "John Doe",
    about: user.about || "I am a highly motivated job seeker with a passion for my field.",
    age: user.age || "N/A",
    location: user.location || "Unknown",
    image: user.image || "https://via.placeholder.com/150",
    facebookLink: user.facebookLink || "",
    twitterLink: user.twitterLink || "",
    instagramLink: user.instagramLink || "",
    resume: user.resume || null, // Store resume file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Function to handle resume file upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, resume: file });
  };

  const handleSave = () => {
    setUser(userData); 
    setIsEditing(false); 
  };

  return (
    <div className="profile-page-container">
      <Leftsidebar /> 
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile</h1>
          {/* <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button> */}
        </div>

        <div className="flex flex-col bg-gray-100 min-h-screen py-10 px-4">
          {/* Profile Header */}
          <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-blue-700 mb-4">{user.name} </h1>
              <div className="text-2xl text-gray-500 italic uppercase">
                {user.jobtitlename} 
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
                <p className="font-semibold text-gray-700">Skills:</p>
                <p className="text-lg font-medium text-gray-900">HTML5, CSS3, Javascript </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Experience:</p>
                <p className="text-xl font-medium text-gray-900">5 years</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">PositionType:</p>
                <p className="text-xl font-medium text-gray-900 uppercase">{user.positionType}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700"> Address:</p>
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
              <div>
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-lg font-medium underline text-blue-500">{user.email}</p>
              </div>

              {/* Display Resume */}
              <div>
                <p className="font-semibold text-gray-700">Resume:</p>
                <input className="text-sm flex " type="file" />
              </div>
            </div>

            {/* Upload Resume (Visible only when editing) */}
            {isEditing && (
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Save button when editing */}
        {isEditing && (
          <button className="save-button mt-4" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
