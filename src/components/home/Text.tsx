import React from "react";
import CardInfo from "./CardInfo";
import CardApprofondimento from "./CardApprofondimento";

interface TextProps {
  className?: string;
  text: {
    testo: string;
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
  };
}

export default function Text({ text, className }: TextProps) {
  return (
    <section className={`grid grid-cols-5 relative h-full ${className}`}>
      <div className="col-span-1 col-start-1 self-end">
        {text.approfondimento && (
          <CardApprofondimento
            className=""
            approfondimento={text.approfondimento}
          />
        )}
      </div>
      <div
        className="col-span-3 col-start-2 px-2 py-2 bg-gray border border-black text-container text-base"
        dangerouslySetInnerHTML={{ __html: text.testo }}
      />
      <div className="col-span-1 col-start-5">
        {text.card && (
          <CardInfo className="border-l-0 !h-[400px]" card={text.card} />
        )}
      </div>
    </section>
  );
}
