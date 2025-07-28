import React from "react";

interface CardClassificaProps {
  card: {
    numero: string;
    id: string;
    titolo: string;
    valore: string;
    location: string;
    link: string;
  };
}

export default function CardClassifica({ card }: CardClassificaProps) {
  const getBackgroundClass = () => {
    const numero = parseInt(card.numero);
    if (numero === 1) return "bg-blu";
    if (numero === 2) return "bg-blu/60";
    if (numero === 3) return "bg-blu/40";
    return "";
  };

  return (
    <div
      className={`${getBackgroundClass()} text-white flex flex-col p-2 justify-between min-h-[400px]`}
    >
      <div className="text-sm  border-b border-white pb-2">
        <div className="font-semibold h-6 w-6 bg-white text-blu rounded-full flex items-center justify-center text-md-2">
          {card.numero}
        </div>
      </div>
      <div className="text-sm flex flex-col items-center justify-center">
        <h3 className="font-medium text-md leading-tight mb-2">{card.titolo}</h3>

        <div className="border-y border-white py-1 flex justify-between items-center w-full">
        <p>
          <strong>{card.valore}</strong>
          /100
          </p>
          <p className="uppercase font-semibold">{card.location}</p>
        </div>
      </div>
    </div>
  );
}
