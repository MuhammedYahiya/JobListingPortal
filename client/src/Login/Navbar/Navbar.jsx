
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from '../../assests/Jobgenie.jpeg'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
          
      <img src={logo} style={{ height: '70px', width: 'auto' }}/></div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
