/**
 * Modals Module
 * Handles modal open/close with keyboard support
 */

import { DOM } from '../utils/dom.js';

export class ModalsModule {
  constructor() {
    this.modals = [
      { id: 'practice-modal', closeBtn: 'closePracticeModal' },
      { id: 'case-modal', closeBtn: 'closeCaseModal' },
      { id: 'insight-modal', closeBtn: 'closeInsightModal' }
    ];
  }

  /**
   * Initialize modals
   */
  init() {
    this.bindCloseButtons();
    this.bindBackdropClick();
    this.bindKeyboardEscape();
  }

  /**
   * Bind close buttons
   */
  bindCloseButtons() {
    this.modals.forEach(({ id }) => {
      const modal = DOM.id(id);
      if (!modal) return;

      const closeBtn = DOM.query('.pmodal-close', modal);
      if (closeBtn) {
        DOM.on(closeBtn, 'click', () => this.close(id));
      }
    });
  }

  /**
   * Bind backdrop clicks
   */
  bindBackdropClick() {
    this.modals.forEach(({ id }) => {
      const modal = DOM.id(id);
      if (!modal) return;

      const backdrop = DOM.query('.pmodal-backdrop', modal);
      if (backdrop) {
        DOM.on(backdrop, 'click', () => this.close(id));
      }
    });
  }

  /**
   * Bind escape key
   */
  bindKeyboardEscape() {
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Escape') {
        this.modals.forEach(({ id }) => {
          if (DOM.hasClass(DOM.id(id), 'open')) {
            this.close(id);
          }
        });
      }
    });
  }

  /**
   * Open modal
   */
  open(id) {
    const modal = DOM.id(id);
    if (!modal) return;
    DOM.addClass(modal, 'open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close modal
   */
  close(id) {
    const modal = DOM.id(id);
    if (!modal) return;
    DOM.removeClass(modal, 'open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

export default ModalsModule;
