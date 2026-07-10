import { gsap } from 'gsap';

export function initHeroMotion() {
  const hero = document.querySelector<HTMLElement>('.cinematic-hero');
  if (!hero) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileViewport = window.matchMedia('(max-width: 820px)').matches;
  const heroBg = hero.querySelector<HTMLImageElement>('.hero-bg');
  const brandAnchors = hero.querySelectorAll<HTMLElement>('.brand-anchor');

  if (isMobileViewport && heroBg?.dataset.mobileSrc) {
    const mobileScene = new Image();
    mobileScene.onload = () => {
      heroBg.src = heroBg.dataset.mobileSrc || heroBg.src;
    };
    mobileScene.src = heroBg.dataset.mobileSrc;
  }

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
    duration: 0.9,
  })
    .fromTo('.hero-center-glow', {
      opacity: 0,
      scale: 0.82,
    }, {
      opacity: 0.78,
      scale: 1,
      duration: 0.75,
    }, '-=0.45')
    .fromTo('.tajaddod-logo-hero', {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(8px)',
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.75,
    }, '-=0.42')
    .fromTo('.brand-anchor-liper', {
      opacity: 0,
      x: -28,
      y: -16,
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.68,
    }, '-=0.25')
    .fromTo('.brand-anchor-cnc', {
      opacity: 0,
      x: -28,
      y: 18,
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.68,
    }, '-=0.52')
    .to('.energy-path', {
      strokeDashoffset: 0,
      duration: 1.8,
      stagger: 0.16,
      ease: 'power2.inOut',
    }, '-=0.16')
    .to('.energy-core', {
      opacity: 0.92,
      scale: 1,
      duration: 0.45,
    }, '-=0.7')
    .fromTo('.hero-content h1, .hero-content p, .hero-actions', {
      opacity: 0,
      y: 26,
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.72,
    }, '-=1.05')
    .fromTo('.hero-trust-item', {
      opacity: 0,
      y: 18,
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.58,
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
