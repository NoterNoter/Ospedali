import React from 'react'

export default function CardInfo({card, className}: {card: any, className?: string}) {
  return (
    <div className={`p-1 bg-blu/10 border border-black h-full ${className}`}>
      <h4 className='uppercase font-semibold mb-1 text-blu text-sm'>{card.titolo}</h4>
      <p className='text-[20px] leading-tight text-black'>{card.descrizione}</p>
    </div>
  )
}
