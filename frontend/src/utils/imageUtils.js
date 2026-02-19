/**
 * Extracts image URL from Contentful asset object or returns string URL directly
 * @param {Object|string} asset - Contentful asset object or URL string
 * @returns {string|null} - Full image URL or null if invalid
 */
export const getImageUrl = (asset) => {
  if (!asset) return null;
  
  // Handle Contentful asset object structure
  if (asset.fields?.file?.url) {
    return 'https:' + asset.fields.file.url;
  }
  
  // Handle direct URL string
  if (typeof asset === 'string') {
    return asset;
  }
  
  return null;
};

/**
 * Creates image event handlers with logging
 * @param {string} title - Project/item title for logging
 * @param {string} type - Image type for logging (e.g., 'thumbnail', 'featured')
 * @param {Object} logger - Logger instance
 * @returns {Object} - Object with onLoad and onError handlers
 */
export const createImageHandlers = (title, type = 'image', logger) => ({
  onLoad: () => logger.log('IMAGE_LOADED', { title, type }),
  onError: (e) => logger.error('IMAGE_FAILED', { title, type, src: e.target.src })
});
