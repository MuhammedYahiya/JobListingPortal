import { UserContext } from "../../Login/UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import React from "react";
import "./Leftsidebar.css";

const Leftsidebar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="left-sidebar">
      <div className="user-details">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <div className="user-name">{user.name}</div>
        
      </div>
      <div className="user-info">
        <p>Email: {user.email}</p>
        <p>JobTitle: {user.jobtitlename}</p>
        <p>Location: {user.city}</p>
      </div>
      <div className="sidebar-links">
        <ul>

        <li><NavLink to="/dashboard/Homesearch">Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/Homesearch/profile">Profile</NavLink></li>
          <li><NavLink to="/applications">Applications</NavLink></li>
          <li><NavLink to="/">Logout</NavLink></li>

        </ul>
      </div>
    </div>
  );
};

export default Leftsidebar;
