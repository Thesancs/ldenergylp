"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const navItems = [
  { label: "Início", href: "#inicio", number: "01" },
  { label: "Sobre Nós", href: "#sobre", number: "02" },
  { label: "Produtos", href: "#produtos", number: "03" },
  { label: "Origens", href: "#origens", number: "04" },
  { label: "ESG", href: "#esg", number: "05" },
  { label: "Contato", href: "#contato", number: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.6; // Valor aproximado do fim do Hero (180vh)
      
      setScrolled(scrollY > 50);
      
      // Esconder header totalmente após passar do Hero
      setIsVisible(scrollY < heroHeight);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Travar scroll do body quando sidebar aberta
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "fixed",
          top: isVisible ? 0 : "-100px",
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          backgroundColor: scrolled ? "rgba(10, 20, 20, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          opacity: isVisible ? 1 : 0,
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px md:0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "70px" : "100px",
            transition: "height 0.4s ease",
          }}
          className="container-site"
        >
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <Image
              src="/Logo-H.svg"
              alt="LD Energy"
              width={180}
              height={50}
              priority
              style={{
                height: scrolled ? "45px" : "60px",
                width: "auto",
                transition: "height 0.4s ease",
                filter: "brightness(0) invert(1)",
              }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/70 hover:text-gold transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-6">
            <a
              href="#contato"
              className="group hidden md:flex items-center gap-2.5 bg-gold rounded-[2px] text-dark font-bold text-[10.5px] uppercase tracking-[0.3em] transition-all duration-500 hover:shadow-[0_6px_30px_rgba(201,168,76,0.25)] hover:-translate-y-0.5 active:translate-y-0 border border-white/10 overflow-hidden relative leading-none"
              style={{
                background: "linear-gradient(105deg, #DFB957 0%, #C9A84C 45%, #CCAC53 55%, #B08D30 100%)",
                padding: '14px 36px'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10">Falar com Especialista</span>
              <svg 
                width="13" 
                height="13" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-500"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>

            {/* Hamburger (Mobile & Sidebar Toggle) */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="lg:hidden p-2 flex flex-col gap-1.5 items-end"
            >
              <span style={lineStyle(24)} />
              <span style={lineStyle(16)} />
            </button>
          </div>
        </div>
      </header>

      {/* ── OVERLAY ESCURO ── */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── SIDEBAR ── */}
      <div
        ref={sidebarRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 88vw)",
          zIndex: 300,
          backgroundColor: "#080e0e",
          borderLeft: "1px solid rgba(201, 168, 76, 0.12)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header da sidebar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 36px",
            borderBottom: "1px solid rgba(201, 168, 76, 0.08)",
          }}
        >
          <Image
            src="/Logo-H.svg"
            alt="LD Energy"
            width={160}
            height={48}
            style={{
              height: "45px",
              width: "auto",
              opacity: 1,
            }}
          />

          {/* Botão fechar */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(245, 240, 232, 0.7)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.12)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-gold, #C9A84C)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(245, 240, 232, 0.7)";
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-body, Inter, sans-serif)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(201, 168, 76, 0.6)",
            padding: "32px 36px 8px",
          }}
        >
          Navegação
        </p>

        {/* Links */}
        <nav style={{ padding: "0 36px", flex: 1 }}>
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                padding: "18px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                transitionDelay: menuOpen ? `${0.12 + i * 0.055}s` : "0s",
              }}
              onMouseEnter={(e) => {
                const num = e.currentTarget.querySelector(".nav-num") as HTMLElement;
                const lbl = e.currentTarget.querySelector(".nav-label") as HTMLElement;
                if (num) num.style.color = "rgba(201, 168, 76, 0.8)";
                if (lbl) lbl.style.color = "#F5F0E8";
                if (lbl) lbl.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                const num = e.currentTarget.querySelector(".nav-num") as HTMLElement;
                const lbl = e.currentTarget.querySelector(".nav-label") as HTMLElement;
                if (num) num.style.color = "rgba(255,255,255,0.18)";
                if (lbl) lbl.style.color = "rgba(245, 240, 232, 0.65)";
                if (lbl) lbl.style.transform = "translateX(0)";
              }}
            >
              <span
                className="nav-num"
                style={{
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.18)",
                  transition: "color 0.2s ease",
                  minWidth: "24px",
                }}
              >
                {item.number}
              </span>
              <span
                className="nav-label"
                style={{
                  fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "rgba(245, 240, 232, 0.65)",
                  transition: "all 0.25s ease",
                  letterSpacing: "0.02em",
                }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* CTA + Rodapé */}
        <div style={{ padding: "32px 36px", borderTop: "1px solid rgba(201, 168, 76, 0.08)" }}>
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              textAlign: "center",
              padding: "14px 24px",
              background: "linear-gradient(135deg, #C9A84C, #A8873C)",
              color: "#0F1A1A",
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
              transition: "opacity 0.2s ease",
              opacity: menuOpen ? 1 : 0,
              transitionDelay: menuOpen ? "0.48s" : "0s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Falar com Especialista
          </a>
          <p
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.2)",
              textAlign: "center",
              marginTop: "20px",
              letterSpacing: "0.06em",
            }}
          >
            © 2024 LD Energy. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </>
  );
}

// Helpers de estilo
function lineStyle(width: number): React.CSSProperties {
  return {
    display: "block",
    height: "1.5px",
    width: `${width}px`,
    backgroundColor: "rgba(245, 240, 232, 0.85)",
    borderRadius: "2px",
    transition: "width 0.2s ease",
  };
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
