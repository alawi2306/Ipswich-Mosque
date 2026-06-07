'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileUpload } from './FileUpload'

interface EventData {
  id?: string
  title: string
  date: string
  time: string
  description: string
  tag: string
  masjid: string
  imageUrl: string
}

const TAGS = ['Community', 'Education', 'Youth', 'Outreach', 'Sisters']
const MASJIDS = ['Nawracy Mosque', 'Taqwa Mosque', 'Ipswich Mosque', 'Shah Jalal Mosque']

export function EventForm({ initial }: { initial?: Partial<EventData> }) {
  const router = useRouter()
  const [form, setForm] = useState<EventData>({
    title: initial?.title || '',
    date: initial?.date ? initial.date.slice(0, 10) : '',
    time: initial?.time || '',
    description: initial?.description || '',
    tag: initial?.tag || 'Community',
    masjid: initial?.masjid || 'Ipswich Mosque',
    imageUrl: initial?.imageUrl || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof EventData>(k: K, v: EventData[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = initial?.id ? `/api/events/${initial.id}` : '/api/events'
    const res = await fetch(url, {
      method: initial?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, date: new Date(form.date).toISOString() }),
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Save failed')
      setSaving(false)
      return
    }
    router.push('/admin/events')
    router.refresh()
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      {error && <div className="form-error-banner">{error}</div>}
      <div className="form-field">
        <label className="form-label">Event title</label>
        <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="e.g. Community Iftar 2026" />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Date</label>
          <input type="date" className="form-input" value={form.date} onChange={e => set('date', e.target.value)} required />
        </div>
        <div className="form-field">
          <label className="form-label">Time</label>
          <input className="form-input" value={form.time} onChange={e => set('time', e.target.value)} required placeholder="e.g. 7:00 PM" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Tag</label>
          <select className="form-select" value={form.tag} onChange={e => set('tag', e.target.value)}>
            {TAGS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Masjid</label>
          <select className="form-select" value={form.masjid} onChange={e => set('masjid', e.target.value)}>
            {MASJIDS.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Description</label>
        <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} required placeholder="A short description of the event" />
      </div>
      <div className="form-field">
        <label className="form-label">Event image (optional)</label>
        <FileUpload accept="image/jpeg,image/png,image/webp" onUpload={({ url }) => set('imageUrl', url)} />
        {form.imageUrl && <div className="form-hint mt-2">Current image: <a href={form.imageUrl} target="_blank" rel="noopener" style={{ color: '#0ea5e9' }}>View</a></div>}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn-admin btn-admin-primary" disabled={saving}>
          {saving ? 'Saving…' : (initial?.id ? 'Update event' : 'Create event')}
        </button>
        <button type="button" className="btn-admin btn-admin-outline" onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  )
}
