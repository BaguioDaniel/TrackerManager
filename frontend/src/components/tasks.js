import React from 'react';

function Tasks({ projects }) {
  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projects && projects.length > 0 ? (
          projects.map(project => (
            <div key={project.sys.id} className="project-card">
              <h3>{project.fields.title}</h3>
              <img>{project.fields.thumbnail}</>
              <img>{project.fields.featured-image}</img>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </section>
  );
}

export default Tasks;