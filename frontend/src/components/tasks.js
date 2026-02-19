import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logger from '../services/logger';
import { getImageUrl, createImageHandlers } from '../utils/imageUtils';
import { LOG_EVENTS, IMAGE_TYPES } from '../utils/constants';

function Tasks({ projects }) {
  useEffect(() => {
    if (projects && projects.length > 0) {
      logger.log(LOG_EVENTS.TASKS_RENDER, {
        projectCount: projects.length,
        projects: projects.map(p => ({
          title: p.fields.title,
          slug: p.fields.slug,
          hasThumbnail: !!p.fields.thumbnail,
          hasFeaturedImage: !!p.fields.featuredImage
        }))
      });
    } else {
      logger.warn(LOG_EVENTS.TASKS_NO_PROJECTS, 'No projects to render');
    }
  }, [projects]);

  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projects && projects.length > 0 ? (
          projects.map(project => (
            <Link key={project.sys.id} to={`/projects/${project.fields.slug}`} style={{ textDecoration: 'none' }}>
              <div className="project-card">
                <h3>{project.fields.title}</h3>
                {project.fields.thumbnail && (
                  <img 
                    src={getImageUrl(project.fields.thumbnail)}
                    alt={project.fields.title}
                    className="project-image"
                    {...createImageHandlers(project.fields.title, IMAGE_TYPES.THUMBNAIL, logger)}
                  />
                )}
              </div>
            </Link>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </section>
  );
}

export default Tasks;
