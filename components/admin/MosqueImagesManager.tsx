'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploadWithCrop } from './ImageUploadWithCrop'

interface MosqueImageRow {
  id: string
  masjidId: string
  url: string
  caption: string | null
  kind: string
}

interface MasjidRef {
  id: string
  name: string
  stockImg: string
}

interface Props {
  images: MosqueImageRow[]
  masjids: MasjidRef[]
}

export function MosqueImagesManager({ images, masjids }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {masjids.map((m) => (
        <MasjidImageCard
          key={m.id}
          masjid={m}
          cover={images.find((i) => i.masjidId === m.id && i.kind === 'cover') ?? null}
          gallery={images.filter((i) => i.masjidId === m.id && i.kind === 'gallery')}
        />
      ))}
    </div>
  )
}

function MasjidImageCard({
  masjid,
  cover,
  gallery,
}: {
  masjid: MasjidRef
  cover: MosqueImageRow | null
  gallery: MosqueImageRow[]
}) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function saveCover(url: string) {
    setError('')
    const res = await fetch('/api/mosque-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ masjidId: masjid.id, url, kind: 'cover' }),
    })
    if (!res.ok) {
      setError('Could not save cover image.')
      return
    }
    router.refresh()
  }

  async function deleteImage(id: string) {
    setError('')
    const res = await fetch(`/api/mosque-images/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Could not delete image.')
      return
    }
    router.refresh()
  }

  async function addGalleryPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    setError('')
    for (const file of files) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        const up = await fetch('/api/upload?folder=mosques', { method: 'POST', body: fd })
        if (!up.ok) {
          const d = await up.json().catch(() => ({}))
          setError(d.error ?? 'Upload failed')
          continue
        }
        const { url } = await up.json()
        await fetch('/api/mosque-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ masjidId: masjid.id, url, kind: 'gallery' }),
        })
      } catch {
        setError('Upload failed — check your connection.')
      }
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    router.refresh()
  }

  return (
    <div className="admin-card">
      <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px' }}>{masjid.name}</h2>
      {error && <div className="form-error-banner" style={{ marginBottom: 12 }}>{error}</div>}

      {/* Homepage cover */}
      <div className="form-field">
        <label className="form-label">Homepage cover image</label>
        <span className="form-hint" style={{ marginBottom: 8 }}>
          Shown on the homepage location section. If none is set, a stock image is used.
        </span>
        <ImageUploadWithCrop
          folder="mosques"
          aspect={16 / 10}
          hint="Homepage card"
          currentUrl={cover?.url}
          onUpload={saveCover}
          onRemove={cover ? () => deleteImage(cover.id) : undefined}
        />
      </div>

      {/* Gallery photos */}
      <div className="form-field" style={{ marginTop: 8 }}>
        <label className="form-label">Gallery photos ({gallery.length})</label>
        <span className="form-hint" style={{ marginBottom: 8 }}>
          Appear on the public Gallery page under {masjid.name}.
        </span>
        {gallery.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: 10,
              marginBottom: 12,
            }}
          >
            {gallery.map((g) => (
              <div
                key={g.id}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  backgroundImage: `url(${g.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <button
                  type="button"
                  onClick={() => deleteImage(g.id)}
                  title="Delete photo"
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                    fontSize: 15,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            className="btn-admin btn-admin-outline btn-admin-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading…' : '+ Add photos'}
          </button>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>JPG, PNG or WebP · multiple allowed</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          style={{ display: 'none' }}
          onChange={addGalleryPhotos}
        />
      </div>
    </div>
  )
}
