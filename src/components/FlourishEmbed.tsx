'use client';

import { useEffect, useRef } from 'react';

interface FlourishEmbedProps {
  embedUrl: string;
  didascalia?: string;
  className?: string;
}

export default function FlourishEmbed({ 
  embedUrl, 
  didascalia, 
  className = '' 
}: FlourishEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Estrai l'ID della visualizzazione dall'URL
    const visualizationId = embedUrl.split('/').pop()?.replace('/', '');
    
    if (!visualizationId) {
      console.error('ID visualizzazione Flourish non valido:', embedUrl);
      return;
    }

    // Crea l'iframe per l'embed Flourish
    const iframe = document.createElement('iframe');
    iframe.src = `https://flo.uri.sh/visualisation/${visualizationId}/embed`;
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.title = 'Visualizzazione interattiva';
    iframe.allowFullscreen = true;

    // Svuota il container e aggiungi l'iframe
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    // Cleanup
    return () => {
      const container = containerRef.current;
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [embedUrl]);

  return (
    <div className={`w-full ${className}`}>
      <div 
        ref={containerRef}
        className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg"
        style={{ minHeight: '600px' }}
      />
      {didascalia && (
        <p className="text-sm text-gray-600 mt-4 italic text-center">
          {didascalia}
        </p>
      )}
    </div>
  );
}