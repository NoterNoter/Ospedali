'use client';

import React, { useState } from 'react';
import RankingTable from './RankingTable';
import { getOspedaliData } from '@/lib/data-loader';
import { LogoBlack } from './Icons';
import Link from 'next/link';

export default function Header() {
  const ospedaliData = getOspedaliData();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-black">
        <div className='relative'>
        <div className="grid grid-cols-5">

          <Link href="/" className="text-sm uppercase flex items-center font-semibold col-span-1 border-r border-black pl-4 pr-2 leading-none">
            Best Italian Hospital award
          </Link>

          <div className="col-span-3 flex justify-center items-center">
            <a href="/" className="w-13 ">
            <LogoBlack />
            </a>
          </div>
          
          <button
            onClick={toggleAccordion}
            className="flex items-center gap-2 px-4 py-2 border-l border-black cursor-pointer hover:bg-gray-100 transition-colors"
          >
            CLASSIFICA
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              <path 
                d="M6 8.5L2 4.5L10 4.5L6 8.5Z" 
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
     
      </div>
      <div 
        className={`bg-white  transition-all duration-300 ease-in-out overflow-scroll ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="animate-slide-down">
          <RankingTable data={ospedaliData} />
        </div>
      </div>

      </header>

   
     
    </>
  );
}