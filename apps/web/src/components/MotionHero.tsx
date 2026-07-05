'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { animate } from 'animejs';
import { ThreeBackground } from './ThreeBackground';

interface MotionHeroProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function MotionHero({ title, subtitle, className = '' }: MotionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
    );

    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0, skewY: 2 },
      { y: 0, opacity: 1, skewY: 0, duration: 0.8 },
      '-=0.2',
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4',
    );

    if (decorRef.current) {
      tl.fromTo(
        decorRef.current.children,
        { scale: 0, opacity: 0, rotation: -45 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.3',
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!decorRef.current) return;

    const shapes = decorRef.current.children;
    Array.from(shapes).forEach((shape, i) => {
      animate(shape, {
        y: [
          { value: -10 + Math.random() * 20, duration: 1000 + i * 200 },
          { value: 0, duration: 1000 + i * 200 },
        ],
        rotate: [
          { value: -5 + Math.random() * 10, duration: 2000 + i * 300 },
          { value: 0, duration: 2000 + i * 300 },
        ],
        loop: true,
        ease: 'inOutSine',
        alternate: true,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`motion-hero ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <ThreeBackground particleCount={120} color="#c96442" />

      <div
        ref={decorRef}
        className="motion-hero-decor"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          className="decor-shape decor-circle"
          style={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '2px solid var(--accent-soft)',
            top: '15%',
            right: '20%',
            opacity: 0.4,
          }}
        />
        <div
          className="decor-shape decor-square"
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            border: '2px solid var(--accent)',
            top: '60%',
            left: '10%',
            opacity: 0.3,
            transform: 'rotate(45deg)',
          }}
        />
        <div
          className="decor-shape decor-line"
          style={{
            position: 'absolute',
            width: 120,
            height: 2,
            background: 'linear-gradient(90deg, transparent, var(--accent-soft), transparent)',
            top: '40%',
            right: '5%',
            opacity: 0.5,
          }}
        />
      </div>

      <div className="motion-hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          ref={titleRef}
          className="motion-hero-title"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            color: 'var(--text-strong)',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>
        <p
          ref={subtitleRef}
          className="motion-hero-subtitle"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            lineHeight: 1.6,
            margin: '1rem 0 0',
            color: 'var(--text-muted)',
            maxWidth: 480,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
