'use client'

import { useState, useRef } from 'react'
import { Arrow } from '@/components/ui/icons'

export function SistersContactForm() {
  const [form, setForm] = useState({ firstName: '', email: '', topic: 'General enquiry', message: '' })
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
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: '(Sisters section)',
          email: form.email,
          topic: `Sisters – ${form.topic}`,
          message: form.message,
          website: hpRef.current?.value ?? '',
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center', minHeight: 280 }}>
        <div style={{ fontSize: 40 }}>✓</div>
        <h2 style={{ marginBottom: 4 }}>Message sent</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 320 }}>
          Sr. Aisha usually replies within a day or two.
        </p>
        <button className="btn btn-outline btn-sm" style={{ marginTop: 8 }} onClick={() => { setForm({ firstName: '', email: '', topic: 'General enquiry', message: '' }); setStatus('idle') }}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form-card" onSubmit={submit}>
      <input ref={hpRef} name="website" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
      <h2>Send a message</h2>
      <div className="contact-form-sub">Sr. Aisha usually replies within a day or two. Anything you write here stays with the sisters' team.</div>
      <div className="field">
        <label>Your name</label>
        <input required type="text" maxLength={100} placeholder="First name" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
      </div>
      <div className="field">
        <label>Email</label>
        <input required type="email" maxLength={254} placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
      </div>
      <div className="field">
        <label>Topic</label>
        <select value={form.topic} onChange={e => set('topic', e.target.value)}>
          <option>General enquiry</option>
          <option>Join the WhatsApp group</option>
          <option>Welfare / support request</option>
          <option>Volunteer with sisters' team</option>
          <option>New revert support</option>
          <option>Event suggestion</option>
        </select>
      </div>
      <div className="field">
        <label>Message</label>
        <textarea required maxLength={2000} placeholder="How can we help?" value={form.message} onChange={e => set('message', e.target.value)} />
      </div>
      {status === 'error' && <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 8 }}>Something went wrong. Please try again.</p>}
      <button type="submit" className="btn btn-teal" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : <><span>Send to sisters&apos; team</span> <Arrow width="14" height="14" /></>}
      </button>
    </form>
  )
}
