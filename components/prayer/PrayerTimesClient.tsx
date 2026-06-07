'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { MASJIDS } from '@/lib/data'
import type { DayEntry } from '@/lib/timetable'

interface Props {
  daysByMasjid: Record<string, DayEntry[]>
  todayStr: string
}

// Strip AM/PM, replace dots with colons, trim
function t(val: string | null | undefined): string {
  if (!val) return '—'
  return val.replace(/\s*(am|pm)\s*/gi, '').replace(/\./g, ':').trim() || '—'
}

const COLS = [
  { label: 'Fajr',    begin: (d: DayEntry) => t(d.fajrBegin),  iqamah: (d: DayEntry) => t(d.fajrIqamah) },
  { label: 'Sunrise', begin: (d: DayEntry) => t(d.sunrise),     iqamah: null },
  { label: 'Dhuhr',   begin: (d: DayEntry) => t(d.dhuhrBegin),  iqamah: (d: DayEntry) => t(d.dhuhrIqamah) },
  { label: 'Asr',     begin: (d: DayEntry) => t(d.asrBegin),    iqamah: (d: DayEntry) => t(d.asrIqamah) },
  { label: 'Maghrib', begin: (d: DayEntry) => t(d.maghrib),     iqamah: null },
  { label: 'Isha',    begin: (d: DayEntry) => t(d.ishaBegin),   iqamah: (d: DayEntry) => t(d.ishaIqamah) },
  { label: "Jumu'ah", begin: (d: DayEntry) => d.jumuah ? t(d.jumuah) : null, iqamah: null },
]

export function PrayerTimesClient({ daysByMasjid, todayStr }: Props) {
  const [activeMasjid, setActiveMasjid] = useState(MASJIDS[0].id)
  const days = daysByMasjid[activeMasjid] ?? []
  const masjid = MASJIDS.find(m => m.id === activeMasjid)

  return (
    <>
      <PageHeader
        crumb="Prayer Times"
        title="Prayer timetables"
        sub="Begin times and Jammat times for all four masaajid, updated monthly."
      />
      <section className="pt-page">
        <div className="container">
          <div className="pt-layout">

            <aside className="pt-side">
              <h4>Choose masjid</h4>
              {MASJIDS.map(m => (
                <button
                  key={m.id}
                  className={`pt-side-item${activeMasjid === m.id ? ' active' : ''}`}
                  onClick={() => setActiveMasjid(m.id)}
                >
                  {m.name}
                  <small>{m.area}</small>
                </button>
              ))}
            </aside>

            <div style={{ minWidth: 0 }}>
              <div className="pt-card">
                <div className="pt-card-head">
                  <div>
                    <h2>{masjid?.name}</h2>
                    <div className="pt-card-head-meta">{masjid?.address}</div>
                  </div>
                </div>

                {days.length === 0 ? (
                  <p style={{ padding: '32px 24px', color: 'var(--muted)', fontSize: 14 }}>
                    No timetable data yet for this masjid.
                  </p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--line-2)' }}>
                          <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', whiteSpace: 'nowrap' }}>Date</th>
                          {COLS.map(c => (
                            <th key={c.label} style={{ padding: '8px 8px', textAlign: 'center', fontWeight: 600, color: 'var(--muted)' }} colSpan={c.iqamah ? 2 : 1}>
                              {c.label}
                            </th>
                          ))}
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--line-2)' }}>
                          <th />
                          {COLS.map(c => c.iqamah ? (
                            <>
                              <th key={`${c.label}-b`} style={{ padding: '4px 8px', textAlign: 'center', fontSize: 11, fontWeight: 400, color: 'var(--muted)' }}>Begin</th>
                              <th key={`${c.label}-i`} style={{ padding: '4px 8px', textAlign: 'center', fontSize: 11, fontWeight: 400, color: 'var(--muted)' }}>Iqamah</th>
                            </>
                          ) : (
                            <th key={c.label} />
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {days.map(day => {
                          const isToday = day.date === todayStr
                          const isFri = day.day === 'Fri'
                          return (
                            <tr
                              key={day.date}
                              style={{
                                background: isToday ? 'var(--teal-50, #f0fdfa)' : undefined,
                                borderLeft: isToday ? '3px solid var(--teal-600, #0d9488)' : '3px solid transparent',
                                borderBottom: '1px solid var(--line-1)',
                              }}
                            >
                              <td style={{ padding: '7px 12px', whiteSpace: 'nowrap', fontWeight: isToday ? 700 : 500, color: isFri ? 'var(--teal-700, #0f766e)' : undefined }}>
                                {day.day} {day.date.slice(5).replace('-', '/')}
                                {isToday && <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--teal-600, #0d9488)', color: '#fff', borderRadius: 4, padding: '1px 5px' }}>Today</span>}
                              </td>
                              {COLS.map(c => {
                                const begin = c.begin(day)
                                if (c.label === "Jumu'ah") {
                                  return (
                                    <td key={c.label} style={{ padding: '7px 8px', textAlign: 'center', color: begin && begin !== '—' ? 'var(--teal-700, #0f766e)' : 'var(--muted)', fontWeight: begin && begin !== '—' ? 600 : 400 }}>
                                      {isFri ? (begin || '—') : '—'}
                                    </td>
                                  )
                                }
                                const iqamah = c.iqamah ? c.iqamah(day) : null
                                return c.iqamah ? (
                                  <>
                                    <td key={`${c.label}-b`} style={{ padding: '7px 8px', textAlign: 'center' }}>{begin}</td>
                                    <td key={`${c.label}-i`} style={{ padding: '7px 8px', textAlign: 'center', color: 'var(--muted)' }}>{iqamah}</td>
                                  </>
                                ) : (
                                  <td key={c.label} style={{ padding: '7px 8px', textAlign: 'center' }}>{begin}</td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
