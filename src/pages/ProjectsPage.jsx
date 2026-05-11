import React, { useState } from 'react'
import { Fade, Pill, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'
import { PROJECTS } from '../data'

// Each category gets a colour accent
const CAT_COLORS = {
  'AI Agents': { bg: 'rgba(139,92,246,0.14)', border: 'rgba(139,92,246,0.32)', text: 'rgba(167,139,250,0.9)',  dot: '#8b5cf6' },
  'GHL':       { bg: 'rgba(20,184,166,0.14)',  border: 'rgba(20,184,166,0.32)',  text: 'rgba(45,212,191,0.9)',   dot: '#14b8a6' },
  'Voice AI':  { bg: 'rgba(234,179,8,0.14)',   border: 'rgba(234,179,8,0.32)',   text: 'rgba(250,204,21,0.9)',   dot: '#eab308' },
  'Make':      { bg: 'rgba(249,115,22,0.14)',  border: 'rgba(249,115,22,0.32)',  text: 'rgba(251,146,60,0.9)',   dot: '#f97316' },
  'AI':        { bg: 'rgba(59,130,246,0.14)',  border: 'rgba(59,130,246,0.32)',  text: 'rgba(96,165,250,0.9)',   dot: '#3b82f6' },
  'Zapier':    { bg: 'rgba(236,72,153,0.14)',  border: 'rgba(236,72,153,0.32)',  text: 'rgba(244,114,182,0.9)',  dot: '#ec4899' },
}

const DEFAULT_COLOR = { bg: 'rgba(200,200,220,0.1)', border: 'rgba(200,200,220,0.25)', text: 'rgba(180,180,200,0.9)', dot: '#a0a0b0' }

export default function ProjectsPage() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [hovIdx, setHovIdx] = useState(null)

  const gridCols = isMobile ? '1fr' : 'repeat(2, 1fr)'

  return (
    <SectionWrap
      eyebrow="Projects"
      title="Selected Work"
      sub="Real systems delivering measurable results for real clients."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        gap: isMobile ? 14 : 16,
      }}>
        {PROJECTS.map((project, idx) => {
          const isHov = hovIdx === idx
          const clr = CAT_COLORS[project.cat] || DEFAULT_COLOR

          return (
            <Fade key={project.title} d={60 + idx * 55}>
              <div
                onMouseEnter={() => setHovIdx(idx)}
                onMouseLeave={() => setHovIdx(null)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: isHov ? clr.bg : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHov ? clr.border : 'rgba(200,200,220,0.1)'}`,
                  borderRadius: 18,
                  padding: isMobile ? '20px 20px' : '26px 26px',
                  transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: isHov
                    ? `0 24px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`
                    : '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Coloured top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${clr.border}, transparent)`,
                  opacity: isHov ? 1 : 0.3,
                  transition: 'opacity 0.28s',
                }} />

                {/* Corner glow on hover */}
                {isHov && (
                  <div style={{
                    position: 'absolute', top: -50, right: -50,
                    width: 150, height: 150, borderRadius: '50%',
                    background: `radial-gradient(circle, ${clr.bg} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                {/* ── Top row: category badge + index ── */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 16,
                }}>
                  {/* Category badge */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 10px',
                    background: isHov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isHov ? clr.border : 'rgba(200,200,220,0.12)'}`,
                    borderRadius: 6,
                    fontSize: 10, fontWeight: 700,
                    color: isHov ? clr.text : '#555565',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    transition: 'all 0.28s ease',
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: isHov ? clr.dot : '#404050',
                      transition: 'background 0.28s',
                      flexShrink: 0,
                      boxShadow: isHov ? `0 0 6px ${clr.dot}` : 'none',
                    }} />
                    {project.cat}
                  </span>

                  {/* Index number */}
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: isHov ? '#606070' : '#383842',
                    letterSpacing: '0.06em',
                    fontVariantNumeric: 'tabular-nums',
                    transition: 'color 0.28s',
                  }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* ── Title ── */}
                <h3 style={{
                  margin: '0 0 10px',
                  fontSize: isMobile ? 16 : 17,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: isHov ? '#f0f0f4' : '#c0c0cc',
                  letterSpacing: '-0.02em',
                  transition: 'color 0.28s',
                }}>
                  {project.title}
                </h3>

                {/* ── Description ── */}
                <p style={{
                  margin: '0 0 20px',
                  fontSize: isMobile ? 13 : 13.5,
                  lineHeight: 1.75,
                  color: isHov ? '#787888' : '#606068',
                  transition: 'color 0.28s',
                  flexGrow: 1,
                }}>
                  {project.desc}
                </p>

                {/* ── Metrics strip ── */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                  padding: '16px 0',
                  borderTop: `1px solid ${isHov ? 'rgba(255,255,255,0.08)' : 'rgba(200,200,220,0.08)'}`,
                  borderBottom: `1px solid ${isHov ? 'rgba(255,255,255,0.08)' : 'rgba(200,200,220,0.08)'}`,
                  marginBottom: 18,
                  transition: 'border-color 0.28s',
                }}>
                  {project.m.map((metric, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: isMobile ? 17 : 19,
                        fontWeight: 700,
                        color: isHov ? clr.text : '#a0a0b0',
                        lineHeight: 1,
                        marginBottom: 5,
                        letterSpacing: '-0.02em',
                        transition: 'color 0.28s',
                      }}>
                        {metric[0]}
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: isHov ? '#606070' : '#484852',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        transition: 'color 0.28s',
                      }}>
                        {metric[1]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Tags ── */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 5,
                        border: `1px solid ${isHov ? 'rgba(255,255,255,0.12)' : 'rgba(200,200,220,0.12)'}`,
                        background: isHov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                        color: isHov ? '#9090a4' : '#666672',
                        fontSize: 11.5,
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Coloured dot — bottom right */}
                <div style={{
                  position: 'absolute', bottom: 18, right: 20,
                  width: 6, height: 6, borderRadius: '50%',
                  background: clr.dot,
                  opacity: isHov ? 0.8 : 0.15,
                  transition: 'opacity 0.28s',
                  boxShadow: isHov ? `0 0 8px ${clr.dot}` : 'none',
                }} />
              </div>
            </Fade>
          )
        })}
      </div>
    </SectionWrap>
  )
}