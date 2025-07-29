"use client";

import React from "react";
import { motion } from "framer-motion";
import CardInfo from "./CardInfo";
import CardApprofondimentoImage from "./CardApprofondimentoImage";

interface TextSectionData {
  tipo: string;
  testo: string;
  no_border?: boolean;
  card: {
    id: string;
    titolo: string;
    descrizione: string;
  };
  approfondimento?: {
    id: string;
    titolo: string;
    descrizione: string;
    image: string;
    link: string;
  };
}

interface TextSectionProps {
  className?: string;
  data: TextSectionData;
  no_border?: boolean;
}

export default function TextSection({ data, className, no_border }: TextSectionProps) {
  return (
    <section className={`grid grid-cols-5 relative h-full ${className}`}>
      <div className="col-span-1 col-start-1 self-end">
        {data.approfondimento && (
          <CardApprofondimentoImage
            className=""
            approfondimento={data.approfondimento}
          />
        )}
      </div>
      <div
        className={`col-span-3 col-start-2 px-2 py-2 bg-gray border border-black text-container text-base ${no_border ? 'border-b-0' : ''}`}
        dangerouslySetInnerHTML={{ __html: data.testo }}
      />
      <div className="col-span-1 col-start-5">
        {data.card && (
          <CardInfo className="border-l-0 !h-[400px]" card={data.card} />
        )}
      </div>
    </section>
  );
} 