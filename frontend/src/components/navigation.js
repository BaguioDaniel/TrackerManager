import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className="logo">TrackerManager</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Projects</Link></li>
        <li><a href="#tasks">Tasks</a></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;