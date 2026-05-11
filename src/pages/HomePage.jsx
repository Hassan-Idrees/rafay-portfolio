import React, { useState } from 'react'
import { STATS } from '../data'
import { Fade, useIsMobile, useIsTablet } from '../components/Shared'

function Hi({ children }) {
  return <strong style={{ color: '#d0d0d4', fontWeight: 600 }}>{children}</strong>
}

function Badge({ icon, title, sub }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'rgba(8,8,10,0.95)',
      border: '1px solid rgba(200,200,210,0.18)',
      borderRadius: 12, padding: '10px 14px',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 12px 32px rgba(0,0,0,0.7)',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: 'rgba(200,200,210,0.08)',
        border: '1px solid rgba(200,200,210,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e8e8f0', lineHeight: 1 }}>{title}</div>
        <div style={{ fontSize: 10, color: '#585860', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>{sub}</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const isMobile  = useIsMobile()
  const isTablet  = useIsTablet()
  const isDesktop = !isMobile && !isTablet

  const [primHov, setPrimHov] = useState(false)
  const [secHov,  setSecHov]  = useState(false)

  const roles = ['Automation Specialist', 'GHL Expert', 'n8n Expert', 'Make & Zapier Pro']
  const nameSize = isMobile ? 40 : isTablet ? 52 : 64
  const imgW     = isMobile ? 240 : isTablet ? 280 : 340

  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: isMobile ? '80px 20px 40px' : isTablet ? '88px 32px 48px' : '80px 48px 48px',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 260px' : '1fr 380px',
          gap: isMobile ? 40 : isTablet ? 36 : 64,
          alignItems: 'start',
        }}>

          {/* ── LEFT ──────────────────────────────────────────────────────── */}
          <div style={{ order: 1 }}>

            {/* Available badge */}
            <Fade d={0}>
              <div style={{ marginBottom: 24 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 14px',
                  border: '1px solid rgba(200,200,210,0.13)',
                  background: 'transparent',
                  borderRadius: 100, fontSize: 11, color: '#9a9aa2',
                  letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.9)',
                    display: 'inline-block', animation: 'dotPulse 1.8s ease-in-out infinite',
                  }} />
                  Available for Projects
                </span>
              </div>
            </Fade>

            {/* Hi I'm */}
            <Fade d={40}>
              <p style={{ margin: '0 0 6px', fontSize: 17, color: '#606068', fontWeight: 400 }}>
                Hi, I'm
              </p>
            </Fade>

            {/* Name — plain colors, no gradient clip */}
            <Fade d={70}>
              <h1 style={{
                margin: '0 0 20px',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.0,
                fontSize: nameSize,
              }}>
                {/* Muhammad — near white */}
                <span style={{ display: 'block', color: '#f0f0f2' }}>
                  Muhammad
                </span>
                {/* Rafay — muted silver, creates two-tone hierarchy */}
                <span style={{ display: 'block', color: '#888894' }}>
                  Rafay
                </span>
              </h1>
            </Fade>

            {/* Roles */}
            <Fade d={110}>
              <div style={{
                display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                rowGap: 4, marginBottom: 20,
                paddingBottom: 20,
                borderBottom: '1px solid rgba(200,200,210,0.08)',
              }}>
                {roles.map((r, i) => (
                  <span key={r} style={{ fontSize: 13, color: '#76767e', fontWeight: 500 }}>
                    {r}
                    {i < roles.length - 1 && (
                      <span style={{ color: '#3a3a42', margin: '0 10px' }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </Fade>

            {/* Bio */}
            <Fade d={145}>
              <p style={{
                margin: '0 0 28px',
                fontSize: 15, lineHeight: 1.82, color: '#88888e', maxWidth: 460,
              }}>
                Expert GoHighLevel & Automation Specialist with{' '}
                <Hi>4+ years of agency experience</Hi>
                {' '}— building scalable, revenue-driven CRM and automation systems
                for agencies and service businesses <Hi>worldwide</Hi>.
              </p>
            </Fade>

            {/* Buttons */}
            <Fade d={180}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                <button
                  onClick={() => window.scrollToSection?.('Contact')}
                  onMouseEnter={() => setPrimHov(true)}
                  onMouseLeave={() => setPrimHov(false)}
                  style={{
                    padding: '12px 28px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                    background: primHov
                      ? 'linear-gradient(135deg, #ececec 0%, #b8b8b8 100%)'
                      : 'linear-gradient(135deg, #d8d8d8 0%, #909090 100%)',
                    color: '#080808', border: 'none', borderRadius: 8, cursor: 'pointer',
                    transform: primHov ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: primHov ? '0 10px 28px rgba(180,180,180,0.2)' : '0 2px 10px rgba(0,0,0,0.3)',
                    transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)', whiteSpace: 'nowrap',
                  }}
                >
                  Get In Touch
                </button>
                <button
                  onClick={() => window.scrollToSection?.('Projects')}
                  onMouseEnter={() => setSecHov(true)}
                  onMouseLeave={() => setSecHov(false)}
                  style={{
                    padding: '12px 28px', fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
                    background: 'transparent',
                    color: secHov ? '#c8c8d0' : '#76767e',
                    border: `1px solid ${secHov ? 'rgba(200,200,210,0.35)' : 'rgba(200,200,210,0.14)'}`,
                    borderRadius: 8, cursor: 'pointer',
                    transform: secHov ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)', whiteSpace: 'nowrap',
                  }}
                >
                  View Projects →
                </button>
              </div>
            </Fade>

            {/* Stats */}
            <Fade d={220}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                columnGap: 20,
                paddingTop: 24,
                borderTop: '1px solid rgba(200,200,210,0.09)',
              }}>
                {STATS.map((s) => (
                  <div key={s.l}>
                    {/* Stat value — plain color, no gradient clip */}
                    <div style={{
                      fontSize: isMobile ? 22 : 28,
                      fontWeight: 700,
                      color: '#d8d8dc',
                      lineHeight: 1,
                      marginBottom: 6,
                      letterSpacing: '-0.02em',
                    }}>
                      {s.v}
                    </div>
                    <div style={{
                      fontSize: 10, color: '#505058',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      lineHeight: 1.4, fontWeight: 500,
                    }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          {/* ── RIGHT: Image ──────────────────────────────────────────────── */}
          <div style={{
            order: isMobile ? -1 : 2,
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            position: isMobile ? 'relative' : 'sticky',
            top: isMobile ? 'auto' : 88,
            alignSelf: 'start',
          }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>

              {/* gradient border frame */}
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: 24, padding: 1.5,
                background: 'linear-gradient(145deg, rgba(220,220,235,0.25) 0%, rgba(220,220,235,0.02) 50%, rgba(220,220,235,0.15) 100%)',
                display: 'inline-block',
              }}>
                <div style={{ borderRadius: 23, overflow: 'hidden', background: '#0c0c0c' }}>
                  <img
                    src="https://res.cloudinary.com/dd9zq4nvl/image/upload/v1777855839/rafay_profile_pic_kh1eoi.png"
                    alt="Muhammad Rafay"
                    style={{
                      display: 'block',
                      width: imgW,
                      height: isMobile ? 300 : isTablet ? 360 : 420,
                      objectFit: 'cover',
                      objectPosition: 'center 15%',
                      filter: 'contrast(1.04) brightness(0.96)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                    }}
                  />
                </div>

                {/* 100+ Agents — percentage-based so always below face */}
                {!isMobile && (
                  <div style={{ position: 'absolute', bottom: '28%', right: -16, zIndex: 4 }}>
                    <Badge icon="🤖" title="100+ Agents" sub="AI & Voice Built" />
                  </div>
                )}

                {/* 4+ Years — bottom area */}
                {!isMobile && (
                  <div style={{ position: 'absolute', bottom: '10%', left: -16, zIndex: 4 }}>
                    <Badge icon="⚡" title="4+ Years" sub="Agency Experience" />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}