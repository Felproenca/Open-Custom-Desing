'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  onClick,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    animate(ref.current, {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.95, 1],
      duration: 600,
      delay,
      ease: 'outCubic',
    });
  }, [delay]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (!ref.current) return;

    animate(ref.current, {
      scale: 1.03,
      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
      duration: 200,
      ease: 'outQuad',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!ref.current) return;

    animate(ref.current, {
      scale: 1,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      duration: 300,
      ease: 'outQuad',
    });
  }, []);

  const handleClick = useCallback(() => {
    if (!ref.current || !onClick) return;

    animate(ref.current, {
      scale: [1, 0.97, 1],
      duration: 200,
      ease: 'inOutQuad',
      onComplete: onClick,
    });
  }, [onClick]);

  return (
    <div
      ref={ref}
      className={`animated-card ${className}`}
      style={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  staggerMs?: number;
}

export function AnimatedList({ children, className = '', staggerMs = 80 }: AnimatedListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const items = ref.current.children;
    if (!items.length) return;

    animate(Array.from(items), {
      opacity: [0, 1],
      y: [20, 0],
      scale: [0.98, 1],
      duration: 500,
      delay: stagger(staggerMs),
      ease: 'outCubic',
    });
  }, [children, staggerMs]);

  return (
    <div ref={ref} className={`animated-list ${className}`}>
      {children}
    </div>
  );
}

interface PulseAnimationProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function PulseAnimation({
  children,
  className = '',
  intensity = 0.05,
}: PulseAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = animate(ref.current, {
      scale: [1, 1 + intensity, 1],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });

    return () => {
      animation.cancel();
    };
  }, [intensity]);

  return (
    <div ref={ref} className={`pulse-animation ${className}`}>
      {children}
    </div>
  );
}
