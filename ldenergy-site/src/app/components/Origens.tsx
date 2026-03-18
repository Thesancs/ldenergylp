"use client";

import { useEffect, useRef, useState } from "react";

const states = [
  {
    name: "São Paulo",
    detail: "Poços de extração próprios",
    x: "48%",
    y: "62%",
  },
  {
    name: "Espírito Santo",
    detail: "Poços de extração próprios",
    x: "65%",
    y: "50%",
  },
  {
    name: "Bahia",
    detail: "Poços de extração próprios",
    x: "68%",
    y: "30%",
  },
];

/* Simplified Brazil outline path */
const BRAZIL_PATH =
  "M 160 20 L 195 22 L 230 35 L 260 30 L 275 45 L 295 50 L 310 70 L 320 95 L 310 120 L 300 145 L 310 165 L 295 185 L 280 200 L 265 225 L 248 240 L 235 260 L 218 278 L 205 295 L 195 320 L 178 338 L 162 348 L 148 355 L 135 345 L 120 330 L 110 310 L 100 295 L 88 280 L 75 268 L 60 255 L 45 240 L 35 222 L 28 200 L 25 178 L 22 155 L 24 132 L 30 112 L 40 95 L 55 78 L 72 65 L 90 55 L 110 42 L 130 32 L 148 22 Z";

export default function Origens() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

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
      id="origens"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) 0",
        backgroundColor: "var(--color-petrol)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 100px), repeating-linear-gradient(90deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 100px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(48px, 8vw, 100px)",
            alignItems: "center",
          }}
          className="origens-grid"
        >
          {/* Left content */}
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
                <span className="text-eyebrow">Fontes Próprias</span>
              </div>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                marginBottom: "40px",
              }}
            >
              <h2 className="text-display-md" style={{ color: "var(--color-cream)" }}>
                Matéria-prima direto
                <br />
                da <em className="gold-italic">fonte.</em>
              </h2>
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
                  color: "rgba(245, 240, 232, 0.6)",
                  fontWeight: 300,
                }}
              >
                Temos nossas próprias fontes.
                <br />
                <br />
                A matéria-prima vem de poços de petróleo localizados
                estrategicamente no Brasil — garantindo rastreabilidade total,
                qualidade certificada e independência de fornecimento para
                nossos clientes.
              </p>
            </div>

            {/* States list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {states.map((state, i) => (
                <div
                  key={i}
                  data-reveal
                  style={{
                    opacity: 0,
                    transform: "translateY(16px)",
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1)`,
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(201, 168, 76, 0.12)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    position: "relative",
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  {/* Left border accent */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      backgroundColor: "var(--color-gold)",
                      transform: active === i ? "scaleY(1)" : "scaleY(0)",
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                      transformOrigin: "center",
                    }}
                  />

                  <div style={{ paddingLeft: "16px" }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.3rem",
                        fontWeight: 400,
                        color: active === i ? "var(--color-gold)" : "var(--color-cream)",
                        transition: "color 0.3s ease",
                        marginBottom: "2px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {state.name}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(245, 240, 232, 0.35)",
                      }}
                    >
                      {state.detail}
                    </p>
                  </div>

                  {/* Pulse dot */}
                  <div
                    style={{ marginLeft: "auto" }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor:
                          active === i ? "var(--color-gold)" : "rgba(201, 168, 76, 0.3)",
                        animation: "pulse-dot 2s ease-in-out infinite",
                        animationDelay: `${i * 0.4}s`,
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stylized Brazil Map */}
          <div
            data-reveal
            style={{
              opacity: 0,
              transform: "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
              <svg
                viewBox="0 0 350 370"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "auto" }}
                aria-label="Mapa do Brasil com localizações dos poços LD Energy"
              >
                {/* Brazil shape */}
                <path
                  d={BRAZIL_PATH}
                  fill="rgba(59, 74, 47, 0.4)"
                  stroke="rgba(201, 168, 76, 0.3)"
                  strokeWidth="1.5"
                />

                {/* Grid lines inside */}
                <path
                  d={BRAZIL_PATH}
                  fill="url(#gridFill)"
                  opacity="0.3"
                />

                <defs>
                  <pattern
                    id="gridFill"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="rgba(201,168,76,0.15)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>

                {/* Pulsing dots at state locations */}
                {states.map((state, i) => {
                  const cx = parseFloat(state.x) * 3.5;
                  const cy = parseFloat(state.y) * 3.7;
                  const isActive = active === i;
                  return (
                    <g key={i}>
                      {/* Outer ring pulse */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? 14 : 10}
                        fill="rgba(201, 168, 76, 0.08)"
                        style={{ transition: "r 0.3s ease" }}
                      />
                      {/* Mid ring */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? 7 : 5}
                        fill="rgba(201, 168, 76, 0.2)"
                        style={{ transition: "r 0.3s ease" }}
                      />
                      {/* Center dot */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="3"
                        fill={isActive ? "var(--color-gold)" : "rgba(201, 168, 76, 0.6)"}
                        style={{ transition: "fill 0.3s ease" }}
                      />
                      {/* State label */}
                      {isActive && (
                        <text
                          x={cx}
                          y={cy - 18}
                          textAnchor="middle"
                          fill="var(--color-gold)"
                          fontSize="9"
                          fontFamily="var(--font-body)"
                          letterSpacing="1"
                        >
                          {state.name.toUpperCase()}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Label below */}
              <p
                className="text-eyebrow"
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  opacity: 0.35,
                }}
              >
                Fontes próprias no Brasil
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .origens-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
