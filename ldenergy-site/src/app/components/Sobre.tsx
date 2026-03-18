"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Sobre() {
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
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) 0",
        backgroundColor: "var(--color-dark-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative number */}
      <div
        style={{
          position: "absolute",
          right: "-2%",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(200px, 30vw, 380px)",
          fontWeight: 700,
          color: "rgba(201, 168, 76, 0.03)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        20
      </div>

      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(48px, 8vw, 120px)",
            alignItems: "start",
          }}
          className="sobre-grid"
        >
          {/* Left Column */}
          <div>
            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="section-tag">
                <span className="text-eyebrow">Quem Somos</span>
              </div>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                marginBottom: "40px",
              }}
            >
              <h2 className="text-display-md" style={{ color: "var(--color-cream)" }}>
                Uma empresa que respeita sua{" "}
                <em className="gold-italic">origem</em>
                <br />e aponta para o futuro.
              </h2>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.975rem",
                  lineHeight: 1.8,
                  color: "rgba(245, 240, 232, 0.65)",
                  fontWeight: 300,
                }}
              >
                A LD Energy não é apenas uma fornecedora de energia —
                é uma das empresas que move o Brasil.
                <br />
                <br />
                Com 20 anos de mercado e um portfólio que vai do petróleo bruto
                à biomassa, a marca carrega autoridade e tradição sem abrir mão
                da evolução.
              </p>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                marginBottom: "48px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.975rem",
                  lineHeight: 1.8,
                  color: "rgba(245, 240, 232, 0.65)",
                  fontWeight: 300,
                }}
              >
                Uma empresa que respeita sua origem, valoriza sua história e aponta
                para o futuro sustentável. O novo logo rompe com o passado sem negar
                ele — é mais sofisticado, mais vivo, mais verdadeiro ao que a LD
                Energy se tornou.
              </p>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <a
                href="#contato"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(201, 168, 76, 0.4)",
                  paddingBottom: "4px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = "16px";
                  e.currentTarget.style.borderBottomColor = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = "8px";
                  e.currentTarget.style.borderBottomColor = "rgba(201, 168, 76, 0.4)";
                }}
              >
                Entre em Contato <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Column — Visual */}
          <div
            data-reveal
            style={{
              opacity: 0,
              transform: "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
              position: "relative",
            }}
          >
            {/* Main photo placeholder — textured panel */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4/5",
                backgroundColor: "var(--color-petrol)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Pattern overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 60px)",
                }}
              />

              {/* Center label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "1px",
                    background: "var(--color-gold)",
                    opacity: 0.4,
                  }}
                />
                <p
                  className="text-eyebrow"
                  style={{ opacity: 0.5, textAlign: "center" }}
                >
                  LD Energy
                  <br />
                  Tradição · Inovação · Propósito
                </p>
                <div
                  style={{
                    width: "80px",
                    height: "1px",
                    background: "var(--color-gold)",
                    opacity: 0.4,
                  }}
                />
              </div>

              {/* Gold gradient bottom accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background:
                    "linear-gradient(90deg, var(--color-gold), var(--color-petrol))",
                }}
              />
            </div>

            {/* Experience accent badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                left: "-24px",
                backgroundColor: "var(--color-gold)",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "var(--color-dark)",
                  lineHeight: 1,
                }}
              >
                20
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-dark)",
                  opacity: 0.7,
                  marginTop: "4px",
                }}
              >
                Anos de
                <br />
                Experiência
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .sobre-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
