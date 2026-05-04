import React, { useState } from 'react'
import { S } from '../palette'
import { STATS } from '../data'
import { Fade, SilverText, useIsMobile, useIsTablet } from '../components/Shared'

export default function HomePage({ go }) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = !isMobile

  const gridColumns = isMobile
    ? '1fr'
    : isTablet
    ? '0.9fr 1fr'
    : '0.85fr 1.15fr'

  const gap = isMobile ? 32 : isTablet ? 36 : 40

  const roles = [
    'Automation Specialist',
    'GHL Expert',
    'n8n Expert',
    'Make & Zapier Pro',
  ]

  const nameStyle = {
    margin: 0,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    fontSize: isMobile ? '2.6rem' : isTablet ? '3rem' : 'clamp(3.2rem, 5vw, 4.4rem)',
  }

  const imgMobileStyle = {
    width: '70%',
    maxWidth: 260,
  }

  const imgDesktopStyle = {
    width: '100%',
    maxWidth: 420,
  }

  const primaryBtnBase = {
    background: S.btnGrad,
    color: '#0a0a0a',
    padding: isMobile ? '13px 28px' : '15px 36px',
    borderRadius: 8,
    fontWeight: 600,
    border: 'none',
    boxShadow: '0 8px 24px rgba(160,160,170,0.1)',
    cursor: 'pointer',
  }

  const secondaryBtnBase = {
    background: 'transparent',
    color: S.body,
    padding: isMobile ? '13px 28px' : '15px 36px',
    borderRadius: 8,
    fontWeight: 600,
    border: `1px solid ${S.border}`,
    cursor: 'pointer',
  }

  const [primHover, setPrimHover] = useState(false)
  const [secHover, setSecHover] = useState(false)

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: isMobile ? 12 : 16,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          width: '100%',
          padding: isDesktop ? '0px 48px' : '0 24px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridColumns,
            gap,
            alignItems: 'center',
          }}
        >
          {/* LEFT - Image */}
          <Fade d={50}>
            <div
              style={{
                position: 'relative',
                order: isMobile ? 2 : 1,
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '15%',
                  left: '10%',
                  width: '80%',
                  height: '70%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(180,180,190,0.06), transparent 70%)',
                  zIndex: 0,
                }}
              />

              <img
                src="https://res.cloudinary.com/dd9zq4nvl/image/upload/v1777855839/rafay_profile_pic_kh1eoi.png"
                alt="Muhammad Rafay"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  filter: 'contrast(1.04) brightness(0.96)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
                  ...(isMobile ? imgMobileStyle : imgDesktopStyle),
                }}
              />
            </div>
          </Fade>

          {/* RIGHT - Content */}
          <div style={{ order: isMobile ? 1 : 2 }}>
            <Fade d={0}>
              <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', padding: 0, marginBottom: isMobile ? 12 : 16 }}>
                <div style={{ display: 'inline-flex', gap: 8, padding: '6px 14px', border: `1px solid ${S.border}`, borderRadius: 6, fontSize: '0.8rem', color: S.pill, letterSpacing: '0.08em', alignItems: 'center' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 6, background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.6)', animation: 'dotPulse 1.8s ease-in-out infinite', display: 'inline-block' }} />
                  <span style={{ color: '#9a9aa2' }}>AVAILABLE FOR PROJECTS</span>
                </div>
              </div>
            </Fade>

            <Fade d={70}>
              <div>
                <p style={{ margin: 0, color: '#8a8a94', fontSize: '1rem' }}>Hi, I'm</p>
                <h1 style={{ ...nameStyle, marginBottom: isMobile ? 18 : 14 }}>
                  <SilverText style={{ display: 'block' }}>Muhammad</SilverText>
                  <span style={{ display: 'block', background: 'linear-gradient(135deg, #c0c0c4, #888890, #a8a8b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Rafay
                  </span>
                </h1>
              </div>
            </Fade>

            <Fade d={130}>
              <div style={{ marginTop: 0, marginBottom: isMobile ? 16 : 14, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                {roles.map((r, i) => (
                  <span key={r} style={{ fontSize: '0.8rem', color: S.sub }}>
                    {r}
                    {i < roles.length - 1 && <span style={{ opacity: 0.6, margin: '0 8px' }}>·</span>}
                  </span>
                ))}
              </div>
            </Fade>

            <Fade d={170}>
              <p style={{ marginTop: 0, marginBottom: isMobile ? 28 : 24, fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.8, color: S.body, maxWidth: 520 }}>
                Expert GoHighLevel & Automation Specialist with <span style={S.headingText}>4+ years of agency experience</span> — building scalable, revenue-driven CRM and automation systems for agencies and service businesses across the <span style={S.headingText}>US, Canada, and Australia</span>.
              </p>
            </Fade>

            <Fade d={210}>
              <div style={{ marginTop: 0, marginBottom: isMobile ? 0 : 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={() => go('Contact')}
                  onMouseEnter={() => setPrimHover(true)}
                  onMouseLeave={() => setPrimHover(false)}
                  style={{
                    ...primaryBtnBase,
                    transform: primHover ? 'translateY(-2px)' : 'none',
                    boxShadow: primHover ? '0 12px 36px rgba(160,160,170,0.16)' : primaryBtnBase.boxShadow,
                  }}
                >
                  Get In Touch
                </button>

                <button
                  onClick={() => go('Projects')}
                  onMouseEnter={() => setSecHover(true)}
                  onMouseLeave={() => setSecHover(false)}
                  style={{
                    ...secondaryBtnBase,
                    border: secHover ? `1px solid ${S.borderHov}` : secondaryBtnBase.border,
                  }}
                >
                  View Projects
                </button>
              </div>
            </Fade>

            <Fade d={260}>
              <div style={{ marginTop: 0, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 12 : 24 }}>
                {STATS.map((s) => (
                  <div key={s.l} style={{ padding: 8 }}>
                    <div style={{ fontSize: isMobile ? '1.8rem' : '2.1rem', fontWeight: 700 }}>
                      <SilverText>{s.v}</SilverText>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: S.faint, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  )
}
