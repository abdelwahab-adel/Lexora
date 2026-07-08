/**
 * Forms Module
 * Handles form submissions, validation, and success messages
 */

import { DOM } from '../utils/dom.js';

export class FormsModule {
  constructor() {
    this.urgentForm = DOM.id('urgent-form');
    this.newsletterForm = DOM.id('newsletter-form');
  }

  /**
   * Initialize forms
   */
  init() {
    this.initUrgentForm();
    this.initNewsletterForm();
  }

  /**
   * Urgent request form handler
   */
  initUrgentForm() {
    if (!this.urgentForm) return;

    DOM.on(this.urgentForm, 'submit', (e) => {
      e.preventDefault();

      const name = DOM.id('urgent-name')?.value;
      const phone = DOM.id('urgent-phone')?.value;
      const caseType = DOM.id('urgent-case')?.value;

      if (!name || !phone || !caseType) {
        console.warn('Form validation failed');
        return;
      }

      // Show success message
      DOM.html(this.urgentForm, '');
      const success = DOM.id('urgent-success');
      if (success) {
        success.removeAttribute('hidden');
        console.log('✓ Urgent request submitted:', { name, phone, caseType });
      }
    });
  }

  /**
   * Newsletter subscription handler
   */
  initNewsletterForm() {
    if (!this.newsletterForm) return;

    DOM.on(this.newsletterForm, 'submit', (e) => {
      e.preventDefault();

      const input = DOM.id('newsletter-email');
      const email = input?.value;

      if (!email) return;

      const success = DOM.id('newsletter-success');
      if (success) {
        DOM.removeClass(success, 'hidden');
        if (input) input.value = '';
        setTimeout(() => DOM.addClass(success, 'hidden'), 5000);
        console.log('✓ Newsletter subscription:', email);
      }
    });
  }
}

export default FormsModule;
