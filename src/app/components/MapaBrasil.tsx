"use client";

import React, { useState, useEffect, useMemo, memo } from 'react';
import * as d3 from 'd3-geo';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LOCAL_GEOJSON_PATH = '/brazil-states.json';
const HIGHLIGHTED_STATES = ['Sergipe', 'Bahia', 'Espírito Santo'];

/**
 * Memoized single state path to avoid heavy re-renders
 * Filters can be expensive on mobile; we use a simple blur instead.
 */
const StatePath = memo(({ path, isHighlighted, highlightIndex }: { path: string; isHighlighted: boolean; highlightIndex: number }) => {
  if (!isHighlighted) return (
    <path
      d={path}
      fill="rgba(255, 255, 255, 0.05)"
      stroke="rgba(201, 168, 76, 0.12)"
      strokeWidth={0.8}
    />
  );

  return (
    <motion.g 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: highlightIndex * 0.3 + 0.4 }}
    >
      {/* Fallback glow layer */}
      <path
        d={path}
        fill="var(--color-gold)"
        className="blur-[1px] opacity-20"
      />
      <path
        d={path}
        fill="url(#highlightGradient)"
        stroke="#FFFFFF"
        strokeWidth={1.5}
      />
    </motion.g>
  );
});

StatePath.displayName = "StatePath";

export default function MapaBrasil() {
  const [geojson, setGeojson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Cache to avoid multiple fetches per session
    const cachedData = (window as any)._brazilMapCache;
    if (cachedData) {
      setGeojson(cachedData);
      setLoading(false);
      return;
    }

    // Fetch from local public directory for better speed and reliability
    fetch(LOCAL_GEOJSON_PATH)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load local map data');
        return res.json();
      })
      .then(data => {
        (window as any)._brazilMapCache = data;
        setGeojson(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Map Load Error:", err);
        setError("Não foi possível carregar o mapa.");
        setLoading(false);
      });
  }, []);

  const { mapData } = useMemo(() => {
    if (!geojson || !geojson.features) return { mapData: [] };
    
    // Smooth geometric projection
    const projection = d3.geoMercator().fitExtent([[30, 30], [770, 770]], geojson as any);
    const pathGenerator = d3.geoPath().projection(projection);
    
    const data = geojson.features.map((feature: any) => {
      const name = feature.properties.name;
      const path = pathGenerator(feature) || '';
      
      let centroid: [number, number] | null = null;
      try {
        const c = pathGenerator.centroid(feature);
        if (c && !isNaN(c[0]) && !isNaN(c[1])) centroid = c as [number, number];
      } catch(e) {}
      
      return { name, path, centroid, isHighlighted: HIGHLIGHTED_STATES.includes(name) };
    });
    
    return { mapData: data };
  }, [geojson]);

  if (!mounted || loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
        <p className="text-cream/50 text-[10px] tracking-widest uppercase">Mapeando Operações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px] text-center">
        <p className="text-red-400 font-medium mb-2">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-[9px] text-gold uppercase tracking-tighter underline"
        >
          Recarregar página
        </button>
      </div>
    );
  }

  return (
    <div className="w-full relative flex items-center justify-center overflow-hidden">
      <motion.div 
        className="w-full relative will-change-transform"
        initial={{ rotateX: 20, rotateZ: -5, opacity: 0, scale: 0.95 }}
        whileInView={{ rotateX: 10, rotateZ: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'center center' }}
      >
        <svg 
          viewBox="0 0 800 800" 
          className="w-full h-auto drop-shadow-xl"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F295" />
              <stop offset="50%" stopColor="#E0AA3E" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
 
          <g>
            {mapData.map((d: any) => (
              <StatePath 
                key={d.name} 
                path={d.path} 
                isHighlighted={d.isHighlighted} 
                highlightIndex={HIGHLIGHTED_STATES.indexOf(d.name)} 
              />
            ))}
 
            {/* Draw labels and pins for focus states */}
            {mapData.filter((d: any) => d.isHighlighted).map((d: any) => {
              if (!d.centroid) return null;
              const hIndex = HIGHLIGHTED_STATES.indexOf(d.name);
 
              // Offset logic for manual balance
              let offsetX = 0;
              let offsetY = 0;
              if (d.name === "Espírito Santo") offsetX = 12;
              if (d.name === "Bahia") offsetY = -5;
 
              return (
                <g 
                  key={`pin-${d.name}`} 
                  transform={`translate(${d.centroid[0] + offsetX}, ${d.centroid[1] + offsetY})`}
                >
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 150,
                      damping: 18,
                      delay: hIndex * 0.3 + 0.8 
                    }}
                  >
                    <path 
                      d="M 0 0 C -2 -4 -5 -7 -5 -12 A 5 5 0 1 1 5 -12 C 5 -7 2 -4 0 0 Z" 
                      fill="var(--color-gold)" 
                      stroke="#FFF" 
                      strokeWidth={1} 
                    />
                    <text
                      y={22}
                      textAnchor="middle"
                      fill="var(--color-cream)"
                      className="text-[14px] font-bold uppercase tracking-wider"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      {d.name}
                    </text>
                  </motion.g>
                </g>
              );
            })}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
