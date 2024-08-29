
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add styling for the navbar

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
