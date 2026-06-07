'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['Restaurants', 'Takeaways', 'Butchers', 'Grocery shops', 'Dessert shops']

export function AddPlaceForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    googleUrl: '', name: '', category: 'Restaurants',
    hmc: false, prayer: false, family: false, notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.googleUrl.trim() && !form.name.trim()) {
      setError('Paste a Google Maps URL or enter a name')
      return
    }
    setStatus('saving')
    setError('')
    try {
      const res = await fetch('/api/halal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Save failed')
        setStatus('error')
        return
      }
      setForm({ googleUrl: '', name: '', category: 'Restaurants', hmc: false, prayer: false, family: false, notes: '' })
      setStatus('idle')
      router.refresh()
    } catch {
      setError('Something went wrong')
      setStatus('error')
    }
  }

  return (
    <div className="admin-card" style={{ marginBottom: 24 }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line-2)', fontWeight: 600, fontSize: 15 }}>
        Add a place
      </div>
      <form onSubmit={submit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="form-field">
          <label className="form-label">Google Maps URL <span style={{ color: '#ef4444' }}>*</span></label>
          <input
            className="form-input"
            placeholder="https://www.google.com/maps/place/..."
            value={form.googleUrl}
            onChange={e => set('googleUrl', e.target.value)}
          />
          <span className="form-hint">Paste the URL — address, rating and phone will be pulled automatically if a Google API key is set.</span>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">Business name</label>
            <input className="form-input" placeholder="e.g. Al-Barakah Grill" value={form.name} onChange={e => set('name', e.target.value)} />
            <span className="form-hint">Leave blank to extract from URL</span>
          </div>
          <div className="form-field">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {([['hmc', 'HMC certified'], ['prayer', 'Prayer space'], ['family', 'Family friendly']] as const).map(([key, label]) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
        <div className="form-field">
          <label className="form-label">Notes <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
          <textarea className="form-textarea" value={form.notes} onChange={e => set('notes', e.target.value)} style={{ minHeight: 60 }} />
        </div>
        {error && <div className="form-error-banner">{error}</div>}
        <div>
          <button type="submit" className="btn-admin btn-admin-primary" disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : 'Add place (goes live immediately)'}
          </button>
        </div>
      </form>
    </div>
  )
}
