"use client";

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from '@/components/floating-hearts';
import { ProposalInteractive } from '@/components/proposal-interactive';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Play } from 'lucide-react';
import { HeartExplosion } from '@/components/heart-explosion';

type Step = 'welcome' | 'compliments' | 'video' | 'proposal' | 'success';

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

  const nextCompliment = () => {
    if (complimentIndex < AYUSHI_COMPLIMENTS.length - 1) {
      setComplimentIndex(complimentIndex + 1);
    } else {
      setStep('video');
    }
  };

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
              {complimentIndex === AYUSHI_COMPLIMENTS.length - 1 ? "Keep going... ✨" : "Next ❤️"}
            </Button>
          </div>
        )}

        {step === 'video' && (
          <div className="space-y-8 animate-fade-in flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-primary">A small memory for us...</h2>
            <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black flex items-center justify-center">
              {/* This is a placeholder for the user's video */}
              <div className="text-white flex flex-col items-center space-y-4">
                <Play size={64} className="text-pink-400 animate-pulse" />
                <p className="text-lg font-medium">Your special video goes here 🎥</p>
                <p className="text-xs opacity-50 px-10">Upload your video to the project and replace this placeholder in the code.</p>
              </div>
              {/* Once the user has a video, they can use:
              <video controls autoPlay className="w-full h-full object-cover">
                <source src="/your-video.mp4" type="video/mp4" />
              </video>
              */}
            </div>
            <Button
              onClick={() => setStep('proposal')}
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full px-12 h-14 text-xl shadow-xl"
            >
              I have a question... 💍
            </Button>
          </div>
        )}

        {step === 'proposal' && (
          <div className="animate-fade-in">
            <ProposalInteractive onAccept={() => setStep('success')} />
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-10 animate-fade-in flex flex-col items-center relative">
            <HeartExplosion />
            <div className="bg-white p-8 rounded-full shadow-2xl border-4 border-primary animate-heart-beat">
               <Heart size={100} fill="#FF1493" className="text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-romantic-gradient">
                I knew it! 😍
              </h1>
              <p className="text-3xl md:text-5xl text-primary font-bold">
                I love you forever Ayushi ❤️
              </p>
            </div>
            <Sparkles className="text-yellow-400 w-16 h-16 animate-pulse" />
          </div>
        )}

      </div>
    </main>
  );
}