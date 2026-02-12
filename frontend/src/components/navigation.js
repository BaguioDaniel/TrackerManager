import React from 'react';

function Navigation() {
  return (
    <nav className="navigation">
      <h1 className="logo">TrackerManager</h1>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/tasks">Tasks</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;