import React, { useState } from 'react'
import { Fade, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'
import { STACK } from '../data'

const CAT_CONFIG = {
  'CRM & Automation': {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    accent: 'rgba(139,92,246,0.18)',
    accentBorder: 'rgba(139,92,246,0.35)',
    accentIcon: 'rgba(167,139,250,1)',
    accentLabel: 'rgba(167,139,250,0.7)',
    dot: '#8b5cf6',
  },
  'Workflow Engines': {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
      </svg>
    ),
    accent: 'rgba(234,179,8,0.14)',
    accentBorder: 'rgba(234,179,8,0.32)',
    accentIcon: 'rgba(250,204,21,1)',
    accentLabel: 'rgba(250,204,21,0.7)',
    dot: '#eab308',
  },
  'AI & Voice': {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    accent: 'rgba(20,184,166,0.14)',
    accentBorder: 'rgba(20,184,166,0.32)',
    accentIcon: 'rgba(45,212,191,1)',
    accentLabel: 'rgba(45,212,191,0.7)',
    dot: '#14b8a6',
  },
  'Dev & Scripting': {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    accent: 'rgba(59,130,246,0.14)',
    accentBorder: 'rgba(59,130,246,0.32)',
    accentIcon: 'rgba(96,165,250,1)',
    accentLabel: 'rgba(96,165,250,0.7)',
    dot: '#3b82f6',
  },
  'Messaging': {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    accent: 'rgba(236,72,153,0.14)',
    accentBorder: 'rgba(236,72,153,0.32)',
    accentIcon: 'rgba(244,114,182,1)',
    accentLabel: 'rgba(244,114,182,0.7)',
    dot: '#ec4899',
  },
  'Analytics': {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    accent: 'rgba(249,115,22,0.14)',
    accentBorder: 'rgba(249,115,22,0.32)',
    accentIcon: 'rgba(251,146,60,1)',
    accentLabel: 'rgba(251,146,60,0.7)',
    dot: '#f97316',
  },
}

export default function StackPage() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [hovCat, setHovCat] = useState(null)
  const [hovTool, setHovTool] = useState(null)

  const gridCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  return (
    <SectionWrap
      eyebrow="Tech Stack"
      title="Tools & Platforms"
      sub="What I use daily to deliver automation at scale."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        gap: isMobile ? 12 : 16,
      }}>
        {STACK.map((cat, idx) => {
          const cfg = CAT_CONFIG[cat.cat]
          const isHov = hovCat === idx

          return (
            <Fade key={cat.cat} d={50 + idx * 55}>
              <div
                onMouseEnter={() => setHovCat(idx)}
                onMouseLeave={() => setHovCat(null)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: isMobile ? '20px 20px' : '26px 24px',
                  background: isHov ? cfg.accent : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHov ? cfg.accentBorder : 'rgba(200,200,220,0.1)'}`,
                  borderRadius: 18,
                  transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: isHov
                    ? `0 24px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)`
                    : '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                  cursor: 'default',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Coloured top shimmer line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${cfg.accentBorder}, transparent)`,
                  opacity: isHov ? 1 : 0.35,
                  transition: 'opacity 0.28s',
                }} />

                {/* Subtle corner glow on hover */}
                {isHov && (
                  <div style={{
                    position: 'absolute', top: -40, right: -40,
                    width: 120, height: 120,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${cfg.accent} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    opacity: 0.8,
                  }} />
                )}

                {/* Header row: icon + label */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: 12, marginBottom: 20,
                }}>
                  {/* Icon box */}
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: isHov ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isHov ? cfg.accentBorder : 'rgba(200,200,220,0.12)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isHov ? cfg.accentIcon : '#606070',
                    transition: 'all 0.28s ease',
                    flexShrink: 0,
                  }}>
                    {cfg.icon}
                  </div>

                  {/* Category label */}
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: isHov ? cfg.accentLabel : '#555565',
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    transition: 'color 0.28s',
                  }}>
                    {cat.cat}
                  </span>
                </div>

                {/* Tool chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {cat.items.map((tool) => {
                    const key = `${idx}-${tool}`
                    const isToolHov = hovTool === key
                    return (
                      <span
                        key={tool}
                        onMouseEnter={() => setHovTool(key)}
                        onMouseLeave={() => setHovTool(null)}
                        style={{
                          display: 'inline-block',
                          padding: '5px 12px',
                          borderRadius: 6,
                          border: `1px solid ${
                            isToolHov
                              ? cfg.accentBorder
                              : isHov
                              ? 'rgba(255,255,255,0.12)'
                              : 'rgba(200,200,220,0.12)'
                          }`,
                          background: isToolHov
                            ? 'rgba(255,255,255,0.08)'
                            : isHov
                            ? 'rgba(255,255,255,0.04)'
                            : 'rgba(255,255,255,0.03)',
                          color: isToolHov
                            ? '#e0e0e8'
                            : isHov
                            ? '#a0a0b0'
                            : '#787888',
                          fontSize: 12.5,
                          fontWeight: 500,
                          transform: isToolHov ? 'translateY(-1px)' : 'translateY(0)',
                          transition: 'all 0.18s ease',
                          cursor: 'default',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {tool}
                      </span>
                    )
                  })}
                </div>

                {/* Coloured dot — bottom right, subtle branding accent */}
                <div style={{
                  position: 'absolute', bottom: 16, right: 18,
                  width: 6, height: 6, borderRadius: '50%',
                  background: cfg.dot,
                  opacity: isHov ? 0.8 : 0.2,
                  transition: 'opacity 0.28s',
                  boxShadow: isHov ? `0 0 8px ${cfg.dot}` : 'none',
                }} />
              </div>
            </Fade>
          )
        })}
      </div>
    </SectionWrap>
  )
}