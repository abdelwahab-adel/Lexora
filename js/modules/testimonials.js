/**
 * Testimonials Module
 * Handles testimonials slider with auto-play and navigation
 */

import { DOM } from '../utils/dom.js';

export class TestimonialsModule {
  constructor() {
    this.testimonials = [
      {
        text: 'تعامل المكتب مع ملفنا التجاري بمنهجية دقيقة. أكثر ما ميّز التجربة <em>وضوح المخاطر والخيارات</em> قبل كل قرار.',
        name: 'محمد الراشد',
        role: 'المدير التنفيذي - شركة صناعية',
        badge: 'نزاع تجاري',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        stars: 5
      },
      {
        text: 'راجعوا عقود الاستثمار واتفاقيات الشركاء بعمق احترافي. وفّروا علينا التزامات <em>كان يمكن أن تتحول لنزاعات</em>.',
        name: 'فاطمة العنزي',
        role: 'الشريكة - شركة استثمارات',
        badge: 'عقود استثمار',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        stars: 5
      },
      {
        text: 'في مرحلة التنفيذ والتحصيل كان التواصل منظماً، والتقارير واضحة، <em>والنتيجة العملية أفضل</em> مما توقعنا.',
        name: 'سالم الدوسري',
        role: 'صاحب - شركة توزيع',
        badge: 'تحصيل ديون',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        stars: 5
      },
      {
        text: 'استشارتهم في صفقة الاندماج كانت دقيقة ومهنية. <em>شركاء حقيقيون في القرار</em>، لا مجرد مستشارين قانونيين.',
        name: 'نور الأحمري',
        role: 'مؤسسة - شركة تقنية',
        badge: 'اندماج شركات',
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
        stars: 5
      }
    ];
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize testimonials
   */
  init() {
    this.render();
    this.bindControls();
    this.startAutoplay();
  }

  /**
   * Render testimonials carousel
   */
  render() {
    const track = DOM.id('tst-track');
    if (!track) return;

    const html = this.testimonials
      .map(
        (t) => `
      <div class="tst-slide">
        <div class="tst-q">
          <div class="tst-mark" aria-hidden="true">"</div>
          <p class="tst-text">${t.text}</p>
        </div>
        <div class="tst-person">
          <div>
            <div class="tst-avatar-row">
              <div class="tst-avatar"><img src="${t.img}" alt="${t.name}" loading="lazy"></div>
              <div>
                <div class="tst-name">${t.name}</div>
                <div class="tst-role">${t.role}</div>
              </div>
            </div>
            <div class="tst-stars">
              ${Array(t.stars)
                .fill(0)
                .map(() => '<i class="fas fa-star"></i>')
                .join('')}
            </div>
          </div>
          <div class="tst-badge">
            <i class="fas fa-briefcase"></i>
            <div><div class="tst-badge-lbl">القضية</div><div class="tst-badge-val">${t.badge}</div></div>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    DOM.html(track, html);
    this.renderDots();
  }

  /**
   * Render dots
   */
  renderDots() {
    const dotsContainer = DOM.id('tst-dots');
    if (!dotsContainer) return;

    const html = this.testimonials
      .map(
        (_, i) => `
      <button class="tst-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="الشهادة ${i + 1}" type="button"></button>
    `
      )
      .join('');

    DOM.html(dotsContainer, html);
  }

  /**
   * Bind controls
   */
  bindControls() {
    const dots = DOM.queryAll('.tst-dot');
    dots.forEach((dot) => {
      DOM.on(dot, 'click', () => {
        const index = parseInt(dot.dataset.i);
        this.goTo(index);
        this.resetAutoplay();
      });
    });

    const prevBtn = DOM.id('tst-prev');
    const nextBtn = DOM.id('tst-next');

    if (prevBtn) {
      DOM.on(prevBtn, 'click', () => {
        this.goTo(this.currentIndex - 1);
        this.resetAutoplay();
      });
    }

    if (nextBtn) {
      DOM.on(nextBtn, 'click', () => {
        this.goTo(this.currentIndex + 1);
        this.resetAutoplay();
      });
    }
  }

  /**
   * Go to specific slide
   */
  goTo(index) {
    const total = this.testimonials.length;
    this.currentIndex = ((index % total) + total) % total;

    const track = DOM.id('tst-track');
    if (track) {
      track.style.transform = `translateX(${this.currentIndex * 100}%)`;
    }

    const dots = DOM.queryAll('.tst-dot');
    dots.forEach((d, i) => {
      DOM.toggleClass(d, 'active', i === this.currentIndex);
    });
  }

  /**
   * Start autoplay
   */
  startAutoplay() {
    if (this.prefersReduced) return;
    this.autoplayInterval = setInterval(() => this.goTo(this.currentIndex + 1), 7000);
  }

  /**
   * Reset autoplay
   */
  resetAutoplay() {
    if (this.prefersReduced) return;
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

export default TestimonialsModule;
