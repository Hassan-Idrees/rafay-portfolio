import React, { useState, useEffect, useRef } from 'react'
import { S } from '../palette'

// ─── hooks ───────────────────────────────────────────────────────────────────

export function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect() } }) },
      { threshold, rootMargin: '40px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, isVisible]
}

export function useIsMobile() {
  const [v, setV] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return v
}

export function useIsTablet() {
  const [v, setV] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false)
  useEffect(() => {
    const fn = () => { const w = window.innerWidth; setV(w >= 768 && w < 1024) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return v
}

// ─── Fade ────────────────────────────────────────────────────────────────────

export function Fade({ children, d = 0, style = {} }) {
  const [ref, isVisible] = useReveal(0.1)
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'none' : 'translateY(28px)',
      transition: `opacity 0.55s ease ${d}ms, transform 0.55s ease ${d}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── SilverText — gradient-safe with compositing layer ───────────────────────

export function SilverText({ children, style = {} }) {
  return (
    <span style={{
      background: 'linear-gradient(135deg, #f0f0f2 0%, #b8b8bc 50%, #d0d0d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      WebkitTransform: 'translateZ(0)',
      transform: 'translateZ(0)',
      display: 'inline-block',
      ...style,
    }}>
      {children}
    </span>
  )
}

// ─── Pill — px-based, mobile safe ────────────────────────────────────────────

export function Pill({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '5px 12px',
      border: `1px solid rgba(200,200,210,0.12)`,
      borderRadius: 6,
      fontSize: 12,
      color: '#8a8a94',
      letterSpacing: '0.03em',
      fontWeight: 500,
      lineHeight: 1.5,
    }}>
      {children}
    </span>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export function Divider() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(to right, rgba(200,200,210,0.12), transparent)',
      width: '100%',
    }} />
  )
}

// ─── HoverCard ───────────────────────────────────────────────────────────────

export function HoverCard({ children, style = {} }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: hover ? 'rgba(200,200,210,0.06)' : 'rgba(200,200,210,0.03)',
        border: `1px solid ${hover ? 'rgba(200,200,210,0.22)' : 'rgba(200,200,210,0.09)'}`,
        borderRadius: 14,
        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? '0 20px 48px rgba(0,0,0,0.3)' : 'none',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(200,200,210,0.35), transparent)',
        opacity: hover ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />
      {children}
    </div>
  )
}

// ─── SectionWrap — px-based, 3-breakpoint aware ──────────────────────────────

export function SectionWrap({ children, eyebrow, title, sub }) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  return (
    <section style={{
      padding: isMobile
        ? '64px 18px 72px'
        : isTablet
        ? '72px 28px 80px'
        : '88px 48px 96px',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        <Fade d={0}>
          <div style={{ marginBottom: isMobile ? 36 : 48 }}>
            {eyebrow && (
              <div style={{
                fontSize: 11,
                textTransform: 'uppercase',
                color: S.faint,
                letterSpacing: '0.18em',
                marginBottom: 10,
                fontWeight: 500,
              }}>
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 style={{ margin: '0 0 10px', lineHeight: 1.1 }}>
                <SilverText style={{
                  fontSize: isMobile ? 28 : isTablet ? 34 : 40,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}>
                  {title}
                </SilverText>
              </h2>
            )}
            {sub && (
              <p style={{
                fontSize: isMobile ? 14 : 15,
                color: S.sub,
                maxWidth: 480,
                lineHeight: 1.7,
                margin: 0,
              }}>
                {sub}
              </p>
            )}
            {sub && (
              <div style={{
                width: 48,
                height: 2,
                background: 'linear-gradient(to right, rgba(200,200,210,0.4), transparent)',
                marginTop: 20,
                borderRadius: 2,
              }} />
            )}
          </div>
        </Fade>

        {children}
      </div>
    </section>
  )
}