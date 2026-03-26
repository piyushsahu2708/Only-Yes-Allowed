
"use client";

import React, { useState, useEffect, useRef } from 'react';
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

const VIDEO_SRC = "https://drive.google.com/uc?export=download&id=1bdc39q9o0H3wWsjdrICO2M5bWczRGiYi";

export default function Home() {
  const [step, setStep] = useState<Step>('welcome');
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextCompliment = () => {
    if (complimentIndex < AYUSHI_COMPLIMENTS.length - 1) {
      setComplimentIndex(complimentIndex + 1);
    } else {
      setStep('proposal');
    }
  };

  const handleStartMemory = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
      setIsStarted(true);
    }
  };

  useEffect(() => {
    // Attempt to preload video when step is 'proposal'
    if (step === 'proposal' && videoRef.current) {
      videoRef.current.load();
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
            <div className="relative w-full max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black mt-8">
              
              {/* Native Video Player */}
              <video 
                ref={videoRef}
                id="loveVideo"
                className="w-full h-full object-cover"
                onCanPlayThrough={() => setIsVideoLoading(false)}
                autoPlay
                muted
                loop
                playsInline
                controls={isStarted}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Loader Overlay */}
              {isVideoLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-50 z-30">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                  <p className="text-primary font-medium animate-pulse">Loading our memory...</p>
                </div>
              )}

              {/* Start Memory Button Overlay */}
              {!isStarted && !isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 backdrop-blur-sm animate-fade-in">
                   <Button 
                    onClick={handleStartMemory}
                    className="bg-primary text-white hover:bg-primary/90 rounded-full p-10 flex flex-col gap-3 h-auto shadow-2xl scale-110 active:scale-95 transition-transform"
                   >
                     <PlayCircle size={64} />
                     <span className="text-xl font-bold">Start Memory ❤️</span>
                   </Button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
