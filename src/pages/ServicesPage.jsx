import React, { useState } from 'react'
import { Fade, Pill, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'
import { SERVICES } from '../data'

// Per-service colour accents — matches the colour system across the site
const SERVICE_CONFIG = {
  '01': {
    accent: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.32)',
    icon: 'rgba(167,139,250,1)',       label: 'rgba(167,139,250,0.7)', dot: '#8b5cf6',
  },
  '02': {
    accent: 'rgba(234,179,8,0.13)',   border: 'rgba(234,179,8,0.30)',
    icon: 'rgba(250,204,21,1)',         label: 'rgba(250,204,21,0.7)',  dot: '#eab308',
  },
  '03': {
    accent: 'rgba(249,115,22,0.13)',  border: 'rgba(249,115,22,0.30)',
    icon: 'rgba(251,146,60,1)',         label: 'rgba(251,146,60,0.7)',  dot: '#f97316',
  },
  '04': {
    accent: 'rgba(20,184,166,0.13)',  border: 'rgba(20,184,166,0.30)',
    icon: 'rgba(45,212,191,1)',         label: 'rgba(45,212,191,0.7)',  dot: '#14b8a6',
  },
  '05': {
    accent: 'rgba(59,130,246,0.13)',  border: 'rgba(59,130,246,0.30)',
    icon: 'rgba(96,165,250,1)',         label: 'rgba(96,165,250,0.7)',  dot: '#3b82f6',
  },
  '06': {
    accent: 'rgba(236,72,153,0.13)',  border: 'rgba(236,72,153,0.30)',
    icon: 'rgba(244,114,182,1)',        label: 'rgba(244,114,182,0.7)', dot: '#ec4899',
  },
}

const ICONS = {
  '01': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  '02': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  '03': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
    </svg>
  ),
  '04': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  '05': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3"/>
    </svg>
  ),
  '06': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
}

export default function ServicesPage() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [hovIdx, setHovIdx] = useState(null)

  const gridCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  return (
    <SectionWrap
      eyebrow="Services"
      title="What I Build"
      sub="End-to-end automation solutions — from CRM systems to AI voice agents."
    >
      <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: isMobile ? 12 : 16 }}>
        {SERVICES.map((svc, idx) => {
          const isHov = hovIdx === idx
          const cfg = SERVICE_CONFIG[svc.num]

          return (
            <Fade key={svc.num} d={60 + idx * 50}>
              <div
                onMouseEnter={() => setHovIdx(idx)}
                onMouseLeave={() => setHovIdx(null)}
                style={{
                  position: 'relative', overflow: 'hidden',
                  background: isHov ? cfg.accent : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${isHov ? cfg.border : 'rgba(200,200,220,0.1)'}`,
                  borderRadius: 16,
                  padding: isMobile ? '20px' : '24px',
                  transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.26s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: isHov
                    ? `0 24px 52px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`
                    : '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                  cursor: 'default', height: '100%', boxSizing: 'border-box',
                }}
              >
                {/* Coloured top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${cfg.border}, transparent)`,
                  opacity: isHov ? 1 : 0.3, transition: 'opacity 0.26s',
                }} />

                {/* Corner glow */}
                {isHov && (
                  <div style={{
                    position: 'absolute', top: -40, right: -40,
                    width: 120, height: 120, borderRadius: '50%',
                    background: `radial-gradient(circle, ${cfg.accent} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Icon + Number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: isHov ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isHov ? cfg.border : 'rgba(200,200,220,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isHov ? cfg.icon : '#606070',
                    transition: 'all 0.26s ease', flexShrink: 0,
                  }}>
                    {ICONS[svc.num]}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: isHov ? cfg.label : '#383842',
                    letterSpacing: '0.08em', transition: 'color 0.26s',
                  }}>
                    {svc.num}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  margin: '0 0 10px',
                  fontSize: isMobile ? 15 : 16, fontWeight: 700,
                  color: isHov ? '#f0f0f4' : '#c0c0cc',
                  lineHeight: 1.3, letterSpacing: '-0.01em',
                  transition: 'color 0.26s',
                }}>
                  {svc.title}
                </h3>

                {/* Description */}
                <p style={{
                  margin: '0 0 18px',
                  fontSize: isMobile ? 13 : 13.5, lineHeight: 1.75,
                  color: isHov ? '#787888' : '#606068',
                  transition: 'color 0.26s',
                }}>
                  {svc.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {svc.tags.map((tag) => (
                    <span key={tag} style={{
                      display: 'inline-block', padding: '4px 10px', borderRadius: 5,
                      border: `1px solid ${isHov ? cfg.border : 'rgba(200,200,220,0.12)'}`,
                      background: isHov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                      color: isHov ? cfg.label : '#666672',
                      fontSize: 11.5, fontWeight: 500, transition: 'all 0.2s ease',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Coloured dot */}
                <div style={{
                  position: 'absolute', bottom: 16, right: 18,
                  width: 6, height: 6, borderRadius: '50%',
                  background: cfg.dot,
                  opacity: isHov ? 0.8 : 0.15,
                  transition: 'opacity 0.26s',
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