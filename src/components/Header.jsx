import React, { useState, useEffect } from 'react'
import { S } from '../palette'
import { NAV } from '../data'
import { useIsMobile } from './Shared'

export default function Header({ page, go }) {
  const isMobile = useIsMobile()
  const [hovNav, setHovNav] = useState(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backdropFilter: 'blur(16px)',
    borderBottom: `1px solid ${S.border}`,
    background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.6)',
  }

  const container = {
    maxWidth: 1180,
    width: 'calc(100% - 48px)',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
  }

  const logoBox = {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: `1px solid ${S.border}`,
    background: S.cardBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  const navBtnBase = {
    padding: '7px 14px',
    fontSize: '0.78rem',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'color 0.15s, background 0.15s',
    borderRadius: 6,
    border: '1px solid transparent',
    background: 'transparent',
  }

  return (
    <header style={headerStyle}>
      <div style={container}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={logoBox}
            role="button"
            onClick={() => {
              go('Home')
            }}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '-1px', ...(S?.headingText || {}) }}>MR</span>
          </div>
        </div>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {NAV.map((n) => {
              const active = page === n
              const hovered = hovNav === n
              const style = {
                ...navBtnBase,
                color: active ? '#f0f0f2' : hovered ? '#b0b0b8' : S.sub,
                background: active ? 'rgba(220,220,230,0.12)' : 'transparent',
                border: active ? '1px solid rgba(220,220,230,0.1)' : '1px solid transparent',
                fontWeight: active ? 600 : 500,
              }

              return (
                <button
                  key={n}
                  onMouseEnter={() => setHovNav(n)}
                  onMouseLeave={() => setHovNav(null)}
                  onClick={() => go(n)}
                  style={style}
                >
                  {n}
                </button>
              )
            })}
          </nav>
        )}

        {isMobile && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: open ? `rgba(220,220,230,0.1)` : 'transparent',
                border: `1px solid ${open ? S.borderHov : 'transparent'}`,
                cursor: 'pointer',
                padding: 0,
                borderRadius: 8,
                transition: 'all 0.3s ease',
              }}
            >
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transition: 'transform 0.3s ease' }}
              >
                <line
                  x1="2"
                  y1="2"
                  x2="18"
                  y2="2"
                  stroke="rgba(200,200,210,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '10px 2px',
                    transition: 'all 0.3s ease',
                    transform: open ? 'rotate(45deg) translateY(6px)' : 'none',
                  }}
                />
                <line
                  x1="2"
                  y1="8"
                  x2="18"
                  y2="8"
                  stroke="rgba(200,200,210,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    transition: 'opacity 0.3s ease',
                    opacity: open ? 0 : 1,
                  }}
                />
                <line
                  x1="2"
                  y1="14"
                  x2="18"
                  y2="14"
                  stroke="rgba(200,200,210,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '10px 14px',
                    transition: 'all 0.3s ease',
                    transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none',
                  }}
                />
              </svg>
            </button>

            {open && (
              <div
                style={{
                  position: 'absolute',
                  top: 60,
                  right: 0,
                  background: 'rgba(15,15,15,0.98)',
                  border: `1px solid ${S.border}`,
                  borderRadius: 12,
                  padding: 8,
                  minWidth: 180,
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  zIndex: 200,
                }}
              >
                {NAV.map((n) => {
                  const active = page === n
                  return (
                    <button
                      key={n}
                      onClick={() => {
                        go(n)
                        setOpen(false)
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: 'none',
                        background: active ? 'rgba(220,220,230,0.1)' : 'transparent',
                        color: active ? '#f0f0f2' : S.sub,
                        cursor: 'pointer',
                        marginBottom: 6,
                      }}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
