import { UserContext } from "../../Login/UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import React from "react";
import "./Leftsidebar.css";

const Leftsidebar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="left-sidebar">
      <div className="user-profile">
        <div className="profile-picture-container">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <h2 className="user-name">{user.name}</h2>
        <div className="user-info">
          <p><i className="icon email-icon"></i>{user.email}</p>
          <p><i className="icon job-icon"></i>{user.jobtitlename}</p>
          <p><i className="icon location-icon"></i>{user.city}</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/dashboard/Homesearch" activeClassName="active" end><i className="icon dashboard-icon"></i>Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/Homesearch/profile" activeClassName="active"><i className="icon profile-icon"></i>Profile</NavLink></li>
          <li><NavLink to="/dashboard/Homesearch/applications" activeClassName="active"><i className="icon applications-icon"></i>Applications</NavLink></li>
          <li><NavLink to="/" activeClassName="active"><i className="icon logout-icon"></i>Logout</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Leftsidebar;