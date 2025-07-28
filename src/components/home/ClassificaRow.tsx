import React from 'react'
import CardClassifica from './CardClassifica'

interface ClassificaRowProps {
  titolo_up: string;
  titolo_down: string;
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

export default function ClassificaRow({ titolo_up, titolo_down, descrizione, rows }: ClassificaRowProps) {
  return (
    <div className='grid grid-cols-5 border-t border-black border-b'>
      <div className="mb-8 pl-4 py-2 flex flex-col justify-between h-full border-r border-black">
        <div className="text-sm">
        <span className="font-semibold">{titolo_up}</span>
        <span className="font-normal block">{titolo_down}</span>
        </div>
       
        <p className="text-black text-base leading-tight">{descrizione}</p>
      </div>
        {rows[0]?.cards.map((card) => (
          <CardClassifica key={card.id} card={card} />
        ))}
    </div>
  )
}
