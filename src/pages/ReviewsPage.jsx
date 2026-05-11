import React, { useState } from 'react'
import { Fade, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'
import { REVIEWS } from '../data'

// Avatar accent colours — one per reviewer, cycles
const AVATAR_COLORS = [
  { bg: 'rgba(139,92,246,0.18)',  border: 'rgba(139,92,246,0.35)',  text: 'rgba(167,139,250,1)' },
  { bg: 'rgba(20,184,166,0.18)',  border: 'rgba(20,184,166,0.35)',  text: 'rgba(45,212,191,1)'  },
  { bg: 'rgba(234,179,8,0.18)',   border: 'rgba(234,179,8,0.35)',   text: 'rgba(250,204,21,1)'  },
  { bg: 'rgba(59,130,246,0.18)',  border: 'rgba(59,130,246,0.35)',  text: 'rgba(96,165,250,1)'  },
  { bg: 'rgba(236,72,153,0.18)',  border: 'rgba(236,72,153,0.35)',  text: 'rgba(244,114,182,1)' },
  { bg: 'rgba(249,115,22,0.18)',  border: 'rgba(249,115,22,0.35)',  text: 'rgba(251,146,60,1)'  },
]

function getInitials(name) {
  const p = name.trim().split(' ')
  return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase()
}

// Five gold stars
function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#c8a84b" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [hovIdx, setHovIdx] = useState(null)

  const gridCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  return (
    <SectionWrap
      eyebrow="Testimonials"
      title="Client Reviews"
      sub="Trusted by agencies and businesses worldwide."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        gap: isMobile ? 14 : 16,
      }}>
        {REVIEWS.map((review, idx) => {
          const isHov = hovIdx === idx
          const clr = AVATAR_COLORS[idx % AVATAR_COLORS.length]

          return (
            <Fade key={review.name} d={60 + idx * 55}>
              <div
                onMouseEnter={() => setHovIdx(idx)}
                onMouseLeave={() => setHovIdx(null)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: isHov ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHov ? 'rgba(200,200,220,0.22)' : 'rgba(200,200,220,0.1)'}`,
                  borderRadius: 18,
                  padding: isMobile ? '22px 20px' : '26px 24px',
                  transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: isHov
                    ? '0 24px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)'
                    : '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(220,220,240,0.4), transparent)',
                  opacity: isHov ? 1 : 0.25,
                  transition: 'opacity 0.28s',
                }} />

                {/* Large decorative quote mark */}
                <div style={{
                  position: 'absolute', top: 16, right: 20,
                  fontSize: 80, lineHeight: 1,
                  color: isHov ? 'rgba(220,220,240,0.07)' : 'rgba(220,220,240,0.04)',
                  fontFamily: 'Georgia, serif',
                  pointerEvents: 'none',
                  transition: 'color 0.28s',
                  userSelect: 'none',
                }}>
                  "
                </div>

                {/* Stars */}
                <Stars />

                {/* Quote text */}
                <p style={{
                  margin: '0 0 24px',
                  fontSize: isMobile ? 13.5 : 14,
                  lineHeight: 1.82,
                  color: isHov ? '#9898a8' : '#787882',
                  fontStyle: 'italic',
                  flex: 1,
                  transition: 'color 0.28s',
                }}>
                  "{review.text}"
                </p>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: isHov
                    ? 'rgba(220,220,240,0.12)'
                    : 'rgba(200,200,220,0.07)',
                  marginBottom: 20,
                  transition: 'background 0.28s',
                }} />

                {/* Reviewer row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: clr.bg,
                    border: `1px solid ${clr.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isHov ? `0 0 14px ${clr.bg}` : 'none',
                    transition: 'box-shadow 0.28s',
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: 700,
                      color: clr.text,
                      letterSpacing: '0.02em',
                    }}>
                      {getInitials(review.name)}
                    </span>
                  </div>

                  {/* Name + role */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 700,
                      color: isHov ? '#e0e0e8' : '#b0b0c0',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      transition: 'color 0.28s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {review.name}
                    </div>
                    <div style={{
                      fontSize: 11.5, marginTop: 3,
                      color: isHov ? '#555560' : '#454550',
                      transition: 'color 0.28s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {review.role}
                      <span style={{ margin: '0 5px', opacity: 0.4 }}>·</span>
                      {review.loc}
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