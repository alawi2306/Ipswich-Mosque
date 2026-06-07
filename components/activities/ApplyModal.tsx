'use client'

import { useState, useRef } from 'react'

interface ClassInfo {
  id: string
  title: string
  teacher: string
  dayTime: string
  masjid: string
}

interface Props {
  cls: ClassInfo
  onClose: () => void
}

function GeomPattern() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden style={{
      position: 'absolute', top: -32, right: -32, opacity: 0.06, pointerEvents: 'none',
    }}>
      <path d="M80 4L93 58L147 45L106 80L147 115L93 102L80 156L67 102L13 115L54 80L13 45L67 58Z" fill="white" />
      <path d="M80 28L88 58L118 50L96 80L118 110L88 102L80 132L72 102L42 110L64 80L42 50L72 58Z" fill="none" stroke="white" strokeWidth="1" />
    </svg>
  )
}

export function ApplyModal({ cls, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const hpRef = useRef<HTMLInputElement>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch(`/api/classes/${cls.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: hpRef.current?.value ?? '' }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setState('error')
      } else {
        setState('done')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setState('error')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <style>{`
        @keyframes am-in   { from { opacity:0; transform:translateY(12px) scale(.98) } to { opacity:1; transform:none } }
        @keyframes am-fade { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:none } }
        .am-box { animation: am-in .2s cubic-bezier(.22,1,.36,1) both }
        .am-input {
          width: 100%; box-sizing: border-box;
          padding: 11px 14px;
          border: 1.5px solid #dde4ed;
          border-radius: 8px;
          font-size: 14px; font-family: inherit; color: var(--ink);
          background: #f8fafc; outline: none;
          transition: border-color .15s, background .15s, box-shadow .15s;
        }
        .am-input:focus {
          border-color: var(--teal-600);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(13,148,136,.1);
        }
        .am-input::placeholder { color: #a0aec0; }
        .am-pill {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 11px; border-radius: 20px;
          background: rgba(255,255,255,.12);
          font-size: 12px; color: rgba(255,255,255,.88);
          white-space: nowrap;
        }
        .am-success { animation: am-fade .3s ease both }
      `}</style>

      <div
        className="am-box"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 440,
          background: '#fff', borderRadius: 16,
          boxShadow: '0 24px 80px rgba(0,0,0,.22), 0 4px 16px rgba(0,0,0,.08)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(140deg, #0c3547 0%, #0d6e87 100%)',
          padding: '26px 26px 22px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold-600), #d4a430)' }} />
          <GeomPattern />

          <button onClick={onClose} aria-label="Close" style={{
            position: 'absolute', top: 14, right: 14,
            width: 28, height: 28, borderRadius: 6,
            background: 'rgba(255,255,255,.12)', border: 'none',
            color: 'rgba(255,255,255,.75)', fontSize: 18, lineHeight: 1,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>

          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 8 }}>
            Apply for class
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 14, paddingRight: 36 }}>
            {cls.title}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <div className="am-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {cls.dayTime}
            </div>
            <div className="am-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {cls.masjid}
            </div>
            <div className="am-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {cls.teacher}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 26px 26px' }}>
          {state === 'done' ? (
            <div className="am-success" style={{ textAlign: 'center', padding: '12px 0 4px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--teal-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <polyline points="5,16 12,23 25,9" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Application sent!</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 22 }}>
                The teacher will be in touch shortly.
              </div>
              <button className="btn btn-teal btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>Done</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <input ref={hpRef} name="website" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
                Your details
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>Full name</label>
                <input
                  className="am-input"
                  required
                  autoFocus
                  placeholder="e.g. Ahmad Hassan"
                  maxLength={100}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>Email address</label>
                <input
                  type="email"
                  className="am-input"
                  required
                  placeholder="you@example.com"
                  maxLength={254}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>
                  Message <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(optional)</span>
                </label>
                <textarea
                  className="am-input"
                  placeholder="Any questions or context…"
                  maxLength={2000}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ minHeight: 72, resize: 'vertical' }}
                />
              </div>
              {state === 'error' && (
                <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#b91c1c' }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="submit"
                  className="btn btn-teal btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={state === 'loading'}
                >
                  {state === 'loading' ? 'Sending…' : 'Send application'}
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
