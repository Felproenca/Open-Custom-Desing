'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { animate } from 'animejs';

interface MotionLoaderProps {
  size?: number;
  className?: string;
}

export function MotionLoader({ size = 120, className = '' }: MotionLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    let angle = 0;
    let animationId: number;

    const colors = ['#c96442', '#6366f1', '#10b981', '#f59e0b'];

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      for (let i = 0; i < 4; i++) {
        const currentAngle = angle + (i * Math.PI) / 2;
        const x = centerX + Math.cos(currentAngle) * radius;
        const y = centerY + Math.sin(currentAngle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 6 + Math.sin(angle * 2 + i) * 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[i] ?? '#c96442';
        ctx.globalAlpha = 0.8 + Math.sin(angle * 3 + i) * 0.2;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      angle += 0.03;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
    );

    animate(canvasRef.current, {
      rotate: '1turn',
      duration: 3000,
      loop: true,
      ease: 'linear',
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={`motion-loader ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
