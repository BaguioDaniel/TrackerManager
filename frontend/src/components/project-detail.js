import React from 'react';
import { useParams, Link } from 'react-router-dom';
import logger from '../services/logger';
import { getImageUrl, createImageHandlers } from '../utils/imageUtils';
import { LOG_EVENTS, IMAGE_TYPES } from '../utils/constants';
import { useProjectBySlug } from '../hooks/useProjectBySlug';
import '../styles/project-detail.css';

function ProjectDetail({ projects }) {
  const { slug } = useParams();
  const { project, error } = useProjectBySlug(projects, slug);

  if (error || !project) {
    return (
      <section className="project-detail">
        <Link to="/projects" className="back-link">← Back to Projects</Link>
        <p>Project not found.</p>
      </section>
    );
  }

  return (
    <section className="project-detail">
      <Link to="/projects" className="back-link">← Back to Projects</Link>
      <div className="project-detail-content">
        <h1>{project.fields.title}</h1>
        
        {project.fields.description && (
          <p className="description">{project.fields.description}</p>
        )}
        
        {project.fields.featuredImage && (
          <img 
            src={getImageUrl(project.fields.featuredImage)} 
            alt={project.fields.title} 
            className="featured-image"
            {...createImageHandlers(project.fields.title, IMAGE_TYPES.FEATURED, logger)}
          />
        )}
        
        {project.fields.thumbnail && (
          <img 
            src={getImageUrl(project.fields.thumbnail)} 
            alt={project.fields.title} 
            className="thumbnail"
            {...createImageHandlers(project.fields.title, IMAGE_TYPES.THUMBNAIL, logger)}
          />
        )}
        
        {project.fields.content && (
          <div className="content">{project.fields.content}</div>
        )}
      </div>
    </section>
  );
}

export default ProjectDetail;
