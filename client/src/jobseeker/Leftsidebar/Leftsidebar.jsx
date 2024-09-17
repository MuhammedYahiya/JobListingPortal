

import React from "react";
import "./Leftsidebar.css";

const Leftsidebar = ({ user }) => {
  return (
    <div className="left-sidebar">
      <div className="user-details">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h3 className="user-name">{user.name}</h3>
        <p className="user-role">{user.role}</p>
      </div>
      <div className="user-info">
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Location: {user.location}</p>
      </div>
      <div className="sidebar-links">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/applications">Applications</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Leftsidebar;
