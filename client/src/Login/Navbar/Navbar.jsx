import React from "react";

import logo from "../../assests/Jobgenie.jpeg";

function Navbar() {
  return (
    
      <div className="fixed top-0 flex flex-col left-0 p-4">
        <div className="logo">
          <img src={logo} style={{ height: "70px", width: "auto" }} />
        </div>
        <p className="text-green-500 font-bold">JobGenie</p>
      </div>
     
    
  );
}

export default Navbar;
