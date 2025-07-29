// @ts-nocheck
"use client"
import React, { useRef} from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText.js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { CustomEase } from "gsap/dist/CustomEase.js";
import { PrismicRichText } from "@/components/PrismicRichText";

if (typeof window !== "undefined"){
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(CustomEase)
}

const TextReveal = ({children, duration = 1, stagger = 0.01, delay = 0} : {children: React.ReactNode, duration?: number, stagger?: number, delay?: number}) => {

  const titleRef = useRef<HTMLSpanElement>(null); 

  useGSAP(() => {
    if (!titleRef.current) return;

    const split2 = SplitText.create(titleRef.current, { 
      type: "line,words,chars",
      charsClass: "split-line-custom",
      wordsClass: "split-line-word"
    });
    const chars = split2.chars;

    // Rimuovo tutte le classi revealed all'inizio
    chars.forEach((el: HTMLElement) => el.classList.remove("revealed"));

    const anim = gsap.to(chars, {
      onStart: () => {
        chars.forEach((el: HTMLElement, i: number) => {
          setTimeout(() => {
            el.classList.add("revealed");
          }, i * stagger * 1000 + delay * 1000);
        });
      },
      onReverseComplete: () => {
        chars.forEach((el: HTMLElement) => el.classList.remove("revealed"));
      },
      duration: duration + delay + chars.length * stagger,
      // serve solo per far partire lo ScrollTrigger, non per animare
    });

    const st = ScrollTrigger.create({
      trigger: titleRef.current,
      animation: anim,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      markers: false, // Temporary for debugging
      onEnter: () => console.log("TextReveal triggered"),
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
      split2.revert();
    };
  }, { dependencies: [], scope: titleRef });

  return (
    <span ref={titleRef}>
      {children}
    </span>
  )
}

export default TextReveal
