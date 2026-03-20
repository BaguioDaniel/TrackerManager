import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <section className="homepage user-homepage">
      <div className="homepage-content">
        <h1>Welcome, {user.firstName || 'User'}</h1>
        <p>Track your projects and manage tasks efficiently</p>
        <div className="user-features">
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <div className="feature-card">
              <h3>My Projects</h3>
              <p>View and work on your assigned projects</p>
            </div>
          </Link>
          <div className="feature-card">
            <h3>My Tasks</h3>
            <p>Keep track of your assigned tasks</p>
          </div>
          <div className="feature-card">
            <h3>Progress</h3>
            <p>Monitor your personal progress and achievements</p>
          </div>
        </div>
        <Link to="/get-started" style={{ textDecoration: 'none' }}>
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
    </section>
  );
}

export default Homepage;