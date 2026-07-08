/**
 * Header Module
 * Handles: scroll behavior, nav highlighting, mobile menu, search
 */

import { DOM } from '../utils/dom.js';

export class HeaderModule {
  constructor() {
    this.header = DOM.id('hdr');
    this.progress = DOM.id('scroll-progress');
    this.hamburger = DOM.id('hamburger');
    this.mobileMenu = DOM.id('mobile-menu');
    this.searchOpen = DOM.id('searchOpen');
    this.searchClose = DOM.id('searchClose');
    this.searchPopup = DOM.id('search-popup');
    this.scrollTop = DOM.id('scroll-top');
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize all header features
   */
  init() {
    this.initScrollBehavior();
    this.initMobileMenu();
    this.initSearch();
    this.initScrollTop();
    this.initActiveNav();
  }

  /**
   * Handle scroll behavior - progress bar, parallax, etc
   */
  initScrollBehavior() {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;

      // Update header style on scroll
      DOM.toggleClass(this.header, 'scrolled', y > 40);

      // Update progress bar
      if (this.progress) {
        const percent = max > 0 ? (y / max) * 100 : 0;
        this.progress.style.width = `${percent}%`;
      }

      // Hero parallax effect
      if (!this.prefersReduced) {
        const heroBg = DOM.query('.hero-bg');
        if (heroBg && y < innerHeight) {
          const scale = 1.06 - (y / innerHeight) * 0.06;
          const translateY = y * 0.12;
          heroBg.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /**
   * Mobile menu toggle
   */
  initMobileMenu() {
    if (!this.hamburger || !this.mobileMenu) return;

    const closeMenu = () => {
      DOM.removeClass(this.mobileMenu, 'open');
      DOM.removeClass(this.hamburger, 'open');
      this.hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    // Toggle on hamburger click
    DOM.on(this.hamburger, 'click', (e) => {
      e.stopPropagation();
      const isOpen = DOM.hasClass(this.mobileMenu, 'open');
      if (!isOpen) {
        DOM.addClass(this.mobileMenu, 'open');
        DOM.addClass(this.hamburger, 'open');
        this.hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        closeMenu();
      }
    });

    // Close on link click
    DOM.queryAll('a', this.mobileMenu).forEach((link) => {
      DOM.on(link, 'click', closeMenu);
    });

    // Close on outside click
    DOM.on(document, 'click', (e) => {
      if (DOM.hasClass(this.mobileMenu, 'open') && !this.mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on escape
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && DOM.hasClass(this.mobileMenu, 'open')) {
        closeMenu();
      }
    });
  }

  /**
   * Search functionality
   */
  initSearch() {
    if (!this.searchPopup) return;

    const show = () => {
      DOM.addClass(this.searchPopup, 'open');
      this.searchPopup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const input = DOM.id('siteSearch');
      if (input) setTimeout(() => input.focus(), 100);
    };

    const hide = () => {
      DOM.removeClass(this.searchPopup, 'open');
      this.searchPopup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    DOM.on(this.searchOpen, 'click', show);
    DOM.on(this.searchClose, 'click', hide);
    DOM.on(this.searchPopup, 'click', (e) => {
      if (e.target === this.searchPopup) hide();
    });
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && DOM.hasClass(this.searchPopup, 'open')) hide();
    });
  }

  /**
   * Scroll to top button
   */
  initScrollTop() {
    if (!this.scrollTop) return;

    window.addEventListener(
      'scroll',
      DOM.throttle(() => {
        DOM.toggleClass(this.scrollTop, 'visible', window.scrollY > 480);
      }, 100),
      { passive: true }
    );

    DOM.on(this.scrollTop, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Highlight active navigation link
   */
  initActiveNav() {
    if (!('IntersectionObserver' in window)) return;

    const links = DOM.queryAll('#nav-links a[href^="#"]');
    const sections = links
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const href = `#${e.target.id}`;
            links.forEach((link) => {
              DOM.toggleClass(link, 'active', link.getAttribute('href') === href);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
  }
}

export default HeaderModule;
