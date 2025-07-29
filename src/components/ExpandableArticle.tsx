'use client';

import { useState, useRef, useEffect } from 'react';

interface ExpandableArticleProps {
  content: string;
}

export default function ExpandableArticle({ content }: ExpandableArticleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <article className="grid grid-cols-5 border-b border-black">
      <div className="col-span-1 flex items-end pb-2 px-4 justify-end">
        <button
          onClick={toggleExpanded}
          className="text-sm uppercase font-semibold text-blu hover:underline transition-all flex items-center gap-2"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}
          >
            <path d="M10.0003 18.3334C5.39795 18.3334 1.66699 14.6024 1.66699 10C1.66699 5.39765 5.39795 1.66669 10.0003 1.66669C14.6027 1.66669 18.3337 5.39765 18.3337 10C18.3337 14.6024 14.6027 18.3334 10.0003 18.3334ZM9.16699 9.16669H5.83366V10.8334H9.16699V14.1667H10.8337V10.8334H14.167V9.16669H10.8337V5.83335H9.16699V9.16669Z" fill="#0101A1"/>
          </svg>
          {isExpanded ? 'Leggi di meno' : 'Continua a leggere'}
        </button>
      </div>
      <div className="col-span-3 border-x border-black py-2 px-2 relative">
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-in-out`}
          style={{ maxHeight: isExpanded ? `${contentHeight}px` : '320px' }}
        >
          <div
            ref={contentRef}
            className="text-base text-container"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-[165px] bg-gradient-to-b from-transparent to-[#EAEAEA] pointer-events-none" />
          )}
        </div>
      </div>
    </article>
  );
}