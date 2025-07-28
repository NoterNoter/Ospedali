'use client';

import React, { useState, useEffect } from 'react';
import RankingTable from './RankingTable';
import { getOspedaliData } from '@/lib/data-loader';

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
        <div className="grid grid-cols-5">

          <div className="text-sm uppercase flex items-center font-semibold col-span-1 border-r border-black pl-4 pr-2">
            Best Italian Hospital
          </div>

          <div className="col-span-3 flex justify-center items-center">
            logo 
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
      </header>

      {isModalOpen && (
        <div className="fixed left-0 right-0 z-40 bg-white border-b border-black animate-slide-down" style={{ top: '4rem' }}>
          <div className="h-screen flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-black">
              <h2 className="text-xl font-semibold">Classifica Ospedali</h2>
              <button
                onClick={closeModal}
                className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                >
                  <path 
                    d="M12 4L4 12M4 4L12 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto">
              <RankingTable data={ospedaliData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}