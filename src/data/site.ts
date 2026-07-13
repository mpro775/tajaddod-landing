export const site = {
  name: 'تجدد',
  tagline: 'وكيل علامات الكهرباء والطاقة الشمسية',
  description:
    'تجدد جهة تمثيل وتوزيع لعلامتي CNC وLiper في حلول القواطع والحماية، التحكم الكهربائي، الإضاءة، والطاقة الشمسية.',
  url: 'https://tagadodgroup.com/',
  whatsapp: '967771250000',
  whatsappDisplay: '+967 771 250 000',
  email: 'info@tagadodgroup.com',
  storeUrl: '#',
  catalogUrl: '#',
  location: 'صنعاء، اليمن',
};

const whatsappMessage = encodeURIComponent(
  'مرحباً تجدد، أرغب بالتواصل التجاري بخصوص CNC / Liper. نوع النشاط: تاجر / مقاول / فني / صاحب مشروع.'
);

export const contactLinks = {
  whatsapp: site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${whatsappMessage}` : '#contact',
  email: site.email ? `mailto:${site.email}?subject=${encodeURIComponent('تواصل تجاري مع تجدد')}` : '#contact',
  store: site.storeUrl || '#',
  catalog:
    site.catalogUrl && site.catalogUrl !== '#'
      ? site.catalogUrl
      : site.whatsapp
        ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('مرحباً تجدد، أرغب بطلب كتالوج براندي CNC / Liper')}`
        : '#contact',
};

export const businessStats = [
  { value: '2', label: 'علامات تحت مظلة تجدد' },
  { value: '8+', label: 'مجالات كهرباء وطاقة' },
  { value: 'B2B', label: 'تواصل تجاري ومشاريع' },
];
