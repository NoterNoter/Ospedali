# I Migliori Ospedali d'Italia 2025

Longform statico interattivo che presenta la classifica dei migliori ospedali italiani divisi per categoria specialistica. Costruito con Next.js 15, TypeScript e Tailwind CSS per deployment su testate giornalistiche.

## 🏥 Caratteristiche

- **Classifica interattiva** con tab per categorie (Policlinici, Cardiologia, Oncologia, Ortopedia)
- **Colonne complete**: Posizione, Nome, Città/Regione, Punteggio, Variazione (+/-)
- **Pagine di dettaglio** per ospedali selezionati con contenuti rich text
- **Embed Flourish** per infografiche interattive
- **Build statica** ottimizzata per CDN
- **SEO completo** con metadati OpenGraph e Twitter

## 🚀 Quick Start

```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Build per produzione
npm run build

# Lint del codice
npm run lint
```

Apri [http://localhost:3000](http://localhost:3000) per vedere il risultato.

## 📁 Struttura Progetto

```
src/
├── app/                    # Next.js App Router
│   ├── ospedale/[id]/     # Pagine dinamiche ospedali
│   ├── layout.tsx         # Layout principale
│   └── page.tsx           # Homepage
├── components/            # Componenti React
│   ├── RankingTable.tsx   # Tabella classifica
│   ├── HomepageSection.tsx # Sezioni homepage
│   ├── RichTextRenderer.tsx # Renderer contenuti
│   └── FlourishEmbed.tsx  # Embed Flourish
├── data/                  # Dati JSON
│   ├── ospedali.json      # Dati ospedali e punteggi
│   ├── homepage.json      # Contenuti homepage
│   └── dettagli-ospedali/ # Dettagli singoli ospedali
├── lib/                   # Utilities
│   ├── data-loader.ts     # Caricamento dati
│   └── classifica-utils.ts # Utilità classifica
└── types/                 # Tipi TypeScript
    └── hospital.ts        # Interfacce dati
```

## 🏗️ Build Statica

Il progetto è configurato per generare un build completamente statico:

```bash
npm run build
```

Questo genera la cartella `out/` con tutti i file statici pronti per il deployment su qualsiasi CDN o server web.

## 📊 Dati e Contenuti

### Modificare la Classifica
Edita `/src/data/ospedali.json` per aggiornare:
- Punteggi per categoria
- Variazioni annuali (+/-)
- Informazioni ospedali

### Aggiungere Contenuti Homepage
Modifica `/src/data/homepage.json` per:
- Aggiungere nuove sezioni
- Modificare testi e statistiche
- Aggiornare embed Flourish

### Creare Pagine Dettaglio
1. Aggiungi nuovo JSON in `/src/data/dettagli-ospedali/[id].json`
2. Imposta `hasDetailPage: true` nell'ospedale
3. Il build statico genererà automaticamente la pagina

## 🎨 Styling

- **Tailwind CSS v4** per styling moderno
- **Design responsive** mobile-first  
- **Colori corporate**: Blu (#1e3a8a) e varianti
- **Typography**: Font Geist ottimizzati

## 📱 Deployment

### CDN/Hosting Statico
```bash
npm run build
# Carica il contenuto di out/ sul tuo hosting
```

### Con Base Path (sottocartella)
Uncomment nel `next.config.ts`:
```typescript
basePath: '/speciale-ospedali',
assetPrefix: '/speciale-ospedali',
```

## 🔧 Personalizzazione

### Aggiungere Nuove Categorie
1. Aggiorna il tipo `CategoriaId` in `/src/types/hospital.ts`
2. Aggiungi la categoria in `/src/data/ospedali.json`
3. Aggiorna i punteggi per tutti gli ospedali

### Modificare Layout
I componenti sono modulari e facilmente personalizzabili:
- `RankingTable.tsx` per la tabella
- `HomepageSection.tsx` per le sezioni
- `RichTextRenderer.tsx` per contenuti rich text

## 📄 Licenza

Progetto sviluppato per deployment su testate giornalistiche italiane.
