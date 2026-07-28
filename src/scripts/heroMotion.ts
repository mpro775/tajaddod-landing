import { gsap } from 'gsap';
import { documentDirection, fromInlineStart } from '../lib/direction';

export function initHeroMotion() {
  const hero = document.querySelector<HTMLElement>('.cinematic-hero');
  if (!hero) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const direction = documentDirection();
  const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
  const motionScale = isMobileViewport ? 0.58 : 1;
  const duration = (seconds: number) => seconds * motionScale;
  const brandAnchors = hero.querySelectorAll<HTMLElement>('.brand-anchor');

  const updateFlowGeometry = () => {
    const svg = hero.querySelector<SVGSVGElement>('.hero-energy-flow');
    const origin = hero.querySelector<HTMLElement>('[data-flow-origin]');
    if (!svg || !origin) return;
    const screenMatrix = svg.getScreenCTM();
    if (!screenMatrix) return;
    const inverse = screenMatrix.inverse();
    const pointFor = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return new DOMPoint(rect.left + rect.width / 2, rect.top + rect.height / 2).matrixTransform(inverse);
    };
    const start = pointFor(origin);
    const core = hero.querySelector<SVGCircleElement>('[data-flow-core]');
    core?.setAttribute('cx', String(start.x));
    core?.setAttribute('cy', String(start.y));

    hero.querySelectorAll<SVGPathElement>('[data-flow-connection]').forEach((path) => {
      const id = path.dataset.flowConnection;
      const target = id ? hero.querySelector<HTMLElement>(`[data-flow-target="${id}"]`) : null;
      if (!target) return;
      const end = pointFor(target);
      const distance = Math.max(90, Math.abs(end.x - start.x) * 0.48);
      const inlineDirection = Math.sign(end.x - start.x) || 1;
      path.setAttribute(
        'd',
        `M ${start.x} ${start.y} C ${start.x + distance * inlineDirection} ${start.y}, ${end.x - distance * inlineDirection} ${end.y}, ${end.x} ${end.y}`,
      );
      const gradient = hero.querySelector<SVGLinearGradientElement>(`[data-flow-gradient="${id}"]`);
      gradient?.setAttribute('x1', String(start.x));
      gradient?.setAttribute('y1', String(start.y));
      gradient?.setAttribute('x2', String(end.x));
      gradient?.setAttribute('y2', String(end.y));
    });
  };

  requestAnimationFrame(updateFlowGeometry);
  const resizeObserver = new ResizeObserver(() => requestAnimationFrame(updateFlowGeometry));
  resizeObserver.observe(hero);
  window.addEventListener('load', updateFlowGeometry, { once: true });
  document.addEventListener('tajaddod:direction-change', updateFlowGeometry);

  brandAnchors.forEach((anchor) => {
    const brandId = anchor.getAttribute('data-brand');
    if (!brandId) return;

    if (isMobileViewport) return;

    anchor.addEventListener('pointerenter', () => {
      hero.classList.add(`glow-active-${brandId}`);
      // Animate hover state smoothly in GSAP (avoids conflict with parallax x/y)
      gsap.to(anchor, {
        scale: 1.03,
        yPercent: -5,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    anchor.addEventListener('pointerleave', () => {
      hero.classList.remove(`glow-active-${brandId}`);
      gsap.to(anchor, {
        scale: 1,
        yPercent: 0,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    anchor.addEventListener('focus', () => {
      hero.classList.add(`glow-active-${brandId}`);
      gsap.to(anchor, {
        scale: 1.03,
        yPercent: -5,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    anchor.addEventListener('blur', () => {
      hero.classList.remove(`glow-active-${brandId}`);
      gsap.to(anchor, {
        scale: 1,
        yPercent: 0,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  });

  if (isReduced) {
    gsap.set('.hero-bg', { opacity: 1, scale: 1 });
    gsap.set('.energy-path', { strokeDashoffset: 0, opacity: 0.72 });
    gsap.set('.energy-core', { opacity: 0.85, scale: 1 });
    gsap.set('.hero-center-glow', { opacity: 0.78, scale: 1 });
    gsap.set('.tajaddod-logo-hero, .brand-anchor, .hero-content > *, .hero-trust-item', {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'none',
    });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-bg', {
    opacity: 1,
    scale: 1.01,
    duration: duration(0.9),
  })
    .fromTo('.hero-center-glow', {
      opacity: 0,
      scale: 0.82,
    }, {
      opacity: 0.78,
      scale: 1,
      duration: duration(0.75),
    }, '-=0.45')
    .fromTo('.tajaddod-logo-hero', {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(8px)',
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: duration(0.75),
    }, '-=0.42')
    .fromTo('.brand-anchor-liper', {
      opacity: 0,
      x: fromInlineStart(28, direction),
      y: -16,
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration(0.68),
    }, '-=0.25')
    .fromTo('.brand-anchor-cnc', {
      opacity: 0,
      x: fromInlineStart(28, direction),
      y: 18,
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration(0.68),
    }, '-=0.52')
    .to('.energy-path', {
      strokeDashoffset: 0,
      duration: duration(1.8),
      stagger: duration(0.16),
      ease: 'power2.inOut',
    }, '-=0.16')
    .to('.energy-core', {
      opacity: 0.92,
      scale: 1,
      duration: duration(0.45),
    }, '-=0.7')
    .fromTo('.hero-content h1, .hero-content p, .hero-actions', {
      opacity: 0,
      y: 26,
    }, {
      opacity: 1,
      y: 0,
      stagger: duration(0.12),
      duration: duration(0.72),
    }, '-=1.05')
    .fromTo('.hero-trust-item', {
      opacity: 0,
      y: 18,
    }, {
      opacity: 1,
      y: 0,
      stagger: duration(0.08),
      duration: duration(0.58),
    }, '-=0.42');

  if (!isMobileViewport) {
    gsap.to('.hero-glow-blue', {
      opacity: 0.52,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-glow-green', {
      opacity: 0.62,
      scale: 1.04,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-glow-cnc', {
      opacity: 0.32,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.energy-path', {
      opacity: 1,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 3.1,
    });

    gsap.to('.energy-core', {
      opacity: 0.35,
      scale: 1.75,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 3.2,
    });
  }

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    const handleParallax = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return;

      const rect = hero.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const normX = relX / rect.width - 0.5;
      const normY = relY / rect.height - 0.5;

      const bgMove = 4;
      const anchorMove = -8;
      const glowMove = -12;

      gsap.to('.hero-bg', {
        x: normX * bgMove,
        y: normY * bgMove,
        duration: 0.75,
        ease: 'power2.out',
      });

      gsap.to('.brand-anchor', {
        x: normX * anchorMove,
        y: normY * anchorMove,
        duration: 0.75,
        ease: 'power2.out',
        stagger: 0.02,
      });

      gsap.to('.hero-glow', {
        x: normX * glowMove,
        y: normY * glowMove,
        duration: 0.95,
        ease: 'power2.out',
      });
    };

    const resetParallax = () => {
      gsap.to(['.hero-bg', '.brand-anchor', '.hero-glow'], {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
      });
    };

    hero.addEventListener('mousemove', handleParallax);
    hero.addEventListener('mouseleave', resetParallax);
  }
}
