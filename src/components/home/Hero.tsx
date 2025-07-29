"use client";
import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollDown from "../animations/ScrollDown";
import { Logo } from "../Icons";
import SocialShare from "../SocialShare";
export default function Hero() {


  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate BEST and ITALIAN from top
    gsap.from(".hero-text-top", {
      y: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Animate HOSPITAL and AWARD from bottom
    gsap.from(".hero-text-bottom", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.3
    });
  }, {
    dependencies: [containerRef],
  });


  return (
    <section ref={containerRef} className="mt-3 border-t border-blu px-4 h-[calc(100vh-24px)] flex flex-col justify-between">
      <div className="">
        <div className="flex justify-between py-3 border-b border-blu  overflow-hidden leading-none">
          <h1 className="hero-text-top text-[9vw] font-medium text-outline-blu">BEST</h1>
          <h1 className="hero-text-top text-[9vw] font-medium text-blu">ITALIAN</h1>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 pt-2">
            <span>
              <ScrollDown />
            </span>
            <p className="max-w-[400px] font-medium text-blu leading-tight">
              Scopri le classifica 2025 che premia l’eccellenza ospedaliera
              italiana e segnalale strutture sanitarie più virtuose del Paese
            </p>
          </div>
          <div className="pt-2">
            <a href="">
              <Logo />
            </a>
          </div>

        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SocialShare />
      <div className="flex justify-between py-3 border-t border-blu overflow-hidden leading-none">
        <h1 className="hero-text-bottom text-[9vw] font-medium text-blu">HOSPITAL</h1>
        <h1 className="hero-text-bottom text-[9vw] font-medium text-outline-blu">AWARD</h1>
      </div>
      </div>
    </section>
  );
}
