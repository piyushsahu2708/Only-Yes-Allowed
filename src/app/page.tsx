
"use client";

import React, { useState, useRef } from 'react';
import { LiquidBackground } from '@/components/liquid-background';
import { CursorSparkles } from '@/components/cursor-sparkles';
import { HeartParticles } from '@/components/heart-particles';
import { Button } from '@/components/ui/button';
import { Loader2, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'welcome' | 'compliments' | 'proposal' | 'success';

const COMPLIMENTS = [
  "Ayushi, tumhara naam hi itna pyara hai ❤️",
  "Tumhari eyes bilkul ocean jaisi gehri aur beautiful hain 🌊",
  "Tumhari smile meri duniya roshan kar deti hai ✨",
  "Tumhare lips itne soft aur cute hain 💋",
  "Main jab bhi tumhe dekhta hoon, bas tum me kho jata hoon 💖"
];

const VIDEO_SRC = "https://raw.githubusercontent.com/piyushsahu2708/love/main/video.mp4";

export default function Home() {
  const [step, setStep] = useState<Step>('welcome');
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const moveNoButton = () => {
    const x = Math.max(20, Math.random() * (window.innerWidth - 150));
    const y = Math.max(20, Math.random() * (window.innerHeight - 100));
    setNoButtonPos({ x, y });
    setHasMovedNo(true);
  };

  const nextCompliment = () => {
    if (complimentIndex < COMPLIMENTS.length - 1) {
      setComplimentIndex(prev => prev + 1);
    } else {
      setStep('proposal');
    }
  };

  const handleStartMemory = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().then(() => setIsStarted(true)).catch((e) => {
        console.error("Video play failed:", e);
        setIsStarted(true);
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative select-none overflow-hidden">
      <LiquidBackground />
      
      {/* Hide particles and sparkles in the final video step to keep it clear */}
      {step !== 'success' && (
        <>
          <HeartParticles />
          <CursorSparkles />
        </>
      )}

      <div className="z-10 w-full max-w-4xl text-center space-y-12 transition-all duration-1000">
        
        {step === 'welcome' && (
          <div className="animate-fade-in space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white romantic-text-glow leading-tight">
                You are the most beautiful part of my life ❤️
              </h1>
              <p className="text-2xl md:text-3xl text-pink-700/80 font-medium italic">
                Your eyes are like the ocean, your smile is my peace 💕
              </p>
            </div>
            
            <Button 
              onClick={() => setStep('compliments')}
              className="bg-white/80 backdrop-blur-md text-pink-500 hover:bg-white hover:scale-110 transition-all rounded-full px-12 py-8 text-2xl shadow-xl border-2 border-pink-200"
            >
              Click to continue ❤️
            </Button>
          </div>
        )}

        {step === 'compliments' && (
          <div className="animate-fade-in space-y-12 py-10">
            <div key={complimentIndex} className="animate-fade-in space-y-8">
              <p className="text-4xl md:text-6xl font-bold text-white romantic-text-glow leading-relaxed">
                {COMPLIMENTS[complimentIndex]}
              </p>
            </div>
            
            <Button 
              onClick={nextCompliment}
              className="bg-pink-400/90 hover:bg-pink-500 text-white rounded-full px-12 py-8 text-2xl shadow-xl transition-all hover:scale-105"
            >
              {complimentIndex < COMPLIMENTS.length - 1 ? "Next ❤️" : "I have a question... 💖"}
            </Button>
          </div>
        )}

        {step === 'proposal' && (
          <div className="animate-fade-in space-y-12">
            <h2 className="text-6xl md:text-8xl font-bold text-white romantic-text-glow animate-heart-beat">
              Do you love me? 💖
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-8 relative min-h-[200px]">
              <Button
                onClick={() => setStep('success')}
                className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-16 py-10 text-4xl shadow-2xl transition-all hover:scale-125 active:scale-95"
              >
                YES 💖
              </Button>

              <Button
                variant="outline"
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={hasMovedNo ? { position: 'fixed', left: noButtonPos.x, top: noButtonPos.y, zIndex: 100 } : {}}
                className="border-pink-300 text-pink-400 rounded-full px-10 py-6 text-2xl bg-white/50 backdrop-blur-sm transition-all duration-200"
              >
                NO 😢
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-fade-in space-y-8 flex flex-col items-center">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold text-white romantic-text-glow">
                I love you forever Ayushi ❤️
              </h1>
              <p className="text-xl text-pink-600 font-bold tracking-widest uppercase">
                You are my everything
              </p>
            </div>

            <div className="relative w-full max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-black/40">
              <video 
                ref={videoRef}
                className={cn(
                  "w-full h-full object-contain transition-opacity duration-1000",
                  isStarted ? "opacity-100" : "opacity-0"
                )}
                onCanPlayThrough={() => setIsVideoLoading(false)}
                loop
                playsInline
                controls={isStarted}
                preload="auto"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>

              {isVideoLoading && !isStarted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-100/10 backdrop-blur-sm">
                  <Loader2 className="w-12 h-12 animate-spin text-white mb-2" />
                  <p className="text-white font-bold">Preparing our memory...</p>
                </div>
              )}

              {!isStarted && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Button 
                    onClick={handleStartMemory}
                    className="bg-white/90 text-pink-500 hover:bg-white rounded-full p-8 flex flex-col gap-2 h-auto shadow-2xl hover:scale-110 transition-transform"
                  >
                    <PlayCircle size={48} />
                    <span className="text-lg font-bold">Start Memory ❤️</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
      
      <div className="fixed bottom-4 right-4 text-pink-300/50 text-xs italic pointer-events-none">
        A special journey for Ayushi ✨
      </div>
    </main>
  );
}
