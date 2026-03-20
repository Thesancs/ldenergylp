"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const certifications = [
  {
    label: "ISO 9001",
    title: "Qualidade",
    description: "Excelência operacional e atendimento ao cliente.",
  },
  {
    label: "ISO 14001",
    title: "Gestão Ambiental",
    description:
      "Sistema de gestão ambiental responsável — minimizando impactos em toda a cadeia.",
  },
  {
    label: "ISO 45001",
    title: "Saúde e Segurança",
    description:
      "Proteção dos colaboradores e parceiros em todos os ambientes de operação.",
  },
];

const pillars = [
  {
    letter: "E",
    title: "Ambiental",
    description:
      "Alinhados aos padrões globais de sustentabilidade, reduzimos o impacto ambiental em toda a cadeia produtiva — da extração à entrega final.",
    accent: false,
  },
  {
    letter: "S",
    title: "Social",
    description:
      "Investimos no desenvolvimento humano e em iniciativas que capacitam colaboradores e geram impacto positivo nas comunidades onde operamos.",
    accent: false,
  },
  {
    letter: "G",
    title: "Governança",
    description:
      "Operamos com integridade, transparência total e tomada de decisão ética em todos os níveis da organização.",
    accent: false,
  },
  {
    letter: "✦",
    title: "Inovação Sustentável",
    description:
      "Pioneiros em soluções energéticas mais limpas, alinhadas às demandas de um mundo que não pode mais esperar.",
    accent: true,
  },
];

// Helper for Background Particles
const GoldenParticles = () => {
  const particlesData = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particlesData.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}vw`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: "var(--color-gold)",
            filter: "blur(1px)",
          }}
          initial={{ top: "-5%" }}
          animate={{ top: "105%" }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Component for each Pillar Card in the timeline
const PillarCard = ({ data, index }: { data: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -40% 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="pillar-card-wrapper relative w-full flex justify-center items-center py-20 md:py-24">
      {/* Universal Layout (Staggered) */}
      <div className={`flex w-full ${isLeft ? 'justify-start md:justify-end pr-4 md:pr-24 pl-0 md:pl-0' : 'justify-end md:justify-start pl-4 md:pl-24 pr-0 md:pr-0'}`}>
        <motion.div
          animate={{
            borderColor: isInView ? "rgba(201, 168, 76, 0.8)" : "rgba(255, 255, 255, 0.05)",
            boxShadow: isInView
              ? "0 0 40px rgba(201, 168, 76, 0.2), inset 0 0 20px rgba(201, 168, 76, 0.05)"
              : "0 0 0px rgba(201, 168, 76, 0)",
            scale: isInView ? 1.02 : 0.98,
            opacity: isInView ? 1 : 0.4,
            y: isInView ? 0 : 30,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "min(480px, 85vw)", // Decreased from 100% to 85vw on mobile
            padding: "min(40px, 8vw)",
            border: "1px solid",
            backgroundColor: data.accent ? "rgba(201, 168, 76, 0.05)" : "rgba(10, 12, 11, 0.8)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ opacity: isInView ? 1 : 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(201, 168, 76, 0.08) 0%, transparent 100%)",
            }}
          />

          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: "min(20px, 4vw)",
              marginBottom: "20px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 4vw, 1.25rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: isInView ? "var(--color-cream)" : "rgba(245, 240, 232, 0.4)",
              transition: "color 0.4s ease",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(35px, 10vw, 50px)",
                height: "clamp(35px, 10vw, 50px)",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                backgroundColor: "rgba(201, 168, 76, 0.1)",
                color: "var(--color-gold)",
                fontSize: data.letter === "✦" ? "0.8rem" : "clamp(1.1rem, 4vw, 1.5rem)",
                fontFamily: data.letter === "✦" ? "sans-serif" : "var(--font-display)",
                flexShrink: 0
              }}
            >
              {data.letter}
            </span>
            {data.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.85rem, 3.5vw, 0.95rem)",
              lineHeight: 1.8,
              color: isInView ? "rgba(245, 240, 232, 0.7)" : "rgba(245, 240, 232, 0.3)",
              fontWeight: 300,
              transition: "color 0.4s ease",
            }}
          >
            {data.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default function ESG() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pillarsContainerRef = useRef<HTMLDivElement>(null);

  // ISO Certifications Scroll Animation Logic
  const { scrollYProgress: isoScrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pillars Timeline Scroll Logic
  const { scrollYProgress: pillarScrollY } = useScroll({
    target: pillarsContainerRef,
    offset: ["start center", "end center"],
  });

  // Sequential revealing: Badge first, then Text for ISOs
  const card1BadgeOpacity = useTransform(isoScrollY, [0.0, 0.08], [0, 1], { clamp: true });
  const card1RotateX = useTransform(isoScrollY, [0.0, 0.08], [40, 0], { clamp: true });
  const card1Y = useTransform(isoScrollY, [0.0, 0.08], [20, 0], { clamp: true });
  const card1TextOpacity = useTransform(isoScrollY, [0.1, 0.2], [0, 1], { clamp: true });

  const card2BadgeOpacity = useTransform(isoScrollY, [0.3, 0.38], [0, 1], { clamp: true });
  const card2RotateX = useTransform(isoScrollY, [0.3, 0.38], [40, 0], { clamp: true });
  const card2Y = useTransform(isoScrollY, [0.3, 0.38], [20, 0], { clamp: true });
  const card2TextOpacity = useTransform(isoScrollY, [0.4, 0.5], [0, 1], { clamp: true });

  const card3BadgeOpacity = useTransform(isoScrollY, [0.6, 0.68], [0, 1], { clamp: true });
  const card3RotateX = useTransform(isoScrollY, [0.6, 0.68], [40, 0], { clamp: true });
  const card3Y = useTransform(isoScrollY, [0.6, 0.68], [20, 0], { clamp: true });
  const card3TextOpacity = useTransform(isoScrollY, [0.7, 0.8], [0, 1], { clamp: true });

  const cardAnims = [
    { badgeOpacity: card1BadgeOpacity, textOpacity: card1TextOpacity, rotateX: card1RotateX, y: card1Y },
    { badgeOpacity: card2BadgeOpacity, textOpacity: card2TextOpacity, rotateX: card2RotateX, y: card2Y },
    { badgeOpacity: card3BadgeOpacity, textOpacity: card3TextOpacity, rotateX: card3RotateX, y: card3Y },
  ];

  return (
    <section
      id="esg"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--color-dark)",
        position: "relative",
        overflow: "visible",
      }}
    >
      <GoldenParticles />

      {/* Part 1: ISO Certifications (Sticky Scroll) */}
      <div
        ref={containerRef}
        className="iso-scroll-container h-[300vh] relative z-[5]"
      >
        <div
          className="iso-sticky-wrapper flex items-center sticky top-0 h-[100vh] overflow-hidden"
        >
          {/* Large decorative "ESG" background */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute bottom-[-8%] right-[-2%] font-display text-[clamp(160px,22vw,300px)] font-bold text-[rgba(201,168,76,0.03)] leading-none select-none tracking-[-0.04em] pointer-events-none"
          >
            ESG
          </div>

          <div className="container-site z-10 w-full">
            <div className="esg-header grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-[clamp(48px,8vw,100px)] items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="section-tag mb-4 md:mb-6">
                    <span className="text-eyebrow">Responsabilidade</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="mb-6 md:mb-8"
                >
                  <h2 className="text-display-md text-[var(--color-cream)]">
                    Compromisso{" "}
                    <em className="gold-italic">ESG.</em>
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p
                    className="esg-intro-text font-body font-light text-[rgba(245,240,232,0.55)] max-w-[500px]"
                    style={{ lineHeight: 1.8 }}
                  >
                    Integramos práticas ambientais, sociais e de governança
                    em todas as operações.
                    <br />
                    <br />
                    Da comercialização de óleos combustíveis ao desenvolvimento
                    de combustíveis alternativos e sólidos — cada decisão da
                    LD Energy considera seu impacto no planeta, nas pessoas
                    e no futuro.
                  </p>
                </motion.div>
              </div>

              <div
                className="flex flex-col perspective-[1200px]"
              >
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    style={{
                      rotateX: cardAnims[i].rotateX,
                      y: cardAnims[i].y,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    className="iso-card flex items-start border-b border-[rgba(255,255,255,0.15)]"
                  >
                    <motion.div
                      style={{
                        opacity: cardAnims[i].badgeOpacity,
                      }}
                      className="iso-badge flex items-center justify-center border border-[rgba(201,168,76,0.65)] bg-[rgba(201,168,76,0.12)] shrink-0"
                    >
                      <span className="font-body font-bold text-white tracking-widest uppercase">
                        {cert.label}
                      </span>
                    </motion.div>

                    <motion.div style={{ opacity: cardAnims[i].textOpacity }}>
                      <h4 className="iso-title font-display font-semibold text-white tracking-wide">
                        {cert.title}
                      </h4>
                      <p className="iso-desc font-body font-light text-white">
                        {cert.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Pillars Timeline (New Animation) */}
      <div
        ref={pillarsContainerRef}
        style={{
          position: "relative",
          zIndex: 1,
          paddingBottom: "clamp(100px, 15vw, 200px)",
          paddingTop: "60px"
        }}
      >
        <div className="container-site">
          <div style={{ marginBottom: "60px", display: "flex", justifyContent: "center" }}>
            <span className="text-eyebrow">Pilares ESG</span>
          </div>

          <div className="relative">
            {/* Background Faint Line - Centered */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "0",
                bottom: "0",
                width: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transform: "translateX(-50%)",
              }}
            />

            {/* Animated Golden Line - Centered */}
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: "0",
                bottom: "0",
                width: "2px",
                background: "linear-gradient(to bottom, var(--color-gold), #F9E596, var(--color-gold))",
                boxShadow: "0 0 15px rgba(201, 168, 76, 0.5)",
                transformOrigin: "top",
                scaleY: pillarScrollY,
                zIndex: 10,
                transform: "translateX(-50%)",
              }}
            />

            {/* Cards Container */}
            <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column" }}>
              {pillars.map((pillar, index) => (
                <PillarCard key={index} data={pillar} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .iso-scroll-container {
            height: auto !important;
          }
          .iso-sticky-wrapper {
            position: relative !important;
            height: auto !important;
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }
          .esg-header { 
            grid-template-columns: 1fr !important; 
            gap: 2rem !important; 
          }
          .iso-card {
            padding: 1.2rem 0 !important;
            transform: none !important;
            will-change: auto !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
          .iso-card > div {
            opacity: 1 !important;
          }
          .iso-badge {
            min-width: 65px !important;
            padding: 8px 10px !important;
          }
          .iso-badge span {
            font-size: 0.6rem !important;
          }
          .iso-title {
            font-size: 1.1rem !important;
            margin-bottom: 4px !important;
          }
          .iso-desc {
            font-size: 0.85rem !important;
            line-height: 1.4 !important;
          }
          .esg-intro-text {
            display: block !important;
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1rem !important;
          }
          .esg-header h2 {
            font-size: 2rem !important;
            margin-bottom: 8px !important;
          }
          .section-tag {
            margin-bottom: 12px !important;
          }
          .pillar-card-wrapper {
            padding-top: 140px !important;
            padding-bottom: 140px !important;
          }
        }
      `}</style>
    </section>
  );
}

