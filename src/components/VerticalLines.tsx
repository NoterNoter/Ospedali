import React from 'react';

const VerticalLines: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="relative w-full h-full">
        {/* 6 vertical lines dividing the page into 5 columns */}
        <div className="absolute left-0 top-0 w-px h-full bg-black/10"></div>
        <div className="absolute left-1/5 top-0 w-px h-full bg-black/10"></div>
        <div className="absolute left-2/5 top-0 w-px h-full bg-black/10"></div>
        <div className="absolute left-3/5 top-0 w-px h-full bg-black/10"></div>
        <div className="absolute left-4/5 top-0 w-px h-full bg-black/10"></div>
        <div className="absolute right-0 top-0 w-px h-full bg-black/10"></div>
      </div>
    </div>
  );
};

export default VerticalLines; 