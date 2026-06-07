'use client'

import { useState, useRef } from 'react'
import { Arrow } from '@/components/ui/icons'

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', topic: 'General enquiry', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const hpRef = useRef<HTMLInputElement>(null)

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: hpRef.current?.value ?? '' }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center', minHeight: 320 }}>
        <div style={{ fontSize: 40 }}>✓</div>
        <h2 style={{ marginBottom: 4 }}>Message sent</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 340 }}>
          Thank you {form.firstName}. We aim to respond within two working days.
        </p>
        <button className="btn btn-outline btn-sm" style={{ marginTop: 8 }} onClick={() => { setForm({ firstName: '', lastName: '', email: '', topic: 'General enquiry', message: '' }); setStatus('idle') }}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form-card" onSubmit={submit}>
      <input ref={hpRef} name="website" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
      <h2>Send us a message</h2>
      <div className="contact-form-sub">We aim to respond within two working days.</div>
      <div className="field-row">
        <div className="field">
          <label>First name</label>
          <input required type="text" maxLength={100} placeholder="Your first name" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
        </div>
        <div className="field">
          <label>Last name</label>
          <input required type="text" maxLength={100} placeholder="Your last name" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>Email address</label>
        <input required type="email" maxLength={254} placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
      </div>
      <div className="field">
        <label>Topic</label>
        <select value={form.topic} onChange={e => set('topic', e.target.value)}>
          <option>General enquiry</option>
          <option>Volunteer with SMS</option>
          <option>Donation / gift aid</option>
          <option>Janazah enquiry</option>
          <option>Press / media</option>
          <option>Marriage (Nikah)</option>
        </select>
      </div>
      <div className="field">
        <label>Message</label>
        <textarea required maxLength={2000} placeholder="How can we help?" value={form.message} onChange={e => set('message', e.target.value)} />
      </div>
      {status === 'error' && (
        <p style={{ color: '#ef4444', fontSize: 14, margin: '0 0 8px' }}>Something went wrong. Please try again.</p>
      )}
      <button type="submit" className="btn btn-teal" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : <><span>Send message</span> <Arrow width="14" height="14" /></>}
      </button>
    </form>
  )
}
