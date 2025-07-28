import React from 'react'
import { InfograficaData } from '@/types/hospital'
import FlourishEmbed from '@/components/FlourishEmbed'

interface SectionFlourishProps {
  data: InfograficaData;
}

export default function SectionFlourish({ data }: SectionFlourishProps) {
  return (
    <section className="border-y border-black grid grid-cols-5">
      <div className="border-r border-black pl-4 pr-2 py-3 flex flex-col justify-between">
        <div className="">
          <h2 className="text-[20px] font-semibold mb-1">
            {data.titolo}
          </h2>
          <p className="text-sm text-gray-700">
            {data.descrizione}
          </p>
        </div>

        {/* lista valori */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold mb-3 text-gray-900">
            {data.titolo_classifica}
          </h3>
          {data.valori.map((row) => (
            <div key={row.id} className="space-y-2">
              {row.valore.map((ospedale) => (
                <div key={ospedale.id} className="flex items-start gap-2 text-xs">
                  <span className="font-bold text-black w-4">
                    {ospedale.numero}.
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-600 text-[10px] uppercase tracking-wide">
                      {ospedale.regione}/{ospedale.città}
                    </div>
                    <div className="font-medium text-black text-xs leading-tight">
                      {ospedale.titolo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
      <div className="col-span-4 col-start-2">
          <FlourishEmbed 
            embedUrl={data.flourish}
          />
        
      </div>
    </section>
  )
}
