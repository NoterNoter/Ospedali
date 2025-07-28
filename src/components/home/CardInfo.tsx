import React from 'react'

export default function CardInfo({card}: {card: any}) {
  return (
    <div className='p-1 bg-blu/10 border border-blu/20 rounded-md'>
      <h4 className='uppercase font-medium text-blu text-sm'>{card.titolo}</h4>
      <p className='text-sm text-black'>{card.descrizione}</p>
    </div>
  )
}
