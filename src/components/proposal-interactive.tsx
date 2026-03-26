"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export function ProposalInteractive({ onAccept }: { onAccept: () => void }) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);

  const moveButton = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setIsMoved(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10 relative w-full">
      <div className="text-center space-y-6">
        <h2 className="text-5xl md:text-7xl font-bold text-primary animate-heart-beat drop-shadow-md">
          Do you love me? 💖
        </h2>
        <p className="text-muted-foreground text-xl">
          Think carefully... my heart is in your hands!
        </p>
      </div>

      <div className="flex flex-row items-center justify-center gap-12 relative h-64 w-full">
        <Button
          size="lg"
          onClick={onAccept}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-16 py-10 text-3xl rounded-full shadow-2xl hover:scale-125 transition-transform active:scale-95 z-20"
        >
          YES ❤️
        </Button>

        <Button
          variant="outline"
          size="lg"
          onMouseEnter={moveButton}
          onClick={moveButton}
          className={`border-primary text-primary px-10 py-6 text-xl rounded-full transition-all duration-300 ease-out bg-white/80 backdrop-blur-sm ${
            isMoved ? 'fixed z-50' : 'relative'
          }`}
          style={isMoved ? { left: `${noButtonPosition.x}px`, top: `${noButtonPosition.y}px` } : {}}
        >
          No ❌
        </Button>
      </div>
      
      <div className="opacity-5 pointer-events-none absolute inset-0 flex items-center justify-center">
         <Heart size={500} fill="currentColor" className="text-primary" />
      </div>
    </div>
  );
}