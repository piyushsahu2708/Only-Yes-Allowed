
"use client";

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from '@/components/floating-hearts';
import { ProposalInteractive } from '@/components/proposal-interactive';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import { HeartExplosion } from '@/components/heart-explosion';
import { cn } from '@/lib/utils';

type Step = 'welcome' | 'compliments' | 'proposal' | 'success';

const AYUSHI_COMPLIMENTS = [
  "Ayushi, tumhara naam hi itna pyara hai ❤️",
  "Tumhari eyes bilkul ocean jaisi gehri aur beautiful hain 🌊",
  "Tumhari smile meri duniya roshan kar deti hai ✨",
  "Tumhari lips itne soft aur cute hain 💋",
  "Main jab bhi tumhe dekhta hoon, bas tum me kho jata hoon 💖"
];

export default function Home() {
  const [step, setStep] = useState<Step>('welcome');
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const nextCompliment = () => {
    if (complimentIndex < AYUSHI_COMPLIMENTS.length - 1) {
      setComplimentIndex(complimentIndex + 1);
    } else {
      setStep('proposal');
    }
  };

  // We use a small timeout to simulate video "ready" state or just rely on the pre-load
  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => setVideoLoaded(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden font-body bg-[#FFF0F6]">
      <FloatingHearts />

      <div className="w-full max-w-4xl z-10 relative px-4 text-center">
        
        {step === 'welcome' && (
          <div className="space-y-8 animate-fade-in flex flex-col items-center">
            <div className="bg-white p-6 rounded-full shadow-2xl animate-heart-beat">
               <Heart size={80} fill="#FF69B4" className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Hey Beautiful Ayushi 💖
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
              I have something special to tell you...
            </p>
            <Button 
              onClick={() => setStep('compliments')}
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full h-14 px-10 text-xl shadow-xl transition-all active:scale-95"
            >
              Click to continue ❤️
            </Button>
          </div>
        )}

        {step === 'compliments' && (
          <div key={complimentIndex} className="space-y-12 animate-fade-in flex flex-col items-center">
            <p className="text-3xl md:text-5xl font-medium text-romantic-gradient leading-relaxed italic p-8">
              "{AYUSHI_COMPLIMENTS[complimentIndex]}"
            </p>
            <Button
              onClick={nextCompliment}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-full px-8"
            >
              {complimentIndex === AYUSHI_COMPLIMENTS.length - 1 ? "I have a question... 💍" : "Next ❤️"}
            </Button>
          </div>
        )}

        {step === 'proposal' && (
          <div className="animate-fade-in">
            <ProposalInteractive onAccept={() => setStep('success')} />
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-10 animate-fade-in flex flex-col items-center relative py-10">
            <HeartExplosion />
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-romantic-gradient drop-shadow-sm">
                I knew it! 😍
              </h1>
              <p className="text-3xl md:text-5xl text-primary font-bold">
                I love you forever Ayushi ❤️
              </p>
            </div>

            <div className="flex gap-6 mt-4">
               <Sparkles className="text-yellow-400 w-12 h-12 animate-pulse" />
               <Heart className="text-primary w-12 h-12 fill-primary animate-heart-beat" />
               <Sparkles className="text-yellow-400 w-12 h-12 animate-pulse" />
            </div>

            {/* Video Container */}
            <div className={cn(
              "relative w-full max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black mt-8 transition-all duration-1000 transform",
              step === 'success' ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10 pointer-events-none absolute"
            )}>
              {!videoLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-50 z-30">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                  <p className="text-primary font-medium animate-pulse">Loading our memory...</p>
                </div>
              )}
              
              {/* 
                  Using /preview link for Google Drive. 
                  Adding &autoplay=1 for direct start.
                  The wrapper prevents interaction with Drive's "Pop-out" buttons 
                  by using a transparent layer (pointer-events-none overlay doesn't work for iframe inner clicks, 
                  so we just style it beautifully).
              */}
              {step !== 'welcome' && (
                <iframe 
                  src="https://drive.google.com/file/d/1bdc39q9o0H3wWsjdrICO2M5bWczRGiYi/preview?autoplay=1" 
                  className="absolute inset-0 w-full h-full border-none"
                  allow="autoplay; fullscreen"
                  title="Special Memory for Ayushi"
                ></iframe>
              )}
              
              {/* Subtle gradient overlay to hide top bar of Google Drive UI slightly */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
