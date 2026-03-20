"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useMotionTemplate
} from "motion/react";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    id: "01",
    name: "Petróleo Bruto",
    tag: "Extração Própria · SP, BA, ES",
    description: "Extraído diretamente de poços próprios em São Paulo, Bahia e Espírito Santo. Comercializado com qualidade certificada e cadeia de custódia rastreável do poço à entrega.",
    image: "/products/Petroleob.webp",
    scatterPos: { top: "15%", left: "60%" },
  },
  {
    id: "02",
    name: "Óleos Combustíveis",
    tag: "Alto Desempenho · Suporte Técnico",
    description: "Derivados de alto desempenho para indústrias, plantas energéticas e frotas de grande porte. Fornecimento com regularidade, eficiência logística e suporte técnico especializado.",
    image: "/products/Combustivelb1.webp",
    scatterPos: { top: "35%", left: "80%" },
  },
  {
    id: "03",
    name: "Biomassa",
    tag: "Renovável · ESG · Redução de CO₂",
    description: "Alternativa renovável e sustentável para indústrias que buscam reduzir sua pegada de carbono sem abrir mão de eficiência energética. Produção alinhada aos critérios ESG.",
    image: "/products/biomassa.webp",
    scatterPos: { top: "55%", left: "65%" },
  },
  {
    id: "04",
    name: "Cavaco de Eucalipto",
    tag: "Eficiência · Base Renovável",
    description: "O cavaco de eucalipto é uma fonte de bioenergia de altíssimo rendimento calorífico, ideal para caldeiras industriais que buscam sustentabilidade de ponta a ponta.",
    image: "/products/CavacoE.webp",
    scatterPos: { top: "75%", left: "85%" },
  },
  {
    id: "05",
    name: "Lenha de Eucalipto",
    tag: "Manejo Florestal Sustentável",
    description: "Provinda de áreas de reflorestamento com rigorosos padrões de manejo sustentável. Uma opção clássica otimizada para a indústria e o respeito ao meio ambiente.",
    image: "/products/Eucalipto.webp",
    scatterPos: { top: "85%", left: "55%" },
  },
];

interface ProductCardProps {
  product: (typeof PRODUCTS)[0];
  index: number;
  smoothProgress: MotionValue<number>;
}

function ProductCard({ product, index, smoothProgress }: ProductCardProps) {
  const stepStart = 0.1 + index * 0.16;
  const stepEnd = stepStart + 0.16;
  const isLast = index === PRODUCTS.length - 1;

  // Use a strictly increasing range for the animation
  // The initial stage is 0 to 0.08 (scattered)
  // The hero stage starts at stepStart
  const animRange = [0, 0.08, Math.max(0.081, stepStart - 0.05), stepStart, stepEnd, stepEnd + 0.08];

  const opacity = useTransform(smoothProgress, animRange, [1, 0, 0, 1, 1, isLast ? 1 : 0]);
  const topNum = useTransform(smoothProgress, animRange, [parseFloat(product.scatterPos.top), 110, 110, 50, 50, isLast ? 50 : -30]);
  const leftNum = useTransform(smoothProgress, [0, 0.08, stepStart], [parseFloat(product.scatterPos.left), 50, 50]);

  // Adjusted for 1:1 at the initial stage (0-0.08) - made even smaller (12 in instead of 22)
  const widthNum = useTransform(smoothProgress, animRange, [8, 8, 40, 85, 85, isLast ? 85 : 40]);
  const heightNum = useTransform(smoothProgress, animRange, [8, 8, 30, 65, 65, isLast ? 65 : 30]);

  const zIndex = useTransform(smoothProgress, [stepStart - 0.02, stepStart, stepEnd, stepEnd + 0.02], [5, 40, 40, 5]);

  const textOpacity = useTransform(smoothProgress, [stepStart, stepStart + 0.05, stepEnd - 0.05, stepEnd], [0, 1, 1, isLast ? 1 : 0]);
  const textY = useTransform(smoothProgress, [stepStart, stepStart + 0.05, stepEnd - 0.05, stepEnd], [30, 0, 0, isLast ? 0 : -30]);

  // Use numeric values for clipPath
  const clipPath = useMotionTemplate`inset(calc(${topNum}% - ${heightNum}vh / 2) calc(100% - ${leftNum}% - ${widthNum}vw / 2) calc(100% - ${topNum}% - ${heightNum}vh / 2) calc(${leftNum}% - ${widthNum}vw / 2) round 20px)`;

  // Create combined width and height transforms that handle unit switching
  const cardWidth = useTransform(widthNum, (v) => `${v}vw`);
  const cardHeight = useTransform([smoothProgress, widthNum, heightNum], ([p, w, h]) => {
    // Stage 0: Scattered - use vw for height to keep 1:1 aspect ratio
    if ((p as number) <= 0.08) return `${w}vw`;
    // Stage 1+: Animated/Hero - use vh for height for better screen fit
    return `${h}vh`;
  });

  const titleBaseTop = "calc(50% - 32.5vh - 5vh)";

  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: textOpacity, zIndex: 20 }}
      >
        <motion.h2
          className="absolute w-full text-[10vw] md:text-[9vw] lg:text-[7.5vw] font-display font-medium uppercase tracking-tighter leading-none m-0 px-4 text-center whitespace-nowrap drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)] text-cream"
          style={{
            top: titleBaseTop,
            y: useTransform(textOpacity, [0, 1], [60, 0]),
            scale: useTransform(textOpacity, [0, 1], [0.85, 1])
          }}
        >
          {product.name}
        </motion.h2>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: textOpacity,
          zIndex: 45,
          clipPath,
          WebkitClipPath: clipPath
        }}
      >
        <motion.h2
          className="absolute w-full text-[10vw] md:text-[9vw] lg:text-[7.5vw] font-display font-medium uppercase tracking-tighter leading-none m-0 px-4 text-center whitespace-nowrap drop-shadow-none text-gold"
          style={{
            top: titleBaseTop,
            y: useTransform(textOpacity, [0, 1], [60, 0]),
            scale: useTransform(textOpacity, [0, 1], [0.85, 1])
          }}
        >
          {product.name}
        </motion.h2>
      </motion.div>

      <motion.div
        className="absolute overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.7)]"
        style={{
          top: useTransform(topNum, (v) => `${v}%`),
          left: useTransform(leftNum, (v) => `${v}%`),
          width: cardWidth,
          height: cardHeight,
          opacity,
          zIndex,
          x: "-50%",
          y: "-50%",
          borderRadius: "20px",
          willChange: "transform, width, height, opacity",
        }}
      >
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        <motion.div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/40 to-transparent pointer-events-none" style={{ opacity: textOpacity }} />
        <motion.div className="absolute left-6 bottom-6 md:left-12 md:bottom-12 p-8 md:p-12 z-20 bg-dark-2/40 backdrop-blur-xl border border-white/10 rounded-[32px] max-w-[90%] md:max-w-2xl" style={{ opacity: textOpacity, y: textY }}>
          <div className="inline-block px-6 py-2 rounded-full border border-gold/40 text-xs md:text-sm mb-6 bg-dark-2 text-gold font-body tracking-[0.2em] uppercase shadow-2xl">
            {product.tag}
          </div>
          <p className="text-xs md:text-base font-light leading-relaxed text-cream font-body text-balance">
            {product.description}
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}

function PaginationDot({ s, smoothProgress }: { s: number, smoothProgress: MotionValue<number> }) {
  const startRange = s === 0 ? 0 : 0.1 + (s - 1) * 0.16;
  const endRange = s === 0 ? 0.1 : startRange + 0.16;
  const dotActive = useTransform(smoothProgress, [startRange - 0.05, startRange, endRange - 0.05, endRange], [0, 1, 1, 0]);

  return (
    <div className="relative w-6 h-6 flex items-center justify-center pointer-events-auto cursor-pointer">
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-gold/20"
        style={{ scale: useTransform(dotActive, [0, 1], [1, 0]) }}
      />
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_rgba(201,168,76,0.6)]"
        style={{ scale: dotActive, opacity: dotActive }}
      />
    </div>
  );
}

export default function Produtos() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 25, restDelta: 0.001 });

  const introOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const introY = useTransform(smoothProgress, [0, 0.08], [0, -60]);

  const finalBlackOpacity = useTransform(smoothProgress, [0.90, 0.94], [0, 1]);
  const finalContentOpacity = useTransform(smoothProgress, [0.94, 0.98], [0, 1]);
  const finalContentY = useTransform(smoothProgress, [0.94, 0.98], [60, 0]);

  return (
    <section id="produtos" ref={containerRef} className="bg-dark-2 relative font-sans selection:bg-gold selection:text-dark" style={{ height: "800vh" }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent z-50 pointer-events-none" />

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        {/* Intro */}
        <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute top-1/2 left-[5%] md:left-[10%] -translate-y-1/2 max-w-4xl z-10 px-4">
          <div className="section-tag mb-8"><span className="text-eyebrow text-gold">Portfólio Energético</span></div>
          <h1 className="text-display-lg text-cream mb-8">Fontes de Energia para um <em className="gold-italic pr-4">Futuro Sustentável.</em></h1>
          <p className="font-body text-lg md:text-2xl font-light text-cream max-w-3xl text-balance leading-relaxed">
            Desde fontes tradicionais até soluções renováveis, fornecemos alternativas estratégicas que combinam eficiência, custo-benefício e menor impacto ambiental.
          </p>
        </motion.div>

        {/* Products */}
        <div className="absolute inset-0">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} smoothProgress={smoothProgress} />
          ))}
        </div>

        {/* Final Ending */}
        <motion.div className="absolute inset-0 bg-black z-[60]" style={{ opacity: finalBlackOpacity }} />
        <motion.div className="absolute inset-0 z-[70] flex flex-col items-center justify-center p-8 text-center" style={{ opacity: finalContentOpacity, y: finalContentY }}>
          <h2 className="text-display-xl text-cream mb-10 font-display uppercase tracking-tighter leading-none m-0 shadow-gold">A energia que <br /><em className="gold-italic pr-4">move</em> o brasil.</h2>
          <div className="w-[1px] h-16 bg-gold mt-12 mb-10 opacity-40 shadow-[0_0_15px_rgba(201,168,76,0.5)]" />
          <a href="#contato" className="btn btn-primary px-12 py-5 text-base mt-8 pointer-events-auto transform hover:scale-105 transition-all">
            Falar com um especialista <ArrowRight size={20} className="ml-2" />
          </a>
        </motion.div>

        {/* Pagination Dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-50 pointer-events-auto">
          {[0, 1, 2, 3, 4, 5, 6].map((s) => (
            <PaginationDot key={s} s={s} smoothProgress={smoothProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
