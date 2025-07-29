// @ts-nocheck
"use client"
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { gsap } from "gsap";
if (typeof window !== "undefined"){
  gsap.registerPlugin(ScrollTrigger)
}

interface LineAnimationProps {
  color?: string
  duration?: number
  delay?: number
  ease?: string
  className?: string
  trigger?: string
}

export default function LineAnimation({ 
  color = '#000000', 
  duration = 1, 
  delay = 0, 
  ease = 'power2.out',
  className = '',
  trigger = 'top 80%'
}: LineAnimationProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Register ScrollTrigger plugin

    if (lineRef.current) {
      // Set initial state
      gsap.set(lineRef.current, {
        width: '0%'
      })

      // Animate to full width with ScrollTrigger
      gsap.to(lineRef.current, {
        width: '100%',
        duration: duration,
        delay: delay,
        ease: ease,
        scrollTrigger: {
          trigger: lineRef.current,
          start: trigger,
          toggleActions: 'play none none reverse'
        }
      })
    }
  }, [duration, delay, ease, trigger])

  return (
    <div 
      ref={lineRef}
      className={`h-[1px] ${className}`}
      style={{
        backgroundColor: color,
        width: '0%'
      }}
    />
  )
}
