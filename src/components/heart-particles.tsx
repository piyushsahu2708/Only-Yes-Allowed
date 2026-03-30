
"use client";

import React, { useEffect, useRef } from 'react';

const EMOJIS = ['💖', '💕', '❤️', '🌸', '✨'];

interface Heart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  emoji: string;
  originalX: number;
}

export function HeartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initHearts();
    };

    const initHearts = () => {
      heartsRef.current = Array.from({ length: 30 }).map(() => {
        const x = Math.random() * canvas.width;
        return {
          x,
          originalX: x,
          y: canvas.height + Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 1.5 + 1), // Faster upward speed
          size: Math.random() * 20 + 15,
          opacity: Math.random() * 0.6 + 0.2,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        };
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heartsRef.current.forEach((heart) => {
        // Update position
        heart.y += heart.vy;
        heart.x += heart.vx;

        // Reset if off top
        if (heart.y < -50) {
          heart.y = canvas.height + 50;
          heart.x = Math.random() * canvas.width;
          heart.originalX = heart.x;
        }

        // Repel from mouse
        const dx = heart.x - mouseRef.current.x;
        const dy = heart.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelDist = 150;

        if (distance < repelDist) {
          const force = (repelDist - distance) / repelDist;
          const angle = Math.atan2(dy, dx);
          heart.x += Math.cos(angle) * force * 10;
          heart.y += Math.sin(angle) * force * 10;
        } else {
          // Smooth return to original horizontal path
          heart.x += (heart.originalX - heart.x) * 0.02;
        }

        // Draw emoji
        ctx.globalAlpha = heart.opacity;
        ctx.font = `${heart.size}px serif`;
        ctx.fillText(heart.emoji, heart.x, heart.y);
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
