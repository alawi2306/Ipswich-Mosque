'use client'
import { useState } from 'react'

interface GalleryImage {
  id: string
  masjidId: string
  url: string
  caption: string | null
}

interface MasjidRef {
  id: string
  name: string
}

interface Props {
  images: GalleryImage[]
  masjids: MasjidRef[]
}

export function GalleryClient({ images, masjids }: Props) {
  const [active, setActive] = useState<string>('all')

  // Only show filter chips for mosques that actually have photos.
  const masjidsWithPhotos = masjids.filter((m) => images.some((img) => img.masjidId === m.id))
  const shown = active === 'all' ? images : images.filter((img) => img.masjidId === active)

  if (images.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--ink-2)', padding: '48px 0' }}>
        No photos have been added yet — check back soon.
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
        <button
          className={`gallery-filter${active === 'all' ? ' active' : ''}`}
          onClick={() => setActive('all')}
        >
          All masaajid
        </button>
        {masjidsWithPhotos.map((m) => (
          <button
            key={m.id}
            className={`gallery-filter${active === m.id ? ' active' : ''}`}
            onClick={() => setActive(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {shown.map((img) => (
          <div
            key={img.id}
            className="gallery-tile"
            style={{ backgroundImage: `url(${img.url})` }}
          >
            {img.caption && (
              <div className="gallery-tile-caption">
                <b>{img.caption}</b>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
