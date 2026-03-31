"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
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

  const [videoSrc, setVideoSrc] = useState<string>("/2eab39b07c00970c55674f258d93b97c_1.webm");
  
  // Deteção responsiva para trocar o vídeo
  useEffect(() => {
    const checkMobile = () => {
      // 1024px é o breakpoint comum para desktop no Next.js (lg)
      const isMobile = window.innerWidth < 1024;
      setVideoSrc(
        isMobile 
          ? "/0c091fd503429622d442a435bf94bef3_1.webm" 
          : "/2eab39b07c00970c55674f258d93b97c_1.webm"
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.log("Safari autoPlay blocked:", error));
      }
    }
  }, [videoSrc]);

  // Transformações baseadas no progresso do scroll
  const videoBlur = useTransform(smoothProgress, [0, 0.6], ["blur(0px)", "blur(20px)"]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0.2]);
  const videoScale = useTransform(smoothProgress, [0, 0.8], [1, 1.05]);
  
  // Overlay de cor da página (Verde Petróleo) que entra no final
  const colorOverlayOpacity = useTransform(smoothProgress, [0.6, 0.95], [0, 1]);
  
  const contentOpacity = useTransform(smoothProgress, [0, 0.3, 0.7], [1, 1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="inicio"
      style={{
        height: "180vh", // Aumentado para uma transição mais longa e suave
        position: "relative",
        backgroundColor: "var(--color-petrol)", // Fundo base agora é o verde petróleo
      }}
    >
      <h1 className="sr-only">LD Energy - Soluções em Óleos Combustíveis e Sustentabilidade</h1>
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
            backgroundColor: "var(--color-dark)",
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── OVERLAY DE COR (TRANSIÇÃO) ── */}
        <motion.div
           style={{
               position: "absolute",
               inset: 0,
               zIndex: 5,
               backgroundColor: "var(--color-petrol)",
               opacity: colorOverlayOpacity,
           }}
        />



        {/* Blur Transition Strips removed as we now use solid color fade */}

        {/* ── INDICADOR DE SCROLL (MAIS VISÍVEL) ── */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "8vh",
            left: "50%",
            x: "-50%",
            opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]),
            color: "var(--color-gold)",
            zIndex: 30,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))" // Brilho/sombra para destacar do vídeo
          }}
        >
          {/* Fundo sutil para contraste */}
          <div className="absolute inset-x-[-40px] inset-y-[-20px] bg-dark/20 blur-2xl rounded-full -z-10" />
          
          <p className="font-body text-[0.7rem] md:text-[0.75rem] font-medium tracking-[0.4em] uppercase text-cream/90">
            Role para descobrir
          </p>
          
          <div className="relative w-[22px] h-[36px] rounded-full border-2 border-gold/40 flex justify-center p-1.5 shadow-[0_0_15px_rgba(201,168,76,0.3)]">
            <motion.div 
              animate={{ 
                y: [0, 15, 0],
                opacity: [1, 0, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-[2.5px] h-[7px] bg-gold rounded-full shadow-[0_0_10px_#C9A84C]"
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-content-wrapper {
          align-items: center;
          text-align: center;
        }
        .hero-headline {
          font-size: clamp(2.5rem, 10vw, 4rem);
        }

        @media (min-width: 1024px) {
          .hero-content-wrapper {
            align-items: flex-end;
            text-align: right;
            padding-right: 5vw;
          }
          .hero-headline {
            font-size: clamp(3.5rem, 5vw, 6.5rem);
          }
        }
      `}</style>
    </section>
  );
}
