import React, { useState } from 'react'
import { Fade, Pill, Divider, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'

const bio = [
  "As a Certified GHL Partner, n8n Expert, Zapier Expert, and Make Specialist, I design high-converting funnels, pipelines, calendars, snapshots, SaaS configurations, and white-label systems while delivering advanced workflow automation and AI-powered solutions.",
  "I've built 100+ AI, chat, and voice agents using n8n, VAPI, ElevenLabs, GPT APIs, RAG architectures, and Pinecone knowledge bases — automating lead capture, qualification, nurturing, booking, and follow-ups via SMS, email, and voice.",
  "My systems replace fragmented tools with a unified GHL-centric stack, enhanced by custom APIs, webhooks, and end-to-end automations — resulting in cleaner operations, optimised workflows, and measurable growth at scale for clients worldwide.",
]

const techs = [
  'GoHighLevel', 'n8n', 'Zapier', 'Make', 'VAPI',
  'GPT-4 API', 'Pinecone', 'ElevenLabs',
  'Google Apps Script', 'ManyChat', 'Twilio', 'REST APIs',
]

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
      </svg>
    ),
    title: 'Business-First Thinking',
    desc: 'Every build ties to a revenue or efficiency outcome — not just a technical deliverable.',
    accent: 'rgba(139,92,246,0.15)',
    accentBorder: 'rgba(139,92,246,0.3)',
    accentIcon: 'rgba(167,139,250,0.9)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Speed Without Shortcuts',
    desc: 'Fast delivery with clean, documented builds your team can maintain long after I\'m done.',
    accent: 'rgba(234,179,8,0.12)',
    accentBorder: 'rgba(234,179,8,0.28)',
    accentIcon: 'rgba(250,204,21,0.9)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: 'Full-Stack Integration',
    desc: 'From CRM to AI voice agents — I connect the entire stack so nothing falls through the cracks.',
    accent: 'rgba(20,184,166,0.12)',
    accentBorder: 'rgba(20,184,166,0.28)',
    accentIcon: 'rgba(45,212,191,0.9)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Client Experience',
    desc: 'Delivering automation systems for agencies worldwide — across any market or timezone.',
    accent: 'rgba(59,130,246,0.12)',
    accentBorder: 'rgba(59,130,246,0.28)',
    accentIcon: 'rgba(96,165,250,0.9)',
  },
]

const stats = [
  { v: '4+',   l: 'Years Experience' },
  { v: '100+', l: 'AI Agents Built'  },
  { v: '500+', l: 'Apps Integrated'  },
  { v: '50+',  l: 'Clients Served'   },
]

export default function AboutPage() {
  const isMobile  = useIsMobile()
  const isTablet  = useIsTablet()
  const isDesktop = !isMobile && !isTablet
  const [hovIdx, setHovIdx] = useState(null)

  return (
    <SectionWrap
      eyebrow="About"
      title="About Me"
      sub="Transforming businesses through intelligent automation, worldwide."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 1px 400px' : '1fr',
        gap: isDesktop ? 56 : isMobile ? 40 : 48,
        alignItems: 'start',
      }}>

        {/* ── LEFT: Bio + pills + stats ───────────────────────────────── */}
        <div>

          {/* Bio paragraphs */}
          {bio.map((para, i) => (
            <Fade key={i} d={60 + i * 60}>
              <p style={{
                fontSize: isMobile ? 14 : 15,
                lineHeight: 1.88,
                color: '#8a8a94',
                margin: '0 0 18px',
              }}>
                {para}
              </p>
            </Fade>
          ))}

          {/* Divider */}
          <Fade d={240}>
            <div style={{
              height: 1,
              background: 'linear-gradient(to right, rgba(200,200,220,0.15), transparent)',
              margin: '4px 0 20px',
            }} />
          </Fade>

          {/* Tech pills */}
          <Fade d={270}>
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, color: '#505060',
                letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12,
              }}>
                Tools & Technologies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {techs.map((tech) => (
                  <Pill key={tech}>{tech}</Pill>
                ))}
              </div>
            </div>
          </Fade>

          {/* Stats strip */}
          <Fade d={320}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 10,
              marginTop: 28,
              paddingTop: 24,
              borderTop: '1px solid rgba(200,200,220,0.1)',
            }}>
              {stats.map((s) => (
                <div key={s.l} style={{
                  padding: '14px 12px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(200,200,220,0.1)',
                  borderRadius: 10,
                  textAlign: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}>
                  <div style={{
                    fontSize: isMobile ? 20 : 22,
                    fontWeight: 700,
                    color: '#d0d0d8',
                    lineHeight: 1,
                    marginBottom: 5,
                    letterSpacing: '-0.02em',
                  }}>
                    {s.v}
                  </div>
                  <div style={{
                    fontSize: 9,
                    color: '#50505a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>

        {/* ── CENTRE: vertical rule ──────────────────────────────────── */}
        {isDesktop && (
          <div style={{
            alignSelf: 'stretch',
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(200,200,220,0.14) 15%, rgba(200,200,220,0.14) 85%, transparent)',
            minHeight: 300,
          }} />
        )}

        {/* ── RIGHT: Value cards ─────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : '1fr',
          gap: 12,
        }}>
          {values.map((v, i) => {
            const isHov = hovIdx === i
            return (
              <Fade key={v.title} d={80 + i * 65}>
                <div
                  onMouseEnter={() => setHovIdx(i)}
                  onMouseLeave={() => setHovIdx(null)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '22px 22px',
                    background: isHov
                      ? `${v.accent}`
                      : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${isHov ? v.accentBorder : 'rgba(200,200,220,0.1)'}`,
                    borderRadius: 14,
                    cursor: 'default',
                    transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.26s cubic-bezier(0.22,1,0.36,1)',
                    boxShadow: isHov
                      ? `0 20px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`
                      : '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)',
                  }}
                >
                  {/* Top accent line — coloured */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg, transparent, ${v.accentBorder}, transparent)`,
                    opacity: isHov ? 1 : 0.4,
                    transition: 'opacity 0.26s',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: isHov ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isHov ? v.accentBorder : 'rgba(200,200,220,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isHov ? v.accentIcon : '#606070',
                    marginBottom: 14,
                    transition: 'all 0.26s ease',
                  }}>
                    {v.icon}
                  </div>

                  {/* Title */}
                  <div style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: isHov ? '#e8e8f0' : '#b0b0c0',
                    marginBottom: 8,
                    letterSpacing: '-0.01em',
                    transition: 'color 0.26s',
                  }}>
                    {v.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    fontSize: 12.5,
                    lineHeight: 1.72,
                    color: isHov ? '#808090' : '#565660',
                    transition: 'color 0.26s',
                  }}>
                    {v.desc}
                  </div>
                </div>
              </Fade>
            )
          })}
        </div>

      </div>
    </SectionWrap>
  )
}