export const achievements = [
  { 
    value: '11', 
    suffix: '+',
    label: 'سنوات خبرة', 
    description: 'عقد من التميز والريادة في قطاع الكهرباء.',
    icon: 'calendar',
    source: 'placeholder' 
  },
  { 
    value: '361', 
    suffix: '+',
    label: 'مشروع منفذ', 
    description: 'مشاريع متنوعة بين سكنية وتجارية وصناعية.',
    icon: 'projects',
    source: 'placeholder' 
  },
  { 
    value: '5.01', 
    suffix: ' MW+',
    label: 'قدرة تشغيلية', 
    description: 'إجمالي الطاقة الشمسية التي قمنا بتوريدها وتركيبها.',
    icon: 'energy',
    source: 'placeholder' 
  },
  { 
    value: '687', 
    suffix: '+',
    label: 'عميل وشريك', 
    description: 'شركاء نجاح نعتز بثقتهم المستمرة في خدماتنا.',
    icon: 'clients',
    source: 'placeholder' 
  },
  { 
    value: '120', 
    suffix: '+',
    label: 'فريق العمل', 
    description: 'كوادر هندسية وفنية وإدارية محترفة.',
    icon: 'team',
    source: 'placeholder' 
  }
];

export type Achievement = (typeof achievements)[number];
