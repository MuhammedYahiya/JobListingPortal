
import React from 'react';
import './Navbar.css'; 
import logo from '../../assests/Jobgenie.jpeg'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
          
      <img src={logo} style={{ height: '70px', width: 'auto' }}/></div>
      <p>JobGenie</p>
    </nav>
  );
}

export default Navbar;
