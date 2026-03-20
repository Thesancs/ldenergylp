"use client";

import { useEffect, useRef, useState } from "react";
import MapaBrasil from "./MapaBrasil";

const states = [
  {
    name: "São Paulo",
    detail: "Poços de extração próprios",
  },
  {
    name: "Espírito Santo",
    detail: "Poços de extração próprios",
  },
  {
    name: "Bahia",
    detail: "Poços de extração próprios",
  },
];

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
        padding: "clamp(80px, 12vw, 160px) 0 clamp(100px, 15vw, 180px) 0",
        backgroundColor: "var(--color-petrol)",
        position: "relative",
        overflow: "visible",
        zIndex: 20, 
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 100px), repeating-linear-gradient(90deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 100px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-site pb-20 md:pb-0" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(48px, 8vw, 100px)] gap-y-12 md:gap-y-0">
          <div className="order-1 md:col-start-1 md:row-start-1 md:self-end">
            <div data-reveal style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.6s var(--ease-out)" }}>
              <div className="section-tag">
                <span className="text-eyebrow">Fontes Próprias</span>
              </div>
            </div>
            <div data-reveal style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.7s var(--ease-out)", marginBottom: "32px" }}>
              <h2 className="text-display-md" style={{ color: "var(--color-cream)" }}>
                Matéria-prima direto<br />da <em className="gold-italic">fonte.</em>
              </h2>
            </div>
            <div data-reveal style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.7s var(--ease-out)", marginBottom: "32px" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.975rem", lineHeight: 1.8, color: "rgba(245, 240, 232, 0.6)", fontWeight: 300 }}>
                Temos nossas próprias fontes.<br /><br />
                A matéria-prima vem de poços de petróleo localizados estrategicamente no Brasil — garantindo rastreabilidade total, qualidade certificada e independência de fornecimento para nossos clientes.
              </p>
            </div>
          </div>

          <div data-reveal className="order-2 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 flex flex-col justify-center items-center py-8 md:py-0" style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.8s var(--ease-out)", width: "100%", minHeight: "350px" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "550px", margin: "0 auto" }}>
              <MapaBrasil />
              <p className="text-eyebrow" style={{ textAlign: "center", marginTop: "15px", opacity: 0.35 }}>
                Fontes próprias no Brasil
              </p>
            </div>
          </div>

          <div className="order-3 md:col-start-1 md:row-start-2 md:self-start">
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {states.map((state, i) => (
                <div key={i} data-reveal style={{ opacity: 0, transform: "translateY(16px)", transition: `all 0.6s var(--ease-out)`, padding: "16px 0", borderBottom: "1px solid rgba(201, 168, 76, 0.12)", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", position: "relative" }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", backgroundColor: "var(--color-gold)", transform: active === i ? "scaleY(1)" : "scaleY(0)", transition: "transform 0.3s var(--ease-out)", transformOrigin: "center" }} />
                  <div style={{ paddingLeft: "16px" }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, color: active === i ? "var(--color-gold)" : "var(--color-cream)", transition: "color 0.3s ease", marginBottom: "1px", letterSpacing: "-0.01em" }}>
                      {state.name}
                    </h4>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245, 240, 232, 0.35)" }}>
                      {state.detail}
                    </p>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: active === i ? "var(--color-gold)" : "rgba(201, 168, 76, 0.3)", animation: "pulse-dot 2s ease-in-out infinite", animationDelay: `${i * 0.4}s`, transition: "background-color 0.3s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
