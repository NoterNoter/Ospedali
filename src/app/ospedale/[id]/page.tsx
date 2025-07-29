import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDettaglioOspedale,
  getOspedaliConDettaglioIds,
} from "@/lib/data-loader";
import RichTextRenderer from "@/components/RichTextRenderer";
import SocialShare from "@/components/SocialShare";
import SectionFlourish from "@/components/home/SectionFlourish";
import Header from "@/components/Header";
import FlourishEmbed from "@/components/FlourishEmbed";
import { ArrowSquare } from "@/components/Icons";

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
    <main className="min-h-screen bg-gray">
      <Header />

      <div className="grid grid-cols-5 border-b border-black">
        <div className="col-span-1 pl-4 p-2">
          <span className="text-sm uppercase font-semibold text-black/40 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block text-black/40 text-lg"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4766 7.83341L0.33366 7.83341V6.16675L10.4766 6.16675L6.00666 1.69678L7.18516 0.518264L13.667 7.00008L7.18516 13.4819L6.00666 12.3034L10.4766 7.83341Z"
                  fill="black"
                  fillOpacity="0.4"
                />
              </svg>
            </span>
            APPROFONDIMENTO
          </span>
        </div>

        <div className="col-span-3 h-[180px] text-md font-medium py-2 px-2 border-x border-black leading-tight">
          <h2 className="max-w-[500px]">{dettaglio.sottotitolo}</h2>
        </div>
      </div>

      <div className="grid grid-cols-5 border-b border-black  relative">
        <div className="col-span-1 pl-4 p-2 relative">
          <SocialShare />
          <div className="absolute h-[50px] w-[50px] border-b border-l border-black bottom-[-50px] right-0 flex items-center justify-center">
            <ArrowSquare />
          </div>
        </div>
        <div className="col-span-3 bg-white border-x border-black py-2 px-2 leading-tight relative">
          <div className="flex absolute top-2 right-2 text-sm uppercase ">
            {dettaglio.regione} /<strong> {dettaglio.citta}</strong>
          </div>
          <h1 className="text-lg max-w-[700px] font-medium mb-4 leading-tight">
            {dettaglio.titolo}
          </h1>
        </div>
      </div>

      {/* Contenuto principale */}
      <article className="grid grid-cols-5 border-b border-black">
        <div className="col-span-1"></div>
        <div className="col-span-3 border-x border-black py-2 px-2">
          <div
            className="text-base text-container"
            dangerouslySetInnerHTML={{ __html: (dettaglio.contenuto[0] as any).testo }}
          />
        </div>
      </article>

      {/* Embed Flourish */}
      {dettaglio.flourishEmbed && (
        <div className="mb-16">
          <FlourishEmbed embedUrl={dettaglio.flourishEmbed} />
        </div>
      )}
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
      title: "Ospedale non trovato",
    };
  }

  return {
    title: dettaglio.titolo,
    description: dettaglio.sottotitolo,
  };
}
