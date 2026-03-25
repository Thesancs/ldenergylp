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
    name: " Óleo Combustível B1",
    tag: " Alto Desempenho · Suporte Técnico",
    description: "Derivados de alto desempenho para indústrias, plantas energéticas e frotas de grande porte. Fornecimento com regularidade, eficiência logística e suporte técnico especializado.",
    image: "/products/Petroleob.webp",
    scatterPos: { top: "25%", left: "65%" },
  },
  {
    id: "02",
    name: " Óleo Combustível APF",
    tag: "Alto Poder Calorífico · Excelente Fluidez",
    description: "Combustível de alto poder calorífico, com excelente fluidez. Dispensa aquecimento, reduz manutenção e emite menos particulados. Alternativa eficiente a óleos pesados e viável para misturas com diesel.",
    image: "/products/apf 1.webp",
    scatterPos: { top: "50%", left: "80%" },
  },
  {
    id: "03",
    name: " Óleo Combustível APFX",
    tag: "Premium · Alto Desempenho Térmico",
    description: "Combustível líquido premium para queima em temperatura ambiente. Formado por hidrocarbonetos pesados, entrega alto desempenho térmico com PCS de ~10.100 kcal/kg. Ideal for operações que buscam eficiência, simplicidade e constância na queima.",
    image: "/products/apfx.webp",
    scatterPos: { top: "75%", left: "65%" },
  },
];

interface ProductCardProps {
  product: (typeof PRODUCTS)[0];
  index: number;
  smoothProgress: MotionValue<number>;
}

function ProductCard({ product, index, smoothProgress }: ProductCardProps) {
  const stepStart = 0.12 + index * 0.25;
  const stepEnd = stepStart + 0.25;
  const isLast = index === PRODUCTS.length - 1;

  // Optimized range for 3 products on 500vh
  const animRange = [0, 0.1, Math.max(0.11, stepStart - 0.08), stepStart, stepEnd, stepEnd + 0.08];

  const opacity = useTransform(smoothProgress, animRange, [1, 0, 0, 1, 1, isLast ? 1 : 0]);
  const topNum = useTransform(smoothProgress, animRange, [parseFloat(product.scatterPos.top), 110, 110, 50, 50, isLast ? 50 : -30]);
  const leftNum = useTransform(smoothProgress, [0, 0.1, stepStart], [parseFloat(product.scatterPos.left), 50, 50]);

  const widthNum = useTransform(smoothProgress, animRange, [8, 8, 40, 85, 85, isLast ? 85 : 40]);
  const heightNum = useTransform(smoothProgress, animRange, [8, 8, 30, 65, 65, isLast ? 65 : 30]);

  const zIndex = useTransform(smoothProgress, [stepStart - 0.02, stepStart, stepEnd, stepEnd + 0.02], [5, 40, 40, 5]);

  const textOpacity = useTransform(smoothProgress, [stepStart, stepStart + 0.08, stepEnd - 0.08, stepEnd], [0, 1, 1, isLast ? 1 : 0]);
  const textY = useTransform(smoothProgress, [stepStart, stepStart + 0.08, stepEnd - 0.08, stepEnd], [30, 0, 0, isLast ? 0 : -30]);

  const titleBaseTop = "calc(50% - 32.5vh - 5vh)";

  const clipPath = useMotionTemplate`inset(calc(${topNum}% - ${heightNum}vh / 2) calc(100% - ${leftNum}% - ${widthNum}vw / 2) calc(100% - ${topNum}% - ${heightNum}vh / 2) calc(${leftNum}% - ${widthNum}vw / 2) round 20px)`;

  const cardWidth = useTransform(widthNum, (v) => `${v}vw`);
  const cardHeight = useTransform([smoothProgress, widthNum, heightNum], ([p, w, h]) => {
    if ((p as number) <= 0.1) return `${w}vw`;
    return `${h}vh`;
  });

  return (
    <>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: textOpacity, zIndex: 20 }}>
        <motion.h2
          className="absolute w-full text-[8vw] md:text-[9vw] lg:text-[7.5vw] font-display font-medium uppercase tracking-tighter leading-none m-0 px-4 text-center whitespace-nowrap drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)] text-cream"
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
        style={{ opacity: textOpacity, zIndex: 45, clipPath, WebkitClipPath: clipPath }}
      >
        <motion.h2
          className="absolute w-full text-[8vw] md:text-[9vw] lg:text-[7.5vw] font-display font-medium uppercase tracking-tighter leading-none m-0 px-4 text-center whitespace-nowrap drop-shadow-none text-gold"
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
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-24 z-20 pointer-events-none" 
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* THE GLASS CONTAINER - SHARP AND RAW */}
          <div className="bg-dark/20 backdrop-blur-3xl border border-white/10 rounded-sm p-8 md:p-20 w-[94%] md:w-[75%] max-w-4xl flex flex-col items-center shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            
            {/* THE TAG BADGE - INDUSTRIAL PREMIUM */}
            <div className="inline-flex items-center justify-center border border-gold/30 bg-dark/60 px-10 py-5 md:px-20 md:py-8 mb-8 md:mb-14 rounded-none shadow-[0_0_50px_rgba(201,168,76,0.15)]">
              <span className="text-[10px] md:text-sm font-body tracking-[0.35em] font-medium text-gold uppercase text-center leading-[1.6]">
                {product.tag}
              </span>
            </div>
            
            <p className="text-sm md:text-xl font-body font-extralight leading-relaxed text-cream max-w-2xl tracking-wide opacity-90 text-center text-balance">
              {product.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

function PaginationDot({ s, smoothProgress }: { s: number, smoothProgress: MotionValue<number> }) {
  const startRange = s === 0 ? 0 : 0.12 + (s - 1) * 0.25;
  const endRange = s === 0 ? 0.12 : startRange + 0.25;
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

  const introOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const introY = useTransform(smoothProgress, [0, 0.12], [0, -60]);

  const finalBlackOpacity = useTransform(smoothProgress, [0.88, 0.92], [0, 1]);
  const finalContentOpacity = useTransform(smoothProgress, [0.92, 0.96], [0, 1]);
  const finalContentY = useTransform(smoothProgress, [0.92, 0.96], [60, 0]);

  return (
    <section id="produtos" ref={containerRef} className="bg-dark-2 relative font-sans selection:bg-gold selection:text-dark" style={{ height: "500vh" }}>
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
          {[0, 1, 2, 3, 4].map((s) => (
            <PaginationDot key={s} s={s} smoothProgress={smoothProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
