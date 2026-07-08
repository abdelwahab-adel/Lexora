/**
 * Intersection Observer Utility
 * Handle scroll reveal animations efficiently
 */

export class IntersectionManager {
  constructor(options = {}) {
    this.options = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
      ...options,
    };
    this.observers = new Map();
    this.elements = new Set();
  }

  /**
   * Create and cache observer
   * @param {string} key
   * @param {Function} onIntersect
   * @returns {IntersectionObserver}
   */
  createObserver(key, onIntersect) {
    if (this.observers.has(key)) return this.observers.get(key);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect(entry);
          }
        });
      },
      this.options
    );

    this.observers.set(key, observer);
    return observer;
  }

  /**
   * Observe elements for reveal animation
   * @param {string|Array<HTMLElement>} selector
   * @param {string} onClass
   */
  observeReveal(selector, onClass = 'on') {
    const elements =
      typeof selector === 'string'
        ? Array.from(document.querySelectorAll(selector))
        : Array.isArray(selector)
          ? selector
          : [selector];

    if (!elements.length) return;

    const observer = this.createObserver('reveal', (entry) => {
      entry.target.classList.add(onClass);
      observer.unobserve(entry.target);
      this.elements.delete(entry.target);
    });

    elements.forEach((el) => {
      observer.observe(el);
      this.elements.add(el);
    });
  }

  /**
   * Observe elements for counter animation
   * @param {Array<HTMLElement>} elements
   * @param {Function} onVisible
   */
  observeCounters(elements, onVisible) {
    if (!elements.length) return;

    const observer = this.createObserver('counters', (entry) => {
      if (entry.isIntersecting) {
        onVisible(entry.target);
        observer.unobserve(entry.target);
        this.elements.delete(entry.target);
      }
    });

    elements.forEach((el) => {
      observer.observe(el);
      this.elements.add(el);
    });
  }

  /**
   * Disconnect all observers
   */
  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.elements.clear();
  }
}

export default IntersectionManager;
