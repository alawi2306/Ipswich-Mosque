'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { StarPattern } from '@/components/ui/StarPattern'
import { Icon } from '@/components/ui/icons'

export function CombinedCTA() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const hpRef = useRef<HTMLInputElement>(null)

  async function subscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, website: hpRef.current?.value ?? '' }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        const data = await res.json()
        setErrorMsg(data.error === 'Already subscribed' ? 'You\'re already on the list!' : 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <section className="combined-cta">
      <div className="combined-cta-pattern"><StarPattern id="ccta-pat" color="#1B6B8A" scale={60} /></div>
      <div className="container">
        <div className="combined-cta-grid">
          <div className="combined-cta-share">
            <div className="eyebrow" style={{ color: 'var(--gold-500)' }}><Icon.Megaphone width={13} height={13} /> Get involved</div>
            <h2>Got something to share?</h2>
            <p>Running an event, starting a class, recommending a halal business, or have a reminder to share — send it our way. Everything is read by the committee before it goes up.</p>
            <div className="submit-categories" style={{ marginBottom: 20 }}>
              <span className="submit-chip">Event submissions</span>
              <span className="submit-chip">Announcements</span>
              <span className="submit-chip">Volunteer opportunities</span>
              <span className="submit-chip">Business recommendations</span>
            </div>
            <Link href="/contact" className="btn btn-primary">Share with us <Icon.Arrow width={14} height={14} /></Link>
          </div>
          <div className="combined-cta-divider"></div>
          <div className="combined-cta-newsletter">
            <div className="eyebrow" style={{ color: 'var(--gold-500)' }}><Icon.Mail width={13} height={13} /> Stay in the loop</div>
            <h2>A short email, once a fortnight.</h2>
            <p>What&apos;s coming up, salah time changes, anything urgent. No spam — unsubscribe in one click.</p>
            {status === 'done' ? (
              <div style={{ padding: '16px 0', color: 'var(--teal-600)', fontWeight: 600 }}>
                ✓ You&apos;re subscribed — welcome aboard!
              </div>
            ) : (
              <form className="newsletter-form-v4" onSubmit={subscribe}>
                <input ref={hpRef} name="website" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                <input required type="text" maxLength={100} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                <input required type="email" maxLength={254} placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Subscribing…' : <><span>Subscribe</span> <Icon.Arrow width={14} height={14} /></>}
                </button>
                {status === 'error' && <p style={{ fontSize: 13, color: '#ef4444', margin: '4px 0 0' }}>{errorMsg}</p>}
              </form>
            )}
            <a href="https://wa.me/447700900200" target="_blank" rel="noopener" className="whatsapp-strip" style={{ marginTop: 14, display: 'inline-flex' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.4 24l1.7-6.2A11.9 11.9 0 0 1 .5 11.9C.5 5.3 5.8 0 12.4 0a11.9 11.9 0 0 1 11.9 11.9c0 6.6-5.3 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.4L.4 24z"/></svg>
              Join our WhatsApp channel
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
