"use client";

import React, { useState, useEffect, useMemo, memo } from 'react';
import * as d3 from 'd3-geo';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BRAZIL_GEOJSON_URL = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';

// The user requested São Paulo, Bahia, and Espírito Santo
const HIGHLIGHTED_STATES = ['Sergipe', 'Bahia', 'Espírito Santo'];

type MapDataFeature = {
  name: string;
  isHighlighted: boolean;
  path: string;
  centroid: [number, number] | null;
};

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
      {/* Simplified Glow Layer (Lower cost than Filter) */}
      <path
        d={path}
        fill="var(--color-gold)"
        className="blur-[2px] opacity-20"
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

  useEffect(() => {
    // Cache map data in memory to avoid redundant fetches
    const cachedData = (window as any)._brazilMapCache;
    if (cachedData) {
      setGeojson(cachedData);
      setLoading(false);
      return;
    }

    fetch(BRAZIL_GEOJSON_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch map data');
        return res.json();
      })
      .then(data => {
        (window as any)._brazilMapCache = data;
        setGeojson(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const { mapData } = useMemo(() => {
    if (!geojson || !geojson.features) return { mapData: [] };
    
    // Create a projection that fits the ENTIRE Brazil map into an 800x800 SVG viewBox
    const projection = d3.geoMercator().fitExtent([[30, 30], [770, 770]], geojson as any);
    const pathGenerator = d3.geoPath().projection(projection);
    
    const data: MapDataFeature[] = geojson.features.map((feature: any) => {
      const name = feature.properties.name;
      const path = pathGenerator(feature) || '';
      
      let centroid: [number, number] | null = null;
      try {
        const c = pathGenerator.centroid(feature);
        if (c && !isNaN(c[0]) && !isNaN(c[1])) centroid = c as [number, number];
      } catch(e) { /* ignore */ }
      
      return { name, path, centroid, isHighlighted: HIGHLIGHTED_STATES.includes(name) };
    });
    
    return { mapData: data };
  }, [geojson]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
        <p className="text-cream/50 text-[10px] tracking-widest uppercase">Processando Geografia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px] text-center">
        <p className="text-red-400 font-medium mb-2">Erro ao carregar mapa</p>
        <p className="text-xs text-cream/30">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full relative flex items-center justify-center" style={{ perspective: '1500px' }}>
      <motion.div 
        className="w-full relative will-change-transform"
        initial={{ rotateX: 45, rotateZ: -10, opacity: 0, scale: 0.9 }}
        whileInView={{ rotateX: 25, rotateZ: -5, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg 
          viewBox="0 0 800 800" 
          className="w-full h-auto drop-shadow-2xl"
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
 
            {/* Draw labels and pins */}
            {mapData.filter((d: any) => d.isHighlighted).map((d: any, i: number) => {
              if (!d.centroid) return null;
              const hIndex = HIGHLIGHTED_STATES.indexOf(d.name);
 
              // Manual adjustments for visual balance inside the rotated map
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
                    initial={{ scale: 0, opacity: 0, y: 10 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: hIndex * 0.3 + 0.8 
                    }}
                  >
                    {/* Map Pin */}
                    <path 
                      d="M 0 0 C -2 -4 -5 -7 -5 -12 A 5 5 0 1 1 5 -12 C 5 -7 2 -4 0 0 Z" 
                      fill="var(--color-gold)" 
                      stroke="#FFF" 
                      strokeWidth={1} 
                    />
                    <text
                      y={18}
                      textAnchor="middle"
                      fill="var(--color-cream)"
                      className="text-[11px] font-bold uppercase tracking-wider"
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
