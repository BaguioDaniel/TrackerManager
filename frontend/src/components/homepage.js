import React from 'react';

function Homepage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <section className="homepage user-homepage">
      <div className="homepage-content">
        <h1>Welcome, {user.firstName || 'User'}</h1>
        <p>Track your projects and manage tasks efficiently</p>
        <div className="user-features">
          <div className="feature-card">
            <h3>My Projects</h3>
            <p>View and work on your assigned projects</p>
          </div>
          <div className="feature-card">
            <h3>My Tasks</h3>
            <p>Keep track of your assigned tasks</p>
          </div>
          <div className="feature-card">
            <h3>Progress</h3>
            <p>Monitor your personal progress and achievements</p>
          </div>
        </div>
        <button className="cta-button">Get Started</button>
      </div>
    </section>
  );
}

export default Homepage;