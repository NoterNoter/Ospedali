// @ts-nocheck

"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin.js";
import { ScrollDown as ScrollDownIcon } from "../Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const ScrollDown = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={() => {
        const currentScroll = window.scrollY;
        const viewportHeight = window.innerHeight;
        gsap.to(window, {
          duration: 1,
          scrollTo: currentScroll + viewportHeight - 70,
        });
      }}
      ref={scrollRef}
      className={`scroll_down flex gap-2 items-center transition-all duration-300 origin-center cursor-pointer hover:scale-110 `}
    >
      <ScrollDownIcon />
    </div>
  );
};

export default ScrollDown;
