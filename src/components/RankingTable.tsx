'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CategoriaId, 
  OspedaliData,
  ClassificaData,
  ColonnaOrdinamento,
  StatoOrdinamento
} from '@/types/hospital';
import { 
  generaClassifica, 
  formatVariazione, 
  getVariazioneColorClass,
  ordinaRigheClassifica,
  getTipoIconaOrdinamento,
  isColonnaAttiva
} from '@/lib/classifica-utils';
import SortIcon from './SortIcon';

interface RankingTableProps {
  data: OspedaliData;
  className?: string;
}

export default function RankingTable({ data, className = '' }: RankingTableProps) {
  const [categoriaAttiva, setCategoriaAttiva] = useState<CategoriaId>('policlinici');
  const [ordinamento, setOrdinamento] = useState<StatoOrdinamento>({
    colonna: 'posizione',
    direzione: 'asc'
  });
  
  const classificaBase = generaClassifica(data, categoriaAttiva);
  const righeOrdinate = ordinaRigheClassifica(
    classificaBase.righe, 
    ordinamento.colonna, 
    ordinamento.direzione
  );
  
  const categoriaAttuale = data.categorie.find(c => c.id === categoriaAttiva);

  const handleOrdinamento = (colonna: ColonnaOrdinamento) => {
    setOrdinamento(prev => ({
      colonna,
      direzione: prev.colonna === colonna && prev.direzione === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Prima riga intestazione - Classifiche per categoria */}
      <div className="bg-blu text-white sticky top-0 h-[50px]">
        <div className="ranking-table-grid h-[50px]">
          <div className="flex items-center px-2 text-sm font-semibold text-center border-r border-blu">
            <strong>2025</strong>/
            CLASSIFICA
          </div>
          
          <div className="col-span-4 grid grid-cols-4 gap-0">
            {/* Tab categorie */}
            {data.categorie.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaAttiva(categoria.id)}
                className={`category-tab  text-m font-semibold transition-colors border-l border-white last:border-r-0 cursor-pointer text-left px-2 ${
                  categoriaAttiva === categoria.id 
                    ? 'text-white' 
                    : 'text-white/30 hover:text-white'
                }`}
              >
                {categoria.nome.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seconda riga intestazione - Colonne ordinabili */}
      <div className="bg-white text-black h-[50px] border-y border-black sticky top-[50px]">
        <div className="ranking-table-grid h-[50px]">
          <button 
            onClick={() => handleOrdinamento('posizione')}
            className="sortable-header px-2 text-sm text-left"
          >
            POSIZIONE 
            <span className="sort-indicator">
              <SortIcon 
                tipo={getTipoIconaOrdinamento('posizione', ordinamento.colonna, ordinamento.direzione)}
                isActive={isColonnaAttiva('posizione', ordinamento.colonna)}
              />
            </span>
          </button>
          
          <button 
            onClick={() => handleOrdinamento('nome')}
            className="sortable-header px-2 text-sm  text-left border-l border-black"
          >
            NOME 
            <span className="sort-indicator">
              <SortIcon 
                tipo={getTipoIconaOrdinamento('nome', ordinamento.colonna, ordinamento.direzione)}
                isActive={isColonnaAttiva('nome', ordinamento.colonna)}
              />
            </span>
          </button>
          
          <button 
            onClick={() => handleOrdinamento('cittaRegione')}
            className="sortable-header px-2 text-sm  text-left border-l border-black"
          >
            CITTÀ/REGIONE 
            <span className="sort-indicator">
              <SortIcon 
                tipo={getTipoIconaOrdinamento('cittaRegione', ordinamento.colonna, ordinamento.direzione)}
                isActive={isColonnaAttiva('cittaRegione', ordinamento.colonna)}
              />
            </span>
          </button>
          
          <button 
            onClick={() => handleOrdinamento('punteggio')}
            className="sortable-header px-2 text-sm  text-left border-l border-black"
          >
            PUNTEGGIO 
            <span className="sort-indicator">
              <SortIcon 
                tipo={getTipoIconaOrdinamento('punteggio', ordinamento.colonna, ordinamento.direzione)}
                isActive={isColonnaAttiva('punteggio', ordinamento.colonna)}
              />
            </span>
          </button>
          
          <button 
            onClick={() => handleOrdinamento('variazione')}
            className="sortable-header px-2 text-sm  text-left border-l border-black"
          >
            VAR. 
            <span className="sort-indicator">
              <SortIcon 
                tipo={getTipoIconaOrdinamento('variazione', ordinamento.colonna, ordinamento.direzione)}
                isActive={isColonnaAttiva('variazione', ordinamento.colonna)}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Corpo della tabella */}
      <motion.div 
        className="bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {righeOrdinate.map((riga, index) => (
            <RigaTabella 
              key={riga.ospedale.id}
              riga={riga}
              isEven={index % 2 === 0}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

interface RigaTabellaProps {
  riga: ClassificaData['righe'][0];
  isEven: boolean;
  index: number;
}

function RigaTabella({ riga, isEven, index }: RigaTabellaProps) {
  const { posizione, ospedale, punteggio, variazione, cittaRegione } = riga;
  const variazioneText = formatVariazione(variazione);

  const contenutoRiga = (
    <>
      {/* Posizione */}
      <div className="px-2 pl-4 text-center text-blu h-full flex items-center">
        ({posizione})
      </div>
      
      {/* Nome ospedale */}
      <div className="px-2 border-l border-black h-full flex items-center">
        <div className={`font-semibold text-sm leading-tight ${
          ospedale.hasDetailPage ? 'text-blu underline' : 'text-black'
        }`}>
          {ospedale.nome}
        </div>
      </div>
      
      {/* Città/Regione */}
      <div className="px-2 font-semibold border-l border-black h-full flex items-center">
        {cittaRegione}
      </div>
      
      {/* Punteggio */}
      <div className="px-2 border-l border-black h-full flex items-center">
        <div className="text-sm font-bold text-black">
          {punteggio}
        </div>
      </div>
      
      {/* Variazione */}
      <div className="px-2 border-l border-black h-full flex items-center">
        <span className="font-semibold flex items-center gap-1">
          {variazione !== 0 && (
            <svg 
              width="10" 
              height="6" 
              viewBox="0 0 10 6" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={variazione > 0 ? 'rotate-180' : ''}
            >
              <path d="M5 5.33334L0 0.333336H10L5 5.33334Z" fill="black"/>
            </svg>
          )}
          {variazioneText}
        </span>
      </div>
    </>
  );

  const rowClasses = `ranking-table-grid h-7 items-center border-b border-black   table-row-hover ${
    isEven ? 'bg-gray-25' : 'bg-white'
  }`;

  const rowVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  // Se l'ospedale ha una pagina di dettaglio, rendi la riga cliccabile
  if (ospedale.hasDetailPage) {
    return (
      <motion.div
        variants={rowVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Link 
          href={`/ospedale/${ospedale.id}`}
          className={`${rowClasses} cursor-pointer relative overflow-hidden hover-slide-bg`}
        >
          {contenutoRiga}
        </Link>
      </motion.div>
    );
  }

  // Altrimenti, solo una div normale
  return (
    <motion.div 
      className={rowClasses}
      variants={rowVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      style={{ position: 'relative', zIndex: 1 }}
    >
      {contenutoRiga}
    </motion.div>
  );
}