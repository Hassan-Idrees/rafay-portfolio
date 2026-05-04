import React from 'react'
import { Fade, SilverText, Pill, Divider, HoverCard, SectionWrap, useIsMobile } from '../components/Shared'
import { S } from '../palette'
import { STATS } from '../data'

export default function AboutPage({ go }) {
  const isMobile = useIsMobile()
  const [hoveredIdx, setHoveredIdx] = React.useState(null)

  const bioText = [
    "As a Certified GHL Partner, n8n Expert, Zapier Expert, and Make Specialist, I design high-converting GHL funnels, pipelines, calendars, snapshots, SaaS configurations, and white-label systems while delivering advanced workflow automation and AI-powered solutions.",
    "I've built 100+ AI, chat, and voice agents using n8n, VAPI, ElevenLabs, GPT APIs, RAG architectures, and Pinecone knowledge bases to automate lead capture, qualification, nurturing, booking, and follow-ups via SMS, email, and voice.",
    "My systems replace fragmented tools with a unified GHL-centric stack, enhanced by custom APIs, webhooks, Google Apps Script, and end-to-end automations in Zapier and Make—resulting in cleaner operations, optimized workflows, and measurable growth at scale."
  ]

  const techs = [
    "GoHighLevel",
    "n8n",
    "Zapier",
    "Make",
    "VAPI",
    "GPT-4 API",
    "Pinecone",
    "ElevenLabs",
    "Google Apps Script",
    "ManyChat",
    "Twilio"
  ]

  const gridColumns = isMobile ? '1fr' : '1.2fr auto 0.8fr'
  const gap = isMobile ? 36 : 64

  return (
    <SectionWrap
      eyebrow="About"
      title="About Me"
      sub="Transforming businesses through intelligent automation across 3 countries."
    >
      <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap, alignItems: 'start' }}>
        {/* Left Column */}
        <div>
          {bioText.map((para, i) => (
            <Fade key={i} d={100 + i * 80}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: S.body, marginBottom: 20 }}>
                {para}
              </p>
            </Fade>
          ))}

          <Divider />

          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {techs.map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
          </div>
        </div>

        {/* Middle Divider Column */}
        <div style={{ alignSelf: 'stretch', display: isMobile ? 'none' : 'flex', justifyContent: 'center' }}>
          <div style={{ width: 1, background: 'linear-gradient(to bottom, transparent, rgba(200,200,210,0.1), transparent)', alignSelf: 'stretch', margin: '6px 18px' }} />
        </div>

        {/* Right Column */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {STATS.map((stat, j) => {
            const isHovered = hoveredIdx === j
            return (
              <Fade key={stat.l} d={100 + j * 80}>
                <div
                  onMouseEnter={() => setHoveredIdx(j)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    padding: '28px 22px',
                    textAlign: 'center',
                    background: isHovered ? S.cardHov : S.cardBg,
                    border: `1px solid ${isHovered ? S.borderHov : S.border}`,
                    borderRadius: 12,
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: isHovered ? 'translateY(-6px)' : 'none',
                    boxShadow: isHovered ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(200,200,210,0.35), transparent)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }} />

                  <div style={{ fontSize: '2.4rem', fontWeight: 700 }}>
                    <SilverText>{stat.v}</SilverText>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: S.faint, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 8 }}>
                    {stat.l}
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
