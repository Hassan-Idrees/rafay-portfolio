import React, { useState, useEffect, useRef, useCallback } from 'react'
import { S } from '../palette'
import { NAV } from '../data'

// ─── breakpoints ────────────────────────────────────────────────────────────
function useBreakpoint() {
  const get = () => {
    if (typeof window === 'undefined') return 'desktop'
    const w = window.innerWidth
    if (w < 768) return 'mobile'
    if (w < 1024) return 'tablet'
    return 'desktop'
  }
  const [bp, setBp] = useState(get)
  useEffect(() => {
    const fn = () => setBp(get())
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return bp
}

// ─── active section tracker ──────────────────────────────────────────────────
function useActiveSection(sectionRefs) {
  const [active, setActive] = useState('Home')
  useEffect(() => {
    function onScroll() {
      let current = 'Home'
      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref?.current) {
          const top = ref.current.getBoundingClientRect().top
          if (top <= 120) current = section
        }
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRefs])
  return active
}

// ─── scroll depth tracker ────────────────────────────────────────────────────
function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [threshold])
  return scrolled
}

// ─── AnimatedBurger ──────────────────────────────────────────────────────────
function AnimatedBurger({ open }) {
  const bar = (extra) => ({
    display: 'block',
    width: 22,
    height: 1.5,
    background: 'rgba(200,200,210,0.75)',
    borderRadius: 2,
    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease',
    ...extra,
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5.5, alignItems: 'center', justifyContent: 'center' }}>
      <span style={bar({ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' })} />
      <span style={bar({ opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' })} />
      <span style={bar({ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' })} />
    </div>
  )
}

// ─── ActiveDot ───────────────────────────────────────────────────────────────
function ActiveDot() {
  return (
    <span style={{
      display: 'block', width: 3, height: 3, borderRadius: '50%',
      background: 'rgba(220,220,230,0.7)', margin: '3px auto 0',
    }} />
  )
}

// ─── main Header ─────────────────────────────────────────────────────────────
export default function Header({ scrollToSection, sectionRefs }) {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const isCompact = isMobile || isTablet

  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState(null)
  const [ctaHov, setCtaHov] = useState(false)
  const menuRef = useRef(null)
  const burgerRef = useRef(null)

  const scrolled = useScrolled()
  const active = useActiveSection(sectionRefs)

  useEffect(() => { if (!isCompact) setOpen(false) }, [isCompact])

  useEffect(() => {
    if (!open) return
    function handle(e) {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        burgerRef.current && !burgerRef.current.contains(e.target)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  useEffect(() => {
    if (isMobile) document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open, isMobile])

  const handleNav = useCallback((section) => {
    scrollToSection(section)
    setOpen(false)
  }, [scrollToSection])

  const headerH = isMobile ? 58 : 68

  const header = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    height: headerH,
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    background: scrolled ? 'rgba(8,8,8,0.94)' : 'rgba(10,10,10,0.55)',
    borderBottom: `1px solid ${scrolled ? 'rgba(200,200,210,0.1)' : S.border}`,
    transition: 'background 0.4s ease, border-color 0.4s ease',
  }

  const inner = {
    maxWidth: 1200, margin: '0 auto', height: '100%',
    padding: isMobile ? '0 18px' : isTablet ? '0 28px' : '0 48px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  }

  const logoWrap = {
    display: 'flex', alignItems: 'center', gap: 10,
    cursor: 'pointer', flexShrink: 0, userSelect: 'none',
  }

  const logoBox = {
    width: 36, height: 36, borderRadius: 8,
    border: '1px solid rgba(200,200,210,0.14)',
    background: 'rgba(200,200,210,0.05)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }

  const navPill = {
    display: 'flex', alignItems: 'center', gap: 2,
    background: 'rgba(200,200,210,0.04)',
    border: '1px solid rgba(200,200,210,0.08)',
    borderRadius: 12, padding: '5px 6px',
  }

  const ctaBtn = {
    padding: isTablet ? '8px 14px' : '9px 20px',
    fontSize: 13, fontWeight: 600, letterSpacing: '0.02em',
    borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    background: ctaHov ? 'linear-gradient(135deg, #e0e0e0 0%, #a0a0a0 100%)' : S.btnGrad,
    color: '#0a0a0a',
    transform: ctaHov ? 'translateY(-1px)' : 'none',
    boxShadow: ctaHov ? '0 8px 24px rgba(160,160,170,0.18)' : 'none',
    transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
    whiteSpace: 'nowrap', flexShrink: 0,
  }

  const burgerBtn = {
    width: 38, height: 38,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: open ? 'rgba(220,220,230,0.09)' : 'transparent',
    border: `1px solid ${open ? 'rgba(200,200,210,0.18)' : 'transparent'}`,
    borderRadius: 8, cursor: 'pointer', padding: 0,
    transition: 'all 0.25s ease', flexShrink: 0,
  }

  const drawerStyle = {
    position: 'fixed', top: headerH, left: 0, right: 0, bottom: 0,
    zIndex: 999, display: 'flex', flexDirection: 'column',
    background: 'rgba(8,8,8,0.97)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    borderTop: '1px solid rgba(200,200,210,0.08)',
    padding: '28px 24px 40px',
    transform: open ? 'translateY(0)' : 'translateY(-8px)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'all' : 'none',
    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
    overflowY: 'auto',
  }

  const tabletDropdown = {
    position: 'fixed', top: headerH + 8, right: 28, width: 220,
    background: 'rgba(12,12,12,0.98)',
    border: '1px solid rgba(200,200,210,0.1)',
    borderRadius: 14, padding: '8px',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
    zIndex: 999,
    transform: open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.97)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'all' : 'none',
    transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease',
    transformOrigin: 'top right',
  }

  return (
    <>
      <header style={header}>
        <div style={inner}>

          {/* Logo */}
          <div
            style={logoWrap}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button" tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div style={logoBox}>
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.5px', ...S.headingText }}>MR</span>
            </div>
            {!isMobile && (
              <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#c0c0c8', display: isTablet ? 'none' : 'block' }}>
                Muhammad Rafay
              </span>
            )}
          </div>

          {/* Desktop Nav */}
          {!isCompact && (
            <nav aria-label="Main navigation" style={navPill}>
              {NAV.map((n) => {
                const isActive = active === n
                const isHov = hov === n
                return (
                  <button
                    key={n}
                    onMouseEnter={() => setHov(n)}
                    onMouseLeave={() => setHov(null)}
                    onClick={() => handleNav(n)}
                    style={{
                      padding: '7px 15px', fontSize: 13.5,
                      fontWeight: isActive ? 600 : 500, cursor: 'pointer',
                      letterSpacing: '0.01em', borderRadius: 8, border: 'none',
                      background: isActive ? 'rgba(220,220,230,0.1)' : isHov ? 'rgba(220,220,230,0.05)' : 'transparent',
                      color: isActive ? '#f0f0f2' : isHov ? '#c0c0c8' : S.sub,
                      fontFamily: 'inherit',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}
                  >
                    {n}
                    {isActive && <ActiveDot />}
                  </button>
                )
              })}
            </nav>
          )}

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 12 }}>
            {!isMobile && (
              <button
                onClick={() => handleNav('Contact')}
                onMouseEnter={() => setCtaHov(true)}
                onMouseLeave={() => setCtaHov(false)}
                style={ctaBtn}
              >
                Hire Me
              </button>
            )}
            {isCompact && (
              <button
                ref={burgerRef}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                style={burgerBtn}
              >
                <AnimatedBurger open={open} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      {isMobile && (
        <div ref={menuRef} style={drawerStyle} aria-hidden={!open}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV.map((n) => {
              const isActive = active === n
              return (
                <button
                  key={n}
                  onClick={() => handleNav(n)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '15px 18px', borderRadius: 10,
                    border: `1px solid ${isActive ? 'rgba(200,200,210,0.12)' : 'transparent'}`,
                    background: isActive ? 'rgba(220,220,230,0.07)' : 'transparent',
                    color: isActive ? '#f0f0f2' : '#8a8a94',
                    cursor: 'pointer', fontSize: 16, fontFamily: 'inherit',
                    fontWeight: isActive ? 600 : 400, letterSpacing: '0.01em',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{n}</span>
                  {isActive && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(220,220,230,0.6)', flexShrink: 0 }} />
                  )}
                </button>
              )
            })}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: 32 }}>
            <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(200,200,210,0.1), transparent)', marginBottom: 28 }} />
            <button
              onClick={() => handleNav('Contact')}
              style={{
                width: '100%', padding: '15px', background: S.btnGrad,
                color: '#0a0a0a', fontWeight: 700, fontSize: 15,
                borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', letterSpacing: '0.02em',
              }}
            >
              Hire Me →
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#505058', marginTop: 14, letterSpacing: '0.04em' }}>
              Available for new projects
            </p>
          </div>
        </div>
      )}

      {/* Tablet Dropdown */}
      {isTablet && (
        <div ref={menuRef} style={tabletDropdown} aria-hidden={!open}>
          {NAV.map((n) => {
            const isActive = active === n
            return (
              <button
                key={n}
                onClick={() => handleNav(n)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  border: 'none',
                  background: isActive ? 'rgba(220,220,230,0.09)' : 'transparent',
                  color: isActive ? '#f0f0f2' : '#8a8a94',
                  cursor: 'pointer', fontSize: 14, fontFamily: 'inherit',
                  fontWeight: isActive ? 600 : 400, marginBottom: 2,
                  transition: 'background 0.15s ease',
                }}
              >
                {n}
                {isActive && (
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(220,220,230,0.6)' }} />
                )}
              </button>
            )
          })}
          <div style={{ height: 1, background: 'rgba(200,200,210,0.08)', margin: '8px 0' }} />
          <button
            onClick={() => handleNav('Contact')}
            style={{
              width: '100%', padding: '10px', background: S.btnGrad,
              color: '#0a0a0a', fontWeight: 600, fontSize: 13,
              borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', marginTop: 2,
            }}
          >
            Hire Me →
          </button>
        </div>
      )}
    </>
  )
}