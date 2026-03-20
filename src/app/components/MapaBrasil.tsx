"use client";

import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3-geo';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BRAZIL_GEOJSON_URL = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';

// The user requested São Paulo, Bahia, and Espírito Santo
const HIGHLIGHTED_STATES = ['São Paulo', 'Bahia', 'Espírito Santo'];

export default function MapaBrasil() {
  const [geojson, setGeojson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(BRAZIL_GEOJSON_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch map data');
        return res.json();
      })
      .then(data => {
        setGeojson(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const { pathGenerator, features } = useMemo(() => {
    if (!geojson) return { pathGenerator: null, features: [] };
    
    // Create a projection that fits the ENTIRE Brazil map into an 800x800 SVG viewBox
    const projection = d3.geoMercator().fitExtent([[30, 30], [770, 770]], geojson as any);
    const pathGenerator = d3.geoPath().projection(projection);
    
    return { pathGenerator, features: geojson.features || [] };
  }, [geojson]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
        <p className="text-cream/50 animate-pulse text-xs tracking-widest uppercase">Carregando mapa...</p>
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
    <div className="w-full relative flex items-center justify-center" style={{ perspective: '1200px' }}>
      <motion.div 
        className="w-full relative"
        initial={{ rotateX: 45, rotateZ: -15, opacity: 0, scale: 0.8 }}
        whileInView={{ rotateX: 25, rotateZ: -5, opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg 
          viewBox="0 0 800 800" 
          className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow filter for highlighted states */}
            <filter id="glow-map" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F295" />
              <stop offset="50%" stopColor="#E0AA3E" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
 
          <g>
            {/* Draw non-highlighted states */}
            {features.map((feature: any) => {
              const name = feature.properties.name;
              const isHighlighted = HIGHLIGHTED_STATES.includes(name);
              const path = pathGenerator ? pathGenerator(feature) || '' : '';
              
              if (isHighlighted) return null;
 
              return (
                <path
                  key={`state-${name}`}
                  d={path}
                  fill="rgba(255, 255, 255, 0.05)"
                  stroke="rgba(201, 168, 76, 0.12)"
                  strokeWidth={0.8}
                />
              );
            })}
 
            {/* Draw highlighted states */}
            {features.map((feature: any) => {
              const name = feature.properties.name;
              const isHighlighted = HIGHLIGHTED_STATES.includes(name);
              const path = pathGenerator ? pathGenerator(feature) || '' : '';
              
              if (!isHighlighted) return null;
 
              const highlightIndex = HIGHLIGHTED_STATES.indexOf(name);
 
              return (
                <motion.g 
                  key={`highlight-${name}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: highlightIndex * 0.4 + 0.6 }}
                >
                  <path
                    d={path}
                    fill="var(--color-gold)"
                    filter="url(#glow-map)"
                    style={{ opacity: 0.35 }}
                  />
                  <path
                    d={path}
                    fill="url(#highlightGradient)"
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />
                </motion.g>
              );
            })}
 
            {/* Draw labels and pins */}
            {features.map((feature: any) => {
              const name = feature.properties.name;
              const isHighlighted = HIGHLIGHTED_STATES.includes(name);
              
              if (!isHighlighted || !pathGenerator) return null;
 
              const centroid = pathGenerator.centroid(feature);
              if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return null;
 
              const highlightIndex = HIGHLIGHTED_STATES.indexOf(name);
 
              // Manual adjustments for visual balance inside the rotated map
              let offsetX = 0;
              let offsetY = 0;
              if (name === "Espírito Santo") offsetX = 12;
              if (name === "Bahia") offsetY = -5;
 
              return (
                <g 
                  key={`label-container-${name}`} 
                  transform={`translate(${centroid[0] + offsetX}, ${centroid[1] + offsetY})`}
                >
                  <motion.g
                    initial={{ opacity: 0, scale: 0, y: 15 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: highlightIndex * 0.4 + 1.4 
                    }}
                  >
                    {/* Map Pin */}
                    <g transform="translate(0, -15)">
                      <path 
                        d="M 0 0 C -3 -6 -7 -10 -7 -16 A 7 7 0 1 1 7 -16 C 7 -10 3 -6 0 0 Z" 
                        fill="var(--color-gold)" 
                        stroke="#FFFFFF" 
                        strokeWidth="1.5"
                        filter="url(#glow-map)"
                      />
                      <circle cx="0" cy="-16" r="2" fill="#FFFFFF" />
                    </g>

                    <text
                      y={18}
                      textAnchor="middle"
                      fill="var(--color-cream)"
                      style={{ 
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textShadow: '0 4px 8px rgba(0,0,0,0.9)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {name}
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
