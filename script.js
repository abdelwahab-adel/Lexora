/* ════════════════════════════════════════════════════════════════
   GLOBAL CONFIG & DATA
════════════════════════════════════════════════════════════════ */
'use strict';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(pointer: coarse)').matches;
const $ = id => document.getElementById(id);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
const im = (id, w = 900, q = 82) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
/* alias for backward compat with HTML inline handlers */
const el = $;

/* Data: About Tabs */
const aboutCopy = {
  vision: 'أن نكون مرجعاً قانونياً رفيعاً في حماية المصالح وإدارة النزاعات، عبر حلول قانونية دقيقة تعكس أعلى معايير النزاهة والاحتراف والسرية.',
  mission: 'تقديم استشارة وتمثيل قانوني يوازن بين قوة النص النظامي وفهم الواقع التجاري والاجتماعي للعميل، مع وضوح كامل في الخيارات والمخاطر.',
  values: 'السرية، النزاهة، سرعة الاستجابة، دقة الصياغة، احترام الوقت، الالتزام بتقديم رأي مهني قابل للتنفيذ.',
  philosophy: 'نبدأ كل ملف بسؤال واضح: ما النتيجة العملية الأكثر حماية للعميل؟ ثم نبني حولها الأدلة، الإجراءات، التفاوض، والترافع.'
};

/* Data: Practice Areas (15) */
const PRACTICE_AREAS = [
  { cat:'شركات', icon:'fa-briefcase', title:'القانون التجاري', desc:'استشارات للشركات والتجار في النزاعات التجارية، الحوكمة، اللوائح الداخلية، وحماية المصالح التعاقدية.', tags:['شركات','تجاري'], points:['تمثيل في النزاعات التجارية أمام المحاكم واللجان','مراجعة اللوائح الداخلية والحوكمة','حماية المصالح التعاقدية للشركات والتجار'], img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=82' },
  { cat:'جنائي', icon:'fa-gavel', title:'القانون الجنائي', desc:'دفاع وتحليل أدلة وتمثيل في القضايا الجنائية والبلاغات ذات الحساسية العالية بسرية تامة.', tags:['دفاع','جزائي'], points:['الدفاع في القضايا الجنائية والبلاغات الحساسة','تحليل الأدلة وبناء استراتيجية دفاع','تمثيل كامل أمام النيابة والمحكمة'], img:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=82' },
  { cat:'تجاري', icon:'fa-scale-balanced', title:'القضايا المدنية', desc:'مطالبات وتعويضات ومسؤولية مدنية وصياغة مذكرات مبنية على وقائع موثقة وأسانيد دقيقة.', tags:['تقاضي','مدني'], points:['رفع ومتابعة دعاوى المطالبات والتعويضات','صياغة مذكرات مبنية على أسانيد دقيقة','تمثيل في قضايا المسؤولية المدنية'], img:'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=82' },
  { cat:'أفراد', icon:'fa-people-roof', title:'الأحوال الشخصية', desc:'حلول قانونية راقية في قضايا الأسرة، النفقة، الحضانة، التركات، والتسويات الودية.', tags:['أسرة','تركات'], points:['قضايا الأسرة والنفقة والحضانة','تقسيم التركات والتسويات الودية','استشارات قانونية بخصوصية تامة'], img:'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=82' },
  { cat:'شركات', icon:'fa-building-columns', title:'تأسيس الشركات', desc:'تأسيس ومواءمة الكيانات، اتفاقيات الشركاء، اللوائح، وتخطيط هيكل قانوني قابل للنمو.', tags:['تأسيس','حوكمة'], points:['تأسيس الكيانات واختيار الشكل النظامي المناسب','صياغة اتفاقيات الشركاء واللوائح الداخلية','تخطيط هيكل قانوني قابل للنمو'], img:'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=82' },
  { cat:'تجاري', icon:'fa-file-signature', title:'العقود', desc:'صياغة ومراجعة عقود عالية الحماية تكشف الالتزامات الخفية وتقلل النزاع قبل ظهوره.', tags:['صياغة','مراجعة'], points:['صياغة عقود عالية الحماية','مراجعة العقود وكشف الالتزامات الخفية','تقليل احتمالية النزاع قبل ظهوره'], img:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=82' },
  { cat:'دولي', icon:'fa-chart-line', title:'الاستثمار', desc:'استشارات دخول السوق، اتفاقيات الاستثمار، الفحص القانوني، وإدارة مخاطر الصفقات.', tags:['استثمار','دولي'], points:['استشارات دخول السوق للمستثمرين','الفحص القانوني قبل الصفقات','إدارة مخاطر اتفاقيات الاستثمار'], img:'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=82' },
  { cat:'تجاري', icon:'fa-handshake-angle', title:'التحكيم', desc:'تمثيل في التحكيم التجاري، إعداد المذكرات، إدارة الأدلة، وتسويات النزاعات المعقدة.', tags:['تحكيم','تسويات'], points:['تمثيل كامل أمام هيئات التحكيم التجاري','إعداد المذكرات وإدارة الأدلة','تسوية النزاعات المعقدة خارج المحاكم'], img:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=82' },
  { cat:'شركات', icon:'fa-fingerprint', title:'الملكية الفكرية', desc:'حماية العلامات، المصنفات، الأسرار التجارية، واتفاقيات الترخيص والاستغلال.', tags:['علامات','براءات'], points:['تسجيل وحماية العلامات التجارية','حماية المصنفات والأسرار التجارية','صياغة اتفاقيات الترخيص والاستغلال'], img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=82' },
  { cat:'شركات', icon:'fa-coins', title:'الضرائب', desc:'مساندة قانونية في الاعتراضات، الامتثال، المراجعات الضريبية، وتحليل الأثر النظامي.', tags:['ضرائب','زكاة'], points:['الاعتراض على القرارات الضريبية','دعم الامتثال والمراجعات الضريبية','تحليل الأثر النظامي على الأعمال'], img:'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=82' },
  { cat:'تجاري', icon:'fa-city', title:'العقارات', desc:'نزاعات الملكية، الإيجارات، التطوير العقاري، الرهن، ومراجعة عقود البيع والاستثمار.', tags:['عقارات','تطوير'], points:['نزاعات الملكية العقارية والإيجارات','مراجعة عقود البيع والتطوير العقاري','استشارات الرهن والاستثمار العقاري'], img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=82' },
  { cat:'تجاري', icon:'fa-stamp', title:'التنفيذ', desc:'متابعة أوامر وسندات التنفيذ، الحجز، المطالبات المالية، وحماية حقوق الدائن والمدين.', tags:['تنفيذ','مطالبات'], points:['متابعة أوامر وسندات التنفيذ','إجراءات الحجز والمطالبات المالية','حماية حقوق الدائن والمدين'], img:'https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=900&q=82' },
  { cat:'تجاري', icon:'fa-file-invoice-dollar', title:'التحصيل', desc:'استرداد مستحقات الشركات والأفراد عبر مسار نظامي يبدأ بالإنذار وينتهي بالتنفيذ.', tags:['تحصيل','ديون'], points:['تحصيل مستحقات الشركات والأفراد','مسار نظامي يبدأ بالإنذار الرسمي','متابعة حتى التنفيذ الكامل'], img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=82' },
  { cat:'أفراد', icon:'fa-user-tie', title:'قضايا العمل', desc:'تمثيل أصحاب العمل والموظفين في العقود، الفصل، المستحقات، والمخالفات العمالية.', tags:['عمالي','فصل'], points:['تمثيل أصحاب العمل والموظفين','قضايا الفصل والمستحقات العمالية','الامتثال لأنظمة العمل ومعالجة المخالفات'], img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=82' },
  { cat:'دولي', icon:'fa-globe', title:'التقاضي الدولي', desc:'تنسيق النزاعات العابرة للحدود، الاختصاص القضائي، تنفيذ الأحكام، والتعاون مع مكاتب أجنبية.', tags:['دولي','اختصاص'], points:['تنسيق النزاعات العابرة للحدود','تحديد الاختصاص القضائي المناسب','تنفيذ الأحكام والتعاون مع مكاتب أجنبية'], img:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82' },
];

/* Data: Why Us (8) */
const WHY_US = [
  { icon:'fa-shield-halved', t:'خبرة قانونية متخصصة', d:'سجل متراكم في ملفات تجارية وجنائية ومدنية عالية الحساسية.' },
  { icon:'fa-lightbulb', t:'حلول قانونية مبتكرة', d:'نبحث عن المسار العملي الأكثر حماية، لا عن أطول طريق إجرائي.' },
  { icon:'fa-user-shield', t:'سرية تامة', d:'إجراءات داخلية صارمة لحماية المستندات والمراسلات.' },
  { icon:'fa-scale-balanced', t:'استشارات موثوقة وسريعة', d:'تقييم أولي واضح وتحديد الأولويات قبل تفاقم المخاطر.' },
  { icon:'fa-people-group', t:'فريق متخصص', d:'محامون موزعون حسب التخصص لضمان عمق الرأي القانوني.' },
  { icon:'fa-gavel', t:'متابعة شاملة للعميل', d:'خبرة في التقاضي أمام المحاكم واللجان القضائية وشبه القضائية.' },
  { icon:'fa-chart-simple', t:'نتائج مثبتة', d:'مؤشرات متابعة وقياس للملفات مع تقارير موجزة للعميل.' },
  { icon:'fa-magnifying-glass-chart', t:'استشارات دقيقة', d:'تحليل قانوني ولغوي وتجاري قبل إصدار أي توصية.' },
];

/* Data: Process (5) */
const PROCESS = [
  { icon:'fa-regular fa-comments', n:'01', t:'الاستشارة', d:'جلسة سرية لفهم الوقائع والهدف القانوني.' },
  { icon:'fa-solid fa-file-shield', n:'02', t:'مراجعة الملف', d:'مراجعة الأدلة والمستندات وتحديد نقاط القوة.' },
  { icon:'fa-solid fa-chess-knight', n:'03', t:'الاستراتيجية', d:'خطة تحرك تراعي القانون والتكلفة والتوقيت.' },
  { icon:'fa-solid fa-gavel', n:'04', t:'التمثيل', d:'تفاوض وترافع وصياغة مذكرات بإتقان أمام الجهات المختصة.' },
  { icon:'fa-solid fa-trophy', n:'05', t:'النتائج', d:'إغلاق الملف بأفضل نتيجة عملية ممكنة.' },
];

/* Data: Team (4) */
const TEAM = [
  { name:'عبدالعزيز الراشد', role:'الشريك المدير', spec:'التقاضي التجاري والتحكيم', years:'25 سنة', img:'partner-abdulaziz.jpg' },
  { name:'نورة الفهد', role:'رئيسة الاستشارات', spec:'العقود والشركات', years:'16 سنة', img:'woman.png' },
  { name:'سلمان الدوسري', role:'محامي أول', spec:'القضايا الجنائية والتنفيذ', years:'14 سنة', img:'man.png' },
  { name:'ريم العتيبي', role:'مستشارة قانونية أولى', spec:'الملكية الفكرية وقانون العمل', years:'11 سنة', img:'woman.png' },
];

/* Data: Journey */
const JOURNEY = [
  { n:'1', t:'طلب الاستشارة' },
  { n:'2', t:'دراسة وتحليل القضية' },
  { n:'3', t:'وضع الاستراتيجية القانونية' },
  { n:'4', t:'التمثيل والمتابعة' },
  { n:'5', t:'إنهاء القضية وتنفيذ الحكم' },
];

/* Data: Packages */
const PACKAGES = [
  { name:'استشارة فردية', tagline:'مناسبة للأفراد الذين يحتاجون رأيًا قانونيًا محددًا في مسألة واحدة.', fit:'مثالية لـ', tags:['جلسة تقييم واحدة','رأي قانوني مكتوب','متابعة عبر البريد'], featured:false },
  { name:'المتابعة الاحترافية', tagline:'تعامل مستمر مع ملف أو نزاع واحد من البداية حتى صدور الحكم أو التسوية.', fit:'الأكثر طلبًا', tags:['فريق قانوني مخصص','تحديثات دورية','تمثيل كامل بالجلسات','تقارير مرحلية'], featured:true, badge:'الأكثر طلباً' },
  { name:'شراكة المؤسسات', tagline:'تغطية قانونية شاملة ومستمرة للشركات، تشمل الاستشارات والعقود والتقاضي.', fit:'مصممة لـ', tags:['مستشار قانوني دائم','مراجعة عقود غير محدودة','أولوية في الاستجابة','تقارير ربع سنوية'], featured:false },
];

/* Data: Case Studies */
const CASES = [
  { id:0, img:im('photo-1454165804606-c3d57bc86b40',900), cat:'تجاري', title:'تسوية نزاع تجاري دولي بمطالبة كبرى', client:'شركة صناعية إقليمية', city:'الرياض', year:'2025', duration:'8 أشهر', team:'6 محامين', scope:'تمثيل كامل أمام هيئة التحكيم', desc:'تمثيل شركة صناعية إقليمية في نزاع تعاقدي معقد مع مورد دولي، وتحقيق تسوية ودّية حفظت للعميل أكثر من 60% من قيمة المطالبة الأصلية دون الدخول في تقاضٍ مطوّل.', challenge:'مطالبة مالية كبيرة من مورد دولي وسط تعقيد العقود متعددة الجهات القضائية.', approach:'تحليل شامل للعقد الأصلي، تفاوض مباشر مع الطرف الدولي، وإعداد بدائل تصعيد قانوني كأوراق ضغط.', tags:['تحكيم','عقود'], stats:['60% وفورات','8 أشهر','6 محامين','تسوية ودية'] },
  { id:1, img:im('photo-1521791136064-7986c2920216',900), cat:'عقاري', title:'نزاع ملكية عقاري متعدد الأطراف', client:'مستثمر عقاري خاص', city:'جدة', year:'2024', duration:'11 شهراً', team:'4 محامون', scope:'التقاضي والتمثيل أمام المحكمة العقارية', desc:'تولّى المكتب تمثيل عميل في نزاع ملكية معقد شمل أربعة أطراف متنازعة، وانتهت القضية بحكم نهائي أثبت كامل حقوق موكلنا في الأصل العقاري محل النزاع.', challenge:'أربعة أطراف متنازعة على نفس الأصل العقاري مع مستندات ملكية متضاربة.', approach:'تتبع السجل العقاري وتحليل سلسلة الملكية، وتقديم أدلة موثقة أمام المحكمة العقارية.', tags:['عقارات','تقاضي'], stats:['4 أطراف','11 شهراً','حكم نهائي','استرداد كامل'] },
  { id:2, img:im('photo-1589391886645-d51941baf7fb',900), cat:'تجاري', title:'اندماج استراتيجي بين شركتين تقنيتين', client:'شركة تقنية ناشئة', city:'الرياض', year:'2025', duration:'5 أشهر', team:'5 محامين', scope:'الاستشارات القانونية والعناية الواجبة', desc:'قدّم المكتب الاستشارة القانونية الكاملة لصفقة اندماج بين شركتين تقنيتين، شملت العناية الواجبة القانونية وصياغة اتفاقية الاندماج وإدارة الموافقات التنظيمية.', challenge:'توافق الهياكل القانونية والمالية بين شركتين بثقافتين مؤسسيتين مختلفتين.', approach:'عناية واجبة قانونية شاملة، وصياغة اتفاقية اندماج تحمي حقوق الأطراف وتوازن المخاطر.', tags:['اندماج','شركات'], stats:['5 أشهر','عناية واجبة','موافقة كاملة','صفقة ناجحة'] },
  { id:3, img:im('photo-1450101499163-c8848c66ca85',900), cat:'دولي', title:'تحكيم تجاري أمام مركز دولي مرموق', client:'مجموعة استثمارية', city:'الرياض', year:'2024', duration:'14 شهراً', team:'7 محامين', scope:'التمثيل الكامل أمام هيئة التحكيم الدولية', desc:'تمثيل مجموعة استثمارية سعودية في نزاع تحكيمي دولي معقد ضد شريك أجنبي، وانتهت القضية بقرار تحكيمي لصالح موكلنا بالكامل مع تعويض عن الأضرار.', challenge:'نزاع تحكيمي عابر للحدود مع شريك أجنبي يطبّق قانونًا مغايرًا.', approach:'بناء ملف أدلة متكامل، والاستعانة بخبرة تحكيم دولي لتوجيه استراتيجية المرافعة.', tags:['تحكيم','استثمار'], stats:['14 شهراً','قرار كامل','تعويض','مركز دولي'] },
  { id:4, img:im('photo-1521737604893-d14cc237f11d',900), cat:'جنائي', title:'دفاع في قضية جنائية معقدة', client:'رجل أعمال', city:'الدمام', year:'2025', duration:'6 أشهر', team:'3 محامين', scope:'الدفاع الجنائي الكامل أمام النيابة والمحكمة', desc:'تولّى المكتب الدفاع عن رجل أعمال في قضية جنائية ذات طابع تجاري معقد، وانتهت القضية بحكم بالبراءة الكاملة بعد إثبات عدم توفر الأركان الجرمية.', challenge:'اتهامات جنائية ذات طابع تجاري معقد تهدد سمعة الموكل ومستقبله المهني.', approach:'مراجعة دقيقة للأدلة، وإثبات عدم توفر الأركان الجرمية أمام النيابة والمحكمة.', tags:['جنائي','دفاع'], stats:['براءة كاملة','6 أشهر','3 جلسات','نجاح تام'] },
  { id:5, img:im('photo-1521791055366-0d553872125f',900), cat:'تجاري', title:'تحصيل مطالبات مالية متعثرة', client:'شركة توزيع تجاري', city:'جدة', year:'2024', duration:'4 أشهر', team:'3 محامين', scope:'إجراءات التحصيل والتنفيذ القضائي', desc:'إدارة ملف تحصيل ديون تجارية متعثرة لشركة توزيع، شمل ذلك رفع دعاوى مطالبة مالية ومتابعة التنفيذ حتى الاسترداد الكامل للمبالغ المستحقة.', challenge:'تعدد المدينين وتعثر السداد لفترة طويلة أثّر على السيولة التشغيلية للعميل.', approach:'رفع دعاوى مطالبة منظمة ومتابعة تنفيذية صارمة حتى استرداد كامل المبالغ.', tags:['تحصيل','تنفيذ'], stats:['استرداد 100%','4 أشهر','12 مدين','تنفيذ فعّال'] },
];

/* Data: Testimonials */
const TESTIMONIALS = [
  { text:'تعامل المكتب مع ملفنا التجاري بمنهجية دقيقة. أكثر ما ميّز التجربة <em>وضوح المخاطر والخيارات</em> قبل كل قرار استراتيجي.', name:'خالد السالم', role:'رئيس تنفيذي، مجموعة صناعية', img:im('photo-1507003211169-0a1dd7228f2d',300), badge:'نزاع تجاري دولي' },
  { text:'راجعوا عقود الاستثمار واتفاقيات الشركاء بعمق احترافي. وفّروا علينا التزامات <em>كان يمكن أن تتحول لنزاع مكلف</em>.', name:'هند الجاسر', role:'مؤسسة شركة تقنية', img:im('photo-1494790108377-be9c29b29330',300), badge:'استثمار وشركات' },
  { text:'في مرحلة التنفيذ والتحصيل كان التواصل منظماً، والتقارير واضحة، <em>والنتيجة العملية أفضل</em> مما توقعناه.', name:'ماجد الحربي', role:'مدير مالي، شركة تجارية', img:im('photo-1506794778202-cad84cf45f1d',300), badge:'تحصيل وتنفيذ' },
  { text:'استشارتهم في صفقة الاندماج كانت دقيقة ومهنية. <em>شركاء حقيقيون في القرار</em>، لا مجرد مستشارين قانونيين.', name:'سلطان الحربي', role:'مؤسس شركة تقنية', img:im('photo-1500648767791-00dcc994a43e',300), badge:'اندماج استراتيجي' },
];

/* Data: Stats */
const STATS = [
  { target:5000, prefix:'+', label:'قضية أُنجزت بنجاح' },
  { target:25,   prefix:'+', label:'عاماً من الخبرة القانونية' },
  { target:1200, prefix:'+', label:'عميل من الأفراد والشركات' },
  { target:98,   suffix:'%', label:'نسبة رضا العملاء' },
];

/* Data: Industries */
const INDUSTRIES = [
  { letter:'ش', title:'الشركات', desc:'تأسيس وحوكمة الكيانات التجارية بمختلف أحجامها.', items:['تأسيس الشركات وصياغة عقودها','الحوكمة المؤسسية والامتثال','الاندماج والاستحواذ'] },
  { letter:'م', title:'المستثمرون', desc:'إرشاد قانوني للمستثمرين المحليين والدوليين.', items:['هيكلة الاستثمار القانونية','العناية الواجبة قبل الصفقات','اتفاقيات الشركاء والمساهمين'] },
  { letter:'ع', title:'القطاع العقاري', desc:'عقود التطوير والبيع ونزاعات الملكية العقارية.', items:['عقود التطوير والبيع العقاري','نزاعات الملكية والشراكة','التسجيل والتوثيق العقاري'] },
  { letter:'ب', title:'البنوك والتمويل', desc:'الامتثال التنظيمي والمنازعات المصرفية.', items:['الامتثال للأنظمة المصرفية','عقود وهياكل التمويل','المنازعات المصرفية والتحصيل'] },
  { letter:'ق', title:'المقاولات', desc:'عقود المقاولات والمطالبات الهندسية والتنفيذية.', items:['صياغة عقود المقاولات','المطالبات الهندسية والفنية','فض منازعات التنفيذ'] },
  { letter:'ر', title:'الرعاية الصحية', desc:'الامتثال التنظيمي لمنشآت القطاع الصحي.', items:['تراخيص المنشآت الصحية','الامتثال التنظيمي والتفتيش','مسؤولية الأخطاء الطبية'] },
  { letter:'ت', title:'التجارة الإلكترونية', desc:'حماية المستهلك وعقود المنصات الرقمية.', items:['عقود المنصات والمتاجر الرقمية','حماية المستهلك الإلكتروني','حماية البيانات والخصوصية'] },
  { letter:'ح', title:'الجهات الحكومية', desc:'الاستشارات القانونية للجهات وشبه الحكومية.', items:['الاستشارات التنظيمية والتشريعية','صياغة العقود الحكومية','تمثيل الجهات شبه الحكومية'] },
];

/* Data: Accreditations */
const ACCREDITATIONS = [
  { i:'fa-check-circle', t:'محامون مرخصون رسمياً' },
  { i:'fa-shield-halved', t:'عضو الهيئة السعودية للمحامين' },
  { i:'fa-lock', t:'الالتزام الكامل بالسرية المهنية' },
  { i:'fa-balance-scale', t:'الامتثال الدائم للأنظمة القانونية' },
  { i:'fa-handshake', t:'شريك تحكيم في مراكز دولية' },
  { i:'fa-certificate', t:'اعتماد ISO لإدارة الجودة' },
];

/* Data: Partners (real institutional partners and their logos) */
const PARTNERS = [
  { name:'مصرف الإنماء', logo:'alinma.png' },
  { name:'جامعة الملك سعود', logo:'ksu.png' },
  { name:'زين السعودية', logo:'zain.png' },
  { name:'الجعيب', logo:'aljoaib.png' },
  { name:'الجامعة السعودية الإلكترونية', logo:'seu.png' },
  { name:'الهيئة العامة للطيران المدني', logo:'gaca.png' },
  { name:'مجموعة د. سليمان الحبيب الطبية', logo:'sulaiman-al-habib.png' },
  { name:'مركز الملك عبدالله المالي', logo:'kafd.png' },
  { name:'صندوق الاستثمارات العامة', logo:'pif.png' },
  { name:'الشركة السعودية للصناعات العسكرية', logo:'sami.png' },
];

/* Data: FAQs */
const FAQS = [
  { q:'هل الاستشارة الأولى سرية؟', a:'نعم. جميع المعلومات والمستندات التي يشاركها العميل تعامل بسرية مهنية كاملة، حتى قبل توقيع اتفاقية التمثيل.' },
  { q:'كيف يتم تحديد أتعاب المكتب؟', a:'تعتمد الأتعاب على نطاق العمل، درجة التعقيد، قيمة النزاع، وعدد الإجراءات المتوقعة. يتم توضيح ذلك بشفافية قبل بدء العمل.' },
  { q:'هل يقدم المكتب خدمات للشركات والأفراد؟', a:'نعم. لدينا فرق متخصصة للشركات ورواد الأعمال، وفرق أخرى لقضايا الأفراد والأسرة والتنفيذ.' },
  { q:'ما المستندات المطلوبة قبل الاستشارة؟', a:'يفضل إرسال العقود، المراسلات، الأحكام أو القرارات السابقة، وأي مستندات تثبت الوقائع محل النزاع.' },
  { q:'هل يمكن حل النزاع دون تقاضي؟', a:'في كثير من الملفات يكون التفاوض أو التسوية أفضل من التقاضي. نحدد المسار الأنسب بعد مراجعة الأدلة والمخاطر.' },
  { q:'كم تستغرق الاستجابة لطلب الاستشارة العاجلة؟', a:'نلتزم بالتواصل خلال 30 دقيقة من استلام الطلب، وتحديد أقرب موعد متاح مع المحامي المختص.' },
];

/* Data: Insights */
const INSIGHTS = [
  { cat:'تحليل قانوني', title:'التعديلات الجديدة على نظام الشركات وأثرها على الحوكمة', read:'6 دقائق', date:'2 يونيو 2026', author:'عبدالعزيز الراشد', img:im('photo-1589829545856-d10d557cf95f',900),
    excerpt:'تحمل التعديلات الأخيرة على نظام الشركات تحولات جوهرية في متطلبات الحوكمة والإفصاح، تستوجب من مجالس الإدارة مراجعة سياساتها الداخلية.',
    sections:[
      { h:'أبرز ملامح التعديل', p:'جاءت التعديلات لتعزيز معايير الشفافية والإفصاح في الشركات المساهمة، مع إلزام مجالس الإدارة بلجان رقابية إضافية ومتطلبات تقارير دورية أكثر تفصيلاً.' },
      { h:'الأثر على الشركات العائلية', p:'تمس التعديلات بشكل خاص الشركات العائلية التي تتجه نحو الطرح العام أو التوسع المؤسسي، إذ تفرض هيكلة أوضح للأدوار بين الملاك والإدارة التنفيذية.' },
      { h:'خطوات عملية للامتثال', p:'ننصح الشركات بمراجعة أنظمتها الأساسية وسياسات الحوكمة الداخلية خلال الفترة الانتقالية المحددة، وتوثيق كل تعديل بما يتوافق مع النصوص الجديدة.' },
    ] },
  { cat:'إرشادات', title:'خمس نقاط يجب مراجعتها قبل توقيع أي عقد تجاري', read:'5 دقائق', date:'18 مايو 2026', author:'نورة الفهد', img:im('photo-1554224155-6726b3ff858f',900),
    excerpt:'كثير من النزاعات التجارية تنشأ من بنود غامضة في العقود لم تُراجع بعناية كافية. نستعرض أهم النقاط التي يجب التحقق منها قبل التوقيع.',
    sections:[
      { h:'وضوح الالتزامات المتبادلة', p:'تأكد أن العقد يحدد بدقة التزامات كل طرف، ومواعيد التنفيذ، ومعايير القبول، دون ترك مجال للتفسيرات المتعددة.' },
      { h:'بنود فسخ العقد والتعويض', p:'راجع شروط الإنهاء المبكر والتعويضات المستحقة بعناية، فهذه البنود غالباً ما تكون مصدر النزاع الأكبر عند حدوث خلاف.' },
      { h:'القانون الواجب التطبيق والاختصاص', p:'في العقود ذات الطرف الأجنبي، احرص على تحديد القانون الواجب التطبيق وجهة التقاضي أو التحكيم المختصة بوضوح تام.' },
    ] },
  { cat:'اتجاهات', title:'التحكيم التجاري كبديل استراتيجي عن التقاضي التقليدي', read:'7 دقائق', date:'30 أبريل 2026', author:'سلمان الدوسري', img:im('photo-1521791136064-7986c2920216',900),
    excerpt:'تتجه الشركات الكبرى بشكل متزايد نحو التحكيم التجاري كوسيلة أسرع وأكثر خصوصية لحل نزاعاتها، مقارنة بمسارات التقاضي التقليدية.',
    sections:[
      { h:'لماذا يتصاعد الإقبال على التحكيم؟', p:'يوفر التحكيم سرية أكبر وسرعة في الفصل بالنزاع مقارنة بالمحاكم التقليدية، وهو ما يجعله خياراً مفضلاً في النزاعات التجارية الحساسة.' },
      { h:'اختيار هيئة التحكيم المناسبة', p:'يعتمد نجاح مسار التحكيم على حسن اختيار المحكّمين ومركز التحكيم، بما يتناسب مع طبيعة النزاع وجنسيات الأطراف المتنازعة.' },
      { h:'صياغة شرط التحكيم بعناية', p:'يجب صياغة شرط التحكيم في العقد الأصلي بدقة قانونية عالية لتفادي أي طعن لاحق في اختصاص هيئة التحكيم أو صحة الإجراءات.' },
    ] },
  { cat:'قانون العمل', title:'أبرز التعديلات على نظام العمل ومتطلبات الامتثال', read:'5 دقائق', date:'10 يونيو 2026', author:'نورة الفهد', img:im('photo-1521791136064-7986c2920216',900),
    excerpt:'أدخلت التعديلات الأخيرة على نظام العمل تغييرات في عقود التوظيف وإنهاء الخدمة، ما يستوجب على المنشآت مراجعة سياساتها الداخلية لتفادي المخالفات.',
    sections:[
      { h:'تحديثات عقود العمل', p:'شملت التعديلات ضوابط أوضح لصياغة عقود العمل محددة ومفتوحة المدة، مع تشديد على توثيق كافة الالتزامات المتبادلة بين طرفي العلاقة.' },
      { h:'إجراءات إنهاء الخدمة', p:'فرضت التعديلات معايير أدق لإثبات مسوغات إنهاء الخدمة، بما يقلل من مخاطر دعاوى الفصل التعسفي أمام الجهات المختصة.' },
      { h:'التوصية بالمراجعة الدورية', p:'ننصح المنشآت بمراجعة لوائح العمل الداخلية ونماذج العقود بشكل دوري لضمان توافقها المستمر مع أحدث التعديلات النظامية.' },
    ] },
  { cat:'ملكية فكرية', title:'حماية العلامة التجارية: خطوات التسجيل والدفاع عن الحقوق', read:'6 دقائق', date:'22 يونيو 2026', author:'سلمان الدوسري', img:im('photo-1454165804606-c3d57bc86b40',900),
    excerpt:'تُعد العلامة التجارية من أهم أصول المنشأة غير الملموسة، وتحتاج إلى إجراءات تسجيل دقيقة ومتابعة قانونية مستمرة لصون حقوقها من التعدي.',
    sections:[
      { h:'إجراءات التسجيل الأساسية', p:'يبدأ التسجيل بفحص شامل للعلامة للتأكد من خلوها من أي تشابه مسبق، يليه تقديم الطلب أمام الجهة المختصة ومتابعة مراحل الفحص والاعتراض.' },
      { h:'المراقبة والدفاع عن الحقوق', p:'لا تنتهي الحماية بالتسجيل، بل تستوجب مراقبة السوق بشكل دوري لرصد أي تعدٍ محتمل واتخاذ الإجراءات النظامية اللازمة في حينها.' },
      { h:'التعامل مع حالات التعدي', p:'عند ثبوت التعدي، يمكن اللجوء إلى الإنذار الرسمي أو رفع دعوى قضائية للمطالبة بوقف الاستخدام غير المشروع والتعويض عن الأضرار.' },
    ] },
  { cat:'قانون عقاري', title:'التوثيق العقاري الإلكتروني وأثره على تقليل المنازعات', read:'4 دقائق', date:'1 يوليو 2026', author:'عبدالعزيز الراشد', img:im('photo-1560250097-0b93528c311a',900),
    excerpt:'ساهم التحول نحو التوثيق العقاري الإلكتروني في تقليص نسبة كبيرة من نزاعات الملكية، عبر ضمان دقة البيانات وسهولة تتبع سلسلة التملك.',
    sections:[
      { h:'مزايا التوثيق الإلكتروني', p:'يوفر التوثيق الإلكتروني سجلاً دقيقاً وموحداً لكل صك عقاري، ما يقلل من احتمالية التعارض بين الوثائق أو تكرار تسجيل نفس الأصل.' },
      { h:'أثره على تقليل النزاعات', p:'ساهمت الأنظمة الإلكترونية في خفض عدد قضايا تنازع الملكية عبر تمكين التحقق الفوري من صحة الصكوك قبل إتمام أي تصرف عقاري.' },
      { h:'نصائح للمستثمرين العقاريين', p:'ننصح بالتحقق من سلامة التوثيق الإلكتروني للصك قبل أي تعاقد، والاستعانة بمستشار قانوني لمراجعة سلسلة الملكية بشكل كامل.' },
    ] },
];

/* Data: Marquee */
const MARQUEE_ITEMS = ['غرفة التجارة الرياض','الهيئة السعودية للمحامين','البنك الاستثماري الإقليمي','مجموعة صناعية وطنية','شركة عقارية رائدة','مركز التحكيم التجاري الدولي','مجلس الغرف السعودية','صندوق استثماري خاص','شركة تقنية ناشئة','مستشفى خاص رائد'];

/* ════════════════════════════════════════════════════════════════
   INITIALIZATION
════════════════════════════════════════════════════════════════ */

/* Loader */
window.addEventListener('load', () => setTimeout(() => el('loader')?.classList.add('hide'), 400));

/* Footer year */
el('footer-year') && (el('footer-year').textContent = `© ${new Date().getFullYear()} مكتب رواد القانون للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.`);

/* ===========================================================
   HEADER BEHAVIORS
   =========================================================== */
function initHeader(){
  const hdr = el('hdr'), prog = el('scroll-progress');
  const onScroll = () => {
    const y = window.scrollY;
    hdr?.classList.toggle('scrolled', y > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.width = max > 0 ? `${(y / max) * 100}%` : '0%';
    // hero parallax
    if (!prefersReduced) {
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg && y < innerHeight) heroBg.style.transform = `scale(${1.06 - (y / innerHeight) * 0.06}) translateY(${y * 0.12}px)`;
    }
    // back-to-top
    el('scroll-top')?.classList.toggle('visible', y > 480);
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive:true });
}

/* Active nav link */
function initActiveNav(){
  const links = $$('#nav-links a[href^="#"]');
  const mobileLinks = $$('#mobile-menu a[href^="#"]');
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
        mobileLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => io.observe(s));
}

/* Mobile menu */
function initMobile(){
  const btn = el('hamburger'), panel = el('mobile-menu'), header = el('hdr');
  if (!btn || !panel) return;
  const positionPanel = () => {
    if (header) panel.style.top = (header.getBoundingClientRect().bottom + 10) + 'px';
  };
  const closeMenu = () => {
    panel.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !panel.classList.contains('open');
    if (open) positionPanel();
    panel.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('a', panel).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel.classList.contains('open')) closeMenu(); });
  addEventListener('resize', () => {
    if (innerWidth > 1180 && panel.classList.contains('open')) closeMenu();
    else if (panel.classList.contains('open')) positionPanel();
  });
}

/* Search popup */
function initSearch(){
  const popup = el('search-popup'), open = el('searchOpen'), close = el('searchClose');
  const input = el('siteSearch'), results = el('searchResults');
  if (!popup) return;
  const corpus = [
    ...PRACTICE_AREAS.map(p => ({ title:p.title, text:p.desc, href:'#practice' })),
    ...INSIGHTS.map(i => ({ title:i.title, text:i.excerpt, href:'#insights' })),
    ...FAQS.map(f => ({ title:f.q, text:f.a, href:'#faq' })),
    ...CASES.map(c => ({ title:c.title, text:c.desc, href:'#cases' })),
  ];
  const show = () => { popup.classList.add('open'); popup.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; setTimeout(() => input?.focus(), 80); };
  const hide = () => { popup.classList.remove('open'); popup.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if(input) input.value = ''; if(results) results.innerHTML = ''; };
  open?.addEventListener('click', show);
  close?.addEventListener('click', hide);
  popup?.addEventListener('click', e => { if (e.target === popup) hide(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && popup.classList.contains('open')) hide(); });
  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const matches = corpus.filter(item => `${item.title} ${item.text}`.toLowerCase().includes(q)).slice(0, 8);
    results.innerHTML = matches.length ? matches.map(item => `
      <a href="${item.href}" onclick="document.getElementById('searchClose').click()">
        <div><strong>${item.title}</strong><small>${item.text.slice(0, 75)}...</small></div>
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
      </a>`).join('') : '<p style="color:rgba(255,255,255,.6);padding:14px;text-align:center">لا توجد نتائج مطابقة.</p>';
  });
}

/* Smooth scrolling */
function initSmoothLinks(){
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#' || id === '#!') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

/* ===========================================================
   EFFECTS (Ripple, Magnetic, Tilt, Cursor, Mouse Glow, Reveal)
   =========================================================== */
function initRipple(){
  $$('.ripple').forEach(btn => btn.addEventListener('click', e => {
    const rect = btn.getBoundingClientRect();
    if (rect.width === 0) return;
    const dot = document.createElement('span');
    dot.className = 'ripple-dot';
    dot.style.left = `${e.clientX - rect.left}px`;
    dot.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  }));
}

function initMagnetic(){
  if (prefersReduced || isTouch) return;
  $$('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* Mouse glow */
function initMouseGlow(){
  if (prefersReduced || isTouch) return;
  const glow = document.querySelector('.mouse-glow');
  if (!glow) return;
  addEventListener('mousemove', e => {
    glow.classList.add('is-active');
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive:true });
}

/* Reveal */
function initReveal(){
  const items = $$('.rv, .rv-l, .rv-r');
  if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('on')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(i => io.observe(i));
}

/* Counters */
function initCounters(){
  const counters = $$('.counter');
  if (!counters.length) return;
  if (!('IntersectionObserver' in window)) {
    counters.forEach(c => c.textContent = (c.dataset.prefix || '') + Number(c.dataset.target).toLocaleString('en-US'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const node = e.target;
      io.unobserve(node);
      const target = Number(node.dataset.target || 0);
      const duration = prefersReduced ? 80 : 1500;
      const start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.floor(target * eased).toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.45 });
  counters.forEach(c => io.observe(c));
}

/* ===========================================================
   COMPONENT RENDERERS
   =========================================================== */
function renderAboutTabs(){
  el('aboutTabPanel') && (el('aboutTabPanel').textContent = aboutCopy.vision);
  $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
    el('aboutTabPanel') && (el('aboutTabPanel').textContent = aboutCopy[btn.dataset.tab] || aboutCopy.vision);
  }));
}

function renderPractice(filter = 'all'){
  const grid = el('practice-grid');
  if (!grid) return;
  const list = filter === 'all' ? PRACTICE_AREAS : PRACTICE_AREAS.filter(p => p.cat === filter);
  grid.innerHTML = list.map((p, i) => {
    const realIdx = PRACTICE_AREAS.indexOf(p);
    return `
    <article class="practice-card rv" style="transition-delay:${i * 40}ms" onclick="openPracticeModal(${realIdx})" onkeydown="if(event.key==='Enter'){openPracticeModal(${realIdx})}" tabindex="0" role="button" aria-label="${p.title} — عرض التفاصيل">
      <div class="pc-media">
        <img src="${p.img}" alt="${p.title} — ${p.desc}" loading="lazy">
      </div>
      <span class="pc-seal"><i class="fas ${p.icon}" aria-hidden="true"></i></span>
      <div class="practice-card-inner">
        <div class="pc-title">${p.title}</div>
        <div class="pc-desc">${p.desc}</div>
        <span class="pc-arrow">اقرأ المزيد <i class="fa-solid fa-arrow-left"></i></span>
      </div>
    </article>`;
  }).join('');
  initRevealFor(grid);
}

function openPracticeModal(idx){
  const p = PRACTICE_AREAS[idx]; if (!p) return;
  const m = el('practice-modal');
  el('pmodal2-img').src = p.img; el('pmodal2-img').alt = p.title;
  el('pmodal2-icon').innerHTML = `<i class="fas ${p.icon}" aria-hidden="true"></i>`;
  el('pmodal2-cat').textContent = p.cat;
  el('pmodal2-title').textContent = p.title;
  el('pmodal2-desc').textContent = p.desc;
  el('pmodal2-points').innerHTML = p.points.map(pt => `<li>${pt}</li>`).join('');
  el('pmodal2-tags').innerHTML = p.tags.map(t => `<span class="pmodal-tag">${t}</span>`).join('');
  m.classList.add('open'); m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closePracticeModal(){
  const m = el('practice-modal');
  m.classList.remove('open'); m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
window.openPracticeModal = openPracticeModal;
window.closePracticeModal = closePracticeModal;

function renderWhy(){
  el('why-grid') && (el('why-grid').innerHTML = WHY_US.map((w, i) => `
    <div class="why-card">
      <div class="why-icon"><i class="fas ${w.icon}" aria-hidden="true"></i></div>
      <div class="why-num">0${i + 1}</div>
      <div class="why-title">${w.t}</div>
      <div class="why-desc">${w.d}</div>
    </div>`).join(''));
}

function renderProcess(){
  el('process-grid') && (el('process-grid').innerHTML = PROCESS.map(p => `
    <article class="process-card">
      <div class="process-icon"><i class="${p.icon}" aria-hidden="true"></i></div>
      <span class="process-num">${p.n}</span>
      <div class="process-title">${p.t}</div>
      <div class="process-desc">${p.d}</div>
    </article>`).join(''));
}

function renderTeam(){
  el('team-grid') && (el('team-grid').innerHTML = TEAM.map(m => `
    <article class="team-card">
      <div class="team-img-wrap">
        <img src="image/${m.img}" alt="${m.name} - ${m.spec}" loading="lazy">
        <div class="team-ov"></div>
        <div class="team-info">
          <div class="team-name">${m.name}</div>
          <div class="team-role">${m.role}</div>
          <div class="team-spec">${m.spec}</div>
          <div class="team-meta">
            <span><i class="fa-regular fa-clock"></i> ${m.years}</span>
            <span><i class="fa-solid fa-envelope"></i></span>
          </div>
          <div class="team-socials">
            <a href="#contact" aria-label="البريد الإلكتروني ${m.name}"><i class="fa-solid fa-envelope"></i></a>
            <a href="#" aria-label="LinkedIn ${m.name}"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#contact" aria-label="اتصل بـ ${m.name}"><i class="fa-solid fa-phone"></i></a>
          </div>
        </div>
      </div>
    </article>`).join(''));
}

function renderStats(){
  el('stats-grid') && (el('stats-grid').innerHTML = STATS.map(s => `
    <div class="stat-card">
      <div class="sc-num">${s.prefix ? `<span class="sup">${s.prefix}</span>` : ''}<span class="counter" data-target="${s.target}">0</span>${s.suffix || ''}</div>
      <div class="sc-bar"></div>
      <div class="sc-lbl">${s.label}</div>
    </div>`).join(''));
}

function renderIndustries(){
  el('industries-grid') && (el('industries-grid').innerHTML = INDUSTRIES.map((ind, i) => `
    <div class="industry-card rv" style="transition-delay:${i * 40}ms">
      <div class="ind-top">
        <span class="ind-eyebrow">قطاع</span>
        <span class="ind-num">${String(i + 1).padStart(2,'0')}</span>
      </div>
      <div class="ind-title">${ind.title}</div>
      <div class="ind-desc">${ind.desc}</div>
      <div class="ind-divider"></div>
      <ul class="ind-list">${ind.items.map(it => `<li>${it}</li>`).join('')}</ul>
    </div>`).join(''));
  initRevealFor(el('industries-grid'));
}

function renderJourney(){
  el('journey-track') && (el('journey-track').innerHTML = JOURNEY.map(j => `
    <div class="journey-step">
      <div class="journey-num">${j.n}</div>
      <div class="journey-title">${j.t}</div>
    </div>`).join(''));
}

function renderPackages(){
  el('packages-grid') && (el('packages-grid').innerHTML = PACKAGES.map(p => `
    <div class="package-card${p.featured ? ' featured' : ''}">
      ${p.badge ? `<span class="pkg-badge"><i class="fa-solid fa-star"></i> ${p.badge}</span>` : ''}
      <div class="pkg-name">${p.name}</div>
      <p class="pkg-tagline">${p.tagline}</p>
      <div class="pkg-divider"></div>
      <div class="pkg-fit">${p.fit}</div>
      <div class="pkg-tags">${p.tags.map(t => `<span class="pkg-tag">${t}</span>`).join('')}</div>
      <a href="#contact" class="pkg-cta">تواصل بخصوص هذه الباقة <i class="fa-solid fa-arrow-left"></i></a>
    </div>`).join(''));
}

function renderAccreditations(){
  el('accred-grid') && (el('accred-grid').innerHTML = ACCREDITATIONS.map(a => `
    <span class="accred-badge"><i class="fa-solid ${a.i}"></i> ${a.t}</span>`).join(''));
}

function renderPartners(){
  el('partners-grid') && (el('partners-grid').innerHTML = PARTNERS.map(p => `
    <div class="partner-badge"><img src="image/logos/${p.logo}" alt="${p.name}" loading="lazy"></div>`).join(''));
}

function renderMarquee(){
  const track = el('marquee-track');
  if (!track) return;
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  track.innerHTML = items.map((it, i) => i % 2 === 0
    ? `<span>${it}</span><span class="sep" aria-hidden="true">✦</span>`
    : `<span>${it}</span><span class="sep" aria-hidden="true">✦</span>`).join('');
}

/* Cases */
function renderCases(filter = 'all'){
  const grid = el('cgrid'); if (!grid) return;
  const list = filter === 'all' ? CASES : CASES.filter(c => c.cat === filter);
  grid.innerHTML = list.map(c => `
    <article class="ccard" tabindex="0" role="button" aria-label="عرض تفاصيل ${c.title}"
      onclick="openCaseModal(${c.id})" onkeydown="if(event.key==='Enter'){openCaseModal(${c.id})}">
      <img src="${c.img}" alt="${c.title}" loading="lazy">
      <div class="ccard-ov"></div>
      <div class="ccard-body">
        <span class="ccard-cat">${c.cat}</span>
        <div class="ccard-title">${c.title}</div>
        <div class="ccard-meta"><span><i class="fas fa-location-dot"></i> ${c.city}</span><span><i class="fas fa-calendar"></i> ${c.year}</span></div>
        <div class="ccard-hint"><i class="fas fa-arrow-left"></i> عرض دراسة الحالة</div>
      </div>
    </article>`).join('');
  el('cases-count') && (el('cases-count').textContent = `${list.length} دراسة حالة معروضة`);
}

function openCaseModal(id){
  const c = CASES.find(x => x.id === id); if (!c) return;
  const m = el('case-modal');
  const img = el('cmodal-img'); img.src = c.img; img.alt = c.title;
  el('cmodal-cat').textContent = c.cat;
  el('cmodal-title').textContent = c.title;
  el('cmodal-desc').textContent = c.desc;
  el('cmodal-challenge').textContent = c.challenge;
  el('cmodal-approach').textContent = c.approach;
  el('cmodal-client').textContent = c.client;
  el('cmodal-city').textContent = c.city;
  el('cmodal-year').textContent = c.year;
  el('cmodal-duration').textContent = c.duration;
  el('cmodal-team').textContent = c.team;
  el('cmodal-scope').textContent = c.scope;
  el('cmodal-stats').innerHTML = c.stats.map(s => {
    const [val, ...rest] = s.split(' ');
    return `<div class="pmodal-stat"><div class="sv">${val}</div><div class="sk">${rest.join(' ')}</div></div>`;
  }).join('');
  el('cmodal-tags').innerHTML = c.tags.map(t => `<span class="pmodal-tag">${t}</span>`).join('');
  m.classList.add('open'); m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCaseModal(){
  const m = el('case-modal');
  m.classList.remove('open'); m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
window.openCaseModal = openCaseModal;
window.closeCaseModal = closeCaseModal;

/* Testimonials slider */
let tstIdx = 0;
function renderTestimonials(){
  el('tst-track') && (el('tst-track').innerHTML = TESTIMONIALS.map(t => `
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
          <div class="tst-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        </div>
        <div class="tst-badge">
          <i class="fas fa-briefcase"></i>
          <div><div class="tst-badge-lbl">القضية</div><div class="tst-badge-val">${t.badge}</div></div>
        </div>
      </div>
    </div>`).join(''));
  el('tst-dots') && (el('tst-dots').innerHTML = TESTIMONIALS.map((_, i) => `<button class="tst-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="الشهادة ${i + 1}" type="button"></button>`).join(''));
  bindTestimonials();
}
function bindTestimonials(){
  const track = el('tst-track'), dots = $$('.tst-dot'), prev = el('tst-prev'), next = el('tst-next');
  if (!track) return;
  const go = i => {
    tstIdx = ((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(${tstIdx * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === tstIdx));
  };
  dots.forEach(d => d.addEventListener('click', () => go(+d.dataset.i)));
  prev?.addEventListener('click', () => go(tstIdx - 1));
  next?.addEventListener('click', () => go(tstIdx + 1));
  // autoplay
  if (!prefersReduced) {
    setInterval(() => go(tstIdx + 1), 7000);
  }
}

/* FAQ */
function renderFaq(){
  el('faq-list') && (el('faq-list').innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" data-i="${i}">
      <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-${i}">
        <span>${f.q}</span>
        <i class="fa-solid fa-plus" aria-hidden="true"></i>
      </button>
      <div class="faq-a" id="faq-${i}"><div class="faq-a-inner">${f.a}</div></div>
    </div>`).join(''));
  el('faq-list')?.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q'); if (!btn) return;
    const item = btn.closest('.faq-item');
    const panel = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    $$('.faq-item').forEach(it => { it.classList.remove('open'); it.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); it.querySelector('.faq-a').style.maxHeight = null; });
    if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); panel.style.maxHeight = panel.scrollHeight + 'px'; }
  });
}
function filterFaq(q){
  faqQuery = (q || '').trim().toLowerCase();
  let visible = 0;
  $$('.faq-item').forEach((item, i) => {
    const f = FAQS[i];
    const match = !faqQuery || f.q.toLowerCase().includes(faqQuery) || f.a.toLowerCase().includes(faqQuery);
    item.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  el('faq-empty')?.classList.toggle('hidden', visible !== 0);
}
let faqQuery = '';
window.filterFaq = filterFaq;

/* Insights */
function renderInsights(){
  el('insights-grid') && (el('insights-grid').innerHTML = INSIGHTS.map((a, i) => `
    <article class="ins-card" onclick="openInsightModal(${i})" tabindex="0" role="button" aria-label="قراءة ${a.title}"
      onkeydown="if(event.key==='Enter'){openInsightModal(${i})}">
      <div class="ins-img-wrap">
        <img src="${a.img}" alt="${a.title}" loading="lazy">
        <span class="ins-cat">${a.cat}</span>
      </div>
      <div class="ins-body">
        <div class="ins-meta">
          <span><i class="far fa-calendar"></i> ${a.date}</span>
          <span><i class="far fa-clock"></i> ${a.read}</span>
        </div>
        <div class="ins-title">${a.title}</div>
        <div class="ins-excerpt">${a.excerpt}</div>
        <span class="ins-link">اقرأ المقال كاملاً <i class="fas fa-arrow-left"></i></span>
      </div>
    </article>`).join(''));
}

function openInsightModal(i){
  const a = INSIGHTS[i]; if (!a) return;
  const m = el('insight-modal');
  const img = el('insight-img'); img.src = a.img; img.alt = a.title;
  el('insight-modal-cat').textContent = a.cat;
  el('insight-modal-title').textContent = a.title;
  el('insight-modal-meta').innerHTML = `<span><i class="fas fa-user"></i> ${a.author}</span><span><i class="far fa-calendar"></i> ${a.date}</span><span><i class="far fa-clock"></i> ${a.read}</span>`;
  el('insight-modal-excerpt').textContent = a.excerpt;
  el('insight-modal-content').innerHTML = a.sections.map(s => `<h3>${s.h}</h3><p>${s.p}</p>`).join('');
  m.classList.add('open'); m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeInsightModal(){
  const m = el('insight-modal');
  m.classList.remove('open'); m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
window.openInsightModal = openInsightModal;
window.closeInsightModal = closeInsightModal;

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeCaseModal(); closeInsightModal(); closePracticeModal(); }
});

/* ===========================================================
   MULTI-STEP CONTACT FORM
   =========================================================== */
let formStep = 0;
const totalSteps = 3;
function buildChips(containerId, options){
  el(containerId) && (el(containerId).innerHTML = options.map(x =>
    `<button type="button" class="chip-btn" onclick="toggleChip(this,'${containerId}')">${x}</button>`).join(''));
}
function toggleChip(btn, groupId){
  $$('#' + groupId + ' .chip-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}
function updateFormUI(){
  for (let i = 0; i < totalSteps; i++) {
    const p = el('fpanel-' + i);
    if (p) p.classList.toggle('active', i === formStep);
  }
  const pct = ((formStep + 1) / totalSteps * 100).toFixed(2);
  el('fstep-label') && (el('fstep-label').textContent = `خطوة ${formStep + 1} من ${totalSteps}`);
  const pf = el('progress-fill'); if (pf) { pf.style.width = pct + '%'; pf.parentElement.setAttribute('aria-valuenow', pct); }
  el('btn-prev') && (el('btn-prev').disabled = formStep === 0);
  const btnNext = el('btn-next');
  if (btnNext) {
    if (formStep === totalSteps - 1) { btnNext.textContent = 'إرسال الطلب'; btnNext.className = 'btn-submit'; }
    else { btnNext.textContent = 'التالي'; btnNext.className = 'btn-next'; }
  }
}
function formNext(){
  if (formStep < totalSteps - 1) { formStep++; updateFormUI(); return; }
  // Final step: submit
  $$('.form-panel').forEach(p => p.classList.remove('active'));
  el('success-screen')?.classList.add('active');
  el('form-nav') && (el('form-nav').style.display = 'none');
  document.querySelector('.form-header') && (document.querySelector('.form-header').style.display = 'none');
  document.querySelector('.progress-bar') && (document.querySelector('.progress-bar').style.display = 'none');
}
function formPrev(){ if (formStep > 0) { formStep--; updateFormUI(); } }
window.formNext = formNext;
window.formPrev = formPrev;
window.toggleChip = toggleChip;

/* ===========================================================
   URGENT REQUEST / NEWSLETTER HANDLERS
   =========================================================== */
function handleUrgentRequest(evt){
  evt.preventDefault();
  el('urgent-form') && (el('urgent-form').style.display = 'none');
  el('urgent-success') && (el('urgent-success').removeAttribute('hidden'));
  return false;
}
function handleNewsletter(evt){
  evt.preventDefault();
  const input = el('newsletter-email');
  const success = el('newsletter-success');
  if (input && input.value && success) {
    success.classList.remove('hidden');
    input.value = '';
    setTimeout(() => success.classList.add('hidden'), 5000);
  }
  return false;
}
window.handleUrgentRequest = handleUrgentRequest;
window.handleNewsletter = handleNewsletter;

/* ===========================================================
   UTILITY
   =========================================================== */
function initRevealFor(scope){
  if (!scope) return;
  const items = $$('.rv, .rv-l, .rv-r', scope);
  if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('on')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(i => io.observe(i));
}

/* WhatsApp tooltip */
(function(){
  const tooltip = el('wa-tooltip'); const btn = el('wa-fab-btn');
  if (!tooltip || !btn) return;
  setTimeout(() => { tooltip.classList.add('show'); setTimeout(() => tooltip.classList.remove('show'), 5000); }, 4500);
  btn.addEventListener('mouseenter', () => tooltip.classList.add('show'));
  btn.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
})();

/* Scroll-to-top click */
el('scroll-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Image error fallback */
$$('img').forEach(image => {
  image.addEventListener('error', () => {
    image.style.background = 'linear-gradient(135deg,#0F3D2E,#C8A24D)';
    image.removeAttribute('src');
  }, { once: true });
});

/* ===========================================================
   INIT
   =========================================================== */
function init(){
  renderMarquee();
  renderStats();
  renderAboutTabs();
  renderPractice('all');
  renderWhy();
  renderProcess();
  renderTeam();
  renderJourney();
  renderPackages();
  renderCases('all');
  renderTestimonials();
  renderAccreditations();
  renderPartners();
  renderIndustries();
  renderFaq();
  renderInsights();

  buildChips('type-chips', ['قضية تجارية','قضية عقارية','قضية أسرية','قضية جنائية','تحكيم دولي','استشارة شركات']);
  buildChips('urgency-chips', ['استشارة عامة','خلال أسبوع','عاجلة خلال 48 ساعة']);

  initHeader();
  initActiveNav();
  initMobile();
  initSearch();
  initSmoothLinks();
  initReveal();
  initCounters();
  initCountersForStats();
  initRipple();
  initMagnetic();
  initMouseGlow();

  // Filter handlers
  el('pfilter')?.addEventListener('click', e => {
    const btn = e.target.closest('.pfbtn'); if (!btn) return;
    $$('.pfbtn', el('pfilter')).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPractice(btn.dataset.pf);
  });
  el('cfilter')?.addEventListener('click', e => {
    const btn = e.target.closest('.pfbtn'); if (!btn) return;
    $$('.pfbtn', el('cfilter')).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCases(btn.dataset.pf);
  });

  // Initial form UI
  updateFormUI();

  // Image lazy fallback handled in initRevealFor
}

document.addEventListener('DOMContentLoaded', init);

/* Re-init counters when stats rerender */
function initCountersForStats(){
  const counters = $$('.counter');
  counters.forEach(c => {
    if (c.dataset.target && !c.dataset._observed) {
      c.dataset._observed = '1';
    }
  });
}
