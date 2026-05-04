import { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import StackPage from './pages/StackPage'
import ProjectsPage from './pages/ProjectsPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'
import { S } from './palette'
import { SilverText } from './components/Shared'

export default function App() {
  const [page, setPage] = useState('Home')
  const [fading, setFading] = useState(false)

  const go = (p) => {
    if (p === page) return
    setFading(true)
    setTimeout(() => {
      setPage(p)
      setFading(false)
      window.scrollTo({ top: 0 })
    }, 250)
  }

  const pages = {
    Home: <HomePage go={go} />,
    About: <AboutPage />,
    Services: <ServicesPage />,
    Stack: <StackPage />,
    Projects: <ProjectsPage />,
    Reviews: <ReviewsPage />,
    Contact: <ContactPage />,
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <Header page={page} go={go} />

      <div
        style={{
          paddingTop: 64,
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(12px) scale(0.99)' : 'none',
          transition: fading ? 'all 0.25s ease' : 'all 0.35s ease',
        }}
      >
        {pages[page]}
      </div>

      <footer
        style={{
          borderTop: `1px solid ${S.border}`,
          padding: '20px 0',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            width: 'calc(100% - 48px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 500, ...S.headingText }}>
            Muhammad Rafay
          </span>
          <span style={{ fontSize: '0.7rem', color: S.faint, letterSpacing: '0.08em' }}>
            © 2025 · Automation Specialist
          </span>
        </div>
      </footer>
    </div>
  )
}
