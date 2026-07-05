'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UsePageTransitionOptions {
  enterDuration?: number;
  exitDuration?: number;
  y?: number;
}

export function usePageTransition<T extends HTMLElement = HTMLDivElement>(
  options: UsePageTransitionOptions = {},
) {
  const ref = useRef<T>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!ref.current || !isFirstRender.current) return;
    isFirstRender.current = false;

    const { enterDuration = 0.5, y = 20 } = options;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration: enterDuration, ease: 'power3.out' },
    );
  }, []);

  const exit = async (): Promise<void> => {
    if (!ref.current) return;

    const { exitDuration = 0.3, y = -10 } = options;

    return new Promise((resolve) => {
      gsap.to(ref.current!, {
        opacity: 0,
        y,
        duration: exitDuration,
        ease: 'power2.in',
        onComplete: resolve,
      });
    });
  };

  return { ref, exit };
}

export function useAnimateOnMount<T extends HTMLElement = HTMLDivElement>(
  selector: string = '*',
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    delay?: number;
  } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const { duration = 0.5, stagger = 0.05, y = 15, delay = 0 } = options;
    const targets = ref.current.querySelectorAll<HTMLElement>(selector);

    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      },
    );
  }, []);

  return ref;
}
