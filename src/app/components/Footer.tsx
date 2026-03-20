"use client";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Produtos", href: "#produtos" },
  { label: "Origens", href: "#origens" },
  { label: "ESG", href: "#esg" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-dark)",
        borderTop: "1px solid rgba(201, 168, 76, 0.12)",
        padding: "clamp(48px, 8vw, 80px) 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG decorative element */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
        }}
      />

      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "clamp(40px, 6vw, 80px)",
            paddingBottom: "clamp(48px, 6vw, 64px)",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <a
              href="#inicio"
              style={{
                display: "inline-block",
                marginBottom: "20px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <img
                src="/Logo-H.svg"
                alt="LD Energy"
                style={{
                  height: "64px",
                  width: "auto",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </a>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.45)",
                fontWeight: 300,
                maxWidth: "320px",
              }}
            >
              Soluções energéticas éticas, eficientes e com inovação.
              <br />
              Há 20 anos movendo o Brasil.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="text-eyebrow"
              style={{ marginBottom: "20px", opacity: 0.5 }}
            >
              Navegação
            </p>
            <nav>
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "rgba(245, 240, 232, 0.55)",
                    textDecoration: "none",
                    marginBottom: "12px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(245, 240, 232, 0.55)")
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-eyebrow"
              style={{ marginBottom: "20px", opacity: 0.5 }}
            >
              Contato
            </p>
            {[
              "contato@ldenergy.com.br",
              "www.ldenergy.com.br",
              "Av. Andrômeda, 885 – Sala 1601",
              "Complexo Comercial Brascan",
            ].map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "rgba(245, 240, 232, 0.45)",
                  marginBottom: "8px",
                  fontWeight: 300,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(201, 168, 76, 0.08)",
            padding: "20px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "rgba(245, 240, 232, 0.25)",
              letterSpacing: "0.02em",
            }}
          >
            © 2025 LD Energy. Todos os direitos reservados.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Política de Privacidade", "Central de Ajuda"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "rgba(245, 240, 232, 0.25)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(245, 240, 232, 0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(245, 240, 232, 0.25)")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
