import { getHomepageData, getOspedaliData } from '@/lib/data-loader';
import RankingTable from '@/components/RankingTable';
import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import TextSection from '@/components/home/TextSection';
import Spacing from '@/components/Spacing';
import ClassificaRow from '@/components/home/ClassificaRow';
import ApprofondimentoRow from '@/components/home/ApprofondimentoRow';
import SectionFlourish from '@/components/home/SectionFlourish';
import Header from '@/components/Header';

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

      <div className="">
      <Header />
      <Intro intro={homepageData.intro} />
      <TextSection data={homepageData.text_1} />
      <Spacing />
      <ClassificaRow {...homepageData.classifica_1} />
      <Spacing />
      <ApprofondimentoRow {...homepageData.approfondimento_1} />
      <TextSection data={homepageData.text_2} />
      <ClassificaRow {...homepageData.classifica_2} />
      <Spacing />
      <SectionFlourish data={homepageData.infografica_1} />
      <Spacing />
      </div>

    </main>
  );
}
