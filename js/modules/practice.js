/**
 * Practice Areas Module
 * Handles practice areas grid, filtering, and modals
 */

import { DOM } from '../utils/dom.js';

export class PracticeModule {
  constructor(data) {
    this.data = data;
    this.practiceAreas = [
      {
        cat: 'شركات',
        icon: 'fa-briefcase',
        title: 'القانون التجاري',
        desc: 'استشارات للشركات والتجار في النزاعات التجارية والحوكمة',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=82',
        tags: ['عقود', 'نزاعات', 'توثيق'],
        points: ['صياغة العقود التجارية', 'فض النزاعات التجارية', 'استشارات حوكمة']
      },
      {
        cat: 'جنائي',
        icon: 'fa-gavel',
        title: 'القانون الجنائي',
        desc: 'دفاع وتحليل أدلة وتمثيل في القضايا الجنائية',
        img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=82',
        tags: ['دفاع', 'أدلة', 'تمثيل'],
        points: ['الدفاع الجنائي', 'تحليل الأدلة', 'تمثيل أمام المحاكم']
      },
      {
        cat: 'تجاري',
        icon: 'fa-scale-balanced',
        title: 'القضايا المدنية',
        desc: 'مطالبات وتعويضات ومسؤولية مدنية',
        img: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=900&q=82',
        tags: ['مطالبات', 'تعويضات', 'مسؤولية'],
        points: ['رفع المطالبات المدنية', 'استرجاع التعويضات', 'تقرير المسؤولية']
      },
      {
        cat: 'أفراد',
        icon: 'fa-people-roof',
        title: 'الأحوال الشخصية',
        desc: 'حلول قانونية في قضايا الأسرة والنفقة والحضانة',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=82',
        tags: ['أسرة', 'نفقة', 'حضانة'],
        points: ['قضايا الزواج والطلاق', 'حضانة الأطفال', 'استحقاق النفقة']
      },
      {
        cat: 'شركات',
        icon: 'fa-building-columns',
        title: 'تأسيس الشركات',
        desc: 'تأسيس ومواءمة الكيانات، اتفاقيات الشركاء',
        img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=82',
        tags: ['تأسيس', 'اتفاقيات', 'لوائح'],
        points: ['تأسيس الشركات الجديدة', 'صياغة عقود الشراكة', 'تطوير اللوائح الداخلية']
      },
      {
        cat: 'تجاري',
        icon: 'fa-file-signature',
        title: 'العقود',
        desc: 'صياغة ومراجعة عقود عالية الحماية',
        img: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=82',
        tags: ['صياغة', 'مراجعة', 'حماية'],
        points: ['صياغة عقود متقدمة', 'مراجعة العقود الدولية', 'إدارة الالتزامات']
      }
    ];
    this.currentFilter = 'all';
  }

  /**
   * Initialize practice module
   */
  init() {
    this.render();
    this.bindFilters();
  }

  /**
   * Render practice areas grid
   */
  render(filter = 'all') {
    const grid = DOM.id('practice-grid');
    if (!grid) return;

    const filtered = filter === 'all' ? this.practiceAreas : this.practiceAreas.filter(p => p.cat === filter);

    const html = filtered
      .map(
        (p, i) => `
      <article class="practice-card rv" style="transition-delay:${i * 40}ms" role="button" tabindex="0" data-index="${this.practiceAreas.indexOf(p)}">
        <div class="pc-media">
          <img src="${p.img}" alt="${p.title}" loading="lazy" width="400" height="520">
        </div>
        <span class="pc-seal"><i class="fas ${p.icon}" aria-hidden="true"></i></span>
        <div class="practice-card-inner">
          <div class="pc-title">${p.title}</div>
          <div class="pc-desc">${p.desc}</div>
          <span class="pc-arrow">اقرأ المزيد <i class="fa-solid fa-arrow-left"></i></span>
        </div>
      </article>
    `
      )
      .join('');

    DOM.html(grid, html);
    this.bindCards();
  }

  /**
   * Bind filter buttons
   */
  bindFilters() {
    const filterContainer = DOM.id('pfilter');
    if (!filterContainer) return;

    DOM.on(filterContainer, 'click', (e) => {
      const btn = e.target.closest('.pfbtn');
      if (!btn) return;

      const filter = btn.dataset.pf || 'all';
      DOM.queryAll('.pfbtn', filterContainer).forEach((b) => {
        DOM.removeClass(b, 'active');
      });
      DOM.addClass(btn, 'active');
      this.render(filter);
    });
  }

  /**
   * Bind card interactions
   */
  bindCards() {
    const cards = DOM.queryAll('.practice-card');
    cards.forEach((card) => {
      DOM.on(card, 'click', () => this.openModal(card.dataset.index));
      DOM.on(card, 'keydown', (e) => {
        if (e.key === 'Enter') this.openModal(card.dataset.index);
      });
    });
  }

  /**
   * Open practice modal
   */
  openModal(index) {
    const p = this.practiceAreas[index];
    if (!p) return;

    const modal = DOM.id('practice-modal');
    if (!modal) return;

    DOM.id('pmodal2-img').src = p.img;
    DOM.id('pmodal2-icon').innerHTML = `<i class="fas ${p.icon}" aria-hidden="true"></i>`;
    DOM.text(DOM.id('pmodal2-cat'), p.cat);
    DOM.text(DOM.id('pmodal2-title'), p.title);
    DOM.text(DOM.id('pmodal2-desc'), p.desc);
    DOM.html(DOM.id('pmodal2-tags'), p.tags.map((t) => `<span class="pmodal-tag">${t}</span>`).join(''));
    DOM.html(
      DOM.id('pmodal2-points'),
      p.points.map((pt) => `<li>${pt}</li>`).join('')
    );

    DOM.addClass(modal, 'open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

export default PracticeModule;
