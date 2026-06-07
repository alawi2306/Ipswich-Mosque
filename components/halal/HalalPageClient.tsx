'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { HALAL_PLACES } from '@/lib/data'
import { Pin, Arrow } from '@/components/ui/icons'

const CATEGORIES = ['All', 'Restaurants', 'Takeaways', 'Butchers', 'Grocery shops', 'Dessert shops']

interface DbPlace {
  id: string
  name: string
  category: string
  address: string | null
  rating: number | null
  hmc: boolean
  prayer: boolean
  family: boolean
}

interface Props {
  dbPlaces?: DbPlace[]
}

export function HalalPageClient({ dbPlaces = [] }: Props) {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Merge static places + approved DB places
  const allPlaces = [
    ...HALAL_PLACES,
    ...dbPlaces.map(p => ({
      id: p.id as unknown as number,
      name: p.name,
      category: p.category,
      rating: p.rating ?? 0,
      addr: p.address ?? '',
      hmc: p.hmc,
      prayer: p.prayer,
      family: p.family,
      img: '',
    })),
  ]

  let list = allPlaces
  if (cat !== 'All') list = list.filter(p => p.category === cat)
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <PageHeader
        crumb="Halal Guide"
        title="Halal places around Ipswich"
        sub="Kept up to date by the community. HMC status, prayer space and family-friendliness noted where we know. If we've missed somewhere or got something wrong, please tell us."
      />
      <section className="halal-page">
        <div className="container">
          <div className="halal-toolbar">
            <div className="halal-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" />
              </svg>
              <input placeholder="Search by name…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-sm"><Pin width="13" height="13" /> Show on map</button>
            </div>
          </div>
          <div className="halal-grid">
            <aside className="halal-categories">
              <h4 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700, margin: '6px 12px 12px' }}>Categories</h4>
              {CATEGORIES.map(c => {
                const count = c === 'All' ? allPlaces.length : allPlaces.filter(p => p.category === c).length
                return (
                  <button key={c} className={`halal-cat-item ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
                    {c} <span className="halal-cat-count">{count}</span>
                  </button>
                )
              })}
              <h4 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700, margin: '16px 12px 12px', paddingTop: 14, borderTop: '1px solid var(--line-2)' }}>Filters</h4>
              <label className="halal-cat-item" style={{ cursor: 'pointer' }}><span><input type="checkbox" style={{ marginRight: 8 }} />HMC certified</span></label>
              <label className="halal-cat-item" style={{ cursor: 'pointer' }}><span><input type="checkbox" style={{ marginRight: 8 }} />Prayer facilities</span></label>
              <label className="halal-cat-item" style={{ cursor: 'pointer' }}><span><input type="checkbox" style={{ marginRight: 8 }} />Family friendly</span></label>
            </aside>
            <div className="halal-list">
              {list.map(p => (
                <div key={p.id} className="halal-card">
                  {p.img && <div className="halal-card-img" style={{ backgroundImage: `url(${p.img})` }}></div>}
                  {!p.img && <div className="halal-card-img" style={{ background: 'var(--teal-50)' }}></div>}
                  <div className="halal-card-body">
                    <div className="halal-card-head">
                      <div style={{ minWidth: 0 }}>
                        <h3 className="halal-card-name">{p.name}</h3>
                        <div className="halal-card-cat">{p.category}</div>
                      </div>
                      {p.rating > 0 && <span className="halal-card-rating">★ {p.rating}</span>}
                    </div>
                    <div className="halal-card-addr"><Pin width="11" height="11" />{p.addr}</div>
                    <div className="halal-card-badges">
                      {p.hmc && <span className="halal-badge hmc">✓ HMC</span>}
                      {p.prayer && <span className="halal-badge prayer">⛧ Prayer space</span>}
                      {p.family && <span className="halal-badge family">♡ Family</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
    </>
  )
}

function SubmitModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: '', category: 'Restaurants', googleUrl: '',
    hmc: false, prayer: false, family: false, notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/halal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        {status === 'done' ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h2 style={{ marginBottom: 8 }}>Submitted!</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Thanks — the committee will review and publish it shortly.</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0 }}>Submit a place</h2>
              <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--muted)' }}>×</button>
            </div>
            <div className="field">
              <label>Business name <span style={{ color: '#ef4444' }}>*</span></label>
              <input required type="text" placeholder="e.g. Al-Barakah Grill" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="field">
              <label>Category <span style={{ color: '#ef4444' }}>*</span></label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {['Restaurants', 'Takeaways', 'Butchers', 'Grocery shops', 'Dessert shops'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Google Maps link <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional but recommended)</span></label>
              <input type="url" placeholder="https://www.google.com/maps/place/..." value={form.googleUrl} onChange={e => set('googleUrl', e.target.value)} />
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Paste the Google Maps URL so we can pull in ratings, address, and reviews automatically.</div>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '8px 0 16px' }}>
              {([['hmc', 'HMC certified'], ['prayer', 'Prayer space'], ['family', 'Family friendly']] as const).map(([key, label]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} />
                  {label}
                </label>
              ))}
            </div>
            <div className="field">
              <label>Notes <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
              <textarea placeholder="Anything else the committee should know?" value={form.notes} onChange={e => set('notes', e.target.value)} style={{ minHeight: 80 }} />
            </div>
            {status === 'error' && <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 8 }}>Something went wrong. Please try again.</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
              {status === 'sending' ? 'Submitting…' : <><span>Submit for review</span> <Arrow width="14" height="14" /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
