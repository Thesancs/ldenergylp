"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Extração",
    subtitle: "Petróleo cru direto da fonte.",
    description:
      "A LD Energy compra o petróleo extraído dos poços de extração de petróleo, sendo realizado por terra onshore, diretamente de poços de extração de petróleo, localizados em Espirito Santo, Bahia e Sergipe. Recursos muitas vezes subutilizados pelo mercado tradicional, que nós transformamos em matéria-prima estratégica para a indústria brasileira.\n\nNós somos grandes compradores de petróleo.",
    bullets: ["Petróleo Bruto", "Poços de extração de petróleo", "ES · BA · SE"],
    video: "/pump-oil-1080.webm",
  },
  {
    id: "02",
    title: "Refino",
    subtitle: "Da refinaria, produtos de alta performance.",
    description:
      "O petróleo bruto é levado à refinaria, onde é processado e transformado nos produtos que a indústria precisa. Desse processo saem o Óleo Combustível B1, o BTE+ e o APFX. Derivados com padrões técnicos rigorosos, baixo teor de enxofre, alto poder calorífico e excelente estabilidade térmica para processos industriais de alta demanda.",
    bullets: [
      "Óleo Combustível B1",
      "Óleo Combustível APF",
      "Óleo Combustível APFX",
      "Refino certificado",
      "Baixo teor de enxofre",
    ],
    video: "/Refinaria sem fundo.webm",
  },
  {
    id: "03",
    title: "Distribuição",
    subtitle: "Entrega onde o Brasil mais precisa.",
    description:
      "Com frota própria e os maiores centros de distribuição do Sudeste, a LD Energy leva os produtos refinados a nossa bases que fica localizada em São Paulo ou Bahia e de lá diretamente às indústrias que não podem parar. Com bases construídas com visão estratégica de logística, assim garantindo produto de qualidade com preço justo em qualquer lugar do brasil, cada cliente recebe o produto com rastreabilidade completa, no prazo e com suporte técnico especializado.",
    bullets: [
      "Distribuição nacional",
      "Logística própria",
      "Suporte técnico",
      "Rastreabilidade total",
    ],
    video: "/Caminhao sf.webm",
  },
];

export default function Processo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section 
      ref={containerRef} 
      id="processo" 
      className="bg-white text-dark pt-24 md:pt-32 pb-[30vh] md:pb-[40vh] relative overflow-hidden selection:bg-petrol selection:text-white"
    >
      <div className="container-site relative z-10">
        <div className="h-[30vh] md:h-[45vh]" />
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 md:mb-32 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-6 flex justify-center"
          >
            <span className="text-eyebrow text-gold uppercase tracking-[0.3em] font-semibold">Nosso processo</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-display-md text-petrol leading-tight mb-8 text-center w-full"
          >
            <em className="gold-italic">Do poço ao cliente.</em><br />
            Cada etapa, é nossa prioridade.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg md:text-xl text-dark/80 leading-relaxed font-light max-w-3xl text-balance text-center mx-auto w-full"
          >
            A LD Energy controla toda a cadeia, da extração nos poços próprios ao produto final entregue na porta da indústria. Sem intermediários. Sem dependência. Com excelência total em cada etapa.
          </motion.p>
        </div>

        <div className="relative pt-12">
          {/* Centered Oil Streamtrack - Hidden on Mobile/Tablet (<1024px) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-dark/5 hidden lg:block" />
          
          {/* Viscous Oil Flow - Hidden on Mobile/Tablet (<1024px) */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-dark origin-top rounded-full z-10 hidden lg:block"
            style={{ 
              height: useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]),
              background: "linear-gradient(to bottom, #080E0E 0%, #0F3D3E 100%)"
            }}
          >
            {/* Lead Drop */}
            <motion.div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-5 bg-dark rounded-b-full"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
            />
          </motion.div>

          <div className="flex flex-col gap-32 md:gap-40 relative">
            {steps.map((step, index) => (
              <StepRow key={step.id} step={step} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Massive Breathing Room Spacer */}
      <div className="h-[50vh] w-full bg-white pointer-events-none" />
    </section>
  );
}

function StepRow({ step, index, progress }: { step: any, index: number, progress: any }) {
  const isLeft = index % 2 === 0;
  
  const activationPoint = index === 0 ? 0.1 : index === 1 ? 0.45 : 0.85;
  const nodeColor = useTransform(
    progress,
    [activationPoint - 0.05, activationPoint],
    ["#FFFFFF", "#0F3D3E"]
  );
  const nodeScale = useTransform(
    progress,
    [activationPoint - 0.05, activationPoint, activationPoint + 0.05],
    [1, 1.4, 1]
  );

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Safari autoPlay block:", e));
      }
    }
  }, [isInView]);

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-center justify-center w-full min-h-[40vh]`}>
      
      {/* Node indicator attached to the track - Hidden on Mobile/Tablet */}
      <motion.div 
        style={{ 
          backgroundColor: nodeColor,
          scale: nodeScale,
        }}
        className="absolute left-1/2 top-12 lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-dark z-20 bg-white hidden lg:block" 
      />

      {/* Content wrapper with alternating direction and MASSIVE central gap */}
      <div className={`w-full flex ${isLeft ? "justify-start pr-0 lg:pr-[50%] lg:mr-40" : "justify-end pl-0 lg:pl-[50%] lg:ml-40"} px-6 md:px-12`}>
        <motion.div 
          initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex flex-col ${isLeft ? "items-center lg:items-end text-center lg:text-right" : "items-center lg:items-start text-center lg:text-left"} max-w-md`}
        >
          {/* Video */}
          <div className="mb-4">
            <video 
              ref={videoRef}
              src={step.video} 
              className="w-full h-auto max-w-[120px] md:max-w-[140px] mix-blend-multiply" 
              preload="none"
              muted 
              loop 
              playsInline
            />
          </div>

          {/* ID */}
          <span className="font-display text-4xl text-gold mb-1">{step.id}</span>
          
          {/* Phase & Title */}
          <div className="mb-4">
            <span className="text-[10px] font-body font-bold text-dark/30 uppercase tracking-[0.2em] block mb-1">Fase {step.id}</span>
            <h3 className="font-display text-2xl md:text-5xl text-petrol leading-tight tracking-tight">
              {step.title}
            </h3>
            <h4 className="text-xl md:text-xl font-medium text-gold italic leading-none md:leading-normal mt-1">
              {step.subtitle}
            </h4>
          </div>

          {/* Description - SHARDER/SMALLER as requested */}
          <div className="font-body text-sm text-dark/80 font-light leading-relaxed mb-6 max-w-sm flex flex-col gap-3">
            {step.description.split("\n\n").map((p: string, i: number) => (
               <p key={i}>{p}</p>
            ))}
          </div>

          {/* Bullets */}
          <ul className={`flex flex-wrap gap-x-4 gap-y-2 ${isLeft ? "justify-center lg:justify-end" : "justify-center lg:justify-start"}`}>
            {step.bullets.map((bullet: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                <span className="text-[10px] font-semibold text-petrol uppercase tracking-wider">{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
