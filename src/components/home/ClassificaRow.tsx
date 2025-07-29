"use client";

import React from 'react'
import { motion } from 'framer-motion'
import CardClassifica from './CardClassifica'

interface ClassificaRowProps {
  titolo_up: string;
  titolo_down: string;
  descrizione: string;
  rows: {
    id: string;
    cards: {
      numero: string;
      id: string;
      titolo: string;
      valore: string;
      location: string;
      link: string;
    }[];
  }[];
}

export default function ClassificaRow({ titolo_up, titolo_down, descrizione, rows }: ClassificaRowProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className='grid grid-cols-5 border-t border-black border-b overflow-hidden'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mb-8 pl-4 py-2 flex flex-col justify-between h-full border-r border-black">
        <div className="text-sm">
        <span className="font-semibold">{titolo_up}</span>
        <span className="font-normal block">{titolo_down}</span>
        </div>
       
        <p className="text-black text-base leading-tight">{descrizione}</p>
      </div>
        {rows[0]?.cards.map((card, index) => (
          <motion.div
            key={card.id}
            variants={cardVariants as any}
          >
            <CardClassifica card={card} />
          </motion.div>
        ))}
    </motion.div>
  )
}
