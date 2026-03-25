
"use client";

import React, { useState, useEffect } from 'react';
import { generateRomanticCompliment } from '@/ai/flows/generate-romantic-compliments-flow';
import { Sparkles } from 'lucide-react';

interface ComplimentCarouselProps {
  name: string;
}

export function ComplimentCarousel({ name }: ComplimentCarouselProps) {
  const [compliments, setCompliments] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCompliments = async () => {
    try {
      const results = await Promise.all([
        generateRomanticCompliment({ name }),
        generateRomanticCompliment({ name }),
        generateRomanticCompliment({ name }),
        generateRomanticCompliment({ name }),
        generateRomanticCompliment({ name }),
      ]);
      setCompliments(results.map(r => r.compliment));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching compliments:", error);
      setCompliments([
        `Your smile is my favorite thing in the world, ${name}.`,
        `${name}, you make every moment feel magical.`,
        `I'm so lucky to have someone like you, ${name}.`,
        `You are the heart of my happiness, ${name}.`,
        `${name}, you are truly one of a kind.`
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompliments();
  }, [name]);

  useEffect(() => {
    if (compliments.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % compliments.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [compliments]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-40">
        <Sparkles className="animate-spin text-primary h-8 w-8" />
        <p className="text-muted-foreground animate-pulse">Gathering heartfelt words...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden h-40 flex items-center justify-center p-6 text-center">
      {compliments.map((text, idx) => (
        <div
          key={idx}
          className={`absolute transition-all duration-1000 ease-in-out transform ${
            idx === currentIndex
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <p className="text-xl md:text-2xl font-medium text-romantic-gradient leading-relaxed italic">
            "{text}"
          </p>
        </div>
      ))}
    </div>
  );
}
