import { getHomepageData, getOspedaliData } from '@/lib/data-loader';
import RankingTable from '@/components/RankingTable';
import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import Text from '@/components/home/Text';
import Spacing from '@/components/Spacing';
export default function Home() {
  const ospedaliData = getOspedaliData();
  const homepageData = getHomepageData();

  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <Hero />
      {/* Tabella ranking degli ospedali */}
      <section id="ranking-table" className="bg-white">
          <RankingTable 
            data={ospedaliData}
            className="rounded-lg overflow-hidden border border-gray-200"
          />
      </section>

      <Intro intro={homepageData.intro} />
      <Text text={homepageData.text_1} />
      <Spacing />
    </main>
  );
}
