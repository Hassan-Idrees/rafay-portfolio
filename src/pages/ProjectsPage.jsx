import React, { useState } from 'react'
import { Fade, SilverText, Pill, SectionWrap, useIsMobile } from '../components/Shared'
import { S } from '../palette'
import { PROJECTS } from '../data'

export default function ProjectsPage({ go }) {
  const isMobile = useIsMobile()
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const gridColumns = isMobile ? '1fr' : 'repeat(2, 1fr)'

  return (
    <SectionWrap
      eyebrow="Projects"
      title="Selected Work"
      sub="Real systems delivering measurable results."
    >
      <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: 16 }}>
        {PROJECTS.map((project, idx) => {
          const isHovered = hoveredIdx === idx
          const cardStyle = {
            position: 'relative',
            overflow: 'hidden',
            background: isHovered ? S.cardHov : S.cardBg,
            border: `1px solid ${isHovered ? S.borderHov : S.border}`,
            borderRadius: 14,
            padding: isMobile ? 22 : 28,
            transform: isHovered ? 'translateY(-6px)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: 'pointer',
            boxShadow: isHovered ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
          }

          return (
            <Fade key={project.title} d={100 + idx * 80}>
              <div
                style={cardStyle}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(200,200,210,0.35), transparent)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }} />

                {/* Top Row - Category & Index */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.72rem', color: S.faint, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                    {project.cat}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: S.faint, opacity: 0.5 }}>
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '1.05rem' : '1.15rem', fontWeight: 600, lineHeight: 1.3 }}>
                  <SilverText>{project.title}</SilverText>
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: S.body, margin: '10px 0 16px 0' }}>
                  {project.desc}
                </p>

                {/* Metrics Strip */}
                <div style={{ borderTop: `1px solid ${S.border}`, borderBottom: `1px solid ${S.border}`, padding: '16px 0', marginBottom: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
                  {project.m.map((metric, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                        <SilverText>{metric[0]}</SilverText>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: S.faint, marginTop: 4 }}>
                        {metric[1]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </div>
            </Fade>
          )
        })}
      </div>
    </SectionWrap>
  )
}
