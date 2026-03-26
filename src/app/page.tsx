
"use client";

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from '@/components/floating-hearts';
import { ProposalInteractive } from '@/components/proposal-interactive';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Loader2, PlayCircle } from 'lucide-react';
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
  const [showPlayFallback, setShowPlayFallback] = useState(false);

  const nextCompliment = () => {
    if (complimentIndex < AYUSHI_COMPLIMENTS.length - 1) {
      setComplimentIndex(complimentIndex + 1);
    } else {
      setStep('proposal');
    }
  };

  useEffect(() => {
    if (step === 'success') {
      // Small delay to ensure the iframe has had a moment to mount before we hide the loader
      const timer = setTimeout(() => {
        setVideoLoaded(true);
      }, 4000);

      // If it still feels stuck after 8 seconds, show a manual play button
      const fallbackTimer = setTimeout(() => {
        setShowPlayFallback(true);
      }, 8000);

      return () => {
        clearTimeout(timer);
        clearTimeout(fallbackTimer);
      };
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
          <div className="space-y-10 animate-fade-in flex flex-col items-center relative py-10 w-full">
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
              {/* Loader Overlay */}
              {!videoLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-50 z-40 transition-opacity duration-500">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                  <p className="text-primary font-medium animate-pulse">Playing our special memory...</p>
                </div>
              )}

              {/* Fallback Play Trigger for Browsers that block Autoplay */}
              {showPlayFallback && !videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in">
                   <Button 
                    onClick={() => setVideoLoaded(true)}
                    className="bg-primary text-white hover:bg-primary/90 rounded-full p-10 flex flex-col gap-3 h-auto shadow-2xl scale-110 active:scale-95 transition-transform"
                   >
                     <PlayCircle size={64} />
                     <span className="text-xl font-bold">Start Memory</span>
                   </Button>
                </div>
              )}
              
              {/* Cropped Iframe Wrapper */}
              <div className="absolute inset-0 w-full h-full">
                <iframe 
                  src="https://drive.google.com/file/d/1bdc39q9o0H3wWsjdrICO2M5bWczRGiYi/preview?autoplay=1" 
                  className="absolute top-[-45px] left-0 w-full h-[calc(100%+90px)] border-none"
                  allow="autoplay; fullscreen"
                  title="Special Memory for Ayushi"
                ></iframe>
              </div>
              
              {/* Shield overlay to prevent accidental clicking of Google Drive UI icons at top */}
              <div className="absolute top-0 left-0 w-full h-20 pointer-events-none bg-gradient-to-b from-black/20 to-transparent z-10" />
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
