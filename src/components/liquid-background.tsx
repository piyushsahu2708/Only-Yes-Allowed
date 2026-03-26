"use client";

import React from 'react';

export function LiquidBackground() {
  return (
    <div className="liquid-container">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-300/10 rounded-full blur-[100px] animate-pulse"></div>
    </div>
  );
}