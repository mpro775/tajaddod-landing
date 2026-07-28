export type DocumentDirection = 'rtl' | 'ltr';

export function documentDirection(root?: Pick<HTMLElement, 'dir'>): DocumentDirection {
  const dir = root?.dir || (typeof document !== 'undefined' ? document.documentElement.dir : '');
  return dir === 'rtl' ? 'rtl' : 'ltr';
}

export function fromInlineStart(distance: number, direction: DocumentDirection): number {
  return direction === 'rtl' ? distance : -distance;
}

export function fromInlineEnd(distance: number, direction: DocumentDirection): number {
  return -fromInlineStart(distance, direction);
}
