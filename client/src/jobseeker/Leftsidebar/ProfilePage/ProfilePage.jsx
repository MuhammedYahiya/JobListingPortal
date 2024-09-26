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
    linkedinLink: user.linkedinLink || "",
    resume: user.resume || null,
    skills: user.skills || ["Skill 1", "Skill 2", "Skill 3"],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSkillsChange = (index, newSkill) => {
    const updatedSkills = [...userData.skills];
    updatedSkills[index] = newSkill;
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    setUserData({ ...userData, skills: [...userData.skills, ""] });
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = userData.skills.filter((_, skillIndex) => skillIndex !== index);
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, resume: file });
  };

  const handleSave = () => {
    setUser(userData);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page-container">
      <Leftsidebar />
      <div className="profile-container">
        <div className="profile-header">
          <h2 className="profile-title">A BIT ABOUT ME</h2>
          {!isEditing ? (
            <h1 className="profile-name text-blue-700 font-bold text-4xl mb-2">
              {userData.name}
            </h1>
          ) : (
            <input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="edit-name-input center-name"
            />
          )}
        </div>

        
        <div className="main-info-container">
      
          <div className="about-details-container">
            <div className="about-blue-box">
              {/* Profile Image */}
              <img
                src={userData.image}
                alt="Profile"
                className="profile-image"
              />
              {/* About Text */}
              <div className="about-text">
                {!isEditing ? (
                  <p>{userData.about}</p>
                ) : (
                  <textarea
                    name="about"
                    value={userData.about}
                    onChange={handleInputChange}
                    className="edit-about"
                  />
                )}
              </div>

              {/* Age */}
              <div className="profile-info">
                <label>
                  Age:
                  {!isEditing ? (
                    <span>{userData.age}</span>
                  ) : (
                    <div className="inline-edit">
                      <input
                        name="age"
                        value={userData.age}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </div>
                  )}
                </label>

                {/* Location */}
                <label>
                  Location:
                  {!isEditing ? (
                    <span>{userData.location}</span>
                  ) : (
                    <div className="inline-edit">
                      <input
                        name="location"
                        value={userData.location}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </div>
                  )}
                </label>

                {/* LinkedIn Link */}
                <label>
                  LinkedIn:
                  {!isEditing ? (
                    <a href={userData.linkedinLink} target="_blank" rel="noopener noreferrer">
                      {userData.linkedinLink || "No LinkedIn link"}
                    </a>
                  ) : (
                    <div className="inline-edit">
                      <input
                        name="linkedinLink"
                        value={userData.linkedinLink}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="skills-container">
            <h3 className="skills-title">Skills</h3>
            <ul className="skills-list">
              {!isEditing
                ? userData.skills.map((skill, index) => (
                    <li key={index} className="skill-item">
                      {skill}
                    </li>
                  ))
                : userData.skills.map((skill, index) => (
                    <li key={index} className="skill-item">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillsChange(index, e.target.value)}
                        className="edit-skill-input"
                      />
                      <button
                        className="delete-skill-button"
                        onClick={() => handleDeleteSkill(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
            </ul>
            {isEditing && (
              <button className="add-skill-button" onClick={handleAddSkill}>
                Add Skill
              </button>
            )}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="resume-upload">
          <label>Upload Resume: </label>
          {!isEditing ? (
            <p>{userData.resume ? userData.resume.name : "No file uploaded"}</p>
          ) : (
            <input type="file" onChange={handleResumeUpload} />
          )}
        </div>

        {/* Edit/Save Button for Entire Profile */}
        <div className="edit-save-buttons">
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          {isEditing && (
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
