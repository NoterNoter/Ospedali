'use client';

import { useState } from 'react';
import Link from 'next/link';
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
      <div className="bg-blue-900 text-white">
        <div className="flex">
          <div className="w-16 px-4 py-2 text-xs font-semibold text-center border-r border-blue-700">
            CLASSIFICA
          </div>
          <div className="flex-1 px-4 py-2 text-xs font-semibold border-r border-blue-700">
            {/* Spazio per allineamento */}
          </div>
          <div className="w-48 px-4 py-2 text-xs font-semibold border-r border-blue-700">
            {/* Spazio per allineamento */}
          </div>
          
          {/* Tab categorie */}
          {data.categorie.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaAttiva(categoria.id)}
              className={`category-tab w-32 px-4 py-2 text-xs font-semibold transition-colors border-r border-blue-700 last:border-r-0 ${
                categoriaAttiva === categoria.id 
                  ? 'bg-blue-700 text-white' 
                  : 'bg-blue-800 text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              {categoria.nome.toUpperCase()}
            </button>
          ))}
          
          <div className="w-20 px-4 py-2 text-xs font-semibold text-center">
            {/* Spazio per allineamento */}
          </div>
        </div>
      </div>

      {/* Seconda riga intestazione - Colonne ordinabili */}
      <div className="bg-blue-800 text-white">
        <div className="flex">
          <button 
            onClick={() => handleOrdinamento('posizione')}
            className="sortable-header w-16 px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors border-r border-blue-600 text-center"
          >
            POS. 
            <span className="sort-indicator">
              <SortIcon 
                tipo={getTipoIconaOrdinamento('posizione', ordinamento.colonna, ordinamento.direzione)}
                isActive={isColonnaAttiva('posizione', ordinamento.colonna)}
              />
            </span>
          </button>
          
          <button 
            onClick={() => handleOrdinamento('nome')}
            className="sortable-header flex-1 px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors border-r border-blue-600 text-left"
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
            className="sortable-header w-48 px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors border-r border-blue-600 text-left"
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
            className="sortable-header w-32 px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors border-r border-blue-600 text-center"
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
            className="sortable-header w-20 px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors text-center"
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
      <div className="bg-white">
        {righeOrdinate.map((riga, index) => (
          <RigaTabella 
            key={riga.ospedale.id}
            riga={riga}
            isEven={index % 2 === 0}
          />
        ))}
      </div>

      {/* Footer con descrizione categoria */}
      {categoriaAttuale && (
        <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600 border-t">
          <strong>{categoriaAttuale.nome}:</strong> {categoriaAttuale.descrizione}
        </div>
      )}
    </div>
  );
}

interface RigaTabellaProps {
  riga: ClassificaData['righe'][0];
  isEven: boolean;
}

function RigaTabella({ riga, isEven }: RigaTabellaProps) {
  const { posizione, ospedale, punteggio, variazione, cittaRegione } = riga;
  const variazioneText = formatVariazione(variazione);
  const variazioneColorClass = getVariazioneColorClass(variazione);

  const contenutoRiga = (
    <>
      {/* Posizione */}
      <div className="w-16 px-4 py-4 text-center font-bold text-blue-900">
        ({posizione})
      </div>
      
      {/* Nome ospedale */}
      <div className="flex-1 px-4 py-4">
        <div className="font-semibold text-gray-900 text-sm leading-tight">
          {ospedale.nome}
        </div>
      </div>
      
      {/* Città/Regione */}
      <div className="w-48 px-4 py-4 text-sm text-gray-600">
        {cittaRegione}
      </div>
      
      {/* Punteggio */}
      <div className="w-32 px-4 py-4 text-center">
        <div className="text-2xl font-bold text-blue-900">
          {punteggio}
        </div>
      </div>
      
      {/* Variazione */}
      <div className="w-20 px-4 py-4 text-center">
        <span className={`font-semibold ${variazioneColorClass}`}>
          {variazioneText}
        </span>
      </div>
    </>
  );

  const rowClasses = `flex items-center border-b border-gray-200 table-row-hover ${
    isEven ? 'bg-gray-25' : 'bg-white'
  }`;

  // Se l'ospedale ha una pagina di dettaglio, rendi la riga cliccabile
  if (ospedale.hasDetailPage) {
    return (
      <Link 
        href={`/ospedale/${ospedale.id}`}
        className={`${rowClasses} hover:bg-blue-50 cursor-pointer`}
      >
        {contenutoRiga}
      </Link>
    );
  }

  // Altrimenti, solo una div normale
  return (
    <div className={rowClasses}>
      {contenutoRiga}
    </div>
  );
}