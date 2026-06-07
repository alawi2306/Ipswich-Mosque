'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TipTapEditor } from './TipTapEditor'

interface AnnData {
  id?: string
  title: string
  excerpt: string
  content: object
  imageUrl: string
  published: boolean
}

export function AnnouncementForm({ initial }: { initial?: Partial<AnnData> }) {
  const router = useRouter()
  const [form, setForm] = useState<AnnData>({
    title: initial?.title || '',
    excerpt: initial?.excerpt || '',
    content: initial?.content || { type: 'doc', content: [{ type: 'paragraph' }] },
    imageUrl: initial?.imageUrl || '',
    published: initial?.published !== undefined ? initial.published : true,
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload?folder=announcements', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) setForm(f => ({ ...f, imageUrl: data.url }))
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = initial?.id ? `/api/announcements/${initial.id}` : '/api/announcements'
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
    router.push('/admin/announcements')
    router.refresh()
  }

  return (
    <form className="admin-form admin-form-wide" onSubmit={submit}>
      {error && <div className="form-error-banner">{error}</div>}
      <div className="form-field">
        <label className="form-label">Title</label>
        <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="e.g. Ramadan 2026 Programme" />
      </div>
      <div className="form-field">
        <label className="form-label">Excerpt</label>
        <input className="form-input" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} required placeholder="One-sentence summary shown in homepage carousel" />
        <span className="form-hint">Shown on homepage carousel and announcement previews</span>
      </div>
      <div className="form-field">
        <label className="form-label">Cover image</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {form.imageUrl && (
            <div style={{ position: 'relative', width: '100%', maxWidth: 420, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)' }}>
              <img src={form.imageUrl} alt="Cover" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, imageUrl: '' }))}
                style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 13 }}
              >
                Remove
              </button>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 6, border: '1px solid var(--line)',
                background: 'var(--bg-soft)', cursor: uploading ? 'default' : 'pointer',
                fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 500,
              }}
            >
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleImageUpload} disabled={uploading} />
              {uploading ? 'Uploading…' : (form.imageUrl ? 'Replace image' : '+ Upload image')}
            </label>
            {!form.imageUrl && (
              <input
                className="form-input"
                style={{ flex: 1 }}
                value={form.imageUrl}
                onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                placeholder="Or paste an image URL"
              />
            )}
          </div>
        </div>
        <span className="form-hint">Used as the background in the homepage carousel slide</span>
      </div>
      <div className="form-field">
        <label className="form-label">Content</label>
        <TipTapEditor value={form.content} onChange={content => setForm(f => ({ ...f, content }))} />
      </div>
      <div className="form-toggle-row">
        <label className="form-toggle">
          <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
          <span className="form-toggle-slider" />
        </label>
        <div>
          <div className="form-toggle-label">Published</div>
          <div className="form-toggle-sub">Published announcements appear on the homepage carousel</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn-admin btn-admin-primary" disabled={saving || uploading}>
          {saving ? 'Saving…' : (initial?.id ? 'Update announcement' : 'Publish announcement')}
        </button>
        <button type="button" className="btn-admin btn-admin-outline" onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  )
}
