import { useEffect, useState } from 'react';
import logger from '../services/logger';
import { LOG_EVENTS } from '../utils/constants';

/**
 * Custom hook to find a project by slug from projects list
 * @param {Array} projects - Array of project objects from Contentful
 * @param {string} slug - The slug to search for
 * @returns {Object} - { project, isLoading, error }
 */
export const useProjectBySlug = (projects, slug) => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (projects && projects.length > 0) {
      const found = projects.find(p => p.fields.slug === slug);
      
      if (found) {
        logger.log(LOG_EVENTS.PROJECT_DETAIL_FOUND, {
          slug,
          title: found.fields.title,
          allFields: Object.keys(found.fields)
        });
        setProject(found);
      } else {
        logger.warn(LOG_EVENTS.PROJECT_DETAIL_NOT_FOUND, {
          slug,
          availableSlugs: projects.map(p => p.fields.slug)
        });
        setError('Project not found');
      }
    }

    setIsLoading(false);
  }, [projects, slug]);

  return { project, isLoading, error };
};
