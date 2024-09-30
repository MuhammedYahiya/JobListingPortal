import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Login/UserContext";
import axios from "axios";
import Leftsidebar from "../Leftsidebar";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext); // Access user and setUser from UserContext
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: user?.name || "",
    about: user?.about || "",
    age: user?.age || "",
    location: user?.location || "",
    image: user?.profilePicture || "https://via.placeholder.com/150",
    linkedinLink: user?.linkedinLink || "",
    resume: null,
    skills: user?.skills || [],
  });

  // Fetch profile data if not available in the context (fallback)
  useEffect(() => {
    if (!user) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get("/api/profile");
          const profileData = response.data;
          setUserData({
            name: profileData.name,
            about: profileData.about,
            age: profileData.age,
            location: profileData.location,
            image: profileData.profilePicture || "https://via.placeholder.com/150",
            linkedinLink: profileData.linkedinLink,
            resume: profileData.resume,
            skills: profileData.skills,
          });
          setUser(profileData); // Update context with fetched data
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfileData();
    }
  }, [user, setUser]);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    setImageLoading(true);

    reader.onloadend = () => {
      setUserData({ ...userData, image: reader.result });
      setImageLoading(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("about", userData.about);
      formData.append("age", userData.age);
      formData.append("location", userData.location);
      formData.append("linkedinLink", userData.linkedinLink);
      formData.append("skills", JSON.stringify(userData.skills));
      if (userData.resume) {
        formData.append("resume", userData.resume);
      }
      if (userData.image) {
        formData.append("profilePicture", userData.image);
      }

      const response = await axios.put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data.jobseeker); // Update context with new profile data
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    }
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
              <img
                src={imageLoading ? "https://via.placeholder.com/150" : userData.image}
                alt="Profile"
                className="profile-image"
              />
              {isEditing && (
                <div className="image-upload">
                  <label>
                    Upload Profile Picture:
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              )}
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

              <div className="profile-info">
                <label>
                  Age:
                  {!isEditing ? (
                    <span>{userData.age}</span>
                  ) : (
                    <input
                      name="age"
                      value={userData.age}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  )}
                </label>

                <label>
                  Location:
                  {!isEditing ? (
                    <span>{userData.location}</span>
                  ) : (
                    <input
                      name="location"
                      value={userData.location}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  )}
                </label>

                <label>
                  LinkedIn:
                  {!isEditing ? (
                    <a href={userData.linkedinLink} target="_blank" rel="noopener noreferrer">
                      {userData.linkedinLink || "No LinkedIn link"}
                    </a>
                  ) : (
                    <input
                      name="linkedinLink"
                      value={userData.linkedinLink}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  )}
                </label>
              </div>
            </div>
          </div>

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

        <div className="resume-upload">
          <label>Upload Resume: </label>
          {!isEditing ? (
            <>
              {userData.resume ? (
                <a
                  href={URL.createObjectURL(userData.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                >
                  View Resume
                </a>
              ) : (
                <p>No file uploaded</p>
              )}
            </>
          ) : (
            <input type="file" onChange={handleResumeUpload} />
          )}
        </div>

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
