import Link from 'next/link';
import { HomepageSezione } from '@/types/hospital';
import FlourishEmbed from './FlourishEmbed';

interface HomepageSectionProps {
  sezione: HomepageSezione;
  className?: string;
}

export default function HomepageSection({ sezione, className = '' }: HomepageSectionProps) {
  const baseClassName = `w-full ${className}`;

  switch (sezione.tipo) {
    case 'hero':
      return (
        <section className={`${baseClassName} bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-6`}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {sezione.titolo}
            </h1>
            <h2 className="hero-subtitle text-xl md:text-2xl font-light mb-6 opacity-90">
              {sezione.sottotitolo}
            </h2>
            {sezione.descrizione && (
              <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
                {sezione.descrizione}
              </p>
            )}
          </div>
        </section>
      );

    case 'testo':
      return (
        <section className={`${baseClassName} py-12 px-6`}>
          <div className="max-w-4xl mx-auto">
            {sezione.titolo && (
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {sezione.titolo}
              </h2>
            )}
            <div className="prose prose-lg max-w-none">
              {sezione.formato === 'lista' ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg leading-relaxed">
                  {sezione.contenuto.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-lg leading-relaxed">
                  {sezione.contenuto}
                </p>
              )}
            </div>
          </div>
        </section>
      );

    case 'card-info':
      return (
        <section className={`${baseClassName} py-12 px-6 bg-gray-50`}>
          <div className="max-w-6xl mx-auto">
            <div className="card-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              {sezione.cards.map((card) => (
                <div 
                  key={card.id}
                  className="bg-blue-900 text-white p-8 rounded-lg text-center shadow-lg"
                >
                  {card.icona && (
                    <div className="text-4xl mb-4">
                      {card.icona}
                    </div>
                  )}
                  <div className="text-4xl font-bold mb-2">
                    {card.numero}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {card.titolo}
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    {card.descrizione}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'citazione':
      return (
        <section className={`${baseClassName} py-12 px-6 bg-blue-50`}>
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl italic text-gray-800 mb-6 leading-relaxed">
                &ldquo;{sezione.testo}&rdquo;
              </p>
              <cite className="text-lg font-semibold text-blue-700 not-italic">
                — {sezione.autore}
              </cite>
            </blockquote>
          </div>
        </section>
      );

    case 'flourish':
      return (
        <section className={`${baseClassName} py-12 px-6`}>
          <div className="max-w-6xl mx-auto">
            <FlourishEmbed 
              embedUrl={sezione.embedUrl}
              didascalia={sezione.didascalia}
            />
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className={`${baseClassName} py-16 px-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {sezione.titolo}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {sezione.descrizione}
            </p>
            <Link 
              href={sezione.linkUrl}
              className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {sezione.linkTesto}
            </Link>
          </div>
        </section>
      );

    default:
      return null;
  }
}