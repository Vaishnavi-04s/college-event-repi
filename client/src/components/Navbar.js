import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Example: Replace with real auth logic
  const isAuthenticated = false; 

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">College Events</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/events">All Events</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/events/create">Create Event</Link>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;