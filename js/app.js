/**
 * Updated Main App Bootstrap
 * Includes all modules
 */

import { DOM } from './utils/dom.js';
import HeaderModule from './modules/header.js';
import RendererModule from './modules/renderer.js';
import EffectsModule from './modules/effects.js';
import PracticeModule from './modules/practice.js';
import CasesModule from './modules/cases.js';
import TestimonialsModule from './modules/testimonials.js';
import FormsModule from './modules/forms.js';
import ModalsModule from './modules/modals.js';

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

      // Initialize core modules
      this.modules.renderer = new RendererModule(this.data);
      this.modules.header = new HeaderModule();
      this.modules.effects = new EffectsModule();

      // Initialize feature modules
      this.modules.practice = new PracticeModule(this.data);
      this.modules.cases = new CasesModule(this.data);
      this.modules.testimonials = new TestimonialsModule();
      this.modules.forms = new FormsModule();
      this.modules.modals = new ModalsModule();

      // Render dynamic content
      this.modules.renderer.renderAll();

      // Initialize all modules
      this.modules.header.init();
      this.modules.effects.init();
      this.modules.practice.init();
      this.modules.cases.init();
      this.modules.testimonials.init();
      this.modules.forms.init();
      this.modules.modals.init();

      // Post-initialization setup
      this.setupFooter();
      this.setupSmoothScroll();
      this.setupLoader();
      this.setupImageFallback();

      console.log('%c✓ Lexora app initialized successfully', 'color: #0F3D2E; font-weight: bold; font-size: 14px;');
      console.log('%cModules loaded:', 'color: #C8A24D; font-weight: bold;', Object.keys(this.modules));
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
      DOM.text(
        yearEl,
        `© ${year} ${this.data.site.name}. جميع الحقوق محفوظة.`
      );
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
    window.addEventListener(
      'load',
      () => {
        setTimeout(() => {
          const loader = DOM.id('loader');
          if (loader) DOM.addClass(loader, 'hide');
        }, 400);
      },
      { once: true }
    );
  }

  /**
   * Image error fallback
   */
  setupImageFallback() {
    DOM.queryAll('img').forEach((img) => {
      img.addEventListener(
        'error',
        () => {
          img.style.background = 'linear-gradient(135deg,#0F3D2E,#C8A24D)';
          img.removeAttribute('src');
        },
        { once: true }
      );
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new LexoraApp();
    window.app.init();
  });
} else {
  window.app = new LexoraApp();
  window.app.init();
}
