"use client";

import { useEffect, useRef } from "react";

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
    title: "Inovação e Excelência",
    description:
      "Buscamos constantemente inovações tecnológicas para oferecer soluções energéticas de alta qualidade, com certificação ISO 9001 e foco permanente em eficiência operacional.",
  },
];

export default function Valores() {
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
              }, i * 120);
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
      style={{
        padding: "clamp(80px, 12vw, 160px) 0",
        backgroundColor: "var(--color-dark)",
        position: "relative",
        overflow: "hidden",
      }}
      ref={sectionRef}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          opacity: 0.2,
        }}
      />

      <div className="container-site">
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "clamp(48px, 8vw, 80px)",
            alignItems: "end",
          }}
          className="valores-header"
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
                <span className="text-eyebrow">Essência do Group LD</span>
              </div>
            </div>
            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <h2 className="text-display-md" style={{ color: "var(--color-cream)" }}>
                Princípios que nos{" "}
                <em className="gold-italic">definem.</em>
              </h2>
            </div>
          </div>

          <div
            data-reveal
            style={{
              opacity: 0,
              transform: "translateY(16px)",
              transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(201, 168, 76, 0.15)",
              }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(201, 168, 76, 0.1)",
          }}
          className="valores-grid"
        >
          {values.map((v, i) => (
            <div
              key={i}
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1)`,
                position: "relative",
                backgroundColor: "var(--color-dark)",
                padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
                overflow: "hidden",
              }}
              className="valor-card"
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.backgroundColor = "var(--color-dark-surface)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.backgroundColor = "var(--color-dark)";
              }}
            >
              {/* Number decorative bg */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  fontFamily: "var(--font-display)",
                  fontSize: "7rem",
                  fontWeight: 700,
                  color: "rgba(201, 168, 76, 0.07)",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                  transition: "color 0.3s ease",
                }}
              >
                {v.number}
              </div>

              {/* Gold number */}
              <p
                className="text-eyebrow"
                style={{ marginBottom: "24px", color: "var(--color-gold)" }}
              >
                {v.number}
              </p>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "var(--color-cream)",
                  lineHeight: 1.2,
                  marginBottom: "20px",
                  letterSpacing: "-0.01em",
                }}
              >
                {v.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(245, 240, 232, 0.55)",
                  fontWeight: 300,
                }}
              >
                {v.description}
              </p>

              {/* Bottom gold line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "2px",
                  width: "36px",
                  backgroundColor: "var(--color-gold)",
                  transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
                className="card-line"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .valores-grid .valor-card:hover .card-line { width: 72px !important; }
        @media (max-width: 900px) {
          .valores-grid { grid-template-columns: 1fr !important; }
          .valores-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
