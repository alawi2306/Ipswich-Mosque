'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui/icons'
import { RegisterModal } from '@/components/events/RegisterModal'

interface Event {
  id: string
  title: string
  date: Date | string
  time: string
  description: string
  tag: string
  masjid: string
  imageUrl?: string | null
}

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export function UpcomingEvents({ events }: { events: Event[] }) {
  const [registerEvent, setRegisterEvent] = useState<Event | null>(null)

  return (
    <>
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><Icon.Calendar width={13} height={13} /> What&apos;s on</div>
              <h2 className="section-title">Coming up.</h2>
              <div className="section-sub">A few of the events on across our masaajid this fortnight.</div>
            </div>
            <Link href="/events" className="section-link">
              All events <Icon.ChevronRight width={14} height={14} />
            </Link>
          </div>
          <div className="home-events-grid">
            {events.map((e) => {
              const d = new Date(e.date)
              const day = d.getDate().toString().padStart(2, '0')
              const mon = MONTHS[d.getMonth()]
              const dayOfWeek = d.toLocaleDateString('en-GB', { weekday: 'long' })
              return (
                <div key={e.id} className="poster-card">
                  <div
                    className="poster-card-img"
                    style={{ backgroundImage: `url(${e.imageUrl || 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80'})` }}
                  >
                    <span className="poster-card-tag">{e.tag}</span>
                    <div className="poster-card-date">
                      <b className="tabnum">{day}</b>
                      <span>{mon} · {dayOfWeek}</span>
                    </div>
                  </div>
                  <div className="poster-card-body">
                    <h3 className="poster-card-title">{e.title}</h3>
                    <div className="poster-card-meta">
                      <Icon.Clock width={11} height={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {e.time} ·{' '}
                      <Icon.Pin width={11} height={11} style={{ verticalAlign: 'middle', marginRight: 4, marginLeft: 4 }} />
                      {e.masjid}
                    </div>
                    <p className="poster-card-desc">{e.description}</p>
                    <div className="poster-card-foot">
                      <button className="btn btn-teal btn-sm" onClick={() => setRegisterEvent(e)}>Register</button>
                      <Link href="/events" className="btn btn-outline btn-sm">All events</Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {registerEvent && (
        <RegisterModal event={registerEvent} onClose={() => setRegisterEvent(null)} />
      )}
    </>
  )
}
