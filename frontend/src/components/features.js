import React from 'react';

function Features() {
  return (
    <section className="features">
      <h2>Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>📊 Track Progress</h3>
          <p>Monitor project progress in real-time</p>
        </div>
        <div className="feature-card">
          <h3>✅ Manage Tasks</h3>
          <p>Organize and prioritize your tasks</p>
        </div>
        <div className="feature-card">
          <h3>👥 Collaborate</h3>
          <p>Work together with your team members</p>
        </div>
        <div className="feature-card">
          <h3>📈 Analytics</h3>
          <p>View detailed reports and insights</p>
        </div>
      </div>
    </section>
  );
}

export default Features;