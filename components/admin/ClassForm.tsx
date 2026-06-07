'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ClassData {
  id?: string
  title: string
  teacher: string
  dayTime: string
  schedule: string
  description: string
  masjid: string
  category: string
}

const CATEGORIES = ['Education', 'Sisters', 'Youth', 'Children', 'Community']
const MASJIDS = ['Nawracy Mosque', 'Taqwa Mosque', 'Ipswich Mosque', 'Shah Jalal Mosque']

export function ClassForm({ initial }: { initial?: Partial<ClassData> }) {
  const router = useRouter()
  const [form, setForm] = useState<ClassData>({
    title: initial?.title || '',
    teacher: initial?.teacher || '',
    dayTime: initial?.dayTime || '',
    schedule: initial?.schedule || '',
    description: initial?.description || '',
    masjid: initial?.masjid || 'Ipswich Mosque',
    category: initial?.category || 'Education',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof ClassData>(k: K, v: ClassData[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = initial?.id ? `/api/classes/${initial.id}` : '/api/classes'
    const res = await fetch(url, {
      method: initial?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Save failed')
      setSaving(false)
      return
    }
    router.push('/admin/classes')
    router.refresh()
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      {error && <div className="form-error-banner">{error}</div>}
      <div className="form-field">
        <label className="form-label">Class title</label>
        <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="e.g. Qur'an Hifz Circle" />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Teacher / contact</label>
          <input className="form-input" value={form.teacher} onChange={e => set('teacher', e.target.value)} required placeholder="e.g. Ustadh Ali Hassan" />
        </div>
        <div className="form-field">
          <label className="form-label">Day and time</label>
          <input className="form-input" value={form.dayTime} onChange={e => set('dayTime', e.target.value)} required placeholder="e.g. Saturdays, 10am" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Schedule</label>
          <input className="form-input" value={form.schedule} onChange={e => set('schedule', e.target.value)} required placeholder="e.g. Term-time only" />
        </div>
        <div className="form-field">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Masjid</label>
        <select className="form-select" value={form.masjid} onChange={e => set('masjid', e.target.value)}>
          {MASJIDS.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Description (optional)</label>
        <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Additional details about this class" />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn-admin btn-admin-primary" disabled={saving}>
          {saving ? 'Saving…' : (initial?.id ? 'Update class' : 'Create class')}
        </button>
        <button type="button" className="btn-admin btn-admin-outline" onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  )
}
