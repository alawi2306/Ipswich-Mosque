'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MASJIDS } from '@/lib/data'
import type { DayEntry } from '@/lib/timetable'
import { Icon } from '@/components/ui/icons'

function t(val: string | null | undefined): string {
  if (!val) return '—'
  return val.replace(/\s*(am|pm)\s*/gi, '').replace(/\./g, ':').trim() || '—'
}

interface Props {
  todayTimes: Record<string, DayEntry | null>
  dateLabel: string
}

const PRAYERS = [
  { key: 'Fajr',    begin: (d: DayEntry) => d.fajrBegin,  iqamah: (d: DayEntry) => d.fajrIqamah },
  { key: 'Sunrise', begin: (d: DayEntry) => d.sunrise,     iqamah: () => null },
  { key: 'Dhuhr',   begin: (d: DayEntry) => d.dhuhrBegin,  iqamah: (d: DayEntry) => d.dhuhrIqamah },
  { key: 'Asr',     begin: (d: DayEntry) => d.asrBegin,    iqamah: (d: DayEntry) => d.asrIqamah },
  { key: 'Maghrib', begin: (d: DayEntry) => d.maghrib,     iqamah: () => null },
  { key: 'Isha',    begin: (d: DayEntry) => d.ishaBegin,   iqamah: (d: DayEntry) => d.ishaIqamah },
]

const TAB_LABEL: Record<string, string> = {
  nawra: 'Nawracy', taqwa: 'Taqwa', ipswich: 'Ipswich', shahjalal: 'Shah Jalal',
}

export function SalahSection({ todayTimes, dateLabel }: Props) {
  const [activeMasjid, setActiveMasjid] = useState(MASJIDS[0].id)
  const activeDay = todayTimes[activeMasjid]

  return (
    <section className="salah-section">
      <div className="container">
        <div className="salah-table-card">

          <div className="hero-prayers-head">
            <div className="hero-prayers-title">
              <Icon.Clock width={20} height={20} style={{ color: 'var(--gold-600)' }} />
              Today&apos;s Prayer Times
            </div>
            <div className="hero-prayers-date">
              <span>{dateLabel}</span>
            </div>
          </div>

          {/* Desktop grid table */}
          <div className="salah-desktop">
            <div className="salah-table-scroll">
              <div className="hero-prayers-table">
                <div className="hpt-cell hpt-head">Masjid</div>
                {PRAYERS.map(p => (
                  <div key={p.key} className="hpt-cell hpt-head" style={{ textAlign: 'center' }}>{p.key}</div>
                ))}
                {MASJIDS.map(m => {
                  const d = todayTimes[m.id]
                  return (
                    <React.Fragment key={m.id}>
                      <div className="hpt-cell hpt-masjid">{m.name}<small>{m.area}</small></div>
                      {PRAYERS.map(p => {
                        const begin = d ? p.begin(d) : '—'
                        const iqamah = d ? p.iqamah(d) : null
                        return (
                          <div key={`${m.id}-${p.key}`} className="hpt-cell hpt-time tabnum" style={{ textAlign: 'center' }}>
                            {t(begin)}
                            {iqamah ? <small>Jammat {t(iqamah)}</small> : <small>—</small>}
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile card view */}
          <div className="salah-mobile">
            <div className="salah-mobile-tabs">
              {MASJIDS.map(m => (
                <button
                  key={m.id}
                  className={`salah-mobile-tab${activeMasjid === m.id ? ' active' : ''}`}
                  onClick={() => setActiveMasjid(m.id)}
                >
                  {TAB_LABEL[m.id] ?? m.name.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="salah-mobile-prayers">
              {PRAYERS.map(p => {
                const begin = activeDay ? p.begin(activeDay) : '—'
                const iqamah = activeDay ? p.iqamah(activeDay) : null
                return (
                  <div key={p.key} className="salah-mobile-row">
                    <span className="salah-mobile-name">{p.key}</span>
                    <span className="salah-mobile-begin tabnum">{t(begin)}</span>
                    <span className="salah-mobile-jammat">{iqamah ? <>J {t(iqamah)}</> : '—'}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="hero-prayers-foot">
            <span>Times shown as Begin / Jammat. Updated weekly by each masjid.</span>
            <Link href="/prayer-times">
              Full weekly timetables <Icon.Arrow width={14} height={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
