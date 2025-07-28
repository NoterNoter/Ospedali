import { getHomepageData, getOspedaliData } from '@/lib/data-loader';
import HomepageSection from '@/components/HomepageSection';
import RankingTable from '@/components/RankingTable';

export default function Home() {
  const homepageData = getHomepageData();
  const ospedaliData = getOspedaliData();

  return (
    <main className="min-h-screen bg-white">
      {/* Sezioni della homepage */}
      {homepageData.sezioni.map((sezione) => (
        <HomepageSection key={sezione.id} sezione={sezione} />
      ))}

      {/* Tabella ranking degli ospedali */}
      <section id="ranking-table" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Classifica Ospedali 2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri i migliori ospedali italiani per categoria specialistica. 
              Clicca sulle tab per cambiare specialità e visualizzare la classifica aggiornata.
            </p>
          </div>
          
          <RankingTable 
            data={ospedaliData}
            className="shadow-2xl rounded-lg overflow-hidden border border-gray-200"
          />
        </div>
      </section>
    </main>
  );
}
