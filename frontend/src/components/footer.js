import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>TrackerManager helps you organize and manage your projects efficiently.</p>
        </div>
        <div className="footer-section">
          <h3>Features</h3>
          <p><a href="#features">Project Management</a></p>
          <p><a href="#features">Task Tracking</a></p>
          <p><a href="#features">Team Collaboration</a></p>
        </div>
        <div className="footer-section">
          <h3>Links</h3>
          <p><a href="/">Home</a></p>
          <p><a href="/">Projects</a></p>
          <p><a href="/">Contact</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 TrackerManager. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;