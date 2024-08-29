import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Await, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

const JObSeekerDash = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex align-top  top-0 left-0 fixed p-4">
        {`DashBoard ${user?.name}`}
      </div>
      <div className="Navbar-cont flex  top-0 right-5 fixed gap-10 p-4 ">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </div>
    </>
  );
};

export default JObSeekerDash;
