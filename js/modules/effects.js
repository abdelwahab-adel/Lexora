/**
 * Effects Module
 * Handles: ripple, magnetic, animations, mouse glow
 */

import { DOM } from '../utils/dom.js';

export class EffectsModule {
  constructor() {
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = matchMedia('(pointer: coarse)').matches;
  }

  /**
   * Initialize all effects
   */
  init() {
    this.initRipple();
    this.initMagnetic();
    this.initMouseGlow();
    this.initReveal();
    this.initCounters();
  }

  /**
   * Ripple effect on buttons
   */
  initRipple() {
    DOM.queryAll('.ripple').forEach((btn) => {
      DOM.on(btn, 'click', (e) => {
        const rect = btn.getBoundingClientRect();
        if (rect.width === 0) return;

        const dot = DOM.create('span', { class: 'ripple-dot' });
        dot.style.left = `${e.clientX - rect.left}px`;
        dot.style.top = `${e.clientY - rect.top}px`;
        btn.appendChild(dot);

        const cleanup = () => dot.remove();
        dot.addEventListener('animationend', cleanup, { once: true });
      });
    });
  }

  /**
   * Magnetic cursor effect
   */
  initMagnetic() {
    if (this.prefersReduced || this.isTouch) return;

    DOM.queryAll('.magnetic').forEach((el) => {
      DOM.on(el, 'mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });

      DOM.on(el, 'mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /**
   * Mouse glow effect
   */
  initMouseGlow() {
    if (this.prefersReduced || this.isTouch) return;

    const glow = DOM.query('.mouse-glow');
    if (!glow) return;

    window.addEventListener(
      'mousemove',
      (e) => {
        glow.classList.add('is-active');
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      },
      { passive: true }
    );
  }

  /**
   * Reveal on scroll animation
   */
  initReveal() {
    const items = DOM.queryAll('.rv, .rv-l, .rv-r');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => DOM.addClass(el, 'on'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            DOM.addClass(e.target, 'on');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((i) => io.observe(i));
  }

  /**
   * Counter animation
   */
  initCounters() {
    const counters = DOM.queryAll('.counter');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach((c) => {
        const target = Number(c.dataset.target || 0);
        c.textContent = (c.dataset.prefix || '') + target.toLocaleString('en-US');
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const node = e.target;
          io.unobserve(node);

          const target = Number(node.dataset.target || 0);
          const duration = this.prefersReduced ? 80 : 1500;
          const start = performance.now();

          const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            node.textContent = Math.floor(target * eased).toLocaleString('en-US');
            if (p < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((c) => io.observe(c));
  }
}

export default EffectsModule;
