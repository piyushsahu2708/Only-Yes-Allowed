
"use client";

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from '@/components/floating-hearts';
import { ComplimentCarousel } from '@/components/compliment-carousel';
import { ProposalInteractive } from '@/components/proposal-interactive';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Sparkles, Stars, Music } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

type Step = 'welcome' | 'compliments' | 'message' | 'proposal' | 'success';

export default function Home() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [audioStarted, setAudioStarted] = useState(false);

  const startJourney = () => {
    if (!name.trim()) return;
    setStep('compliments');
    setAudioStarted(true);
  };

  useEffect(() => {
    if (step === 'compliments') {
      const timer = setTimeout(() => setStep('message'), 12000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden font-body bg-[#FDF4F8]">
      <FloatingHearts />

      {/* Content Container */}
      <div className="w-full max-w-4xl z-10 relative px-4 text-center">
        
        {step === 'welcome' && (
          <div className="space-y-8 animate-fade-in flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-4 rounded-full shadow-xl">
                 <Heart size={80} fill="#FF3399" className="text-primary animate-heart-beat" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                Hey Beautiful 💖
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
                I made something very special just for you. Please enter your name to start...
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto items-center">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/80 border-primary/20 h-12 text-lg focus:ring-primary rounded-full text-center"
              />
              <Button 
                onClick={startJourney}
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full h-12 px-8 shadow-lg transition-all active:scale-95"
              >
                Continue 👉
              </Button>
            </div>
          </div>
        )}

        {step === 'compliments' && (
          <div className="space-y-12 animate-fade-in flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary/80">
              Dear {name},
            </h2>
            <ComplimentCarousel name={name} />
            <p className="text-sm text-muted-foreground animate-pulse">
              Letting these words sink in...
            </p>
          </div>
        )}

        {step === 'message' && (
          <div className="space-y-8 animate-fade-in flex flex-col items-center max-w-2xl mx-auto">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-8 group">
              <Image 
                src={PlaceHolderImages[0].imageUrl} 
                alt="Romantic memory"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[5s]"
                data-ai-hint="romantic couple"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent"></div>
            </div>
            
            <div className="space-y-6 text-lg md:text-2xl text-foreground/90 leading-relaxed font-medium italic p-8 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm">
              <p>
                "Whenever I see you, my heart skips a beat. You are not just my love, you are my everything. 💓"
              </p>
              <p>
                "You bring color to my world in ways I never thought possible."
              </p>
            </div>

            <Button
              onClick={() => setStep('proposal')}
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full px-12 py-8 text-xl shadow-xl hover:scale-105 transition-all"
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
          <div className="space-y-10 animate-fade-in flex flex-col items-center">
            <div className="relative">
              <Stars className="absolute -top-12 -left-12 text-yellow-400 w-12 h-12 animate-pulse" />
              <Stars className="absolute -top-12 -right-12 text-yellow-400 w-12 h-12 animate-pulse delay-75" />
              <div className="bg-white p-8 rounded-full shadow-2xl border-4 border-primary">
                 <Heart size={120} fill="#FF3399" className="text-primary animate-heart-beat" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-romantic-gradient">
                I knew it! 😍
              </h1>
              <p className="text-2xl md:text-3xl text-primary font-semibold">
                I love you sooo much, {name}! ❤️
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl pt-8">
              <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white">
                <Sparkles className="text-primary mb-2 mx-auto" />
                <p className="italic">"To the start of our forever..."</p>
              </div>
              <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white">
                <Music className="text-primary mb-2 mx-auto" />
                <p className="italic">"Our song is just beginning."</p>
              </div>
            </div>

            <Button
              onClick={() => window.location.reload()}
              variant="link"
              className="text-primary/60 hover:text-primary transition-colors"
            >
              Experience it again ✨
            </Button>
          </div>
        )}

      </div>

      {/* Floating Sparkles for Success */}
      {step === 'success' && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 1}s`,
                opacity: 0.4
              }}
            >
              <Sparkles className="text-yellow-400" size={Math.random() * 20 + 10} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
