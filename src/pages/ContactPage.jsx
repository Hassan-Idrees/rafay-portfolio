import React, { useState, useEffect } from 'react'
import { Fade, SectionWrap, useIsMobile, useIsTablet } from '../components/Shared'

// ── Contact info cards config ────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    label: 'Email',
    value: 'rafayj4@gmail.com',
    href: 'mailto:rafayj4@gmail.com',
    accent: { bg: 'rgba(139,92,246,0.14)', border: 'rgba(139,92,246,0.32)', icon: 'rgba(167,139,250,1)' },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'muhammad-rafay1',
    href: 'https://linkedin.com/in/muhammad-rafay1/',
    accent: { bg: 'rgba(59,130,246,0.14)', border: 'rgba(59,130,246,0.32)', icon: 'rgba(96,165,250,1)' },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Available Worldwide',
    href: null,
    accent: { bg: 'rgba(20,184,166,0.14)', border: 'rgba(20,184,166,0.32)', icon: 'rgba(45,212,191,1)' },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    label: 'Availability',
    value: 'All Timezones',
    href: null,
    accent: { bg: 'rgba(234,179,8,0.14)', border: 'rgba(234,179,8,0.32)', icon: 'rgba(250,204,21,1)' },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
]

// ── Input field ───────────────────────────────────────────────────────────────
function Field({ label, name, type = 'text', value, onChange, onFocus, onBlur, focused, placeholder, required, textarea }) {
  const isFocused = focused === name
  const base = {
    width: '100%',
    boxSizing: 'border-box',
    background: isFocused ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${isFocused ? 'rgba(200,200,220,0.35)' : 'rgba(200,200,220,0.1)'}`,
    borderRadius: 10,
    padding: textarea ? '13px 16px' : '11px 16px',
    color: '#d0d0d8',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s ease',
    display: 'block',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? 120 : undefined,
    boxShadow: isFocused ? '0 0 0 3px rgba(200,200,220,0.07)' : 'none',
  }

  return (
    <div>
      <label style={{
        display: 'block', marginBottom: 7,
        fontSize: 11, fontWeight: 700,
        color: isFocused ? '#808090' : '#505060',
        letterSpacing: '0.13em', textTransform: 'uppercase',
        transition: 'color 0.2s',
      }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name} value={value} onChange={onChange}
          onFocus={onFocus} onBlur={onBlur}
          placeholder={placeholder} required={required}
          style={base}
        />
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange}
          onFocus={onFocus} onBlur={onBlur}
          placeholder={placeholder} required={required}
          style={base}
        />
      )}
    </div>
  )
}

// ── Contact info card ─────────────────────────────────────────────────────────
function ContactCard({ card }) {
  const [hov, setHov] = useState(false)
  const content = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '16px 18px',
        background: hov ? card.accent.bg : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hov ? card.accent.border : 'rgba(200,200,220,0.1)'}`,
        borderRadius: 12,
        transition: 'all 0.24s cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hov ? '0 12px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)' : '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)',
        cursor: card.href ? 'pointer' : 'default',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${card.accent.border}, transparent)`,
        opacity: hov ? 1 : 0.2, transition: 'opacity 0.24s',
      }} />

      {/* Icon box */}
      <div style={{
        width: 38, height: 38, borderRadius: 9, flexShrink: 0,
        background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? card.accent.border : 'rgba(200,200,220,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? card.accent.icon : '#606070',
        transition: 'all 0.24s ease',
      }}>
        {card.icon}
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 10, fontWeight: 700,
          color: hov ? card.accent.icon : '#505060',
          letterSpacing: '0.13em', textTransform: 'uppercase',
          marginBottom: 3, transition: 'color 0.24s',
        }}>
          {card.label}
        </div>
        <div style={{
          fontSize: 13.5, fontWeight: 500,
          color: hov ? '#d0d0d8' : '#909098',
          transition: 'color 0.24s',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {card.value}
        </div>
      </div>

      {/* Arrow for clickable cards */}
      {card.href && (
        <div style={{
          marginLeft: 'auto', flexShrink: 0,
          color: hov ? '#606070' : '#383842',
          transition: 'color 0.24s, transform 0.24s',
          transform: hov ? 'translateX(2px)' : 'translateX(0)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </div>
      )}
    </div>
  )

  return card.href ? (
    <a href={card.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
      {content}
    </a>
  ) : content
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const isMobile  = useIsMobile()
  const isTablet  = useIsTablet()
  const isDesktop = !isMobile && !isTablet

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [hovBtn, setHovBtn] = useState(false)

  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      const t = setTimeout(() => setStatus('idle'), 5000)
      return () => clearTimeout(t)
    }
  }, [status])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // EmailJS — replace with your own serviceId, templateId, publicKey
      // Sign up free at emailjs.com, takes 5 min to set up
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'YOUR_SERVICE_ID',
          template_id: 'YOUR_TEMPLATE_ID',
          user_id: 'YOUR_PUBLIC_KEY',
          template_params: {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const btnLabel = {
    idle:    'Send Message →',
    sending: 'Sending...',
    sent:    '✓ Message Sent',
    error:   'Failed — Try Again',
  }[status]

  const btnColor = {
    idle:    '#080808',
    sending: '#080808',
    sent:    '#22c55e',
    error:   '#ef4444',
  }[status]

  const btnBg = {
    idle:    hovBtn ? 'linear-gradient(135deg, #ececec 0%, #b8b8b8 100%)' : 'linear-gradient(135deg, #d8d8d8 0%, #909090 100%)',
    sending: 'rgba(200,200,210,0.15)',
    sent:    'transparent',
    error:   'transparent',
  }[status]

  const btnBorder = {
    idle:    'none',
    sending: '1px solid rgba(200,200,220,0.2)',
    sent:    '1px solid #22c55e',
    error:   '1px solid #ef4444',
  }[status]

  return (
    <SectionWrap
      eyebrow="Contact"
      title="Let's Work Together"
      sub="Ready to automate and scale your business? Let's talk."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 400px',
        gap: isMobile ? 32 : isTablet ? 40 : 56,
        alignItems: 'start',
      }}>

        {/* ── LEFT: Form ──────────────────────────────────────────────── */}
        <Fade d={0}>
          <div style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(200,200,220,0.1)',
            borderRadius: 18,
            padding: isMobile ? '24px 20px' : '32px 32px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#c0c0cc', marginBottom: 4 }}>
                Send a Message
              </div>
              <div style={{ fontSize: 13, color: '#505058' }}>
                I typically respond within 24 hours.
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Name + Email row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: 14,
              }}>
                <Field label="Name" name="name" value={form.name} onChange={handleChange}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  focused={focused} placeholder="Your name" required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  focused={focused} placeholder="your@email.com" required />
              </div>

              <Field label="Subject" name="subject" value={form.subject} onChange={handleChange}
                onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                focused={focused} placeholder="What's this about?" required />

              <Field label="Message" name="message" value={form.message} onChange={handleChange}
                onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                focused={focused} placeholder="Tell me about your project..." required textarea />

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={() => setHovBtn(true)}
                onMouseLeave={() => setHovBtn(false)}
                style={{
                  width: '100%', padding: '13px',
                  fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                  background: btnBg,
                  color: btnColor,
                  border: btnBorder,
                  borderRadius: 9, cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transform: hovBtn && status === 'idle' ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: hovBtn && status === 'idle' ? '0 10px 28px rgba(180,180,180,0.2)' : 'none',
                  transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                  letterSpacing: '0.01em',
                }}
              >
                {btnLabel}
              </button>

              {/* EmailJS setup note — remove after configuring */}
              <p style={{ fontSize: 11, color: '#383840', textAlign: 'center', margin: 0 }}>
                ⚠ Wire up EmailJS: replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY in ContactPage.jsx
              </p>
            </form>
          </div>
        </Fade>

        {/* ── RIGHT: Info + Quote ─────────────────────────────────────── */}
        <Fade d={80}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Contact cards */}
            {CONTACT_CARDS.map((card) => (
              <ContactCard key={card.label} card={card} />
            ))}

            {/* Quote block */}
            <div style={{
              marginTop: 6,
              padding: '20px 22px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(200,200,220,0.1)',
              borderRadius: 14,
              borderLeft: '3px solid rgba(200,200,220,0.2)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
            }}>
              <p style={{
                fontSize: 13.5, color: '#707078',
                fontStyle: 'italic', lineHeight: 1.75,
                margin: '0 0 12px',
              }}>
                "Thanks for reading this far — I appreciate it. If you're interested in working together, reach out ASAP or your competition will 😉"
              </p>
              <div style={{ fontSize: 12, color: '#454550', fontWeight: 600 }}>
                — Muhammad Rafay
              </div>
            </div>

          </div>
        </Fade>

      </div>
    </SectionWrap>
  )
}