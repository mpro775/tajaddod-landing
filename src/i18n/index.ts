import type { Locale } from '../lib/api/types';
import { ar } from './ar';
import { en } from './en';

type Widen<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly (infer U)[] ? Widen<U>[] :
  T extends object ? { [K in keyof T]: K extends 'variant' ? T[K] : Widen<T[K]> } :
  T;

export type DictionaryShape = Omit<Widen<typeof ar>, 'locale' | 'dir'> & {
  locale: Locale;
  dir: 'rtl' | 'ltr';
};

export type Dictionary = DictionaryShape;

export function dictionary(locale: Locale): Dictionary {
  return locale === 'en' ? en : ar;
}

export const intlLocale = (locale: Locale): string => locale === 'en' ? 'en-US' : 'ar-YE';

export const formatMessage = (
  template: string,
  values: Record<string, string | number>,
): string => Object.entries(values).reduce(
  (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
  template,
);

export function localized(
  input: unknown,
  base: string,
  locale: Locale,
  fallback = '',
): string {
  const source = (input || {}) as Record<string, unknown>;
  const preferred = source[`${base}${locale === 'en' ? 'En' : 'Ar'}`];
  const alternate = source[`${base}${locale === 'en' ? 'Ar' : 'En'}`];
  return String(preferred || alternate || fallback);
}

export const categoryLabels: Record<Locale, Record<string, string>> = {
  ar: {
    solar_pv: 'الطاقة الشمسية',
    solar_street_lighting: 'إنارة الشوارع بالطاقة الشمسية',
    solar_water_pumping: 'ضخ المياه بالطاقة الشمسية',
    electrical_supply: 'توريدات كهربائية',
    electrical_infrastructure: 'بنية تحتية كهربائية',
    power_rental: 'تأجير الطاقة',
    other: 'أخرى',
  },
  en: {
    solar_pv: 'Solar PV',
    solar_street_lighting: 'Solar street lighting',
    solar_water_pumping: 'Solar water pumping',
    electrical_supply: 'Electrical supply',
    electrical_infrastructure: 'Electrical infrastructure',
    power_rental: 'Power rental',
    other: 'Other',
  },
};

export const serviceLabels: Record<Locale, Record<string, string>> = {
  ar: {
    supply: 'توريد',
    delivery: 'توصيل',
    installation: 'تركيب',
    testing: 'اختبار',
    commissioning: 'تشغيل تجريبي',
    operation: 'تشغيل',
    maintenance: 'صيانة',
    inspection: 'فحص',
    repair: 'إصلاح',
    handover: 'تسليم',
    payment_collection: 'تحصيل',
    power_rental: 'تأجير الطاقة',
  },
  en: {
    supply: 'Supply',
    delivery: 'Delivery',
    installation: 'Installation',
    testing: 'Testing',
    commissioning: 'Commissioning',
    operation: 'Operation',
    maintenance: 'Maintenance',
    inspection: 'Inspection',
    repair: 'Repair',
    handover: 'Handover',
    payment_collection: 'Payment collection',
    power_rental: 'Power rental',
  },
};

export const sectorLabels: Record<Locale, Record<string, string>> = {
  ar: {
    healthcare: 'صحي',
    education: 'تعليمي',
    telecommunications: 'اتصالات',
    industrial: 'صناعي',
    public_infrastructure: 'بنية تحتية عامة',
    water: 'مياه',
    sports: 'رياضة',
    finance: 'تمويل',
    energy_utility: 'مرافق طاقة',
    logistics: 'لوجستيات',
    mixed: 'قطاعات متعددة',
    other: 'أخرى',
  },
  en: {
    healthcare: 'Healthcare',
    education: 'Education',
    telecommunications: 'Telecommunications',
    industrial: 'Industrial',
    public_infrastructure: 'Public infrastructure',
    water: 'Water',
    sports: 'Sports',
    finance: 'Finance',
    energy_utility: 'Energy utility',
    logistics: 'Logistics',
    mixed: 'Mixed sectors',
    other: 'Other',
  },
};
