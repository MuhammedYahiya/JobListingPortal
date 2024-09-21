import React, { useContext, useState } from "react";
import { UserContext } from "../../../Login/UserContext";
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    setUser(userData); 
    setIsEditing(false); 
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-content">
        {/* About Me Section */}
        <div className="about-section">
          <h2>About me</h2>
          {isEditing ? (
            <textarea
              name="about"
              value={userData.about}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData.about}</p>
          )}
        </div>

        {/* Profile Image */}
        <div className="profile-image-container">
          <img
            src={userData.image}
            alt="Profile"
          />
          {isEditing && (
            <input
              type="url"
              name="image"
              value={userData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          )}
        </div>

        {/* Details Section */}
        <div className="details-section">
          <h2>Details</h2>
          <p>
            <strong>Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            ) : (
              userData.name
            )}
          </p>
          <p>
            <strong>Age:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
              />
            ) : (
              userData.age
            )}{" "}
            years
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
              />
            ) : (
              userData.location
            )}
          </p>

          {/* Social Media Links */}
          <div className="social-media">
            <label>
              Facebook:
              <input
                type="url"
                name="facebookLink"
                value={userData.facebookLink}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Twitter:
              <input
                type="url"
                name="twitterLink"
                value={userData.twitterLink}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Instagram:
              <input
                type="url"
                name="instagramLink"
                value={userData.instagramLink}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Save button when editing */}
      {isEditing && (
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
