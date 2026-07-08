/**
 * Cases Module
 * Handles case studies, filtering, and modals
 */

import { DOM } from '../utils/dom.js';

export class CasesModule {
  constructor(data) {
    this.data = data;
    this.cases = [
      {
        id: 0,
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=82',
        cat: 'تجاري',
        title: 'تسوية نزاع تجاري دولي بمطالبة كبرى',
        client: 'شركة صناعية إقليمية',
        city: 'الرياض',
        year: '2025',
        duration: '18 شهر',
        team: 'فريق تقاضي',
        scope: 'تمثيل كامل',
        desc: 'تعامل شامل مع نزاع تجاري معقد بين طرفين دوليين تجاوزت قيمته المليون دو��ار.',
        challenge: 'النزاع كان متعلقاً بعدم التزام بالعقد والمطالبة برسوم غير متفق عليها مع تعقيدات قانونية دولية.',
        approach: 'قمنا بتحليل العقد بعمق، جمع الأدلة الإثباتية، والتفاوض المباشر مع الطرف الآخر لتحقيق تسوية عادلة.',
        stats: ['$1.2M المطالبة', '18 شهر المدة', '95% النسبة المحققة', '3 دول الأطراف'],
        tags: ['عقود', 'تجارة', 'دولي']
      },
      {
        id: 1,
        img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=82',
        cat: 'عقاري',
        title: 'نزاع ملكية عقاري متعدد الأطراف',
        client: 'مستثمر عقاري خاص',
        city: 'جدة',
        year: '2024',
        duration: '24 شهر',
        team: 'فريق عقاري',
        scope: 'تمثيل كامل',
        desc: 'حل نزاع معقد حول ملكية عقار في موقع استراتيجي يتضمن عدة أطراف.',
        challenge: 'تضارب في سندات الملكية وعقود بيع، مع ادعاءات متعارضة من عدة أطراف.',
        approach: 'مراجعة شاملة للوثائق، الرجوع للسجلات العقارية، وتقديم دفوع قانونية قوية.",
        stats: ['500M ر.س القيمة', '24 شهر المدة', '100% الملكية استرجعت', '4 أطراف النزاع'],
        tags: ['عقارات', 'ملكية', 'نزاع']
      },
      {
        id: 2,
        img: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=900&q=82',
        cat: 'تجاري',
        title: 'اندماج استراتيجي بين شركتين تقنيتين',
        client: 'شركة تقنية ناشئة',
        city: 'الرياض',
        year: '2025',
        duration: '8 أشهر',
        team: 'فريق استثمار',
        scope: 'استشارة كاملة',
        desc: 'استشارة شاملة لاندماج استراتيجي بين شركتين تقنيتين ضخمتين.',
        challenge: 'هيكلة قانونية معقدة مع ضمانات و التزامات متعددة من الطرفين.',
        approach: 'صياغة عقود الاندماج، مراجعة الامتثال، تقرير due diligence شامل.',
        stats: ['$50M قيمة الصفقة', '8 أشهر المدة', '99.5% الموافقة', '15 شرط'],
        tags: ['اندماج', 'تقنية', 'استثمار']
      },
      {
        id: 3,
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=82',
        cat: 'دولي',
        title: 'تحكيم تجاري أمام مركز دولي مرموق',
        client: 'مجموعة استثمارية',
        city: 'الدمام',
        year: '2024',
        duration: '36 شهر',
        team: 'فريق تحكيم',
        scope: 'تمثيل كامل',
        desc: 'تمثيل في قضية تحكيم معقدة أمام مركز تحكيم دولي معترف به عالمياً.',
        challenge: 'نزاع دولي معقد يتطلب خبرة في القانون الدولي والقوانين المحلية.',
        approach: 'فريق متخصص في التحكيم الدولي مع خبرة قانونية عميقة وأدلة قوية.',
        stats: ['$30M النزاع', '36 شهر المدة', '85% الحكم لصالحنا', 'LCIA التحكيم'],
        tags: ['تحكيم', 'دولي', 'استثمار']
      },
      {
        id: 4,
        img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=82',
        cat: 'جنائي',
        title: 'دفاع في قضية جنائية معقدة',
        client: 'رجل أعمال',
        city: 'الرياض',
        year: '2025',
        duration: '14 شهر',
        team: 'فريق جنائي',
        scope: 'دفاع شامل',
        desc: 'دفاع قوي في قضية جنائية معقدة تتطلب خبرة قانونية وتحليل أدلة دقيق.',
        challenge: 'اتهامات جنائية خطيرة تتطلب تحليلاً دقيقاً للأدلة ودفوعاً قانونية قوية.',
        approach: 'فريق دفاع متخصص مع تحليل علمي للأدلة وخبرات استشارية حرة.',
        stats: ['تهم جنائية 3', '14 شهر المدة', 'براءة الذمة', '0 عقوبة'],
        tags: ['جنائي', 'دفاع', 'أدلة']
      },
      {
        id: 5,
        img: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=82',
        cat: 'تجاري',
        title: 'تحصيل مطالبات مالية متعثرة',
        client: 'شركة توزيع تجاري',
        city: 'جدة',
        year: '2024',
        duration: '10 أشهر',
        team: 'فريق تحصيل',
        scope: 'متابعة كاملة',
        desc: 'تحصيل مطالبات مالية كبيرة متعثرة من شركات متعددة.',
        challenge: 'متعثرون متعددون مع تعقيدات قانونية وإجرائية متنوعة.',
        approach: 'متابعة نظامية مع إنذارات رسمية وأوامر تنفيذ واتصالات مباشرة.',
        stats: ['25M ر.س المطالبات', '10 أشهر المدة', '92% التحصيل', '12 متعثر'],
        tags: ['تحصيل', 'مطالبات', 'تنفيذ']
      }
    ];
    this.currentFilter = 'all';
  }

  /**
   * Initialize cases module
   */
  init() {
    this.render();
    this.bindFilters();
  }

  /**
   * Render cases grid
   */
  render(filter = 'all') {
    const grid = DOM.id('cgrid');
    if (!grid) return;

    const filtered = filter === 'all' ? this.cases : this.cases.filter((c) => c.cat === filter);

    const html = filtered
      .map(
        (c) => `
      <article class="ccard" role="button" tabindex="0" data-id="${c.id}">
        <img src="${c.img}" alt="${c.title}" loading="lazy" width="400" height="500">
        <div class="ccard-ov"></div>
        <div class="ccard-body">
          <span class="ccard-cat">${c.cat}</span>
          <div class="ccard-title">${c.title}</div>
          <div class="ccard-meta">
            <span><i class="fas fa-location-dot"></i> ${c.city}</span>
            <span><i class="fas fa-calendar"></i> ${c.year}</span>
          </div>
          <div class="ccard-hint"><i class="fas fa-arrow-left"></i> عرض دراسة الحالة</div>
        </div>
      </article>
    `
      )
      .join('');

    DOM.html(grid, html);
    DOM.text(DOM.id('cases-count'), `${filtered.length} دراسة حالة معروضة`);
    this.bindCards();
  }

  /**
   * Bind filter buttons
   */
  bindFilters() {
    const filterContainer = DOM.id('cfilter');
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
    const cards = DOM.queryAll('.ccard');
    cards.forEach((card) => {
      DOM.on(card, 'click', () => this.openModal(card.dataset.id));
      DOM.on(card, 'keydown', (e) => {
        if (e.key === 'Enter') this.openModal(card.dataset.id);
      });
    });
  }

  /**
   * Open case modal
   */
  openModal(id) {
    const c = this.cases.find((x) => x.id === parseInt(id));
    if (!c) return;

    const modal = DOM.id('case-modal');
    if (!modal) return;

    DOM.id('cmodal-img').src = c.img;
    DOM.text(DOM.id('cmodal-cat'), c.cat);
    DOM.text(DOM.id('cmodal-title'), c.title);
    DOM.text(DOM.id('cmodal-desc'), c.desc);
    DOM.text(DOM.id('cmodal-challenge'), c.challenge);
    DOM.text(DOM.id('cmodal-approach'), c.approach);
    DOM.text(DOM.id('cmodal-client'), c.client);
    DOM.text(DOM.id('cmodal-city'), c.city);
    DOM.text(DOM.id('cmodal-year'), c.year);
    DOM.text(DOM.id('cmodal-duration'), c.duration);
    DOM.text(DOM.id('cmodal-team'), c.team);
    DOM.text(DOM.id('cmodal-scope'), c.scope);
    DOM.html(
      DOM.id('cmodal-stats'),
      c.stats
        .map(
          (s) => {
            const [val, ...rest] = s.split(' ');
            return `<div class="pmodal-stat"><div class="sv">${val}</div><div class="sk">${rest.join(' ')}</div></div>`;
          }
        )
        .join('')
    );
    DOM.html(
      DOM.id('cmodal-tags'),
      c.tags.map((t) => `<span class="pmodal-tag">${t}</span>`).join('')
    );

    DOM.addClass(modal, 'open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

export default CasesModule;
