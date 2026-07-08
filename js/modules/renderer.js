/**
 * Renderer Module
 * Handles dynamic content rendering from data
 */

import { DOM } from '../utils/dom.js';
import { Strings } from '../utils/string.js';

export class RendererModule {
  constructor(data) {
    this.data = data;
  }

  /**
   * Render why us grid
   */
  renderWhyUs() {
    const grid = DOM.id('why-grid');
    if (!grid) return;

    const html = this.data.whyUs
      .map(
        (item, i) => `
      <div class="why-card">
        <div class="why-icon"><i class="fas ${item.icon}" aria-hidden="true"></i></div>
        <div class="why-num">0${i + 1}</div>
        <div class="why-title">${item.title}</div>
        <div class="why-desc">${item.desc}</div>
      </div>
    `
      )
      .join('');

    DOM.html(grid, html);
  }

  /**
   * Render process steps
   */
  renderProcess() {
    const grid = DOM.id('process-grid');
    if (!grid) return;

    const html = this.data.process
      .map(
        (item) => `
      <article class="process-card">
        <div class="process-icon"><i class="${item.icon}" aria-hidden="true"></i></div>
        <span class="process-num">${item.number}</span>
        <div class="process-title">${item.title}</div>
        <div class="process-desc">${item.desc}</div>
      </article>
    `
      )
      .join('');

    DOM.html(grid, html);
  }

  /**
   * Render team members
   */
  renderTeam() {
    const grid = DOM.id('team-grid');
    if (!grid) return;

    const html = this.data.team
      .map(
        (member) => `
      <article class="team-card">
        <div class="team-img-wrap">
          <img src="image/${member.img}" alt="${member.name} - ${member.spec}" loading="lazy" width="300" height="400">
          <div class="team-ov"></div>
          <div class="team-info">
            <div class="team-name">${member.name}</div>
            <div class="team-role">${member.role}</div>
            <div class="team-spec">${member.spec}</div>
            <div class="team-meta">
              <span><i class="fa-regular fa-clock"></i> ${member.years}</span>
              <span><i class="fa-solid fa-envelope"></i></span>
            </div>
            <div class="team-socials">
              <a href="#contact" aria-label="البريد الإلكتروني ${member.name}"><i class="fa-solid fa-envelope"></i></a>
              <a href="#" aria-label="LinkedIn ${member.name}"><i class="fa-brands fa-linkedin-in"></i></a>
              <a href="#contact" aria-label="اتصل بـ ${member.name}"><i class="fa-solid fa-phone"></i></a>
            </div>
          </div>
        </div>
      </article>
    `
      )
      .join('');

    DOM.html(grid, html);
  }

  /**
   * Render statistics
   */
  renderStats() {
    const grid = DOM.id('stats-grid');
    if (!grid) return;

    const html = this.data.stats
      .map(
        (stat) => `
      <div class="stat-card">
        <div class="sc-num">
          ${stat.prefix ? `<span class="sup">${stat.prefix}</span>` : ''}
          <span class="counter" data-target="${stat.target}">0</span>
          ${stat.suffix || ''}
        </div>
        <div class="sc-bar"></div>
        <div class="sc-lbl">${stat.label}</div>
      </div>
    `
      )
      .join('');

    DOM.html(grid, html);
  }

  /**
   * Render accreditations
   */
  renderAccreditations() {
    const grid = DOM.id('accred-grid');
    if (!grid) return;

    const html = this.data.accreditations
      .map(
        (item) => `
      <span class="accred-badge">
        <i class="fa-solid ${item.icon}" aria-hidden="true"></i> ${item.title}
      </span>
    `
      )
      .join('');

    DOM.html(grid, html);
  }

  /**
   * Render all dynamic content
   */
  renderAll() {
    this.renderStats();
    this.renderWhyUs();
    this.renderProcess();
    this.renderTeam();
    this.renderAccreditations();
  }
}

export default RendererModule;
