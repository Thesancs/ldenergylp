"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "01",
    name: "Petróleo Bruto",
    tag: "Extração Própria",
    description:
      "Extraído diretamente de poços próprios em São Paulo, Bahia e Espírito Santo. Comercializado com qualidade certificada e cadeia de custódia rastreável do poço à entrega.",
    detail: "SP · BA · ES",
  },
  {
    id: "02",
    name: "Óleos Combustíveis",
    tag: "Alto Desempenho",
    description:
      "Derivados de alto desempenho para indústrias, plantas energéticas e frotas de grande porte. Fornecimento com regularidade, eficiência logística e suporte técnico especializado.",
    detail: "Suporte Técnico Incluso",
  },
  {
    id: "03",
    name: "Biomassa",
    tag: "Renovável · ESG",
    description:
      "Alternativa renovável e sustentável para indústrias que buscam reduzir sua pegada de carbono sem abrir mão de eficiência energética. Produção alinhada aos critérios ESG.",
    detail: "Redução de CO₂",
  },
];

export default function Produtos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="produtos"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) 0",
        backgroundColor: "var(--color-dark-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Horizontal decorative line */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
        }}
      />

      <div className="container-site">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "clamp(48px, 8vw, 80px)",
            flexWrap: "wrap",
            gap: "32px",
          }}
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
                <span className="text-eyebrow">Portfólio Energético</span>
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
              <h2
                className="text-display-md"
                style={{ color: "var(--color-cream)", maxWidth: "600px" }}
              >
                Fontes de Energia para um{" "}
                <em className="gold-italic">Futuro Sustentável.</em>
              </h2>
            </div>
          </div>

          <div
            data-reveal
            style={{
              opacity: 0,
              transform: "translateY(16px)",
              transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              maxWidth: "320px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.5)",
                fontWeight: 300,
              }}
            >
              Desde fontes tradicionais até soluções renováveis — fornecemos
              alternativas estratégicas que combinam eficiência, custo-benefício
              e menor impacto ambiental.
            </p>
          </div>
        </div>

        {/* Products */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {products.map((product, i) => (
            <div
              key={i}
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1)`,
                borderTop: "1px solid rgba(201, 168, 76, 0.1)",
                padding: "clamp(28px, 4vw, 48px) 0",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card inner */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 1fr auto",
                  gap: "clamp(20px, 4vw, 48px)",
                  alignItems: "center",
                }}
                className="product-row"
              >
                {/* Number */}
                <div>
                  <span
                    className="text-eyebrow"
                    style={{
                      color:
                        activeCard === i
                          ? "var(--color-gold)"
                          : "rgba(201, 168, 76, 0.35)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {product.id}
                  </span>
                </div>

                {/* Name + Tag */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      fontWeight: 400,
                      color:
                        activeCard === i
                          ? "var(--color-cream)"
                          : "rgba(245, 240, 232, 0.8)",
                      letterSpacing: "-0.01em",
                      transition: "color 0.3s ease",
                      lineHeight: 1.1,
                      marginBottom: "8px",
                    }}
                  >
                    {product.name}
                  </h3>
                  <span
                    className="text-eyebrow"
                    style={{
                      color:
                        activeCard === i
                          ? "var(--color-gold)"
                          : "rgba(201, 168, 76, 0.4)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {product.tag}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                    color: "rgba(245, 240, 232, 0.45)",
                    fontWeight: 300,
                    maxWidth: "340px",
                  }}
                  className="product-desc"
                >
                  {product.description}
                </p>

                {/* Arrow */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid rgba(201, 168, 76, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: activeCard === i ? "rotate(-45deg)" : "rotate(0)",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    backgroundColor:
                      activeCard === i ? "var(--color-gold)" : "transparent",
                    color:
                      activeCard === i ? "var(--color-dark)" : "var(--color-gold)",
                  }}
                >
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Bottom gold accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "1px",
                  width: activeCard === i ? "100%" : "0%",
                  backgroundColor: "rgba(201, 168, 76, 0.2)",
                  transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
          ))}

          {/* Last bottom border */}
          <div
            style={{
              borderTop: "1px solid rgba(201, 168, 76, 0.1)",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .product-row {
            grid-template-columns: 48px 1fr !important;
          }
          .product-desc { display: none !important; }
          .product-row > :last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
