'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseGsapFadeInOptions {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  opacity?: number;
  stagger?: number;
  easing?: string;
}

export function useGsapFadeIn<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapFadeInOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      delay = 0,
      duration = 0.6,
      y = 20,
      x = 0,
      opacity = 0,
      stagger = 0,
      easing = 'power3.out',
    } = options;

    const targets = stagger
      ? ref.current.querySelectorAll<HTMLElement>('[data-animate]')
      : ref.current;

    gsap.fromTo(
      targets,
      { y, x, opacity },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: easing,
      },
    );
  }, []);

  return ref;
}

export function useGsapHover<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      gsap.to(el, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
}

export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  selector: string = '[data-stagger]',
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
  } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = ref.current.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    const { delay = 0.1, duration = 0.5, y = 30, stagger = 0.08 } = options;

    gsap.fromTo(
      targets,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
      },
    );
  }, []);

  return ref;
}

export function useGsapScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; y?: number } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { threshold = 0.1, y = 40 } = options;

    gsap.set(el, { y, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
