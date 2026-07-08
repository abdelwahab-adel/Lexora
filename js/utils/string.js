/**
 * String Utility Functions
 */

export const Strings = {
  /**
   * Format number with localization
   * @param {number} num
   * @param {string} locale
   * @returns {string}
   */
  formatNumber: (num, locale = 'en-US') => num.toLocaleString(locale),

  /**
   * Capitalize first letter
   * @param {string} str
   * @returns {string}
   */
  capitalize: (str) => str?.charAt(0).toUpperCase() + str?.slice(1),

  /**
   * Truncate string
   * @param {string} str
   * @param {number} length
   * @param {string} suffix
   * @returns {string}
   */
  truncate: (str, length = 100, suffix = '...') => {
    if (!str || str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
  },

  /**
   * Slugify string
   * @param {string} str
   * @returns {string}
   */
  slugify: (str) => {
    return str
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  /**
   * Remove HTML tags
   * @param {string} html
   * @returns {string}
   */
  stripHtml: (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  },
};

export default Strings;
