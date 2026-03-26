"use client";

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  delay: string;
  size: number;
  duration: string;
  emoji: string;
}

const EMOJIS = ['💖', '💕', '❤️', '🌸', '✨'];

export function HeartParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      size: Math.random() * 20 + 15,
      duration: `${Math.random() * 10 + 15}s`,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-[-10%] animate-float-up opacity-0"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: `${p.size}px`,
            filter: Math.random() > 0.5 ? 'blur(1px)' : 'none',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}