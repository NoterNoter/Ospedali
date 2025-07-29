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
          <h2 className="text-[20px] font-semibold mb-1 leading-tight">
            {data.titolo}
          </h2>
          <p className="text-sm text-gray-700">
            {data.descrizione}
          </p>
        </div>

        {/* lista valori */}
        {data.valori && data.valori.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold mb-2 text-black leading-tight">
              {data.titolo_classifica}
            </h3>
            {data.valori.map((row) => (
              <div key={row.id} className="space-y-2">
                {row.valore && row.valore.map((ospedale) => (
                  <div key={ospedale.id} className="flex flex-col items-start gap-2 text-xs">
                    <div className="  text-[12px] uppercase tracking-wide border-y border-black py-1 w-full">
                     <strong>{ospedale.numero}.{ospedale.regione}</strong>
                     /{ospedale.città}
                    </div>
                    <div className="flex-1">               
                      <div className="font-semibold text-black text-xs leading-tight">
                        {ospedale.titolo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

      </div>
      <div className="col-span-4 col-start-2">
          <FlourishEmbed 
            embedUrl={data.flourish}
          />
        
      </div>
    </section>
  )
}
