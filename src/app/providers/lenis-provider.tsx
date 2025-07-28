// @ts-nocheck

"use client";
import gsap from 'gsap'
import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react'
import { FC, useRef, useEffect } from "react";

type LenisScrollProviderProps = {
  children: React.ReactNode;
};
const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {

  const lenisRef = useRef<LenisRef>(null)
  
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])

  return <ReactLenis ref={lenisRef} root options={{ lerp: 0.05, duration: 0.5, smoothWheel: true }}>{children}</ReactLenis>;
};

export default LenisScrollProvider;