import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { documentDirection, fromInlineEnd, fromInlineStart } from '../lib/direction';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector<HTMLElement>('[data-header]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
const mobileNavBackdrop = document.querySelector<HTMLButtonElement>('[data-mobile-nav-backdrop]');
const isMobileViewport = window.matchMedia('(max-width: 1023px)').matches;
const direction = documentDirection();
let restoreMenuFocus = false;

const mobileMenuFocusable = () => mobileNav
  ? Array.from(mobileNav.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => !element.hasAttribute('hidden'))
  : [];

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 20);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const setMobileMenu = (open: boolean) => {
  mobileNav?.classList.toggle('is-open', open);
  mobileNavBackdrop?.classList.toggle('is-open', open);
  menuToggle?.classList.toggle('is-active', open);
  header?.classList.toggle('is-menu-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute(
    'aria-label',
    open ? menuToggle.dataset.closeLabel || '' : menuToggle.dataset.openLabel || '',
  );
  mobileNav?.setAttribute('aria-hidden', String(!open));
  if (mobileNav) mobileNav.inert = !open;
  document.body.style.overflow = open ? 'hidden' : '';

  if (open) {
    restoreMenuFocus = true;
    requestAnimationFrame(() => mobileMenuFocusable()[0]?.focus());
  } else if (restoreMenuFocus) {
    restoreMenuFocus = false;
    menuToggle?.focus();
  }
};

menuToggle?.addEventListener('click', () => {
  const isOpen = !mobileNav?.classList.contains('is-open');
  setMobileMenu(Boolean(isOpen));
});

mobileNavBackdrop?.addEventListener('click', () => setMobileMenu(false));

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.querySelectorAll('a').forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
    setMobileMenu(false);
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileNav?.classList.contains('is-open')) {
    setMobileMenu(false);
    return;
  }

  if (event.key !== 'Tab' || !mobileNav?.classList.contains('is-open')) return;
  const focusable = mobileMenuFocusable();
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024 && mobileNav?.classList.contains('is-open')) {
    setMobileMenu(false);
  }
});

if (!reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('[data-hero] > *', {
    y: 30,
    opacity: 0,
    duration: 0.85,
    stagger: 0.12,
    ease: 'power3.out',
  });

  gsap.from('[data-hero-visual] .hero-device-card', {
    y: 34,
    scale: 0.96,
    opacity: 0,
    duration: 0.9,
    delay: 0.1,
    ease: 'power3.out',
  });

  gsap.from('[data-hero-visual] .orbit-core, [data-hero-visual] .orbit-brand', {
    y: 24,
    opacity: 0,
    duration: 0.65,
    stagger: 0.12,
    delay: 0.35,
    ease: 'back.out(1.4)',
  });

  gsap.to('[data-hero-visual] .orbit-core', {
    y: -12,
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal], [data-reveal-stagger]').forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 86%',
      onEnter: () => element.classList.add('is-revealed'),
      once: true,
    });
  });

  if (!isMobileViewport) {
    gsap.utils.toArray<HTMLElement>('.coverage-card, .sector-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * -6;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
        gsap.to(card, { rotateX: y, rotateY: x, duration: 0.35, ease: 'power2.out', transformPerspective: 900 });
      });
      card.addEventListener('pointerleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power2.out' });
      });
    });
  }

  gsap.utils.toArray<HTMLElement>('[data-journey] li').forEach((step, index) => {
    gsap.from(step, {
      x: index % 2 === 0 ? fromInlineStart(34, direction) : fromInlineEnd(34, direction),
      opacity: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 82%',
      },
    });
  });

  /* ─── Brand Worlds Section Animations ─────────────────────────────── */

  // Staggered entrance for each brand world card
  gsap.utils.toArray<HTMLElement>('[data-brand-world]').forEach((world, index) => {
    gsap.from(world, {
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 0.9,
      delay: index * 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: world,
        start: 'top 88%',
      },
    });
  });

  // 3D tilt on brand world cards
  if (!isMobileViewport) {
    gsap.utils.toArray<HTMLElement>('[data-brand-world]').forEach((world) => {
      world.addEventListener('pointermove', (event) => {
        const rect = world.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * -3;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 3;
        gsap.to(world, { rotateX: y, rotateY: x, duration: 0.35, ease: 'power2.out', transformPerspective: 1200 });
      });
      world.addEventListener('pointerleave', () => {
        gsap.to(world, { rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power2.out' });
      });
    });
  }

  // Connector orb entrance
  const connectorOrb = document.querySelector<HTMLElement>('.bw-connector__orb');
  if (connectorOrb) {
    gsap.from(connectorOrb, {
      scale: 0,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.bw-connector',
        start: 'top 90%',
      },
    });
  }

  /* ─── Philosophy Section Animations ───────────────────────────────── */

  // Stagger philosophy pillars
  gsap.utils.toArray<HTMLElement>('.pillar').forEach((pillar, index) => {
    gsap.from(pillar, {
      y: 50,
      opacity: 0,
      scale: 0.92,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: pillar,
        start: 'top 88%',
      },
    });
  });

  // Orbit nodes entrance
  gsap.utils.toArray<HTMLElement>('.orbit-node').forEach((node, index) => {
    gsap.from(node, {
      scale: 0,
      opacity: 0,
      duration: 0.7,
      delay: 0.3 + index * 0.2,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: '.philosophy-orbit',
        start: 'top 80%',
      },
    });
  });

  // Orbit center pulse entrance
  const orbitCenter = document.querySelector<HTMLElement>('.orbit-center');
  if (orbitCenter) {
    gsap.from(orbitCenter, {
      scale: 0,
      opacity: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: '.philosophy-orbit',
        start: 'top 80%',
      },
    });
  }

  // Philosophy closing quote
  const closingQuote = document.querySelector<HTMLElement>('.philosophy-quote');
  if (closingQuote) {
    gsap.from(closingQuote, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: closingQuote,
        start: 'top 90%',
      },
    });
  }

  // 3D tilt on philosophy pillars
  if (!isMobileViewport) {
    gsap.utils.toArray<HTMLElement>('.pillar').forEach((pillar) => {
      pillar.addEventListener('pointermove', (event) => {
        const rect = pillar.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * -4;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 4;
        gsap.to(pillar, { rotateX: y, rotateY: x, duration: 0.3, ease: 'power2.out', transformPerspective: 900 });
      });
      pillar.addEventListener('pointerleave', () => {
        gsap.to(pillar, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
      });
    });
  }
}
