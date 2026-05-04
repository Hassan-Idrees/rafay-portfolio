import React, { useState } from 'react'
import { Fade, SilverText, Pill, HoverCard, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'
import { S } from '../palette'
import { STACK } from '../data'

export default function StackPage({ go }) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [hoveredTool, setHoveredTool] = useState(null)

  const gridColumns = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  const proficiencies = [
    { name: 'GoHighLevel', pct: 98 },
    { name: 'n8n', pct: 96 },
    { name: 'Zapier', pct: 94 },
    { name: 'Make', pct: 92 },
    { name: 'GPT / AI APIs', pct: 90 },
    { name: 'VAPI & Voice', pct: 88 },
  ]

  return (
    <SectionWrap
      eyebrow="Tech Stack"
      title="Tools & Platforms"
      sub="What I use daily to deliver automation at scale."
    >
      {/* Category Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: 16, marginBottom: 32 }}>
        {STACK.map((cat, idx) => (
          <Fade key={cat.cat} d={100 + idx * 80}>
            <HoverCard style={{ padding: isMobile ? 22 : 26 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: S.faint, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>
                {cat.cat}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.items.map((tool) => {
                  const isToolHovered = hoveredTool === tool
                  return (
                    <span
                      key={tool}
                      onMouseEnter={() => setHoveredTool(tool)}
                      onMouseLeave={() => setHoveredTool(null)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 8,
                        border: `1px solid ${isToolHovered ? S.borderHov : S.border}`,
                        background: isToolHovered ? S.cardHov : 'transparent',
                        color: isToolHovered ? '#c8c8d0' : S.pill,
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        transform: isToolHovered ? 'translateY(-2px)' : 'none',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        display: 'inline-block',
                      }}
                    >
                      {tool}
                    </span>
                  )
                })}
              </div>
            </HoverCard>
          </Fade>
        ))}
      </div>

      {/* Proficiency Section */}
      <HoverCard style={{ padding: isMobile ? 24 : 32 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: S.faint, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
          Proficiency
        </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '18px 48px' }}>
          {proficiencies.map((skill) => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.88rem', color: S.body }}>{skill.name}</span>
                <span style={{ fontSize: '0.78rem', color: S.faint }}>
                  <SilverText>{skill.pct}%</SilverText>
                </span>
              </div>
              <div style={{ height: 3, background: 'rgba(200,200,210,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${skill.pct}%`,
                    background: 'linear-gradient(to right, rgba(200,200,210,0.45), rgba(200,200,210,0.1))',
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </HoverCard>
    </SectionWrap>
  )
}
