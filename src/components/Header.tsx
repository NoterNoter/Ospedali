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
            <Link href="/" className="text-sm uppercase flex items-center font-semibold col-span-1  pl-4 pr-2 leading-none">
              Best Italian Hospital award
            </Link>

            <div className="border-x border-black col-span-3 flex justify-center items-center">
              <a href="/" className="w-13 ">
                <LogoBlack />
              </a>
            </div>
            
            <button
              onClick={toggleAccordion}
              className="flex items-center gap-2 pl-2 py-2  cursor-pointer hover:bg-gray-100 transition-colors"
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
        data-lenis-prevent
        className={`bg-white transition-all duration-300 ease-in-out overflow-scroll ${
          isOpen ? 'max-h-[2000px]' : 'max-h-0'
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