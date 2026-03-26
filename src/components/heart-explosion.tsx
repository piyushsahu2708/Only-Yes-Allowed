"use client";

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export function HeartExplosion() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      size: Math.random() * 30 + 10,
      color: ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-explosion"
          style={{
            transform: `translate(${p.x}px, ${p.y}px)`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <Heart fill={p.color} stroke="none" size={p.size} />
        </div>
      ))}
    </div>
  );
}