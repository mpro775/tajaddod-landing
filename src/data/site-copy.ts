export type BrandId = 'nader' | 'cnc' | 'liper';

export type SiteButton = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost';
};

export type BrandCopy = {
  id: BrandId;
  name: string;
  displayName: string;
  roleTitle: string;
  specialty: string;
  shortDescription: string;
  longDescription: string;
  allowedScopes: string[];
  forbiddenScopes?: string[];
  visualDirection: string;
};

export const siteCopy = {
  locale: 'ar',
  direction: 'rtl',

  brand: {
    companyName: 'تجدد',
    experienceName: 'تجدد — من المفتاح إلى الشمس',
    centralMessage:
      'نمثل NADER و CNC و Liper لنقرب حلول الكهرباء، الحماية، الإضاءة، والطاقة الشمسية من التجار والمقاولين والفنيين وأصحاب المشاريع.',
    positioning:
      'تجدد هي المظلة التي تجمع علامات متخصصة في الكهرباء والطاقة، وتربطها باحتياج السوق عبر منظومة توريد موثوقة.',
  },

  seo: {
    title: 'تجدد | وكيل NADER و CNC و Liper للكهرباء والطاقة الشمسية',
    description:
      'تجدد تمثل علامات متخصصة في حلول الكهرباء والطاقة الشمسية، وتخدم التجار والمقاولين والفنيين عبر NADER و CNC و Liper.',
    ogTitle: 'تجدد — من المفتاح إلى الشمس',
    ogDescription:
      'نمثل NADER و CNC و Liper لنقرب حلول الكهرباء، الحماية، الإضاءة، والطاقة الشمسية من السوق.',
  },

  navigation: [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'فلسفتنا', href: '#about' },
    { label: 'العلامات', href: '#brands' },
    { label: 'رحلة الطاقة', href: '#journey' },
    { label: 'دور تجدد', href: '#market-flow' },
    { label: 'تواصل معنا', href: '#contact' },
  ],

  hero: {
    eyebrow: 'وكالات كهرباء وطاقة شمسية',
    title: 'جدّد مشروعك بطاقة أوثق',
    description:
      'تجدد تجمع حلول الكهرباء والطاقة الشمسية في تجربة واحدة؛ من تفاصيل التشغيل اليومية إلى أنظمة الحماية والإضاءة للمنازل والمشاريع والأسواق.',
    buttons: [
      {
        label: 'اكتشف منظومة تجدد',
        href: '#brands',
        variant: 'primary',
      },
      {
        label: 'تواصل تجاريًا',
        href: '#contact',
        variant: 'secondary',
      },
    ] satisfies SiteButton[],
    supportingLine:
      'ثلاث علامات متخصصة، وتجدد تجمعها في تجربة واحدة واضحة للسوق.',
  },

  brandsSection: {
    eyebrow: 'العلامات التي نمثلها',
    title: 'ثلاث علامات… منظومة واحدة',
    description:
      'لكل علامة دور واضح داخل رحلة الكهرباء والطاقة؛ من واجهة الاستخدام اليومية، إلى الحماية والتحكم، ثم الإضاءة والطاقة الشمسية.',
  },

  brands: [
    {
      id: 'nader',
      name: 'NADER',
      displayName: 'NADER',
      roleTitle: 'واجهة الاستخدام اليومي',
      specialty: 'مفاتيح وأفياش',
      shortDescription:
        'مفاتيح وأفياش تضيف لمسة عملية وأنيقة للمنازل والمشاريع.',
      longDescription:
        'يمثل NADER نقطة البداية في أي منظومة كهربائية؛ المفتاح والفيش والواجهة التي يلمسها المستخدم يوميًا داخل المساحات السكنية والتجارية.',
      allowedScopes: ['مفاتيح', 'أفياش', 'إطارات', 'واجهات كهربائية داخلية'],
      forbiddenScopes: ['قواطع', 'إنارة', 'طاقة شمسية', 'تحكم صناعي'],
      visualDirection:
        'مشهد داخلي أنيق: جدار نظيف، مفاتيح وأفياش، إضاءة دافئة، ولمسة تصميم منزلية/معمارية.',
    },
    {
      id: 'cnc',
      name: 'CNC',
      displayName: 'CNC',
      roleTitle: 'قلب الحماية والتحكم',
      specialty: 'قواطع، حماية، تحكم، وتوزيع',
      shortDescription:
        'قواطع، مؤقتات، حماية، وتحكم صناعي لتنظيم الطاقة داخل اللوحات والمشاريع.',
      longDescription:
        'يمثل CNC قلب المنظومة الكهربائية؛ الجزء الذي يحمي وينظم ويدير الطاقة عبر القواطع، الحماية، التحكم، المؤقتات، وسكاكين التحويل.',
      allowedScopes: [
        'قواطع',
        'حماية كهربائية',
        'تحكم صناعي',
        'مؤقتات',
        'سكاكين تحويل',
        'طبالين وصناديق',
        'حلول DC للطاقة الشمسية',
      ],
      visualDirection:
        'مشهد تقني/صناعي: لوحة كهربائية، قواطع، مؤشرات، مسارات طاقة، وإحساس حماية وتحكم.',
    },
    {
      id: 'liper',
      name: 'Liper',
      displayName: 'Liper',
      roleTitle: 'الإضاءة التي تحول الطاقة إلى أثر',
      specialty: 'إضاءة داخلية وخارجية وطاقة شمسية خارجية',
      shortDescription:
        'حلول إضاءة داخلية وخارجية وكشافات شمسية للمساحات والمشاريع.',
      longDescription:
        'يمثل Liper النتيجة المرئية للطاقة؛ حين تتحول الكهرباء إلى ضوء، أمان، وحضور بصري داخل المنازل والمشاريع والمساحات الخارجية.',
      allowedScopes: [
        'Downlights',
        'COB',
        'إنارة داخلية',
        'إنارة خارجية',
        'كشافات شوارع',
        'Solar Street Lights',
      ],
      visualDirection:
        'مشهد إضاءة: إنارة داخلية، إنارة خارجية، كشافات شوارع، ومشهد ليلي بالطاقة الشمسية.',
    },
  ] satisfies BrandCopy[],

  journey: {
    eyebrow: 'رحلة الطاقة',
    title: 'رحلة الطاقة تبدأ من نقطة صغيرة وتنتهي بمنظومة كاملة',
    description:
      'من واجهة الاستخدام اليومية إلى الحماية والتحكم، ثم إلى الإضاءة والطاقة الشمسية؛ تجدد تجمع المراحل في منظومة واحدة.',
    steps: [
      {
        title: 'نقطة التشغيل',
        text: 'كل منظومة تبدأ من نقطة تشغيل بسيطة.',
        brand: 'NADER',
      },
      {
        title: 'مسار الطاقة',
        text: 'الطاقة تحتاج مسارًا آمنًا ومنظمًا.',
        brand: 'تجدد',
      },
      {
        title: 'الحماية والتحكم',
        text: 'هنا يبدأ دور الحماية والتحكم.',
        brand: 'CNC',
      },
      {
        title: 'استمرارية المشروع',
        text: 'التحكم الجيد يصنع استمرارية المشروع.',
        brand: 'CNC',
      },
      {
        title: 'تحويل الطاقة إلى أثر',
        text: 'وفي النهاية تتحول الطاقة إلى ضوء، أمان، وحياة.',
        brand: 'Liper',
      },
      {
        title: 'منظومة واحدة',
        text: 'تجدد تجمع هذه المراحل تحت مظلة واحدة.',
        brand: 'تجدد',
      },
    ],
  },

  marketFlow: {
    eyebrow: 'دور تجدد في السوق',
    title: 'نقرّب العلامات المتخصصة من احتياج السوق',
    description:
      'عبر تجدد، تصل العلامات المتخصصة إلى التجار والمقاولين والفنيين وأصحاب المشاريع ضمن منظومة واضحة تجمع التنوع، الثقة، وفهم السوق.',
    nodes: [
      'العلامات المتخصصة',
      'تجدد',
      'التجار والموزعون',
      'المقاولون',
      'الفنيون',
      'أصحاب المشاريع',
    ],
  },

  appDownload: {
    eyebrow: 'التطبيق المتكامل',
    title: 'منظومة تجدد في متناول يدك',
    description:
      'حمّل تطبيق تجدد الآن أو ادخل للمتجر الإلكتروني لتصفح أحدث منتجات Nader، CNC، و Liper. اطلب عروض الأسعار وتابع مشاريعك بكل سهولة.',
    links: {
      apple: 'https://apps.apple.com/ng/app/%D8%AA%D8%AC%D8%AF%D8%AF/id6756541667',
      google: 'https://play.google.com/store/apps/details?id=com.tagadod.app',
      web: 'https://web.tagadod.app/',
    },
  },

  contact: {
    eyebrow: 'تواصل تجاري',
    title: 'ابدأ تواصلك مع تجدد',
    description:
      'سواء كنت تاجرًا، مقاولًا، فنيًا، أو صاحب مشروع، يمكنك التواصل معنا لمعرفة المزيد عن العلامات التي نمثلها وحلولها المتاحة.',
    buttons: [
      {
        label: 'تواصل عبر واتساب',
        href: 'https://wa.me/967771250000',
        variant: 'primary',
      },
      {
        label: 'راسلنا عبر البريد',
        href: 'mailto:info@tagadodgroup.com',
        variant: 'secondary',
      },
    ] satisfies SiteButton[],
  },

  contentRules: {
    doNotUseInWebsite: [
      'هذه النسخة أقوى',
      'تم تصميم الصفحة كذا',
      'هذه ليست صفحة بيع',
      'لا يوجد أسعار',
      'تم بناء هذه الصفحة',
      'تم تنفيذ V3',
      'النسخة الحالية',
      'كودكس',
      'المطور',
      'ملف الخطة',
    ],
    forbiddenCommerceTerms: ['اشترِ الآن', 'أضف للسلة', 'السعر', 'خصم', 'طلب المنتج'],
  },
} as const;

export type SiteCopy = typeof siteCopy;
