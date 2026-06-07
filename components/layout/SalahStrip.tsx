'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useMasjid } from '@/contexts/MasjidContext'
import { MASJIDS, TODAY_TIMES } from '@/lib/data'
import { Icon } from '@/components/ui/icons'

const PRAYER_DISPLAY = [
  { key: 'Fajr',    label: 'Fajr'    },
  { key: 'Zuhr',    label: 'Zuhr'    },
  { key: 'Asr',     label: 'ʻAsr'    },
  { key: 'Maghrib', label: 'Maghrib' },
  { key: 'Isha',    label: 'ʻIshā'   },
]

const NEXT_PRAYER = 'Asr'
const PASSED = new Set(['Fajr', 'Zuhr'])

export function SalahStrip() {
  const { activeMasjid, setActiveMasjid } = useMasjid()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const masjid = MASJIDS.find((m) => m.id === activeMasjid)!
  const t = TODAY_TIMES[activeMasjid]
  const beginsMap: Record<string, string> = {
    Fajr: t.fajr[0], Zuhr: t.dhuhr[0], Asr: t.asr[0], Maghrib: t.maghrib[0], Isha: t.isha[0],
  }
  const jamMap: Record<string, string> = {
    Fajr: t.fajr[1], Zuhr: t.dhuhr[1], Asr: t.asr[1], Maghrib: t.maghrib[1], Isha: t.isha[1],
  }

  return (
    <div className="salah-strip">
      <div className="container salah-strip-inner" style={{ padding: '14px 28px', gap: '24px' }}>
        <div className="salah-strip-grid">
          <span></span>
          {PRAYER_DISPLAY.map((p) => (
            <div key={`name-${p.key}`} className={`salah-strip-pname ${p.key === NEXT_PRAYER ? 'is-next' : ''}`}>
              {p.label}
            </div>
          ))}

          <span className="salah-strip-label" style={{ fontWeight: '300' }}>Begins</span>
          {PRAYER_DISPLAY.map((p) => (
            <div
              key={`b-${p.key}`}
              className={`salah-strip-cell tabnum ${p.key === NEXT_PRAYER ? 'next' : ''} ${PASSED.has(p.key) ? 'passed' : ''}`}
            >
              {beginsMap[p.key]}
            </div>
          ))}

          <span className="salah-strip-label" style={{ fontWeight: '400' }}>Jamāʿah</span>
          {PRAYER_DISPLAY.map((p) => (
            <div
              key={`j-${p.key}`}
              className={`salah-strip-cell jamaah tabnum ${p.key === NEXT_PRAYER ? 'next' : ''} ${PASSED.has(p.key) ? 'passed' : ''}`}
            >
              {jamMap[p.key]}
            </div>
          ))}
        </div>

        <div className="salah-strip-right-block" style={{ alignItems: 'flex-start', borderStyle: 'solid', borderWidth: '0px 0px 0px 1px', padding: '0px 0px 0px 20px', margin: '0px', width: '225px', borderColor: 'rgb(131, 140, 148)' }}>
          <div className={`masjid-picker ${open ? 'open' : ''}`} ref={ref}>
            <button className="masjid-picker-trigger" onClick={() => setOpen(!open)} style={{ width: '200px' }}>
              <Icon.Pin width={13} height={13} style={{ color: 'var(--gold-600)', flexShrink: 0 }} />
              {masjid.name}
              <svg className="masjid-picker-trigger-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="masjid-picker-menu">
              {MASJIDS.map((m) => (
                <button
                  key={m.id}
                  className={`masjid-picker-item ${activeMasjid === m.id ? 'active' : ''}`}
                  onClick={() => { setActiveMasjid(m.id); setOpen(false) }}
                >
                  <span>{m.name}<br /><small>{m.area}</small></span>
                  {activeMasjid === m.id && (
                    <span className="masjid-picker-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="salah-strip-meta">
            <span className="salah-strip-date" style={{ margin: '0px 0px 0px 1000px', padding: '0px 0px 0px 100px', borderWidth: '0px' }}>
              7 Dhū al-Hijjah 1447
            </span>
            <Link className="salah-strip-link" href="/prayer-times">Full timetable→</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
