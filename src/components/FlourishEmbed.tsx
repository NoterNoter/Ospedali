import React from 'react';

const FlourishEmbed = ({ embedUrl, height = '800px', heightMobile = '600px' }: { embedUrl: string, height?: string, heightMobile?: string }) => {
  // Gestisce diversi formati di URL Flourish
  let iframeUrl = embedUrl;
  
  if (embedUrl.includes('public.flourish.studio/visualisation/')) {
    // Converte da https://public.flourish.studio/visualisation/14410013/ a embed URL
    const visualisationId = embedUrl.match(/visualisation\/(\d+)/)?.[1];
    iframeUrl = `https://flo.uri.sh/visualisation/${visualisationId}/embed`;
  } else if (!embedUrl.startsWith('http')) {
    // Se è solo un ID, costruisci l'URL dell'iframe
    iframeUrl = `https://flo.uri.sh/visualisation/${embedUrl}/embed`;
  }

  return (
    <div style={{ height: height }} className={`w-full relative infografica`}>
      <iframe
        src={iframeUrl}
        frameBorder="0"
        scrolling="no"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        allowFullScreen
        allow="clipboard-write"
      />
    </div>
  );
};

export default FlourishEmbed;