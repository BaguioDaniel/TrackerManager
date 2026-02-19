/**
 * Simple Console Logger
 * Logs project data from Contentful to browser console for debugging
 */

class Logger {
  log(label, data) {
    console.log(`%c[${label}]`, 'color: #0066cc; font-weight: bold;', data);
  }

  error(label, data) {
    console.error(`%c[${label}]`, 'color: #cc0000; font-weight: bold;', data);
  }

  warn(label, data) {
    console.warn(`%c[${label}]`, 'color: #ff9900; font-weight: bold;', data);
  }
}

export const logger = new Logger();
export default logger;
