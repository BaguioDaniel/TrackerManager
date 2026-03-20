import React from 'react';
import { Link } from 'react-router-dom';

function GetStarted() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <section className="get-started-page">
      <div className="get-started-container">
        <div className="get-started-header">
          <h1>Getting Started with TrackerManager</h1>
          <p>Learn how to manage your projects efficiently</p>
        </div>

        <div className="getting-started-content">
          <div className="step-section">
            <h2>How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Browse Projects</h3>
                <p>Navigate to the Projects page to view all available projects. Each project contains detailed information and tasks assigned to you.</p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Select a Project</h3>
                <p>Click on any project to view its full details, including description, images, content, and associated tasks.</p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Track Your Progress</h3>
                <p>Monitor your task completion status and stay updated on project milestones. Your progress is tracked in real-time.</p>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <h3>Manage Tasks</h3>
                <p>Keep track of your assigned tasks, update their status, and collaborate with your team members on project deliverables.</p>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2>Key Features</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <div>
                  <h4>Project Management</h4>
                  <p>View comprehensive project information curated from Contentful.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h4>Task Tracking</h4>
                  <p>Track and manage all your assigned tasks in one place.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <div>
                  <h4>Progress Monitoring</h4>
                  <p>Follow your personal progress and achievements over time.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <div>
                  <h4>Team Collaboration</h4>
                  <p>Work seamlessly with your team members on shared projects.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="tips-section">
            <h2>Pro Tips</h2>
            <ul className="tips-list">
              <li>Start by exploring different projects to understand what's available</li>
              <li>Keep your task status updated to help your team stay informed</li>
              <li>Check the Projects page regularly for new assignments</li>
              <li>Use your user profile to keep your information current</li>
            </ul>
          </div>

          <div className="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Browse all available projects and start tracking your work today!</p>
            <Link to="/projects" style={{ textDecoration: 'none' }}>
              <button className="cta-button-large">View All Projects</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
