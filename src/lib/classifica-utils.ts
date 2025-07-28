import { 
  OspedaliData, 
  CategoriaId, 
  ClassificaData, 
  RigaClassifica,
  Ospedale 
} from '@/types/hospital';

/**
 * Genera la classifica per una specifica categoria
 */
export function generaClassifica(
  data: OspedaliData, 
  categoria: CategoriaId
): ClassificaData {
  // Ordina gli ospedali per punteggio nella categoria selezionata (decrescente)
  const ospedaliOrdinati = [...data.ospedali].sort((a, b) => 
    b.punteggi[categoria] - a.punteggi[categoria]
  );

  // Crea le righe della classifica
  const righe: RigaClassifica[] = ospedaliOrdinati.map((ospedale, index) => ({
    posizione: index + 1,
    ospedale,
    punteggio: ospedale.punteggi[categoria],
    variazione: ospedale.variazioni[categoria],
    cittaRegione: formatCittaRegione(ospedale)
  }));

  return {
    categoria,
    righe
  };
}

/**
 * Formatta città e regione in un'unica stringa
 */
export function formatCittaRegione(ospedale: Ospedale): string {
  return `${ospedale.citta}, ${ospedale.regione}`;
}

/**
 * Formatta la variazione con segno + o -
 */
export function formatVariazione(variazione: number): string {
  if (variazione === 0) return '0';
  return variazione > 0 ? `+${variazione}` : `${variazione}`;
}

/**
 * Restituisce la classe CSS per il colore della variazione
 */
export function getVariazioneColorClass(variazione: number): string {
  if (variazione > 0) return 'text-green-600';
  if (variazione < 0) return 'text-red-600';
  return 'text-gray-500';
}

/**
 * Genera tutte le classifiche per tutte le categorie
 */
export function generaTutteLeClassifiche(data: OspedaliData): Record<CategoriaId, ClassificaData> {
  const classifiche: Record<CategoriaId, ClassificaData> = {} as Record<CategoriaId, ClassificaData>;
  
  data.categorie.forEach(categoria => {
    classifiche[categoria.id] = generaClassifica(data, categoria.id);
  });

  return classifiche;
}

/**
 * Trova un ospedale per ID
 */
export function trovaOspedaleById(data: OspedaliData, id: string): Ospedale | undefined {
  return data.ospedali.find(ospedale => ospedale.id === id);
}

/**
 * Ottiene gli ospedali con pagina di dettaglio
 */
export function getOspedaliConDettaglio(data: OspedaliData): Ospedale[] {
  return data.ospedali.filter(ospedale => ospedale.hasDetailPage);
}

/**
 * Ordina le righe della classifica per colonna
 */
export function ordinaRigheClassifica(
  righe: RigaClassifica[], 
  colonna: import('@/types/hospital').ColonnaOrdinamento,
  direzione: import('@/types/hospital').DirezioneOrdinamento
): RigaClassifica[] {
  const righeOrdinateCopia = [...righe];
  
  righeOrdinateCopia.sort((a, b) => {
    let valoreA: string | number;
    let valoreB: string | number;
    
    switch (colonna) {
      case 'posizione':
        valoreA = a.posizione;
        valoreB = b.posizione;
        break;
      case 'nome':
        valoreA = a.ospedale.nome;
        valoreB = b.ospedale.nome;
        break;
      case 'cittaRegione':
        valoreA = a.cittaRegione;
        valoreB = b.cittaRegione;
        break;
      case 'punteggio':
        valoreA = a.punteggio;
        valoreB = b.punteggio;
        break;
      case 'variazione':
        valoreA = a.variazione;
        valoreB = b.variazione;
        break;
      default:
        return 0;
    }
    
    // Ordinamento numerico per numeri, alfabetico per stringhe
    let confronto: number;
    if (typeof valoreA === 'number' && typeof valoreB === 'number') {
      confronto = valoreA - valoreB;
    } else {
      confronto = String(valoreA).localeCompare(String(valoreB), 'it', { 
        numeric: true, 
        sensitivity: 'base' 
      });
    }
    
    return direzione === 'desc' ? -confronto : confronto;
  });
  
  return righeOrdinateCopia;
}

/**
 * Ottiene il tipo di icona per l'ordinamento
 */
export function getTipoIconaOrdinamento(
  colonna: import('@/types/hospital').ColonnaOrdinamento,
  colonnaAttiva: import('@/types/hospital').ColonnaOrdinamento,
  direzione: import('@/types/hospital').DirezioneOrdinamento
): 'asc' | 'desc' | 'neutral' {
  if (colonna !== colonnaAttiva) {
    return 'neutral';
  }
  
  return direzione === 'asc' ? 'asc' : 'desc';
}

/**
 * Verifica se una colonna è attiva per l'ordinamento
 */
export function isColonnaAttiva(
  colonna: import('@/types/hospital').ColonnaOrdinamento,
  colonnaAttiva: import('@/types/hospital').ColonnaOrdinamento
): boolean {
  return colonna === colonnaAttiva;
}