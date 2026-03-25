
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Stars } from 'lucide-react';

export function ProposalInteractive({ onAccept }: { onAccept: () => void }) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setIsMoved(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10 relative w-full max-w-4xl mx-auto">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold text-primary animate-heart-beat drop-shadow-sm">
          Do you love me? ❤️
        </h2>
        <p className="text-muted-foreground text-lg">
          I've been wanting to ask you this for a while...
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 relative h-64 w-full">
        <Button
          size="lg"
          onClick={onAccept}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-8 text-2xl rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 z-10"
        >
          YES ✅
        </Button>

        <Button
          ref={noButtonRef}
          variant="outline"
          size="lg"
          onMouseEnter={moveButton}
          onClick={moveButton}
          className={`border-primary text-primary px-8 py-6 text-xl rounded-full transition-all duration-200 ${
            isMoved ? 'fixed z-50 pointer-events-auto' : 'relative'
          }`}
          style={isMoved ? { left: `${noButtonPosition.x}px`, top: `${noButtonPosition.y}px` } : {}}
        >
          No ❌
        </Button>
      </div>
      
      <div className="opacity-10 pointer-events-none absolute inset-0 flex items-center justify-center">
         <Heart size={400} fill="currentColor" className="text-primary" />
      </div>
    </div>
  );
}
