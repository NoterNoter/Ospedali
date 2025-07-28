import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDettaglioOspedale, getOspedaliConDettaglioIds } from '@/lib/data-loader';
import RichTextRenderer from '@/components/RichTextRenderer';
import FlourishEmbed from '@/components/FlourishEmbed';

interface OspedalePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OspedalePage({ params }: OspedalePageProps) {
  const { id } = await params;
  const dettaglio = await getDettaglioOspedale(id);
  
  if (!dettaglio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8">
            <Link 
              href="/#ranking-table"
              className="inline-flex items-center text-blue-200 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Torna alla classifica
            </Link>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {dettaglio.titolo}
          </h1>
          <h2 className="text-xl md:text-2xl font-light opacity-90">
            {dettaglio.sottotitolo}
          </h2>
        </div>
      </header>

      {/* Contenuto principale */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <RichTextRenderer 
            contenuto={dettaglio.contenuto}
            className="mb-16"
          />
          
          {/* Embed Flourish */}
          {dettaglio.flourishEmbed && (
            <div className="mb-16">
              <FlourishEmbed 
                embedUrl={dettaglio.flourishEmbed}
                didascalia={dettaglio.didascalia}
              />
            </div>
          )}
        </div>
      </article>

      {/* Footer con link di ritorno */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/#ranking-table"
            className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors shadow-lg"
          >
            Esplora altri ospedali
          </Link>
        </div>
      </footer>
    </main>
  );
}

// Genera le route statiche per tutti gli ospedali con dettaglio
export async function generateStaticParams() {
  const ospedaliIds = getOspedaliConDettaglioIds();
  
  return ospedaliIds.map((id) => ({
    id,
  }));
}

// Metadati dinamici per SEO
export async function generateMetadata({ params }: OspedalePageProps) {
  const { id } = await params;
  const dettaglio = await getDettaglioOspedale(id);
  
  if (!dettaglio) {
    return {
      title: 'Ospedale non trovato',
    };
  }

  return {
    title: dettaglio.titolo,
    description: dettaglio.sottotitolo,
  };
}