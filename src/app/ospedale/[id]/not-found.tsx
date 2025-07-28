import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-blue-900 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Ospedale non trovato
        </h1>
        <p className="text-gray-600 mb-8">
          L&apos;ospedale che stai cercando non esiste o non ha una pagina di dettaglio disponibile.
        </p>
        <Link 
          href="/#ranking-table"
          className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
        >
          Torna alla classifica
        </Link>
      </div>
    </main>
  );
}