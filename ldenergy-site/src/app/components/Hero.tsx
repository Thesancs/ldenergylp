"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Controle de scroll na seção
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Suavização do movimento
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  // Transformações baseadas no progresso do scroll
  const videoBlur = useTransform(smoothProgress, [0, 0.5], ["blur(0px)", "blur(40px)"]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0.3]);
  const videoScale = useTransform(smoothProgress, [0, 0.6], [1, 1.1]);
  
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0.8]);
  const contentScale = useTransform(smoothProgress, [0, 0.4], [1, 0.98]);

  return (
    <section
      ref={containerRef}
      id="inicio"
      style={{
        height: "150vh",
        position: "relative",
        backgroundColor: "var(--color-dark)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* ── VÍDEO COMPLETO ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            filter: videoBlur,
            opacity: videoOpacity,
            scale: videoScale,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/2eab39b07c00970c55674f258d93b97c_1.webm" type="video/webm" />
          </video>
        </motion.div>

        {/* ── COPY POSICIONADA À DIREITA (DESKTOP) ── */}
        <motion.div
          className="container-site hero-content-wrapper"
          style={{
            position: "relative",
            zIndex: 10,
            opacity: contentOpacity,
            scale: contentScale,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 
            className="hero-headline"
            style={{ 
              fontFamily: "var(--font-display)",
              color: "var(--color-cream)",
              lineHeight: 0.92,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              textShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            Energia que
            <br />
            <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
              move
            </span>
            <br />
            o brasil.
          </h1>
        </motion.div>

        {/* Indicador de Scroll */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            x: "-50%",
            opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]),
            color: "var(--color-gold)",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>Explore</p>
          <div 
            style={{ 
              width: "1px", 
              height: "40px", 
              background: "linear-gradient(to bottom, var(--color-gold), transparent)", 
              margin: "0 auto" 
            }} 
          />
        </motion.div>
      </div>

      <style>{`
        .hero-content-wrapper {
          align-items: center;
          text-align: center;
        }
        .hero-headline {
          font-size: clamp(3rem, 12vw, 5rem);
        }

        @media (min-width: 1024px) {
          .hero-content-wrapper {
            align-items: flex-end;
            text-align: right;
            padding-right: 5vw;
          }
          .hero-headline {
            font-size: clamp(5rem, 8vw, 9rem);
          }
        }
      `}</style>
    </section>
  );
}
