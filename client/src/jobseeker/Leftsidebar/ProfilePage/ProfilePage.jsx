import React, { useContext, useState } from "react";
import { UserContext } from "../../../Login/UserContext";
import Leftsidebar from "../Leftsidebar";
import "./ProfilePage.css";
import axios from "axios";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");

  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    about: user.about || "",
    age: user.age || "",
    location: user.country || "",
    image: user.profilePicture || "https://via.placeholder.com/150",
    linkedinLink: user.socialMediaLink || "",
    resume: user.resume || null,

    skills: user.skills || [],

    address: user.address || "",
    jobtitlename: user.jobtitlename || "",
    city: user.city || "",
    state: user.state || "",
    pincode: user.pincode || "",
    positionType: user.positionType || "",
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
    const updatedSkills = userData.skills.filter(
      (_, skillIndex) => skillIndex !== index
    );
    setUserData({ ...userData, skills: updatedSkills });
  };

  // const handleResumeUpload = (e) => {
  //   const file = e.target.files[0];
  //   setUserData({ ...userData, resume: file });
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    console.log("Selected file:", file); 

    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    setImageLoading(true);
    setSelectedImage(file);

    console.log("Set selected image:", file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData({ ...userData, image: reader.result });
      setImageLoading(false);
      console.log("Image preview updated"); 
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    console.log("Selected resume file:", file); // Debug log

    if (!file) {
      alert("Please select a file");
      return;
    }

    // Validate file type if needed
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("File is too large. Please upload a file less than 5MB");
      return;
    }

    setSelectedResume(file);
    setResumeFileName(file.name);
    console.log("Resume file set:", file.name); // Debug log
  };

  const handleSave = () => {
    const saveUserData = async () => {
      try {
        const formData = new FormData();
        console.log("Creating FormData...");  

        formData.append("email", user.email);
        formData.append("age", userData.age);
        formData.append("address", user.address || "");
        formData.append("jobtitlename", user.jobtitlename || "");
        formData.append("city", user.city || "");
        formData.append("state", user.state || "");
        formData.append("country", userData.location);
        formData.append("pincode", user.pincode || "");
        formData.append("positionType", user.positionType || "");
        formData.append("socialMediaLink", userData.linkedinLink);

        if (selectedImage) {
          formData.append("profilePicture", selectedImage);
          console.log("Added profilePicture to FormData:", selectedImage);
        }

        if (selectedResume) {
          formData.append("resume", selectedResume);
          console.log("Added resume to FormData:", selectedResume.name);
        }


        const response = await axios.put(
          "http://localhost:8000/api/jobseeker/update",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setUser({
            ...user,
            ...response.data.jobseeker,
          });
          alert("Profile updated successfully");
        }
      } catch (error) {
        console.error("Update error:", error);
        alert(
          "Error updating profile: " +
            (error.response?.data?.message || error.message)
        );
      }
    };

    saveUserData();
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
                src={
                  imageLoading
                    ? "https://via.placeholder.com/150"
                    : userData.image
                }
                alt="Profile"
                className="profile-image"
              />
              {/* Image Upload Input */}
              {isEditing && (
                <div className="image-upload">
                  <label>
                    Upload Profile Picture:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
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

              {/* Age and Location */}
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
                    <a
                      href={userData.linkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                        onChange={(e) =>
                          handleSkillsChange(index, e.target.value)
                        }
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
            <>
              {user.resume ? (
                <a
                  href={user.resume}
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
            <input
              type="file"
              onChange={handleResumeUpload}
              accept=".pdf,.doc,.docx"
            />
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
