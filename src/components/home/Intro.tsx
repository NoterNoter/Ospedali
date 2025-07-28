import React from 'react'
import CardInfo from './CardInfo'

export default function Intro({intro}: {intro: any}) {
  return (
    <section className='grid grid-cols-5 mt-[300px]'>
      <div className="col-span-3 col-start-2 px-2 py-2 bg-gray border border-black ">
        <h3 className='text-md font-medium mb-8'>{intro.occhiello}</h3>
      </div>
      <div className="col-start-1">
        ciao
      </div>
    </section>
  )
}
