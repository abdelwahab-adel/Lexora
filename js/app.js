/**
 * Main Application Bootstrap
 * Senior-level frontend architecture
 */

import { DOM } from './utils/dom.js';
import HeaderModule from './modules/header.js';
import RendererModule from './modules/renderer.js';
import EffectsModule from './modules/effects.js';

class LexoraApp {
  constructor() {
    this.data = null;
    this.modules = {};
  }

  /**
   * Initialize application
   */
  async init() {
    try {
      // Load configuration
      this.data = await this.loadConfig();

      // Initialize modules
      this.modules.renderer = new RendererModule(this.data);
      this.modules.header = new HeaderModule();
      this.modules.effects = new EffectsModule();

      // Render dynamic content
      this.modules.renderer.renderAll();

      // Initialize interactions
      this.modules.header.init();
      this.modules.effects.init();

      // Post-initialization setup
      this.setupFooter();
      this.setupSmoothScroll();
      this.setupLoader();

      console.log('✓ Lexora app initialized successfully');
    } catch (error) {
      console.error('✗ Initialization failed:', error);
    }
  }

  /**
   * Load configuration from JSON
   */
  async loadConfig() {
    try {
      const response = await fetch('./config/data.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to load config:', error);
      // Fallback to empty object
      return {};
    }
  }

  /**
   * Setup footer year dynamically
   */
  setupFooter() {
    const yearEl = DOM.id('footer-year');
    if (yearEl && this.data.site) {
      const year = new Date().getFullYear();
      DOM.text(yearEl, `© ${year} ${this.data.site.name}. جميع الحقوق محفوظة.`);
    }
  }

  /**
   * Smooth scrolling for anchor links
   */
  setupSmoothScroll() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    DOM.queryAll('a[href^="#"]').forEach((link) => {
      DOM.on(link, 'click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href === '#!') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  }

  /**
   * Hide loader on page load
   */
  setupLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = DOM.id('loader');
        if (loader) DOM.addClass(loader, 'hide');
      }, 400);
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LexoraApp().init());
} else {
  new LexoraApp().init();
}
