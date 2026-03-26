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

    const rippleSettings = {
      damping: 0.98,
      strength: 512,
    };

    const size = width * height;
    let buffer1 = new Int32Array(size);
    let buffer2 = new Int32Array(size);
    let temp: Int32Array;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const newSize = width * height;
      buffer1 = new Int32Array(newSize);
      buffer2 = new Int32Array(newSize);
    };

    const drop = (x: number, y: number) => {
      const index = Math.floor(y) * width + Math.floor(x);
      if (index >= 0 && index < size) {
        buffer1[index] = rippleSettings.strength;
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

      for (let i = width; i < size - width; i++) {
        buffer2[i] = (
          ((buffer1[i - 1] + buffer1[i + 1] + buffer1[i - width] + buffer1[i + width]) >> 1) - buffer2[i]
        );
        buffer2[i] = (buffer2[i] * rippleSettings.damping) | 0;

        const shade = buffer2[i];
        const pixelIdx = i * 4;
        
        // Base pink liquid color: #fff0f6 to #ffdee9
        // We add the ripple shade to the blue/red channels slightly for reflection
        data[pixelIdx] = 255 - (shade >> 2);     // Red
        data[pixelIdx + 1] = 220 - (shade >> 1); // Green
        data[pixelIdx + 2] = 233 - (shade >> 4); // Blue
        data[pixelIdx + 3] = 255;                // Alpha
      }

      temp = buffer1;
      buffer1 = buffer2;
      buffer2 = temp;

      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#ffdee9]">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
      />
      {/* Soft overlay gradients for extra dreaminess */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-pink-200/20 pointer-events-none" />
    </div>
  );
}
