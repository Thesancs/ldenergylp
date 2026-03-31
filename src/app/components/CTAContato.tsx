"use client";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";

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
                  { label: "Telefone", value: "(11) 97243-9222" },
                  { label: "Site", value: "www.ldenergy.com.br" },
                  {
                    label: "Matriz e Escritório",
                    value: "Conjunto Comercial Brascan\nAv. Andrômeda, 885 andar cj 1601 - Torre B\nBarueri – SP, CEP: 06473-000",
                  },
                  {
                    label: "Base SP",
                    value: "Av. Roberto Pinto Sobrinho, 301 - Parque Industrial Mazzei\nOsasco - SP, 06268-120",
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
