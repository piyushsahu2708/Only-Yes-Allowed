
"use client";

import React, { useEffect, useRef } from 'react';

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Simulation settings
    const damping = 0.97;
    const strength = 1024;
    let size = width * height;
    
    let buffer1 = new Int32Array(size);
    let buffer2 = new Int32Array(size);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      size = width * height;
      buffer1 = new Int32Array(size);
      buffer2 = new Int32Array(size);
    };

    const drop = (x: number, y: number) => {
      const radius = 2;
      for (let j = -radius; j <= radius; j++) {
        for (let i = -radius; i <= radius; i++) {
          const idx = Math.floor(y + j) * width + Math.floor(x + i);
          if (idx >= 0 && idx < size) {
            buffer1[idx] = strength;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      drop(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        drop(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const update = () => {
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      // Ripple physics
      for (let i = width; i < size - width; i++) {
        buffer2[i] = (
          ((buffer1[i - 1] + buffer1[i + 1] + buffer1[i - width] + buffer1[i + width]) >> 1) - buffer2[i]
        );
        buffer2[i] = (buffer2[i] * damping) | 0;

        const shade = buffer2[i] >> 3;
        const pixelIdx = i * 4;
        
        // Base pink liquid color: #fff0f6 to #ffdee9
        // r: 255, g: 240, b: 246 -> r: 255, g: 222, b: 233
        data[pixelIdx] = Math.min(255, 255 + (shade >> 1));     // Red
        data[pixelIdx + 1] = Math.max(0, 230 + shade);          // Green
        data[pixelIdx + 2] = Math.max(0, 240 + (shade << 1));   // Blue
        data[pixelIdx + 3] = 255;                               // Alpha
      }

      // Swap buffers
      const temp = buffer1;
      buffer1 = buffer2;
      buffer2 = temp;

      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(update);
    };

    const animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#ffdee9]">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70 scale-105 filter blur-[1px]"
      />
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-pink-300/10 pointer-events-none" />
    </div>
  );
}
