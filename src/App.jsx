import { useEffect, useRef } from 'react'
import Header from './components/Header'
import StarField from './components/StarField'
import ScrollProgress from './components/ScrollProgress'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import StackPage from './pages/StackPage'
import ProjectsPage from './pages/ProjectsPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'

function SectionSep() {
  return <div className="section-sep" />
}

export default function App() {
  const homeRef     = useRef(null)
  const aboutRef    = useRef(null)
  const servicesRef = useRef(null)
  const stackRef    = useRef(null)
  const projectsRef = useRef(null)
  const reviewsRef  = useRef(null)
  const contactRef  = useRef(null)

  const sectionRefs = {
    Home: homeRef, About: aboutRef, Services: servicesRef,
    Stack: stackRef, Projects: projectsRef, Reviews: reviewsRef, Contact: contactRef,
  }

  const scrollToSection = (section) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollToSection = scrollToSection
    return () => { delete window.scrollToSection }
  }, [])

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Scroll progress bar element — controlled by ScrollProgress */}
      <div id="scroll-progress" />

      {/* Animated star field — fixed behind everything */}
      <StarField />

      {/* Scroll progress logic */}
      <ScrollProgress />

      <Header scrollToSection={scrollToSection} sectionRefs={sectionRefs} />

      <div style={{ paddingTop: 'clamp(58px, 9vw, 68px)', position: 'relative', zIndex: 1 }}>
        <div ref={homeRef}><HomePage /></div>

        <SectionSep />
        <div ref={aboutRef}><AboutPage /></div>

        <SectionSep />
        <div ref={servicesRef}><ServicesPage /></div>

        <SectionSep />
        <div ref={stackRef}><StackPage /></div>

        <SectionSep />
        <div ref={projectsRef}><ProjectsPage /></div>

        <SectionSep />
        <div ref={reviewsRef}><ReviewsPage /></div>

        <SectionSep />
        <div ref={contactRef}><ContactPage /></div>
      </div>

      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(200,200,220,0.07)',
        padding: '40px 0 32px',
        marginTop: 0,
      }}>
        <div style={{
          maxWidth: 1160, margin: '0 auto',
          padding: '0 48px',
        }}>
          {/* Top row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: 24,
            marginBottom: 32,
          }}>
            {/* Brand */}
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#d0d0d8', letterSpacing: '-0.02em', marginBottom: 6 }}>
                Muhammad Rafay
              </div>
              <div style={{ fontSize: 13, color: '#484850', maxWidth: 280, lineHeight: 1.6 }}>
                Automation Specialist · GHL Expert · AI Agent Builder
              </div>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['About', 'Services', 'Stack', 'Projects', 'Reviews', 'Contact'].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollToSection(s)}
                  style={{
                    background: 'transparent', border: 'none',
                    color: '#484850', fontSize: 13, fontFamily: 'inherit',
                    cursor: 'pointer', padding: '4px 10px',
                    borderRadius: 6, fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#9090a0'}
                  onMouseLeave={e => e.target.style.color = '#484850'}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                {
                  label: 'Email', href: 'mailto:rafayj4@gmail.com',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                },
                {
                  label: 'LinkedIn', href: 'https://linkedin.com/in/muhammad-rafay1/',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: 36, height: 36, borderRadius: 9,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(200,200,220,0.1)',
                    color: '#505060',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.color = '#a0a0b0'
                    e.currentTarget.style.borderColor = 'rgba(200,200,220,0.22)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.color = '#505060'
                    e.currentTarget.style.borderColor = 'rgba(200,200,220,0.1)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div style={{
            paddingTop: 20,
            borderTop: '1px solid rgba(200,200,220,0.06)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ fontSize: 12, color: '#383840' }}>
              © 2026 Muhammad Rafay. All rights reserved.
            </span>
            <span style={{ fontSize: 12, color: '#303038' }}>
              Built with React · Vite
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}