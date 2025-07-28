"use client";
import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollDown from "../animations/ScrollDown";
import { Logo } from "../Icons";
export default function Hero() {


  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
   
  }, {
    dependencies: [containerRef],
  });


  return (
    <section ref={containerRef} className="mt-3 border-t border-blu px-4 h-[calc(100vh-30px)] flex flex-col justify-between">
      <div className="">
        <div className="flex justify-between py-3 border-b border-blu leading-none">
          <h1 className="text-[9vw] font-medium text-outline-blu">BEST</h1>
          <h1 className="text-[9vw] font-medium text-blu">ITALIAN</h1>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 pt-2">
            <span>
              <ScrollDown />
            </span>
            <p className="max-w-[500px] font-medium text-blu leading-tight">
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
        <p>ciao</p>
      <div className="flex justify-between py-3 border-t border-blu leading-none">
        <h1 className="text-[9vw] font-medium text-blu">HOSPITAL</h1>
        <h1 className="text-[9vw] font-medium text-outline-blu">AWARD</h1>
      </div>
      </div>
    </section>
  );
}
