'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@/components/ui/icons'

interface Announcement {
  id: string
  title: string
  excerpt: string
  imageUrl?: string | null
  createdAt: string | Date
}

interface Props {
  announcements: Announcement[]
}

const HERO_WASH =
  'linear-gradient(180deg, rgba(14,61,82,0.25) 0%, rgba(14,61,82,0.1) 34%, rgba(14,61,82,0.62) 68%, rgba(14,61,82,0.95) 100%), '

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1400&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1400&q=80',
  'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1400&q=80',
]

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function HeroCarousel({ announcements }: Props) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = announcements.length || 1

  useEffect(() => {
    if (paused || n <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5500)
    return () => clearInterval(t)
  }, [paused, n])

  const go = (i: number) => setIdx(((i % n) + n) % n)

  if (!announcements.length) {
    return (
      <div
        className="hero-carousel"
        style={{ backgroundImage: HERO_WASH + `url(${FALLBACK_IMGS[0]})` }}
      >
        <div className="hero-photo-content">
          <span className="hero-photo-tag">Featured · Announcement</span>
          <h1 className="hero-photo-title">Welcome to Suffolk Muslim Society</h1>
        </div>
      </div>
    )
  }

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {announcements.map((a, i) => (
        <div
          key={a.id}
          className={`hero-slide ${i === idx ? 'active' : ''}`}
          style={{ backgroundImage: HERO_WASH + `url(${a.imageUrl || FALLBACK_IMGS[i % FALLBACK_IMGS.length]})` }}
        >
          <div className="hero-photo-content">
            <span className="hero-photo-tag">Featured · Announcement</span>
            <h1 className="hero-photo-title">{a.title}</h1>
            <div className="hero-photo-meta">
              <span>{formatDate(a.createdAt)}</span>
              <span>2 min read</span>
            </div>
            <a href="#" className="hero-photo-cta">
              Read more <Icon.Arrow width={14} height={14} />
            </a>
          </div>
        </div>
      ))}
      {n > 1 && (
        <>
          <button className="hero-arrow prev" aria-label="Previous" onClick={() => go(idx - 1)}>
            <Icon.ChevronLeft width={18} height={18} />
          </button>
          <button className="hero-arrow next" aria-label="Next" onClick={() => go(idx + 1)}>
            <Icon.ChevronRight width={18} height={18} />
          </button>
          <div className="hero-dots">
            {announcements.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === idx ? 'active' : ''}`}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
