'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Download, Calendar, Bell, ChevronLeft, ChevronRight, Clock, Mail } from '@/components/ui/icons'
import { MASJIDS } from '@/lib/data'

interface TimetableEntry {
  fileUrl: string
  fileType: string
  weekOf: string
}

interface PrayerPageClientProps {
  timetableByMasjid: Record<string, TimetableEntry>
}

export function PrayerPageClient({ timetableByMasjid }: PrayerPageClientProps) {
  const [activeMasjid, setActiveMasjid] = useState('ipswich')
  const masjid = MASJIDS.find(m => m.id === activeMasjid)
  const timetable = timetableByMasjid[activeMasjid]

  return (
    <>
      <PageHeader
        crumb="Prayer Times"
        title="Prayer timetables"
        sub="Begin times calculated by Muslim World League method. Jammat times set by each masjid committee and updated weekly."
      />
      <section className="pt-page">
        <div className="container">
          <div className="pt-layout">
            <aside className="pt-side">
              <h4>Choose masjid</h4>
              {MASJIDS.map(m => (
                <button
                  key={m.id}
                  className={`pt-side-item ${activeMasjid === m.id ? 'active' : ''}`}
                  onClick={() => setActiveMasjid(m.id)}
                >
                  {m.name}
                  <small>{m.area}</small>
                </button>
              ))}
              <h4 style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line-2)' }}>Resources</h4>
              <button className="pt-side-item">
                <Download width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Annual calendar
              </button>
              <button className="pt-side-item">
                <Calendar width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Subscribe (iCal)
              </button>
              <button className="pt-side-item">
                <Bell width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Adhan notifications
              </button>
            </aside>
            <div>
              {timetable?.fileUrl ? (
                timetable.fileType.includes('pdf') ? (
                  <iframe src={timetable.fileUrl} className="pt-iframe" />
                ) : (
                  <img src={timetable.fileUrl} className="pt-img" alt="Prayer timetable" />
                )
              ) : (
                <div className="pt-card">
                  <div className="pt-card-head">
                    <div>
                      <h2>{masjid?.name}</h2>
                      <div className="pt-card-head-meta">{masjid?.address}</div>
                    </div>
                    <div className="pt-card-head-week">
                      <button><ChevronLeft width="14" height="14" /></button>
                      Week of 25–31 May 2026
                      <button><ChevronRight width="14" height="14" /></button>
                    </div>
                  </div>
                  <p style={{ padding: '32px 24px', color: 'var(--muted)', fontSize: 14 }}>
                    No timetable has been uploaded for this masjid yet. Check back soon.
                  </p>
                </div>
              )}

              <div className="pt-notes">
                <div className="pt-note">
                  <div className="pt-note-icon"><Calendar width="16" height="16" /></div>
                  <h4>Jumu'ah this week</h4>
                  <p>First congregation 1:30 PM · second congregation 2:00 PM. Khutbah begins 15 minutes prior to each.</p>
                </div>
                <div className="pt-note">
                  <div className="pt-note-icon"><Clock width="16" height="16" /></div>
                  <h4>How times are set</h4>
                  <p>Begin times follow MWL calculation. Jammat times are decided by each masjid committee.</p>
                </div>
                <div className="pt-note">
                  <div className="pt-note-icon"><Mail width="16" height="16" /></div>
                  <h4>Notice an error?</h4>
                  <p>
                    Email{' '}
                    <a href="mailto:admin@suffolkmuslim.org" style={{ color: 'var(--teal-700)', fontWeight: 600 }}>
                      admin@suffolkmuslim.org
                    </a>{' '}
                    and we'll forward it to the relevant masjid committee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
