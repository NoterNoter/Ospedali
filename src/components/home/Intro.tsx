import React from 'react'
import CardInfo from './CardInfo'
import { ArrowSquare } from '../Icons'
export default function Intro({intro}: {intro: any}) {
  return (
    <section className='grid grid-cols-5 mt-[300px]'>
      <div className="col-span-3 col-start-2 px-2 py-2 bg-gray border border-black border-b ">
        <h3 className='text-md font-medium mb-8 max-w-[600px] leading-tight'>{intro.occhiello}</h3>
      </div>
      <div className="col-start-1 relative">
        <CardInfo card={intro.card} />
        <div className="absolute h-[50px] w-[50px] border-b border-l border-black bottom-[-50px] right-0 flex items-center justify-center">
          <ArrowSquare />
        </div>
      </div>
      <div className="col-span-3 bg-gray  border-r p-2 flex flex-col justify-between">
        <h1 className='text-lg font-semibold leading-tight mb-10'>{intro.titolo}</h1>
        <div className='flex justify-between'>
          <div className='text-sm text-black'>
          DI <br />
          <strong>
          LORENZO BUONAROSA
          </strong>
          </div>
          <div className='text-sm text-black '>
          DESIGN DI <br />
          <strong>
          LUCA GORINI
          </strong>
          </div>
        </div>
      </div>
    </section>
  )
}
