export const brands = [
  {
    id: 'cnc',
    name: 'CNC',
    displayName: 'CNC',
    arabicName: 'سي إن سي',
    title: 'قواطع، حماية، تحكم صناعي، تحويل، وDC للطاقة الشمسية',
    description:
      'CNC يمثل العمود الفني في تجدد: حماية كهربائية، لوحات، مؤقتات، تحكم صناعي، سكاكين تحويل، وحلول DC للمنظومات الشمسية.',
    logo: '/logos/cnc-logo.svg',
    whiteLogo: '/logos/cnc-logo-white.svg',
    accent: 'cnc',
    focus: 'الحماية والتحكم والتوزيع',
    orbit: 'قلب الأمان الكهربائي',
    categories: ['قواطع', 'حماية', 'تحكم صناعي', 'مؤقتات', 'سكاكين تحويل', 'طبالين', 'DC Solar'],
    story:
      'CNC يظهر كخط الدفاع والتنظيم داخل المنظومة الكهربائية؛ من حماية المنزل والمتجر إلى تجهيز لوحات المشاريع وحلول التحويل والطاقة الشمسية.',
  },
  {
    id: 'liper',
    name: 'Liper',
    displayName: 'Liper',
    arabicName: 'لايبر',
    title: 'إضاءة داخلية وخارجية وكشافات شمسية للمشاريع',
    description:
      'Liper يمثل جانب الإضاءة والطاقة الخارجية في تجدد: إنارة ديكورية، إنارة أحواش، كشافات شوارع، وحلول Solar Lighting.',
    logo: '/logos/liper-logo.svg',
    whiteLogo: '/logos/liper-logo-white.svg',
    accent: 'liper',
    focus: 'الإضاءة والطاقة الشمسية الخارجية',
    orbit: 'الضوء الذي يكتمل به المشروع',
    categories: ['إضاءة داخلية', 'إضاءة خارجية', 'كشافات شوارع', 'Solar Lighting', 'IP65'],
    story:
      'Liper هو وجه الإضاءة في تجربة تجدد؛ يربط بين الإنارة الجمالية والاستخدام الخارجي وحلول الإضاءة الشمسية للمزارع والشوارع والمساحات المفتوحة.',
  },
];

export type Brand = (typeof brands)[number];
