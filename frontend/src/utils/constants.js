/**
 * Logger Event Constants
 * Centralized event names for consistent logging across the application
 */
export const LOG_EVENTS = {
  // Contentful operations
  CONTENTFUL_FETCH_START: 'CONTENTFUL_FETCH_START',
  CONTENTFUL_FETCH_SUCCESS: 'CONTENTFUL_FETCH_SUCCESS',
  CONTENTFUL_FETCH_ERROR: 'CONTENTFUL_FETCH_ERROR',
  CONTENTFUL_CONFIG_ERROR: 'CONTENTFUL_CONFIG_ERROR',

  // Project detail page
  PROJECT_DETAIL_FOUND: 'PROJECT_DETAIL_FOUND',
  PROJECT_DETAIL_NOT_FOUND: 'PROJECT_DETAIL_NOT_FOUND',

  // Image loading
  IMAGE_LOADED: 'IMAGE_LOADED',
  IMAGE_FAILED: 'IMAGE_FAILED',

  // Tasks/Projects list
  TASKS_RENDER: 'TASKS_RENDER',
  TASKS_NO_PROJECTS: 'TASKS_NO_PROJECTS',
};

/**
 * Image type constants
 */
export const IMAGE_TYPES = {
  THUMBNAIL: 'thumbnail',
  FEATURED: 'featured',
};

/**
 * CSS class names (for reference and consistency)
 */
export const CSS_CLASSES = {
  BACK_LINK: 'back-link',
  PROJECT_CARD: 'project-card',
  FEATURED_IMAGE: 'featured-image',
  THUMBNAIL_IMAGE: 'thumbnail-image',
};
