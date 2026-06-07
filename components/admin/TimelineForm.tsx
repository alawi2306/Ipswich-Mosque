'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface TimelineData {
  id?: string
  date: string
  tag: string
  title: string
  desc: string
  meta: string
  photos: string[]
  sortOrder: number
}

export function TimelineForm({ initial }: { initial?: Partial<TimelineData> }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    date: initial?.date ?? '',
    tag: initial?.tag ?? '',
    title: initial?.title ?? '',
    desc: initial?.desc ?? '',
    meta: initial?.meta ?? '',
    sortOrder: initial?.sortOrder ?? 0,
  })
  const [photos, setPhotos] = useState<string[]>(initial?.photos ?? [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      try {
        const res = await fetch('/api/upload?folder=timeline', { method: 'POST', body: fd })
        if (res.ok) {
          const { url } = await res.json()
          setPhotos(prev => [...prev, url])
        } else {
          const d = await res.json()
          setError(d.error ?? 'Upload failed')
        }
      } catch {
        setError('Upload failed — check your connection')
      }
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removePhoto(index: number) {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = initial?.id ? `/api/timeline/${initial.id}` : '/api/timeline'
    const res = await fetch(url, {
      method: initial?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, photos, sortOrder: Number(form.sortOrder) }),
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Save failed')
      setSaving(false)
      return
    }
    router.push('/admin/timeline')
    router.refresh()
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      {error && <div className="form-error-banner">{error}</div>}

      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Date label</label>
          <input
            className="form-input"
            value={form.date}
            onChange={e => set('date', e.target.value)}
            required
            placeholder="e.g. March 2026"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Tag</label>
          <input
            className="form-input"
            value={form.tag}
            onChange={e => set('tag', e.target.value)}
            required
            placeholder="e.g. Community"
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          required
          placeholder="e.g. Eid al-Fitr celebration"
        />
      </div>

      <div className="form-field">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          value={form.desc}
          onChange={e => set('desc', e.target.value)}
          required
          placeholder="A short description of the event or milestone"
        />
      </div>

      <div className="form-field">
        <label className="form-label">Meta <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(optional)</span></label>
        <input
          className="form-input"
          value={form.meta}
          onChange={e => set('meta', e.target.value)}
          placeholder="e.g. 400+ attendees"
        />
      </div>

      {/* Photo upload */}
      <div className="form-field">
        <label className="form-label">Photos</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
          {photos.map((url, i) => (
            <div key={i} style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, border: '1px solid var(--line)' }}
              />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                title="Remove photo"
                style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'rgba(0,0,0,.65)', border: 'none',
                  color: '#fff', cursor: 'pointer', fontSize: 14, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>
          ))}

          {uploading && (
            <div style={{
              width: 100, height: 100, borderRadius: 8,
              border: '1.5px dashed var(--line)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#f8fafc', fontSize: 12, color: 'var(--muted)',
            }}>
              Uploading…
            </div>
          )}

          <label style={{
            width: 100, height: 100, borderRadius: 8,
            border: '1.5px dashed var(--line)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            background: '#f8fafc', gap: 4,
            opacity: uploading ? 0.5 : 1,
          }}>
            <span style={{ fontSize: 26, lineHeight: 1, color: 'var(--muted)' }}>+</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>Add photo</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handlePhotoUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className="form-hint">JPG, PNG or WebP · max 20 MB each · up to 4 photos</div>
      </div>

      <div className="form-field" style={{ maxWidth: 160 }}>
        <label className="form-label">Sort order</label>
        <input
          type="number"
          className="form-input"
          value={form.sortOrder}
          onChange={e => set('sortOrder', Number(e.target.value))}
        />
        <div className="form-hint">Higher numbers appear first</div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn-admin btn-admin-primary" disabled={saving || uploading}>
          {saving ? 'Saving…' : (initial?.id ? 'Update entry' : 'Create entry')}
        </button>
        <button type="button" className="btn-admin btn-admin-outline" onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  )
}
