import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <section className="landing-page">
      <div className="landing-content">
        <h1>TrackerManager</h1>
        <p className="tagline">Manage your projects and tasks efficiently</p>
        <p className="description">
          TrackerManager is a powerful project and task management tool designed to help you organize, track, and complete your work with ease. 
          Whether you're managing a team or organizing personal projects, TrackerManager has you covered.
        </p>
        <div className="cta-buttons">
          <Link to="/login" className="cta-button primary-btn">Login</Link>
          <Link to="/signup" className="cta-button secondary-btn">Sign Up</Link>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
