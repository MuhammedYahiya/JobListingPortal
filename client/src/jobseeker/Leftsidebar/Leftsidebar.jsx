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
        <h3 className="user-name">{user.name}</h3>
        <p className="user-role">{user.role}</p>
      </div>
      <div className="user-info">
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Location: {user.city}</p>
      </div>
      <div className="sidebar-links">
        <ul>

        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/applications">Applications</NavLink></li>
          <li><NavLink to="/logout">Logout</NavLink></li>

        </ul>
      </div>
    </div>
  );
};

export default Leftsidebar;
