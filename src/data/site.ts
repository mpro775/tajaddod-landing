export const site = {
  url: 'https://tagadodgroup.com/',
  whatsapp: '967771250000',
  whatsappDisplay: '+967 771 250 000',
  email: 'info@tagadodgroup.com',
  storeUrl: '#',
  catalogUrl: '#',
} as const;

interface ContactMessages {
  whatsapp: string;
  emailSubject: string;
  catalog?: string;
}

export const contactLinks = (messages: ContactMessages) => ({
  whatsapp: site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(messages.whatsapp)}`
    : '#contact',
  email: site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(messages.emailSubject)}`
    : '#contact',
  store: site.storeUrl || '#',
  catalog: site.catalogUrl && site.catalogUrl !== '#'
    ? site.catalogUrl
    : site.whatsapp
      ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(messages.catalog || messages.whatsapp)}`
      : '#contact',
});
