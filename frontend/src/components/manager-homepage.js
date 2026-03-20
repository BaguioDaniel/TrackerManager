import React from 'react';

function ManagerHomepage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <section className="homepage manager-homepage">
      <div className="homepage-content">
        <div className="manager-badge">
          <span className="badge-icon">👔</span>
          <span className="badge-text">MANAGER</span>
        </div>
        <h1>Welcome Manager, {user.firstName || 'Admin'}</h1>
        <p>Manage your projects, track progress, and oversee team activities</p>
        <div className="manager-features">
          <div className="feature-card">
            <h3>Team Overview</h3>
            <p>View all team members and their project assignments</p>
          </div>
          <div className="feature-card">
            <h3>Project Management</h3>
            <p>Create and manage projects with full control</p>
          </div>
          <div className="feature-card">
            <h3>Reports & Analytics</h3>
            <p>Generate detailed reports on project progress</p>
          </div>
        </div>
        <button className="cta-button manager-button">View Dashboard</button>
      </div>
    </section>
  );
}

export default ManagerHomepage;
