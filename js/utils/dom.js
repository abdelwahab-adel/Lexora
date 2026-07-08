/**
 * DOM Utility Functions
 * Safe, performant DOM operations
 */

export const DOM = {
  /**
   * Get single element by ID (optimized)
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  id: (id) => document.getElementById(id),

  /**
   * Get single element by selector
   * @param {string} selector
   * @param {HTMLElement} scope
   * @returns {HTMLElement|null}
   */
  query: (selector, scope = document) => scope.querySelector(selector),

  /**
   * Get all elements by selector as array
   * @param {string} selector
   * @param {HTMLElement} scope
   * @returns {Array<HTMLElement>}
   */
  queryAll: (selector, scope = document) => Array.from(scope.querySelectorAll(selector)),

  /**
   * Create element with optional attributes
   * @param {string} tag
   * @param {Object} attrs
   * @param {string} content
   * @returns {HTMLElement}
   */
  create: (tag, attrs = {}, content = '') => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'class') {
        el.className = value;
      } else if (key === 'data') {
        Object.entries(value).forEach(([k, v]) => {
          el.dataset[k] = v;
        });
      } else {
        el.setAttribute(key, value);
      }
    });
    if (content) el.innerHTML = content;
    return el;
  },

  /**
   * Add class(es)
   * @param {HTMLElement} el
   * @param {...string} classes
   */
  addClass: (el, ...classes) => el?.classList.add(...classes),

  /**
   * Remove class(es)
   * @param {HTMLElement} el
   * @param {...string} classes
   */
  removeClass: (el, ...classes) => el?.classList.remove(...classes),

  /**
   * Toggle class
   * @param {HTMLElement} el
   * @param {string} className
   * @param {boolean} force
   */
  toggleClass: (el, className, force) => el?.classList.toggle(className, force),

  /**
   * Has class
   * @param {HTMLElement} el
   * @param {string} className
   * @returns {boolean}
   */
  hasClass: (el, className) => el?.classList.contains(className) || false,

  /**
   * Set attributes
   * @param {HTMLElement} el
   * @param {Object} attrs
   */
  setAttrs: (el, attrs) => {
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === null) el?.removeAttribute(key);
      else el?.setAttribute(key, value);
    });
  },

  /**
   * Get data attribute
   * @param {HTMLElement} el
   * @param {string} key
   * @returns {string|undefined}
   */
  getData: (el, key) => el?.dataset[key],

  /**
   * Set data attribute
   * @param {HTMLElement} el
   * @param {string} key
   * @param {string} value
   */
  setData: (el, key, value) => el && (el.dataset[key] = value),

  /**
   * Remove element
   * @param {HTMLElement} el
   */
  remove: (el) => el?.remove(),

  /**
   * Empty element
   * @param {HTMLElement} el
   */
  empty: (el) => el && (el.innerHTML = ''),

  /**
   * Set inner HTML safely
   * @param {HTMLElement} el
   * @param {string} html
   */
  html: (el, html) => el && (el.innerHTML = html),

  /**
   * Set text content
   * @param {HTMLElement} el
   * @param {string} text
   */
  text: (el, text) => el && (el.textContent = text),

  /**
   * Get text content
   * @param {HTMLElement} el
   * @returns {string}
   */
  getText: (el) => el?.textContent || '',

  /**
   * Insert element
   * @param {HTMLElement} parent
   * @param {HTMLElement} el
   * @param {string} position - 'before' | 'after' | 'append' | 'prepend'
   */
  insert: (parent, el, position = 'append') => {
    if (!parent || !el) return;
    switch (position) {
      case 'before':
        parent.insertAdjacentElement('beforebegin', el);
        break;
      case 'after':
        parent.insertAdjacentElement('afterend', el);
        break;
      case 'prepend':
        parent.insertAdjacentElement('afterbegin', el);
        break;
      default:
        parent.appendChild(el);
    }
  },

  /**
   * On event listener with automatic cleanup
   * @param {HTMLElement} el
   * @param {string} event
   * @param {Function} handler
   * @param {Object} options
   * @returns {Function} - cleanup function
   */
  on: (el, event, handler, options = {}) => {
    if (!el) return () => {};
    el.addEventListener(event, handler, { passive: true, ...options });
    return () => el.removeEventListener(event, handler);
  },

  /**
   * Delegate event listener
   * @param {HTMLElement} parent
   * @param {string} selector
   * @param {string} event
   * @param {Function} handler
   * @returns {Function} - cleanup function
   */
  delegate: (parent, selector, event, handler) => {
    if (!parent) return () => {};
    const listener = (e) => {
      const target = e.target.closest(selector);
      if (target) handler.call(target, e);
    };
    parent.addEventListener(event, listener, { passive: true });
    return () => parent.removeEventListener(event, listener);
  },

  /**
   * Next animation frame
   * @param {Function} callback
   * @returns {Function} - cancel function
   */
  raf: (callback) => {
    const id = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(id);
  },

  /**
   * Debounce function
   * @param {Function} fn
   * @param {number} delay
   * @returns {Function}
   */
  debounce: (fn, delay = 300) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Throttle function
   * @param {Function} fn
   * @param {number} limit
   * @returns {Function}
   */
  throttle: (fn, limit = 300) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

export default DOM;
