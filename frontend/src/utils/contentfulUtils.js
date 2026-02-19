import { createClient } from 'contentful';
import logger from '../services/logger';
import { LOG_EVENTS } from './constants';

/**
 * Creates and returns a Contentful API client
 * @returns {Object|null} - Contentful client instance or null if config missing
 */
export const createContentfulClient = () => {
  const spaceId = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_KEY;

  if (!spaceId || !accessToken) {
    logger.error(LOG_EVENTS.CONTENTFUL_CONFIG_ERROR, {
      spaceMissing: !spaceId,
      tokenMissing: !accessToken
    });
    return null;
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
  });
};

/**
 * Fetches projects from Contentful
 * @param {Object} client - Contentful client instance
 * @returns {Promise<Array>} - Array of project entries
 */
export const fetchContentfulProjects = async (client) => {
  if (!client) {
    throw new Error('Contentful client not initialized');
  }

  logger.log(LOG_EVENTS.CONTENTFUL_FETCH_START, 'Fetching projects from Contentful...');

  const res = await client.getEntries({ content_type: 'projects' });

  logger.log(LOG_EVENTS.CONTENTFUL_FETCH_SUCCESS, {
    totalProjects: res.items.length,
    projects: res.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      allFields: Object.keys(item.fields)
    }))
  });

  return res.items;
};
