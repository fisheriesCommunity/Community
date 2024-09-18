import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-complaint">Add Complaint</Link></li>
        <li><Link to="/process">Process</Link></li>
        <li><Link to="/complaint-details">Complaint Details</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
