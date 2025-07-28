// Tipi per le categorie degli ospedali
export type CategoriaId = 'policlinici' | 'cardiologia' | 'oncologia' | 'ortopedia';

// Interfaccia per una singola categoria
export interface Categoria {
  id: CategoriaId;
  nome: string;
  descrizione: string;
}

// Interfaccia per i punteggi per categoria
export interface Punteggi {
  policlinici: number;
  cardiologia: number;
  oncologia: number;
  ortopedia: number;
}

// Interfaccia per le variazioni per categoria  
export interface Variazioni {
  policlinici: number;
  cardiologia: number;
  oncologia: number;
  ortopedia: number;
}

// Interfaccia per un singolo ospedale
export interface Ospedale {
  id: string;
  nome: string;
  citta: string;
  regione: string;
  hasDetailPage: boolean;
  punteggi: Punteggi;
  variazioni: Variazioni;
}

// Interfaccia per i dati completi degli ospedali
export interface OspedaliData {
  ospedali: Ospedale[];
  categorie: Categoria[];
}

// Interfaccia per una riga della classifica con dati calcolati
export interface RigaClassifica {
  posizione: number;
  ospedale: Ospedale;
  punteggio: number;
  variazione: number;
  cittaRegione: string; // Formato: "Città, Regione"
}

// Interfaccia per i dati della classifica per categoria
export interface ClassificaData {
  categoria: CategoriaId;
  righe: RigaClassifica[];
}

// Tipi per l'ordinamento della tabella
export type ColonnaOrdinamento = 'posizione' | 'nome' | 'cittaRegione' | 'punteggio' | 'variazione';
export type DirezioneOrdinamento = 'asc' | 'desc';

export interface StatoOrdinamento {
  colonna: ColonnaOrdinamento;
  direzione: DirezioneOrdinamento;
}

// Tipi per il contenuto rich text delle pagine di dettaglio
export type ContenutoTipo = 'paragrafo' | 'titolo' | 'lista' | 'citazione';

export interface ContenutoParagrafo {
  tipo: 'paragrafo';
  testo: string;
}

export interface ContenutoTitolo {
  tipo: 'titolo';
  testo: string;
}

export interface ContenutoLista {
  tipo: 'lista';
  elementi: string[];
}

export interface ContenutoCitazione {
  tipo: 'citazione';
  testo: string;
  autore: string;
}

export type ContenutoItem = ContenutoParagrafo | ContenutoTitolo | ContenutoLista | ContenutoCitazione;

// Interfaccia per i dettagli di un ospedale
export interface DettaglioOspedale {
  id: string;
  titolo: string;
  sottotitolo: string;
  contenuto: ContenutoItem[];
  didascalia: string;
  flourishEmbed: string;
}

// Tipi per la homepage
export type HomepageSezioneTipo = 'hero' | 'testo' | 'card-info' | 'citazione' | 'flourish' | 'cta';

export interface HomepageSezioneBase {
  id: string;
  tipo: HomepageSezioneTipo;
}

export interface HomepageSezioneHero extends HomepageSezioneBase {
  tipo: 'hero';
  titolo: string;
  sottotitolo: string;
  descrizione?: string;
}

export interface HomepageSezioneTesto extends HomepageSezioneBase {
  tipo: 'testo';
  titolo?: string;
  contenuto: string;
  formato?: 'paragrafo' | 'lista';
}

export interface HomepageSezioneCardInfo extends HomepageSezioneBase {
  tipo: 'card-info';
  cards: {
    id: string;
    icona?: string;
    numero: string;
    titolo: string;
    descrizione: string;
  }[];
}

export interface HomepageSezioneCitazione extends HomepageSezioneBase {
  tipo: 'citazione';
  testo: string;
  autore: string;
}

export interface HomepageSezioneFlourish extends HomepageSezioneBase {
  tipo: 'flourish';
  embedUrl: string;
  didascalia?: string;
}

export interface HomepageSezioneCta extends HomepageSezioneBase {
  tipo: 'cta';
  titolo: string;
  descrizione: string;
  linkTesto: string;
  linkUrl: string;
}

export type HomepageSezione = 
  | HomepageSezioneHero 
  | HomepageSezioneTesto 
  | HomepageSezioneCardInfo 
  | HomepageSezioneCitazione 
  | HomepageSezioneFlourish 
  | HomepageSezioneCta;

// Interfaccia per i dati completi della homepage
export interface HomepageData {
  metadata: {
    titolo: string;
    descrizione: string;
    slug: string;
  };
  intro: {
    occhiello: string;
    titolo: string;
    card: {
      id: string;
      titolo: string;
      descrizione: string;
    };
  };
  text_1: {
    tipo: string;
    testo: string;
    card: {
      id: string;
      titolo: string;
      descrizione: string;
    };
  };
  sezioni: HomepageSezione[];
}