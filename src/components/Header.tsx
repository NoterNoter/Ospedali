'use client';

import React, { useState, useEffect } from 'react';
import RankingTable from './RankingTable';
import { getOspedaliData } from '@/lib/data-loader';
import { LogoBlack } from './Icons';

export default function Header() {
  const ospedaliData = getOspedaliData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-black">
        <div className='relative'>
        <div className="grid grid-cols-5">

          <div className="text-sm uppercase flex items-center font-semibold col-span-1 border-r border-black pl-4 pr-2 leading-none">
            Best Italian Hospital award
          </div>

          <div className="col-span-3 flex justify-center items-center">
            <a href="/" className="w-13 ">
            <LogoBlack />
            </a>
          </div>
          
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-4 py-2 border-l border-black cursor-pointer hover:bg-gray-100 transition-colors"
          >
            CLASSIFICA
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              className="transition-transform"
            >
              <path 
                d="M6 8.5L2 4.5L10 4.5L6 8.5Z" 
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
     
      </div>
      </header>

      {isModalOpen && (
        <div className="fixed left-0 top-6 right-0 z-100 bg-white border-b border-black animate-slide-down">
          <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-auto px-0">
              <RankingTable data={ospedaliData} />
            </div>
          </div>
        </div>
      )}
     
    </>
  );
}