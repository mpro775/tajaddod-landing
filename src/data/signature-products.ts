import type { SignatureProduct, BrandBoard } from '../types/product';


// ──────────────────────────────────────────────
// CNC — قلب الحماية والتحكم
// قواطع، حماية، تحكم، توقيت، تحويل، DC
// ──────────────────────────────────────────────

const cncProducts: SignatureProduct[] = [
  {
    id: '691b6002a477d86c551e316f',
    brand: 'cnc',
    nameAr: 'قاطع طبلون YCB9-MCB',
    nameEn: 'YCB9-MCB Miniature Circuit Breaker',
    categoryAr: 'قواطع',
    shortDescriptionAr: 'قاطع مفرد لحماية الدوائر الفرعية من الأحمال الزائدة والقصر.',
    image: '/assets/products/cnc/mcb.svg',
    hotspot: { x: 20, y: 25 },
  },
  {
    id: '691b662239c83cf548629d55',
    brand: 'cnc',
    nameAr: 'مراقب فولتيه YC7VAN',
    nameEn: 'YC7VAN Voltage Protector 63A',
    categoryAr: 'حماية كهربائية',
    shortDescriptionAr: 'يراقب الجهد والتيار لحظيًا ويفصل تلقائيًا عند الخطر.',
    image: '/assets/products/cnc/yc7van-overvoltage-and-undervoltage-protector.svg',
    hotspot: { x: 75, y: 28 },
  },
  {
    id: '690ca137ab011a233776cee5',
    brand: 'cnc',
    nameAr: 'مؤقت رقمي KG316T',
    nameEn: 'KG316T Digital Timer',
    categoryAr: 'مؤقتات',
    shortDescriptionAr: 'تايمر رقمي دقيق لجدولة تشغيل وإيقاف الأجهزة الكهربائية.',
    image: '/assets/products/cnc/kg316t-time-relay.svg',
    hotspot: { x: 50, y: 45 },
  },
  {
    id: '691b71310606c9cb955fbe66',
    brand: 'cnc',
    nameAr: 'سكين تحويل أوتوماتيك YCQ1B',
    nameEn: 'YCQ1B 2P ATS',
    categoryAr: 'سكاكين تحويل',
    shortDescriptionAr: 'تحويل تلقائي بين مصدري طاقة كالشبكة والمولد أو الطاقة الشمسية.',
    image: '/assets/products/cnc/ycq1b-2p-ats.svg',
    hotspot: { x: 28, y: 68 },
  },
  {
    id: '69244694e60c554bddbd7d23',
    brand: 'cnc',
    nameAr: 'طبلون حديد YCX6 — 9 خط',
    nameEn: 'YCX6-9 Distribution Box',
    categoryAr: 'طبالين وصناديق',
    shortDescriptionAr: 'صندوق توزيع حديد مجلفن بارز بـ 9 خطوط للتركيبات المتينة.',
    image: '/assets/products/cnc/steel-body-distribution-box-9-way-surface-mount-design-boxes.svg',
    hotspot: { x: 72, y: 70 },
  },
];

// ──────────────────────────────────────────────
// Liper — الإضاءة التي تحول الطاقة إلى أثر
// إضاءة داخلية وخارجية وطاقة شمسية
// ──────────────────────────────────────────────

const liperProducts: SignatureProduct[] = [
  {
    id: '691c69916dcd46f8a5850447',
    brand: 'liper',
    nameAr: 'داونلايت EMS بإطار حديث',
    nameEn: 'LPDL-EMS01-Y Downlight',
    categoryAr: 'إضاءة داخلية',
    shortDescriptionAr: 'إضاءة لطش أنيقة بإطار نحيف تجمع بين الأداء والمظهر الجمالي.',
    image: '/assets/products/liper/ems-downlight-liper-lpdl-ems01-y.svg',
    hotspot: { x: 22, y: 28 },
  },
  {
    id: '691c73946dcd46f8a5850a6c',
    brand: 'liper',
    nameAr: 'سبوت COB ديكوري',
    nameEn: 'LP-COB-BX01',
    categoryAr: 'COB',
    shortDescriptionAr: 'عدسة COB احترافية لإبراز التفاصيل الديكورية في المساحات الداخلية.',
    image: '/assets/products/liper/bx-cob-down-light-liper-lp-cob-bx01.svg',
    hotspot: { x: 50, y: 22 },
  },
  {
    id: '691e0e4e85d24d0f6be945cd',
    brand: 'liper',
    nameAr: 'كشاف أحواش بيضاوي 20W',
    nameEn: 'LP-DL20MF01-TB-C Wall Light',
    categoryAr: 'إنارة خارجية',
    shortDescriptionAr: 'كشاف لطش خارجي بيضاوي مقاوم للعوامل الجوية للأسوار والممرات.',
    image: '/assets/products/liper/mf-wall-light-liper-lp-dl20mf01-tb-c.svg',
    hotspot: { x: 78, y: 40 },
  },
  {
    id: '691f112985d24d0f6be965da',
    brand: 'liper',
    nameAr: 'كشاف شوارع شمسي 100W',
    nameEn: 'LPSTL-100D01 Solar Street Light',
    categoryAr: 'كشافات شمسية',
    shortDescriptionAr: 'كشاف شوارع متكامل يعمل بالطاقة الشمسية بدون تكاليف كهرباء.',
    image: '/assets/products/liper/d-series-solar-street-light-liper-lpstl-100d01.svg',
    hotspot: { x: 30, y: 70 },
  },
  {
    id: '694bbf867c8cc60ec725f885',
    brand: 'liper',
    nameAr: 'كشاف فلود LED شمسي',
    nameEn: 'LPFL-HW01-SS Solar Floodlight',
    categoryAr: 'طاقة شمسية',
    shortDescriptionAr: 'كشاف LED يعمل بالطاقة الشمسية مع بطارية مضمنة للتشغيل الليلي.',
    image: '/assets/products/liper/hw-series-solar-led-floodlight-lpfl-hw01-ss.svg',
    hotspot: { x: 68, y: 72 },
  },
];

// ──────────────────────────────────────────────
// Brand Boards — لوحات العرض التمثيلية
// ──────────────────────────────────────────────

export const brandBoards: BrandBoard[] = [

  {
    brand: 'cnc',
    titleAr: 'CNC Protection Board',
    descriptionAr: 'منظومة حماية وتحكم وتوزيع متكاملة لتأمين الطاقة في كل مشروع.',
    sceneImage: '/assets/brands/cnc/cnc-panel-scene.webp',
    products: cncProducts,
  },
  {
    brand: 'liper',
    titleAr: 'Liper Lighting Board',
    descriptionAr: 'حلول إضاءة داخلية وخارجية وكشافات شمسية تحول الطاقة إلى أثر.',
    sceneImage: '/assets/brands/liper/liper-lighting-scene.webp',
    products: liperProducts,
  },
];

// ──────────────────────────────────────────────
// Flat list export for convenience
// ──────────────────────────────────────────────

export const signatureProducts: SignatureProduct[] = [
  ...cncProducts,
  ...liperProducts,
];

/**
 * Total signature products: 10
 * ─ CNC:   5 (قواطع، حماية، مؤقت، تحويل، طبلون)
 * ─ Liper: 5 (داونلايت، COB، خارجي، شمسي شوارع، شمسي فلود)
 *
 * قواعد:
 * - لا أسعار
 * - لا أزرار شراء
 * - لا product grid
 * - كل منتج يظهر داخل مشهد بصري كجزء من منظومة
 */
