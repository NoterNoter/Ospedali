import React from 'react'
import Link from 'next/link'



export default function CardApprofondimento({approfondimento, className}: {approfondimento: any, className?: string}) {
  return (
    <Link href={approfondimento?.link || ''} className={`p-2 bg-blu text-white flex flex-col justify-between min-h-[400px]  border-r border-white last:border-r-0 ${className}`}>
      <p className='uppercase font-semibold mt-1 text-white text-sm flex items-center justify-between border-b border-white pb-1'>APPROFONDIMENTO
      <span className="inline-block align-middle ml-2">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.3365 2.84518L2.16435 10.0173L0.98584 8.83883L8.158 1.66667H1.83652V0H11.0032V9.16667H9.3365V2.84518Z" fill="white"/>
        </svg>
      </span>
      </p>
    
    <div className="">
      <h4 className='text-md-2 leading-none font-medium text-white mb-1 pb-2 border-b border-white'>{approfondimento.titolo}</h4>
      <div className="border-b border-white pb-1 uppercase font-semibold">
        <p className="text-white text-sm">{approfondimento.azienda}</p>
      </div>
      </div>
    </Link>
  )
}
