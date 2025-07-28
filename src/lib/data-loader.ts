import { OspedaliData, HomepageData, DettaglioOspedale } from '@/types/hospital';
import ospedaliData from '@/data/ospedali.json';
import homepageData from '@/data/homepage.json';

/**
 * Carica i dati degli ospedali
 */
export function getOspedaliData(): OspedaliData {
  return ospedaliData as OspedaliData;
}

/**
 * Carica i dati della homepage
 */
export function getHomepageData(): HomepageData {
  return homepageData as HomepageData;
}

/**
 * Carica i dettagli di un ospedale specifico
 */
export async function getDettaglioOspedale(id: string): Promise<DettaglioOspedale | null> {
  try {
    const dettaglio = await import(`@/data/dettagli-ospedali/${id}.json`);
    return dettaglio.default as DettaglioOspedale;
  } catch (error) {
    console.error(`Dettaglio ospedale non trovato: ${id}`, error);
    return null;
  }
}

/**
 * Ottiene tutti gli ID degli ospedali con pagina di dettaglio
 */
export function getOspedaliConDettaglioIds(): string[] {
  const data = getOspedaliData();
  return data.ospedali
    .filter(ospedale => ospedale.hasDetailPage)
    .map(ospedale => ospedale.id);
}