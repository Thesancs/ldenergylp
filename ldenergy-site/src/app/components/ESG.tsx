"use client";

import { useEffect, useRef } from "react";

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

export default function ESG() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-reveal]").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 90);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="esg"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) 0",
        backgroundColor: "var(--color-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large decorative "ESG" background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-8%",
          right: "-2%",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(160px, 22vw, 300px)",
          fontWeight: 700,
          color: "rgba(201, 168, 76, 0.03)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.04em",
        }}
      >
        ESG
      </div>

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(48px, 8vw, 100px)",
            marginBottom: "clamp(60px, 10vw, 100px)",
            alignItems: "start",
          }}
          className="esg-header"
        >
          <div>
            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="section-tag">
                <span className="text-eyebrow">Responsabilidade</span>
              </div>
            </div>
            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                marginBottom: "32px",
              }}
            >
              <h2 className="text-display-md" style={{ color: "var(--color-cream)" }}>
                Compromisso{" "}
                <em className="gold-italic">ESG.</em>
              </h2>
            </div>
            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.975rem",
                  lineHeight: 1.8,
                  color: "rgba(245, 240, 232, 0.55)",
                  fontWeight: 300,
                }}
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
            </div>
          </div>

          {/* Certifications */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {certifications.map((cert, i) => (
              <div
                key={i}
                data-reveal
                style={{
                  opacity: 0,
                  transform: "translateY(16px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1)`,
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                }}
              >
                {/* ISO badge */}
                <div
                  style={{
                    minWidth: "80px",
                    padding: "8px 12px",
                    border: "1px solid rgba(201, 168, 76, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: "var(--color-gold)",
                    }}
                  >
                    {cert.label}
                  </span>
                </div>

                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      color: "var(--color-cream)",
                      marginBottom: "6px",
                    }}
                  >
                    {cert.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                      color: "rgba(245, 240, 232, 0.45)",
                      fontWeight: 300,
                    }}
                  >
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESG Pillars — 2x2 grid */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "24px",
          }}
        >
          <span className="text-eyebrow">Pilares ESG</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(201, 168, 76, 0.1)",
          }}
          className="esg-pillars"
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1)`,
                backgroundColor: pillar.accent
                  ? "var(--color-dark-surface)"
                  : "var(--color-dark)",
                padding: "clamp(28px, 4vw, 48px)",
                position: "relative",
                overflow: "hidden",
                border: pillar.accent
                  ? "1px solid rgba(201, 168, 76, 0.2)"
                  : "none",
              }}
            >
              {/* Letter */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  border: "1px solid rgba(201, 168, 76, 0.3)",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: pillar.letter === "✦" ? "sans-serif" : "var(--font-display)",
                    fontSize: pillar.letter === "✦" ? "1rem" : "1.2rem",
                    fontWeight: 500,
                    color: "var(--color-gold)",
                  }}
                >
                  {pillar.letter}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "var(--color-cream)",
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {pillar.title}
              </h4>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(245, 240, 232, 0.5)",
                  fontWeight: 300,
                }}
              >
                {pillar.description}
              </p>

              {/* Bottom line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "2px",
                  width: "36px",
                  backgroundColor: pillar.accent ? "var(--color-gold)" : "rgba(201, 168, 76, 0.3)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .esg-header { grid-template-columns: 1fr !important; }
          .esg-pillars { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
