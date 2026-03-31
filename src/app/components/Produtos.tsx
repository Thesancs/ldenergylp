"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: "01",
    name: "Óleo Combustível B1",
    tag: "· Alto Desempenho ·",
    description: "Derivados de alto desempenho para indústrias, plantas energéticas e frotas de grande porte. Fornecimento com regularidade, eficiencia logística e suporte técnico especializado.",
    image: "/products/Petroleob.webp",
  },
  {
    id: "02",
    name: "Óleo Combustível BTE+",
    tag: "· Alto Poder Calorífico ·",
    description: "Combustível de alto poder calorífico, baixo teor de enxofre e com excelente fluidez. Dispensa aquecimento, reduz manutenção e emite menos particulados.",
    image: "/products/apf 1.webp",
  },
  {
    id: "03",
    name: "Óleo Combustível APFX",
    tag: "· Premium Térmico ·",
    description: "Combustível líquido premium para queima em temperatura ambiente. Formado por hidrocarbonetos pesados, entrega alto desempenho térmico com PCS elevado.",
    image: "/products/apfx.webp",
  },
];

export default function Produtos() {
  return (
    <section
      id="produtos"
      className="bg-dark-2 relative font-sans mt-0 pt-64 pb-48 md:pt-[450px] md:pb-96 selection:bg-gold selection:text-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold/5 z-10 pointer-events-none" />

      {/* 🛡️ CONTAINER DE CAPA DURA (STYLE INLINE PARA GARANTIR RESPIRO) */}
      <div
        className="container-site relative z-20"
        style={{ paddingLeft: '8%', paddingRight: '8%' }}
      >

        {/* Intro Texts */}
        <div className="mb-40 md:mb-64">
          <div className="section-tag mb-12">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-medium text-gold">Portfólio Energético</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-white mb-6 md:mb-10 font-medium leading-[0.95] tracking-tight">
            Fontes de Energia para um <br />
            <em className="gold-italic pr-4">Futuro Sustentável.</em>
          </h2>
          <p className="font-body text-sm md:text-lg font-normal text-white/80 max-w-lg text-balance leading-relaxed">
            Desde fontes tradicionais até soluções renováveis, fornecemos alternativas estratégicas que combinam eficiência, custo-benefício e menor impacto ambiental.
          </p>
        </div>

        {/* Grid de Produtos - GAP REFORÇADO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-40 md:mb-64">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              className="relative overflow-hidden rounded-[24px] bg-[#0A0A0A] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col border border-white/5 min-h-[520px] md:min-h-[580px]"
            >
              {/* Top Image Area */}
              <div className="relative h-[200px] md:h-[260px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover pointer-events-none opacity-80"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>

              {/* Bottom Content Area - Centered alignment */}
              <div className="p-8 md:p-10 md:pb-16 flex flex-col flex-grow items-center text-center justify-start bg-[#0A0A0A]">
                {/* Tag */}
                <div className="inline-block border border-gold/30 bg-dark/50 px-3 py-1 rounded-sm mb-8 self-center whitespace-nowrap">
                  <span className="text-[10px] uppercase font-bold text-gold tracking-[0.2em] leading-none">
                    {product.tag}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-display text-2xl md:text-3xl text-white font-medium mb-5 tracking-tight leading-[1.1] uppercase">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="font-body text-sm md:text-base font-light text-white/80 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Headline Transposta da Hero */}
        <div className="mt-64 md:mt-[500px] pt-48 md:pt-64 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center gap-10 md:gap-14"
          >
            <h2 className="font-display font-medium text-cream text-4xl md:text-7xl leading-[1.1] tracking-tighter uppercase max-w-4xl">
              Energia que <br />
              <span className="text-gold italic">Impulsiona</span> o Futuro
            </h2>

            <div className="flex flex-col items-center gap-8 max-w-xl mx-auto">
              <p className="text-cream/40 font-body text-base md:text-xl tracking-wide leading-relaxed">
                Soluções inteligentes em óleos combustíveis com foco em eficiência energética e sustentabilidade global.
              </p>
              <div className="h-[2px] w-20 bg-gold/40" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
