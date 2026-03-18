"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send, CheckCircle } from "lucide-react";

export default function CTAContato() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1800);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "rgba(245, 240, 232, 0.04)",
    border: "1px solid rgba(201, 168, 76, 0.2)",
    color: "var(--color-cream)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <>
      {/* CTA Banner */}
      <section
        style={{
          padding: "clamp(80px, 12vw, 140px) 0",
          backgroundColor: "var(--color-olive-dark)",
          position: "relative",
          overflow: "hidden",
        }}
        ref={sectionRef}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            pointerEvents: "none",
          }}
        />

        {/* Large decorative arrow / element */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        >
          <ArrowRight size={360} strokeWidth={0.5} color="var(--color-gold)" />
        </div>

        <div
          className="container-site"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "800px" }}>
            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="section-tag" style={{ marginBottom: "28px" }}>
                <span className="text-eyebrow">Fale com a LD Energy</span>
              </div>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
                marginBottom: "36px",
              }}
            >
              <h2 className="text-display-lg" style={{ color: "var(--color-cream)" }}>
                Pronto para uma parceria{" "}
                <em className="gold-italic">de energia?</em>
              </h2>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                marginBottom: "48px",
                maxWidth: "540px",
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
                A LD Energy está transformando o setor energético com qualidade,
                acessibilidade e sustentabilidade.
                <br />
                <br />
                Junte-se às empresas que já confiam na nossa entrega.
                Fale com um de nossos especialistas hoje.
              </p>
            </div>

            <div
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <a href="#contato" className="btn btn-primary">
                Entrar em Contato Agora
                <ArrowRight size={14} />
              </a>
              <a href="#sobre" className="btn btn-ghost">
                Saiba Mais sobre a LD Energy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contato"
        style={{
          padding: "clamp(80px, 12vw, 140px) 0",
          backgroundColor: "var(--color-dark-2)",
          position: "relative",
        }}
      >
        <div className="container-site">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(48px, 8vw, 100px)",
              alignItems: "start",
            }}
            className="contato-grid"
          >
            {/* Left info */}
            <div>
              <div className="section-tag" style={{ marginBottom: "20px" }}>
                <span className="text-eyebrow">Contato</span>
              </div>
              <h3
                className="text-display-sm"
                style={{ color: "var(--color-cream)", marginBottom: "32px" }}
              >
                Fale com um
                <br />
                <em className="gold-italic">especialista.</em>
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginBottom: "48px",
                }}
              >
                {[
                  { label: "E-mail", value: "contato@ldenergy.com.br" },
                  { label: "Site", value: "www.ldenergy.com.br" },
                  {
                    label: "Endereço",
                    value: "Av. Andrômeda, 885 – Sala 1601\nComplexo Comercial Brascan",
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      className="text-eyebrow"
                      style={{ marginBottom: "4px", opacity: 0.5 }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--color-cream)",
                        opacity: 0.8,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Thin gold line */}
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  backgroundColor: "var(--color-gold)",
                  opacity: 0.4,
                }}
              />
            </div>

            {/* Right — Form */}
            <div>
              {formState === "success" ? (
                <div
                  style={{
                    padding: "48px",
                    border: "1px solid rgba(201, 168, 76, 0.3)",
                    backgroundColor: "var(--color-dark-surface)",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <CheckCircle size={40} color="var(--color-gold)" />
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      color: "var(--color-cream)",
                    }}
                  >
                    Mensagem enviada ✓
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "rgba(245, 240, 232, 0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    Mensagem enviada com sucesso.
                    <br />
                    Nossa equipe entrará em contato em até 1 dia útil.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <input
                        id="form-name"
                        type="text"
                        placeholder="Seu nome completo"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--color-gold)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(201, 168, 76, 0.2)")
                        }
                      />
                    </div>
                    <div>
                      <input
                        id="form-email"
                        type="email"
                        placeholder="Seu e-mail corporativo"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--color-gold)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(201, 168, 76, 0.2)")
                        }
                      />
                    </div>
                  </div>

                  <input
                    id="form-company"
                    type="text"
                    placeholder="Nome da sua empresa"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(201, 168, 76, 0.2)")
                    }
                  />

                  <textarea
                    id="form-message"
                    placeholder="Como podemos ajudar?"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(201, 168, 76, 0.2)")
                    }
                  />

                  <button
                    id="form-submit"
                    type="submit"
                    className="btn btn-primary"
                    disabled={formState === "loading"}
                    style={{ justifyContent: "center", width: "100%" }}
                  >
                    {formState === "loading" ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        Enviar Mensagem <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .contato-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
