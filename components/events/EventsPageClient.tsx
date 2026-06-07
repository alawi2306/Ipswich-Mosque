'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Clock, Pin } from '@/components/ui/icons'
import { RegisterModal } from './RegisterModal'

interface EventItem {
  id: string
  title: string
  date: string
  time: string
  description: string
  tag: string
  masjid: string
  imageUrl?: string | null
  createdAt: string
  updatedAt: string
}

const FILTERS = ['All', 'Community', 'Education', 'Youth', 'Outreach']
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

function formatFull(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function EventsPageClient({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState('All')
  const [detailsEvent, setDetailsEvent] = useState<EventItem | null>(null)
  const [registerEvent, setRegisterEvent] = useState<EventItem | null>(null)

  const list = filter === 'All' ? events : events.filter(e => e.tag === filter)

  return (
    <>
      <PageHeader
        crumb="Events & Classes"
        title="What's on across Suffolk"
        sub="Weekly halaqas, family gatherings, youth circles and outreach. Open to all unless otherwise noted."
      />
      <section className="evt-page">
        <div className="container">
          <div className="evt-toolbar">
            <div className="evt-filters">
              {FILTERS.map(f => (
                <button key={f} className={`evt-filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{list.length} events</div>
          </div>

          <div className="evt-grid">
            {list.map(e => {
              const d = new Date(e.date)
              const day = d.getDate().toString().padStart(2, '0')
              const mon = MONTHS[d.getMonth()]
              return (
                <div key={e.id} className="evt-card">
                  <div className="evt-card-img" style={{ backgroundImage: `url(${e.imageUrl || '/logo-tight.png'})` }}>
                    <div className="evt-card-date-tag">
                      <b className="tabnum">{day}</b>
                      <span>{mon}</span>
                    </div>
                  </div>
                  <div className="evt-card-body">
                    <div className="evt-card-tag">{e.tag} · {e.masjid}</div>
                    <h3 className="evt-card-title">{e.title}</h3>
                    <p className="evt-card-desc">{e.description}</p>
                    <div className="evt-card-meta">
                      <span><Clock width="12" height="12" style={{ verticalAlign: 'middle', marginRight: 4 }} />{e.time}</span>
                      <span><Pin width="12" height="12" style={{ verticalAlign: 'middle', marginRight: 4 }} />{e.masjid.split(' ')[0]}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                      <button className="btn btn-teal btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setRegisterEvent(e)}>Register</button>
                      <button className="btn btn-outline btn-sm" onClick={() => setDetailsEvent(e)}>Details</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Details modal */}
      {detailsEvent && (
        <div className="modal-backdrop" onClick={() => setDetailsEvent(null)}>
          <div className="modal-box" onClick={ev => ev.stopPropagation()}>
            {detailsEvent.imageUrl && (
              <div style={{ width: '100%', height: 200, backgroundImage: `url(${detailsEvent.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px 12px 0 0' }} />
            )}
            <div style={{ padding: '24px 26px 26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)' }}>{detailsEvent.tag} · {detailsEvent.masjid}</span>
                <button onClick={() => setDetailsEvent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, lineHeight: 1, padding: 0 }}>×</button>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{detailsEvent.title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, fontSize: 14, color: 'var(--ink-2)' }}>
                <div style={{ display: 'flex', gap: 8 }}><Clock width={14} height={14} style={{ color: 'var(--muted)', flexShrink: 0, marginTop: 1 }} />{formatFull(detailsEvent.date)} · {detailsEvent.time}</div>
                <div style={{ display: 'flex', gap: 8 }}><Pin width={14} height={14} style={{ color: 'var(--muted)', flexShrink: 0, marginTop: 1 }} />{detailsEvent.masjid}</div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 20 }}>{detailsEvent.description}</p>
              <button className="btn btn-teal btn-sm" onClick={() => { setDetailsEvent(null); setRegisterEvent(detailsEvent) }}>
                Register for this event
              </button>
            </div>
          </div>
        </div>
      )}

      {registerEvent && (
        <RegisterModal event={registerEvent} onClose={() => setRegisterEvent(null)} />
      )}
    </>
  )
}
