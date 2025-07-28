# Struttura Classifica Ospedali

## Layout CSS Grid

La classifica utilizza **CSS Grid** con 5 colonne equivalenti per garantire allineamento perfetto e distribuzione uniforme dello spazio.

### Intestazione Doppia

#### Prima Riga - Selezione Categoria
- **CLASSIFICA** | **POLICLINICI** | **CARDIOLOGIA** | **ONCOLOGIA** | **ORTOPEDIA**
- Le tab delle categorie sono cliccabili e cambiano i dati visualizzati
- Layout: `grid-template-columns: repeat(5, 1fr)`

#### Seconda Riga - Colonne Ordinabili  
- **POS.** | **NOME** | **CITTÀ/REGIONE** | **PUNTEGGIO** | **VAR.**
- Tutte le colonne sono cliccabili per ordinamento
- Stesso layout grid per allineamento perfetto

## Colonne della Tabella

| Colonna | Tipo | Ordinamento | Descrizione | Esempio |
|---------|------|-------------|-------------|---------|
| **Posizione** | `number` | Numerico | Posizione nella classifica (1-16) | `1`, `2`, `3` |
| **Nome Ospedale** | `string` | Alfabetico | Nome completo dell'ospedale | "Policlinico Universitario A. Gemelli" |
| **Città/Regione** | `string` | Alfabetico | Città e regione separate da virgola | "Roma, Lazio" |
| **Punteggio** | `number` | Numerico | Punteggio nella categoria selezionata | `100`, `98`, `95` |
| **Variazione** | `number` | Numerico | Variazione rispetto all'anno precedente | `+3`, `-2`, `0` |

## Funzionalità di Ordinamento

### Comportamento Clic
- **Primo clic**: Ordina in ordine crescente (ASC)
- **Secondo clic**: Ordina in ordine decrescente (DESC)
- **Cambio colonna**: Reset ad ASC per la nuova colonna

### Indicatori Visivi
- Icona **↑** per ordinamento crescente
- Icona **↓** per ordinamento decrescente  
- Icona **≡** per colonne non attive
- Animazioni smooth per transizioni

## CSS Grid Implementation

### Classi CSS Personalizzate

```css
.ranking-table-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
}

.ranking-table-grid > * {
  min-width: 0; /* Allow text to wrap */
  word-wrap: break-word;
}
```

### Vantaggi CSS Grid vs Flexbox
- ✅ **Colonne perfettamente uguali** (20% ciascuna)
- ✅ **Allineamento verticale garantito** tra header e righe
- ✅ **Responsive automatico** senza media queries complesse
- ✅ **Text wrapping controllato** per nomi lunghi
- ✅ **Performance migliore** per tabelle grandi

## Utilizzo delle Utilities

### Generare la classifica per una categoria:

```typescript
import { getOspedaliData } from '@/lib/data-loader';
import { generaClassifica, formatVariazione } from '@/lib/classifica-utils';

const data = getOspedaliData();
const classificaPoliclinici = generaClassifica(data, 'policlinici');

// Esempio di riga della classifica:
const primaRiga = classificaPoliclinici.righe[0];
console.log({
  posizione: primaRiga.posizione, // 1
  nome: primaRiga.ospedale.nome, // "Policlinico Universitario A. Gemelli"
  cittaRegione: primaRiga.cittaRegione, // "Roma, Lazio"
  punteggio: primaRiga.punteggio, // 100
  variazione: formatVariazione(primaRiga.variazione) // "+3"
});
```

### Cambiare categoria:

```typescript
// Le categorie disponibili sono:
// - 'policlinici'
// - 'cardiologia' 
// - 'oncologia'
// - 'ortopedia'

const classificaCardiologia = generaClassifica(data, 'cardiologia');
const classificaOncologia = generaClassifica(data, 'oncologia');
const classificaOrtopedia = generaClassifica(data, 'ortopedia');
```

### Styling delle variazioni:

```typescript
import { getVariazioneColorClass, formatVariazione } from '@/lib/classifica-utils';

const variazione = primaRiga.variazione; // 3
const variazioneText = formatVariazione(variazione); // "+3"
const colorClass = getVariazioneColorClass(variazione); // "text-green-600"

// In un componente React:
<span className={colorClass}>
  {variazioneText}
</span>
```

## Dati Disponibili

### Categorie:
- **Policlinici**: Classifica generale dei policlinici universitari
- **Cardiologia**: Eccellenza in cardiologia e cardiochirurgia  
- **Oncologia**: Centri di eccellenza oncologica
- **Ortopedia**: Eccellenza in ortopedia e traumatologia

### Ospedali (16 totali):
1. Policlinico Universitario A. Gemelli (Roma, Lazio) ✓ *ha pagina dettaglio*
2. IRCCS Ospedale San Raffaele (Milano, Lombardia) ✓ *ha pagina dettaglio*
3. Istituto Clinico Humanitas (Rozzano, Lombardia) ✓ *ha pagina dettaglio*
4. ASST Grande Ospedale Metropolitano Niguarda (Milano, Lombardia)
5. Azienda Ospedaliero-Universitaria Careggi (Firenze, Toscana) ✓ *ha pagina dettaglio*
6. Policlinico Sant'Orsola-Malpighi (Bologna, Emilia-Romagna)
7. AOU Città della Salute - Molinette (Torino, Piemonte)
8. Fondazione IRCCS Ca' Granda Policlinico (Milano, Lombardia)
9. Policlinico Umberto I (Roma, Lazio)
10. Azienda Ospedaliera Universitaria di Verona (Verona, Veneto)
11. ASST Spedali Civili di Brescia (Brescia, Lombardia)
12. IRCCS Ospedale Policlinico San Martino (Genova, Liguria)
13. Azienda Ospedale-Università Padova (Padova, Veneto)
14. Azienda Ospedaliero-Universitaria Pisana (Pisa, Toscana)
15. AOU Federico II (Napoli, Campania)

## Note Implementative

- La colonna **Città/Regione** deve essere formattata come "Città, Regione"
- La colonna **Variazione** deve includere il segno (+/-)
- I colori delle variazioni: verde per positive, rosso per negative, grigio per zero
- Gli ospedali con `hasDetailPage: true` devono essere linkabili
- La tabella deve essere ordinabile per categoria tramite le tab nell'header