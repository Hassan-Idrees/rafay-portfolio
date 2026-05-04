import React, { useState, useEffect, useRef } from 'react'
import { S } from '../palette'

export function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold, rootMargin: '40px' }
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth >= 768 && window.innerWidth < 1024
      : false
  )

  useEffect(() => {
    function onResize() {
      const w = window.innerWidth
      setIsTablet(w >= 768 && w < 1024)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isTablet
}

export function Fade({ children, d = 0, style = {} }) {
  const [ref, isVisible] = useReveal(0.1)

  const base = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : 'translateY(36px)',
    transition: `opacity 0.6s ease ${d}ms, transform 0.6s ease ${d}ms`,
  }

  return (
    <div ref={ref} style={{ ...base, ...style }}>
      {children}
    </div>
  )
}

export function SilverText({ children, style = {} }) {
  return <span style={{ ...(S?.headingText || {}), ...style }}>{children}</span>
}

export function Pill({ children }) {
  const style = {
    padding: '5px 14px',
    border: `1px solid ${S?.border}`,
    borderRadius: 6,
    fontSize: '0.75rem',
    color: S?.sub,
    letterSpacing: '0.03em',
    fontWeight: 500,
    display: 'inline-block',
  }
  return <span style={style}>{children}</span>
}

export function Divider() {
  const style = {
    height: 1,
    background: `linear-gradient(to right, ${S?.border}, transparent)`,
    width: '100%',
  }
  return <div style={style} />
}

export function HoverCard({ children, style = {} }) {
  const [hover, setHover] = useState(false)
  const base = {
    position: 'relative',
    overflow: 'hidden',
    background: hover ? S?.cardHov : S?.cardBg,
    border: `1px solid ${hover ? S?.borderHov : S?.border}`,
    borderRadius: 12,
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    transform: hover ? 'translateY(-6px)' : 'none',
    boxShadow: hover ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
  }

  const accent = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: 'linear-gradient(90deg, transparent, rgba(200,200,210,0.35), transparent)',
    opacity: hover ? 1 : 0,
    transition: 'opacity 0.3s',
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...style }}
    >
      <div style={accent} />
      {children}
    </div>
  )
}

export function SectionWrap({ children, eyebrow, title, sub }) {
  const isMobile = useIsMobile()

  const wrapStyle = {
    minHeight: 'calc(100vh - 64px)',
    padding: isMobile ? '48px 20px' : '80px 48px',
  }

  const containerStyle = {
    maxWidth: 1180,
    margin: '0 auto',
  }

  const eyebrowStyle = {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: S?.faint,
    letterSpacing: '0.2em',
    marginBottom: 8,
  }

  const titleStyle = {
    fontSize: isMobile ? '2rem' : 'clamp(2.4rem, 4vw, 3.4rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    margin: 0,
  }

  const subStyle = {
    color: S?.sub,
    maxWidth: 500,
    lineHeight: 1.7,
    marginTop: 12,
  }

  return (
    <section style={wrapStyle}>
      <div style={containerStyle}>
        <Fade d={0}>
          <header>
            {eyebrow && <div style={eyebrowStyle}>{eyebrow}</div>}
            {title && (
              <h2 style={{ margin: '8px 0' }}>
                <SilverText style={titleStyle}>{title}</SilverText>
              </h2>
            )}
            {sub && <p style={subStyle}>{sub}</p>}
            {sub && (
              <div style={{ width: 60, height: 2, background: 'linear-gradient(to right, #b8b8b8, transparent)', marginTop: 20 }} />
            )}
          </header>
        </Fade>

        <div style={{ marginTop: 32 }}>{children}</div>
      </div>
    </section>
  )
}
