import React, { useState } from 'react'
import { Fade, SilverText, Divider, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'
import { S } from '../palette'
import { REVIEWS } from '../data'

export default function ReviewsPage({ go }) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const gridColumns = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  const getInitials = (name) => {
    const parts = name.split(' ')
    return (parts[0]?.[0] + parts[1]?.[0]).toUpperCase()
  }

  return (
    <SectionWrap
      eyebrow="Testimonials"
      title="Client Reviews"
      sub="Trusted by agencies across the US, Canada, and Australia."
    >
      <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: 16 }}>
        {REVIEWS.map((review, idx) => {
          const isHovered = hoveredIdx === idx
          const cardStyle = {
            position: 'relative',
            overflow: 'hidden',
            background: isHovered ? S.cardHov : S.cardBg,
            border: `1px solid ${isHovered ? S.borderHov : S.border}`,
            borderRadius: 14,
            padding: isMobile ? 22 : 26,
            transform: isHovered ? 'translateY(-6px)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: isHovered ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
          }

          return (
            <Fade key={review.name} d={100 + idx * 80}>
              <div
                style={cardStyle}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div style={{ position: 'absolute', top: 10, right: 16, fontSize: '4rem', color: 'rgba(200,200,210,0.05)', lineHeight: 1, fontFamily: 'Georgia, serif', pointerEvents: 'none' }}>
                  "
                </div>

                {/* Stars Row */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: '#c8a84b', fontSize: 16 }}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: S.body, fontStyle: 'italic', flex: 1, marginBottom: 20, margin: 0 }}>
                  "{review.text}"
                </p>

                {/* Divider */}
                <div style={{ margin: '20px 0' }}>
                  <Divider />
                </div>

                {/* Reviewer Info */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: 16 }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, rgba(200,200,210,0.1), rgba(200,200,210,0.03))',
                      border: `1px solid rgba(200,200,210,0.12)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: S.pill }}>
                      {getInitials(review.name)}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                      <SilverText>{review.name}</SilverText>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: S.faint, marginTop: 2 }}>
                      {review.role} • {review.loc}
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          )
        })}
      </div>
    </SectionWrap>
  )
}
