import React from 'react'
import CardApprofondimento from './CardApprofondimento'

interface ApprofondimentoRowProps {
  titolo: string;
  descrizione: string;
  rows: {
    id: string;
    cards: {
      numero: string;
      id: string;
      titolo: string;
      valore: string;
      location: string;
      link: string;
    }[];
  }[];
}

export default function ApprofondimentoRow({ titolo, descrizione, rows }: ApprofondimentoRowProps) {
  return (
    <div className='grid grid-cols-5 border-t border-black border-b'>
      <div className="mb-8 pl-4 py-2 flex flex-col justify-between h-full border-r border-black">
        <div className="text-sm">
        <span className="font-semibold">{titolo}</span>
        </div>
       
        <p className="text-black text-base leading-tight">{descrizione}</p>
      </div>
        {rows[0]?.cards.map((card) => (
          <CardApprofondimento key={card.id} approfondimento={card} />
        ))}
    </div>
  )
}
