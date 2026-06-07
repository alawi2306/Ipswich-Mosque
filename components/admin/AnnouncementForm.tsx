'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TipTapEditor } from './TipTapEditor'
import { ImageUploadWithCrop } from './ImageUploadWithCrop'

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
  const [error, setError] = useState('')

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
        <ImageUploadWithCrop
          folder="announcements"
          aspect={16 / 9}
          hint="Hero carousel background"
          currentUrl={form.imageUrl || undefined}
          onUpload={url => setForm(f => ({ ...f, imageUrl: url }))}
          onRemove={() => setForm(f => ({ ...f, imageUrl: '' }))}
        />
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
        <button type="submit" className="btn-admin btn-admin-primary" disabled={saving}>
          {saving ? 'Saving…' : (initial?.id ? 'Update announcement' : 'Publish announcement')}
        </button>
        <button type="button" className="btn-admin btn-admin-outline" onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  )
}
