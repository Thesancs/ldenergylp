"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

const values = [
  {
    number: "01",
    title: "Ética e Governança Transparente",
    description:
      "Operamos com integridade em todos os níveis, assegurando uma governança sólida, decisões éticas e total transparência com nossos stakeholders.",
  },
  {
    number: "02",
    title: "Sustentabilidade Ambiental",
    description:
      "Adotamos práticas que minimizem impactos ambientais, alinhadas aos padrões globais como ISO 14001, e aos princípios ESG — contribuindo para um futuro mais limpo e sustentável.",
  },
  {
    number: "03",
    title: "Inovação e Excelencia",
    description:
      "Buscamos constantemente inovações tecnológicas para oferecer soluções energéticas de alta qualidade, com certificação ISO 9001 e foco permanente em eficiência operacional.",
  },
];

export default function Valores() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- CONTINUOUS SYNCED MAPPINGS ---
  // Key scroll points for smooth transitions
  const p = [0, 0.1, 0.25, 0.45, 0.65, 0.85, 1.0];

  // Card 1: Focus starts early
  const f1 = useTransform(smoothProgress, p, [1, 1, 3.5, 0.5, 0.4, 1, 1]);
  const g1 = useTransform(smoothProgress, [0.05, 0.25, 0.45], [0.05, 0.4, 0.05]);
  const s1 = useTransform(smoothProgress, [0.05, 0.25, 0.45], ["1.4rem", "2.2rem", "1.3rem"]);
  const d1 = useTransform(smoothProgress, [0.1, 0.25, 0.45], [0, 1, 0]);

  // Card 2: Focus in the middle
  const f2 = useTransform(smoothProgress, p, [1, 1, 0.5, 3.5, 0.5, 1, 1]);
  const g2 = useTransform(smoothProgress, [0.3, 0.5, 0.7], [0.05, 0.4, 0.05]);
  const s2 = useTransform(smoothProgress, [0.3, 0.5, 0.7], ["1.4rem", "2.2rem", "1.3rem"]);
  const d2 = useTransform(smoothProgress, [0.35, 0.5, 0.7], [0, 1, 0]);

  // Card 3: Focus at the end
  const f3 = useTransform(smoothProgress, p, [1, 1, 0.4, 0.5, 3.5, 1, 1]);
  const g3 = useTransform(smoothProgress, [0.55, 0.75, 0.95], [0.05, 0.4, 0.1]);
  const s3 = useTransform(smoothProgress, [0.55, 0.75, 0.95], ["1.4rem", "2.2rem", "1.4rem"]);
  const d3 = useTransform(smoothProgress, [0.6, 0.75, 0.95], [0, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="valores"
      className="relative bg-dark selection:bg-gold selection:text-dark"
      style={{ height: "450vh" }}
    >
      {/* Sticky Frame */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent z-10" />

        <div className="container-site z-20">
          {/* Section Header */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.0, 0.1, 0.2], [1, 0.6, 0.4]),
              y: useTransform(smoothProgress, [0.0, 0.1], [0, -20]),
            }}
            className="mb-12 md:mb-16"
          >
            <div className="section-tag mb-4">
              <span className="text-eyebrow text-gold uppercase tracking-[0.2em]">Essência do LD Group</span>
            </div>
            <h2 className="text-display-md text-cream leading-tight">
              Princípios que nos <em className="gold-italic">definem.</em>
            </h2>
          </motion.div>

          {/* Liquid Grid Layout */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch h-[75vh] md:h-[60vh]">
            <ValueCard v={values[0]} f={f1} g={g1} s={s1} d={d1} />
            <ValueCard v={values[1]} f={f2} g={g2} s={s2} d={d2} />
            <ValueCard v={values[2]} f={f3} g={g3} s={s3} d={d3} />
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0.85, 0.95], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-gold/40 tracking-[0.3em] uppercase">Role para continuar</span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

interface CardProps {
  v: any;
  f: MotionValue<number>;
  g: MotionValue<number>;
  s: MotionValue<string>;
  d: MotionValue<number>;
}

function ValueCard({ v, f, g, s, d }: CardProps) {
  const bg = useTransform(g, [0.05, 0.4], ["rgba(8, 14, 14, 1)", "rgba(13, 32, 32, 1)"]);
  const border = useTransform(g, [0.05, 0.4], ["rgba(255,255,255,0.05)", "rgba(201, 168, 76, 0.3)"]);

  return (
    <motion.div
      style={{ flex: f, backgroundColor: bg, borderColor: border }}
      className="relative p-8 md:p-12 border overflow-hidden rounded-2xl flex flex-col justify-center backdrop-blur-sm shadow-2xl will-change-[flex,background-color]"
    >
      {/* Background large number */}
      <motion.div
        style={{
          opacity: g,
          scale: useTransform(g, [0.05, 0.4], [1, 1.4]),
          color: useTransform(g, [0.05, 0.4], ["rgba(255,255,255,0.1)", "rgba(201, 168, 76, 1)"]),
          y: useTransform(g, [0.05, 0.4], [0, -20])
        }}
        className="absolute top-8 right-8 font-display text-[9rem] font-bold leading-none pointer-events-none select-none transition-colors duration-300 hidden md:block"
        aria-hidden="true"
      >
        {v.number}
      </motion.div>

      <div className="relative z-10 w-full overflow-hidden">
        <motion.p
          style={{ opacity: useTransform(g, [0.05, 0.4], [0.4, 1]) }}
          className="text-eyebrow text-gold mb-6 tracking-[0.2em] hidden md:block"
        >
          {v.number}
        </motion.p>

        <motion.h3
          style={{ fontSize: s, color: useTransform(g, [0.05, 0.4], ["rgba(245, 240, 232, 0.6)", "#FFFFFF"]) }}
          className="font-display font-light leading-tight mb-8 tracking-tight transition-all duration-150"
        >
          {v.title}
        </motion.h3>

        <motion.div
          style={{
            opacity: d,
            y: useTransform(d, [0, 1], [15, 0]),
            display: useTransform(d, d => d < 0.01 ? "none" : "block")
          }}
          className="overflow-hidden"
        >
          <p className="font-body text-sm md:text-base leading-relaxed text-muted font-light text-balance">
            {v.description}
          </p>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        style={{
          width: useTransform(g, [0.05, 0.4], ["36px", "100%"]),
          backgroundColor: useTransform(g, [0.05, 0.4], ["rgba(201,168,76,0.3)", "var(--color-gold)"])
        }}
        className="absolute bottom-0 left-0 h-[2px]"
      />
    </motion.div>
  );
}
