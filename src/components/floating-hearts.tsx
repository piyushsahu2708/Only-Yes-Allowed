
"use client";

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartProps {
  id: number;
  left: string;
  delay: string;
  size: number;
  duration: string;
  opacity: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      size: Math.random() * 30 + 10,
      duration: `${Math.random() * 10 + 10}s`,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] animate-float"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
            animationName: 'float',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
          }}
        >
          <Heart
            size={heart.size}
            fill="#FF3399"
            className="text-primary/40 stroke-none"
          />
        </div>
      ))}
    </div>
  );
}
