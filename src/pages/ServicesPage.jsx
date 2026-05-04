import React, { useState } from 'react'
import { Fade, SilverText, Pill, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'
import { S } from '../palette'
import { SERVICES } from '../data'

export default function ServicesPage({ go }) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const gridColumns = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  return (
    <SectionWrap
      eyebrow="Services"
      title="What I Build"
      sub="Comprehensive automation solutions tailored to your needs."
    >
      <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: 16 }}>
        {SERVICES.map((service, idx) => {
          const isHovered = hoveredIdx === idx
          const cardStyle = {
            position: 'relative',
            overflow: 'hidden',
            background: isHovered ? S.cardHov : S.cardBg,
            border: `1px solid ${isHovered ? S.borderHov : S.border}`,
            borderRadius: 12,
            padding: isMobile ? 24 : 28,
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            transform: isHovered ? 'translateY(-6px)' : 'none',
            height: '100%',
            cursor: 'pointer',
            boxShadow: isHovered ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
          }

          return (
            <Fade key={service.num} d={100 + idx * 80}>
              <div
                style={cardStyle}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(200,200,210,0.35), transparent)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }} />

                {/* Top Row - Icon & Number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: 26 }}>{service.icon}</span>
                  <span style={{ fontSize: '0.72rem', color: S.faint, fontWeight: 600 }}>
                    <SilverText>{service.num}</SilverText>
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ margin: '12px 0 10px 0', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.3 }}>
                  <SilverText>{service.title}</SilverText>
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: S.body, margin: '10px 0 16px 0' }}>
                  {service.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {service.tags.map((tag) => (
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
