import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaTicketAlt, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FaBus /> BusBooking
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/my-bookings" className="nav-link">
              <FaTicketAlt /> My Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              <FaUserCircle />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;