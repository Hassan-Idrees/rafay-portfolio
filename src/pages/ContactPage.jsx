import React, { useState, useEffect } from 'react'
import { Fade, HoverCard, SectionWrap, useIsMobile } from '../components/Shared'
import { S } from '../palette'

function ContactSendButton({ sent }) {
  const [hov, setHov] = React.useState(false)
  return (
    <button
      type="submit"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%',
        padding: 14,
        background: sent ? 'transparent' : S.btnGrad,
        color: sent ? '#22c55e' : '#0a0a0a',
        fontWeight: 600,
        fontSize: '0.88rem',
        borderRadius: 8,
        border: sent ? `1px solid #22c55e` : 'none',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov && !sent ? '0 12px 32px rgba(200,200,210,0.15)' : 'none',
      }}
    >
      {sent ? '✓ Message Sent' : 'Send Message →'}
    </button>
  )
}

export default function ContactPage({ go }) {
  const isMobile = useIsMobile()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => setSent(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [sent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const gridColumns = isMobile ? '1fr' : '1fr 1fr'
  const gap = isMobile ? 36 : 48

  const inputStyle = {
    background: 'rgba(200,200,210,0.03)',
    border: `1px solid ${S.border}`,
    borderRadius: 10,
    padding: '13px 16px',
    color: 'rgba(210,210,215,0.8)',
    fontSize: '0.9rem',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: S.faint,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 6,
    display: 'block',
  }

  const contactCards = [
    { icon: '📧', label: 'Email', value: 'rafayj4@gmail.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/muhammad-rafay1/' },
    { icon: '🌐', label: 'Location', value: 'Available Worldwide' },
    { icon: '⏰', label: 'Availability', value: 'US · Canada · Australia TZ' },
  ]

  return (
    <SectionWrap
      eyebrow="Contact"
      title="Let's Work Together"
      sub="Ready to automate and scale your business?"
    >
      <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap }}>
        {/* Left - Form */}
        <Fade d={0}>
          <div style={{ background: S.cardBg, border: `1px solid ${S.border}`, borderRadius: 14, padding: isMobile ? 24 : 36 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
                <div style={{ width: '100%' }}>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle, border: `1px solid ${focused === 'name' ? S.borderHov : S.border}`, marginBottom: 16 }}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div style={{ width: '100%' }}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle, border: `1px solid ${focused === 'email' ? S.borderHov : S.border}`, marginBottom: 16 }}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div style={{ width: '100%' }}>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, border: `1px solid ${focused === 'subject' ? S.borderHov : S.border}`, marginBottom: 16 }}
                  placeholder="What is this about?"
                  required
                />
              </div>

              {/* Message */}
              <div style={{ width: '100%' }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, border: `1px solid ${focused === 'message' ? S.borderHov : S.border}`, minHeight: 120, resize: 'vertical', marginBottom: 16 }}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <ContactSendButton sent={sent} />
            </form>
          </div>
        </Fade>

        {/* Right - Info Cards */}
        <Fade d={80}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {contactCards.map((card) => (
              <HoverCard key={card.label} style={{ padding: '18px 22px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ fontSize: 20 }}>{card.icon}</span>
                <div>
                  <div style={{ fontSize: '0.7rem', color: S.faint, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: S.body }}>
                    {card.value}
                  </div>
                </div>
              </HoverCard>
            ))}

            {/* Quote Block */}
            <div
              style={{
                marginTop: 8,
                padding: '22px 24px',
                background: S.cardBg,
                border: `1px solid ${S.border}`,
                borderRadius: 12,
                borderLeft: '2px solid rgba(200,200,210,0.15)',
              }}
            >
              <p style={{ fontSize: '0.9rem', color: S.body, fontStyle: 'italic', margin: '0 0 12px 0' }}>
                "Thanks for reading this far — I appreciate it. If you're interested in working together, reach out ASAP or your competition will 😉"
              </p>
              <div style={{ fontSize: '0.85rem', color: S.faint }}>
                — Muhammad Rafay
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </SectionWrap>
  )
}
