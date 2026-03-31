"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useTransform, useMotionValue, useInView, animate } from "framer-motion";

function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

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
        backgroundColor: "var(--color-petrol)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Premium Geometric Background Facets */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {/* Main large diagonal facet with GLOW */}
        <div 
          className="absolute top-[-20%] right-[-10%] w-[80%] h-[140%] rotate-[15deg]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.4) 50%, transparent)",
            clipPath: "polygon(0 0, 100% 30%, 100% 100%, 0 70%)",
            filter: "drop-shadow(0 0 40px rgba(201, 168, 76, 0.1))"
          }}
        />
        
        {/* GLOWING LINE ACCENT */}
        <div 
          className="absolute top-[-20%] right-[30%] w-[1px] h-[140%] rotate-[15deg]"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--color-gold), transparent)",
            opacity: 0.15,
            filter: "blur(4px)"
          }}
        />

        {/* Accent facet 1 */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
            clipPath: "polygon(0 0, 60% 0, 0 80%)"
          }}
        />
        
        {/* Accent facet 2 with SHADOW depth */}
        <div 
          className="absolute bottom-0 right-0 w-full h-[60%]"
          style={{
            background: "linear-gradient(315deg, rgba(0,0,0,0.3) 0%, transparent 60%)",
            clipPath: "polygon(100% 100%, 100% 0, 40% 100%)",
            filter: "drop-shadow(-20px -20px 60px rgba(0,0,0,0.5))"
          }}
        />
        
        {/* Subtle light shaft with pulsing glow animation */}
        <div 
          className="light-shaft absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/15 to-transparent rotate-[25deg] scale-y-150"
          style={{ filter: "blur(2px)" }}
        />
      </div>

      {/* Legacy decorative number (Retained but made even subtler) */}
      <div
        className="absolute right-[-2%] top-[30%] -translate-y-1/2 font-display text-[25vw] font-bold text-white/5 leading-none pointer-events-none user-select-none opacity-20"
        aria-hidden="true"
      >
        <Counter value={20} />
      </div>

      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "clamp(48px, 8vw, 120px)",
            alignItems: "center",
            marginBottom: "12vh",
          }}
          className="sobre-grid"
        >
          {/* Left Column (Full text now) */}
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
                <span className="text-eyebrow" style={{ color: "var(--color-gold)" }}>Quem Somos</span>
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
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                }}
                className="sobre-text-columns"
            >
                <div
                data-reveal
                style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
                >
                <p
                    style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.975rem",
                    lineHeight: 1.8,
                    color: "rgba(245, 240, 232, 0.75)",
                    fontWeight: 300,
                    }}
                >
                    A LD Energy nasceu da crença de que energia de qualidade precisa chegar a quem realmente move o Brasil.
                    <br />
                    <br />
                    Há <Counter value={20} /> anos no setor, construímos uma operação que vai da extração ao cliente final. Temos poços de extração de petróleo em Sergipe, Bahia e Espírito Santo. Distribuímos para indústrias que não podem parar, em regiões que o mercado tradicional muitas vezes ignora.
                    <br />
                    <br />
                    Nosso portfólio cobre o que o setor industrial precisa: Petróleo Bruto, Óleo Combustível B1, Biomassa, Lenha e Cavaco de Eucalipto. Cada produto entregue com rastreabilidade, consistência e responsabilidade técnica.
                </p>
                </div>

                <div
                data-reveal
                style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
                >
                <p
                    style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.975rem",
                    lineHeight: 1.8,
                    color: "rgba(245, 240, 232, 0.75)",
                    fontWeight: 300,
                    }}
                >
                    Operamos com certificações ISO 9001, 14001 e 45001. Padrões internacionais que não são conquista recente. São a forma como a LD Energy sempre trabalhou.
                    <br />
                    <br />
                    Somos uma empresa brasileira. Conhecemos o território, entendemos as operações dos nossos clientes e assumimos compromisso real com cada fornecimento. Energia acessível, eficiente e sustentável. Não como promessa. Como entrega.
                </p>
                
                <div style={{ marginTop: "32px" }}>
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
                    >
                        Entre em Contato <ArrowRight size={13} />
                    </a>
                </div>
                </div>
            </div>
          </div>

          {/* Experience Badge moved top-right or just kept as accent */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
                style={{
                    backgroundColor: "var(--color-gold)",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                data-reveal
                >
                <span
                    className="font-display"
                    style={{
                    fontSize: "5rem",
                    fontWeight: 700,
                    color: "var(--color-dark)",
                    lineHeight: 1,
                    }}
                >
                    <Counter value={20} />
                </span>
                <span
                    style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-dark)",
                    opacity: 0.7,
                    marginTop: "8px",
                    textAlign: "center"
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
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.1; transform: scaleY(1.5) rotate(25deg); }
          50% { opacity: 0.25; transform: scaleY(1.7) rotate(25deg); }
        }
        .light-shaft {
          animation: pulse-glow 6s ease-in-out infinite;
        }
        @media (max-width: 991px) {
          .sobre-grid {
            grid-template-columns: 1fr !important;
            margin-bottom: 6vh !important;
          }
          .sobre-text-columns {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

