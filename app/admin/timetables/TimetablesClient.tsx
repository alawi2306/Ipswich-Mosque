'use client'

import { useState, useEffect, useCallback } from 'react'
import { weekStartString } from '@/lib/timetable'
import type { DayEntry } from '@/lib/timetable'

interface MasjidInfo {
  id: string
  name: string
  short: string
  area: string
  scrapeUrl: string | null
}

type Tab = 'image' | 'scraper'

interface MasjidState {
  tab: Tab
  days: DayEntry[]
  weekStart: string
  loading: boolean
  loadingData: boolean
  error: string | null
  success: string | null
  syncStatus: string | null
  visibleCols: string[]
  showColPicker: boolean
}

interface WeekStatus {
  weekStart: string | null
  source: string | null
}

function defaultState(): MasjidState {
  const ws = weekStartString(new Date())
  return {
    tab: 'scraper',
    days: [],
    weekStart: ws,
    loading: false,
    loadingData: false,
    error: null,
    success: null,
    syncStatus: null,
    visibleCols: COLUMNS.map(c => c.key),
    showColPicker: false,
  }
}

const COLUMNS = [
  { key: 'fajrBegin',   label: 'Fajr (B)' },
  { key: 'fajrIqamah', label: 'Fajr (I)' },
  { key: 'sunrise',     label: 'Sunrise' },
  { key: 'dhuhrBegin',  label: 'Dhuhr (B)' },
  { key: 'dhuhrIqamah',label: 'Dhuhr (I)' },
  { key: 'asrBegin',    label: 'Asr (B)' },
  { key: 'asrIqamah',   label: 'Asr (I)' },
  { key: 'maghrib',     label: 'Maghrib' },
  { key: 'ishaBegin',   label: 'Isha (B)' },
  { key: 'ishaIqamah',  label: 'Isha (I)' },
  { key: 'jumuah',      label: "Jumu'ah" },
] as const

type DayEntryKey = keyof DayEntry

export function TimetablesClient({ masjids }: { masjids: MasjidInfo[] }) {
  const [expandedMasjid, setExpandedMasjid] = useState<string | null>(null)
  const [states, setStates] = useState<Record<string, MasjidState>>(() =>
    Object.fromEntries(masjids.map(m => [m.id, defaultState()]))
  )
  const [weekStatuses, setWeekStatuses] = useState<Record<string, WeekStatus>>(() =>
    Object.fromEntries(masjids.map(m => [m.id, { weekStart: null, source: null }]))
  )

  // Load current week status for all masjids on mount
  useEffect(() => {
    masjids.forEach(m => {
      fetch(`/api/timetables/week/${m.id}`)
        .then(r => r.json())
        .then((data: { weekStart: string; source: string }[]) => {
          if (Array.isArray(data) && data.length > 0) {
            setWeekStatuses(prev => ({
              ...prev,
              [m.id]: { weekStart: data[0].weekStart, source: data[0].source },
            }))
          }
        })
        .catch(() => {})
    })
  }, [masjids])

  // Load settings when a masjid is expanded
  const loadSettings = useCallback(async (masjidId: string) => {
    setState(masjidId, s => ({ ...s, loadingData: true }))
    try {
      const [settingsRes, weeksRes] = await Promise.all([
        fetch(`/api/timetables/settings/${masjidId}`),
        fetch(`/api/timetables/week/${masjidId}`),
      ])
      if (settingsRes.ok) {
        const data = await settingsRes.json()
        setState(masjidId, s => ({
          ...s,
          postcode: data.postcode ?? '',
          apiAutoSync: data.autoMethod === 'api',
        }))
      }
      if (weeksRes.ok) {
        const weeks: { weekStart: string; days: DayEntry[] }[] = await weeksRes.json()
        if (weeks.length > 0) {
          const seen = new Set<string>()
          const allDays = weeks
            .flatMap(w => w.days)
            .sort((a, b) => a.date.localeCompare(b.date))
            .filter(d => !seen.has(d.date) && seen.add(d.date))
          const firstWeekStart = weekStartString(new Date(allDays[0].date + 'T12:00:00'))
          setState(masjidId, s => ({
            ...s,
            days: allDays,
            weekStart: firstWeekStart,
          }))
        }
      }
    } catch {}
    setState(masjidId, s => ({ ...s, loadingData: false }))
  }, [])

  function setState(masjidId: string, updater: (s: MasjidState) => MasjidState) {
    setStates(prev => ({ ...prev, [masjidId]: updater(prev[masjidId]) }))
  }

  function toggleExpand(masjidId: string) {
    if (expandedMasjid === masjidId) {
      setExpandedMasjid(null)
    } else {
      setExpandedMasjid(masjidId)
      loadSettings(masjidId)
    }
  }

  function updateDay(masjidId: string, dayIndex: number, field: DayEntryKey, value: string) {
    setState(masjidId, s => {
      const days = s.days.map((d, i) => (i === dayIndex ? { ...d, [field]: value } : d))
      return { ...s, days }
    })
  }

  function addRow(masjidId: string) {
    setState(masjidId, s => {
      const last = s.days[s.days.length - 1]
      let nextDate = ''
      let nextDay = ''
      if (last) {
        const d = new Date(last.date + 'T12:00:00')
        d.setDate(d.getDate() + 1)
        nextDate = d.toISOString().split('T')[0]
        nextDay = d.toLocaleDateString('en-GB', { weekday: 'short' })
      }
      const blank: DayEntry = {
        date: nextDate, day: nextDay,
        fajrBegin: '', fajrIqamah: '', sunrise: '',
        dhuhrBegin: '', dhuhrIqamah: '',
        asrBegin: '', asrIqamah: '',
        maghrib: '', ishaBegin: '', ishaIqamah: '',
        jumuah: nextDay === 'Fri' ? '' : null,
      }
      return { ...s, days: [...s.days, blank] }
    })
  }

  function deleteRow(masjidId: string, index: number) {
    setState(masjidId, s => ({ ...s, days: s.days.filter((_, i) => i !== index) }))
  }

  function toggleCol(masjidId: string, key: string) {
    setState(masjidId, s => {
      const already = s.visibleCols.includes(key)
      const visibleCols = already ? s.visibleCols.filter(k => k !== key) : [...s.visibleCols, key]
      return { ...s, visibleCols }
    })
  }

  function duplicateRow(masjidId: string, index: number) {
    setState(masjidId, s => {
      const copy = { ...s.days[index] }
      const days = [...s.days.slice(0, index + 1), copy, ...s.days.slice(index + 1)]
      return { ...s, days }
    })
  }

  function moveRow(masjidId: string, index: number, dir: -1 | 1) {
    setState(masjidId, s => {
      const days = [...s.days]
      const target = index + dir
      if (target < 0 || target >= days.length) return s;
      [days[index], days[target]] = [days[target], days[index]]
      return { ...s, days }
    })
  }

  async function handleImageUpload(masjidId: string, file: File) {
    setState(masjidId, s => ({ ...s, loading: true, error: null, success: null }))
    try {
      const arrayBuffer = await file.arrayBuffer()
      const imageBase64 = Buffer.from(arrayBuffer).toString('base64')
      const extRes = await fetch('/api/timetables/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType: file.type }),
      })
      if (!extRes.ok) {
        const err = await extRes.json()
        setState(masjidId, s => ({ ...s, loading: false, error: err.error ?? 'Extraction failed' }))
        return
      }
      const { days } = await extRes.json()
      const ws = days.length > 0 ? weekStartString(new Date(days[0].date)) : states[masjidId].weekStart
      setState(masjidId, s => ({ ...s, loading: false, days, weekStart: ws }))
    } catch (err) {
      setState(masjidId, s => ({ ...s, loading: false, error: String(err) }))
    }
  }

  async function handleSaveAndSync(masjidId: string, scrapeUrl: string) {
    if (!scrapeUrl) return
    setState(masjidId, st => ({ ...st, loading: true, error: null, syncStatus: null }))

    // 1. Save settings + enable auto-sync
    try {
      await fetch(`/api/timetables/settings/${masjidId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scrapeUrl, autoMethod: 'scrape' }),
      })
    } catch {}

    // 2. Scrape
    let days: DayEntry[]
    try {
      const res = await fetch('/api/timetables/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scrapeUrl }),
      })
      if (!res.ok) {
        const err = await res.json()
        setState(masjidId, st => ({ ...st, loading: false, error: err.error ?? 'Scrape failed' }))
        return
      }
      ;({ days } = await res.json())
    } catch (err) {
      setState(masjidId, st => ({ ...st, loading: false, error: String(err) }))
      return
    }

    if (!days || days.length === 0) {
      setState(masjidId, st => ({ ...st, loading: false, error: 'No prayer times found at that URL' }))
      return
    }

    // 3. Group days by week and save each week
    const byWeek = new Map<string, DayEntry[]>()
    for (const day of days) {
      const ws = weekStartString(new Date(day.date + 'T12:00:00'))
      if (!byWeek.has(ws)) byWeek.set(ws, [])
      byWeek.get(ws)!.push(day)
    }
    let saved = 0
    for (const [ws, wDays] of byWeek) {
      try {
        const res = await fetch(`/api/timetables/week/${masjidId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ weekStart: ws, source: 'scrape', days: wDays }),
        })
        if (res.ok) saved += wDays.length
      } catch {}
    }

    const firstWeekStart = weekStartString(new Date(days[0].date + 'T12:00:00'))
    setWeekStatuses(prev => ({
      ...prev,
      [masjidId]: { weekStart: firstWeekStart, source: 'scrape' },
    }))

    setState(masjidId, st => ({
      ...st,
      loading: false,
      days,
      weekStart: firstWeekStart,
      syncStatus: `Synced ${saved} days across ${byWeek.size} week${byWeek.size !== 1 ? 's' : ''}`,
    }))
  }

  async function handleSaveTimetable(masjidId: string) {
    const s = states[masjidId]
    if (s.days.length === 0) return
    setState(masjidId, st => ({ ...st, loading: true, error: null, success: null }))
    const sourceMap: Record<Tab, string> = {
      image: 'ai-image', scraper: 'scrape',
    }
    const source = sourceMap[s.tab]
    // Split into weeks so we never store multiple months worth in one record
    const byWeek = new Map<string, DayEntry[]>()
    for (const day of s.days) {
      const ws = weekStartString(new Date(day.date + 'T12:00:00'))
      if (!byWeek.has(ws)) byWeek.set(ws, [])
      byWeek.get(ws)!.push(day)
    }
    try {
      for (const [ws, wDays] of byWeek) {
        const res = await fetch(`/api/timetables/week/${masjidId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ weekStart: ws, source, days: wDays }),
        })
        if (!res.ok) {
          const err = await res.json()
          setState(masjidId, st => ({ ...st, loading: false, error: err.error ?? 'Save failed' }))
          return
        }
      }
      setState(masjidId, st => ({ ...st, loading: false, success: 'Timetable saved!' }))
      setWeekStatuses(prev => ({
        ...prev,
        [masjidId]: { weekStart: weekStartString(new Date(s.days[0].date + 'T12:00:00')), source },
      }))
      setTimeout(() => setState(masjidId, st => ({ ...st, success: null })), 3000)
    } catch (err) {
      setState(masjidId, st => ({ ...st, loading: false, error: String(err) }))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {masjids.map(m => {
        const s = states[m.id]
        const status = weekStatuses[m.id]
        const isExpanded = expandedMasjid === m.id

        return (
          <div key={m.id} className="tt-card">
            {/* Card header */}
            <div className="tt-card-header" onClick={() => toggleExpand(m.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{m.area}</div>
                </div>
                {status.weekStart ? (
                  <div className="timetable-status">
                    <span className="timetable-status-dot" style={{ background: '#22c55e' }} />
                    w/c {status.weekStart}
                    {status.source && (
                      <span className="admin-badge admin-badge-blue" style={{ marginLeft: 4, fontSize: 10 }}>
                        {status.source}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="timetable-status">
                    <span className="timetable-status-dot" style={{ background: '#94a3b8' }} />
                    No timetable set
                  </div>
                )}
              </div>
              <span style={{ color: '#94a3b8', fontSize: 18, userSelect: 'none' }}>
                {isExpanded ? '▲' : '▼'}
              </span>
            </div>

            {/* Card body */}
            {isExpanded && (
              <div className="tt-card-body">

                {/* Timetable table — always visible above the tabs */}
                {s.loadingData && (
                  <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Loading timetable…</p>
                )}
                {!s.loadingData && (
                  <>
                    {/* Toolbar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                      <button className="btn-admin btn-admin-outline btn-admin-sm" onClick={() => addRow(m.id)}>
                        + Add row
                      </button>
                      <button
                        className={`btn-admin btn-admin-sm ${s.showColPicker ? 'btn-admin-primary' : 'btn-admin-outline'}`}
                        onClick={() => setState(m.id, st => ({ ...st, showColPicker: !st.showColPicker }))}
                      >
                        Columns ({s.visibleCols.length}/{COLUMNS.length})
                      </button>
                      {s.days.length > 0 && (
                        <>
                          <button className="btn-admin btn-admin-primary btn-admin-sm" disabled={s.loading} onClick={() => handleSaveTimetable(m.id)}>
                            {s.loading ? 'Saving…' : 'Save timetable'}
                          </button>
                          <button className="btn-admin btn-admin-outline btn-admin-sm" disabled={s.loading} onClick={() => setState(m.id, st => ({ ...st, days: [], syncStatus: null }))}>
                            Clear table
                          </button>
                        </>
                      )}
                    </div>

                    {/* Column picker */}
                    {s.showColPicker && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 10, fontSize: 13 }}>
                        {COLUMNS.map(c => (
                          <label key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', userSelect: 'none' }}>
                            <input
                              type="checkbox"
                              checked={s.visibleCols.includes(c.key)}
                              onChange={() => toggleCol(m.id, c.key)}
                            />
                            {c.label}
                          </label>
                        ))}
                        <button
                          style={{ marginLeft: 'auto', fontSize: 11, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => setState(m.id, st => ({ ...st, visibleCols: COLUMNS.map(c => c.key) }))}
                        >
                          Show all
                        </button>
                      </div>
                    )}

                    {/* Table */}
                    {s.days.length > 0 && (
                      <div className="timetable-preview-wrap">
                        <table className="timetable-preview">
                          <thead>
                            <tr>
                              <th style={{ width: 28 }}></th>
                              <th>Day</th>
                              <th>Date</th>
                              {COLUMNS.filter(c => s.visibleCols.includes(c.key)).map(c => <th key={c.key}>{c.label}</th>)}
                              <th style={{ width: 72 }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {s.days.map((day, i) => (
                              <tr key={i}>
                                {/* Move up/down */}
                                <td style={{ padding: '2px 4px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <button
                                      onClick={() => moveRow(m.id, i, -1)}
                                      disabled={i === 0}
                                      style={{ background: 'none', border: 'none', cursor: i === 0 ? 'default' : 'pointer', color: i === 0 ? '#cbd5e1' : '#64748b', fontSize: 10, lineHeight: 1, padding: '1px 3px' }}
                                    >▲</button>
                                    <button
                                      onClick={() => moveRow(m.id, i, 1)}
                                      disabled={i === s.days.length - 1}
                                      style={{ background: 'none', border: 'none', cursor: i === s.days.length - 1 ? 'default' : 'pointer', color: i === s.days.length - 1 ? '#cbd5e1' : '#64748b', fontSize: 10, lineHeight: 1, padding: '1px 3px' }}
                                    >▼</button>
                                  </div>
                                </td>
                                {/* Day name */}
                                <td>
                                  <input
                                    type="text"
                                    value={day.day}
                                    onChange={e => updateDay(m.id, i, 'day', e.target.value)}
                                    style={{ width: 36, color: day.day === 'Fri' ? '#0ea5e9' : undefined, fontWeight: 600 }}
                                  />
                                </td>
                                {/* Date */}
                                <td>
                                  <input
                                    type="date"
                                    value={day.date}
                                    onChange={e => updateDay(m.id, i, 'date', e.target.value)}
                                    style={{ width: 120, fontSize: 12 }}
                                  />
                                </td>
                                {/* Prayer time columns */}
                                {COLUMNS.filter(c => s.visibleCols.includes(c.key)).map(c => {
                                  if (c.key === 'jumuah') {
                                    return (
                                      <td key={c.key}>
                                        <input
                                          type="text"
                                          value={day.jumuah ?? ''}
                                          onChange={e => updateDay(m.id, i, 'jumuah', e.target.value)}
                                          placeholder={day.jumuah === null ? '(non-Fri)' : '1:30 & 2:00'}
                                          style={{ width: 90, color: day.jumuah === null ? '#cbd5e1' : undefined }}
                                        />
                                      </td>
                                    )
                                  }
                                  return (
                                    <td key={c.key}>
                                      <input
                                        type="text"
                                        value={(day[c.key as DayEntryKey] as string) ?? ''}
                                        onChange={e => updateDay(m.id, i, c.key as DayEntryKey, e.target.value)}
                                      />
                                    </td>
                                  )
                                })}
                                {/* Row actions */}
                                <td style={{ whiteSpace: 'nowrap' }}>
                                  <button
                                    title="Duplicate row"
                                    onClick={() => duplicateRow(m.id, i)}
                                    style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 4, cursor: 'pointer', color: '#64748b', fontSize: 11, padding: '2px 6px', marginRight: 4 }}
                                  >⧉</button>
                                  <button
                                    title="Delete row"
                                    onClick={() => deleteRow(m.id, i)}
                                    style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 4, cursor: 'pointer', color: '#ef4444', fontSize: 13, padding: '2px 6px' }}
                                  >×</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {s.days.length === 0 && (
                      <div style={{ padding: '20px 0', color: '#94a3b8', fontSize: 13 }}>
                        No rows yet — use a tab below to import times, or click <b>+ Add row</b> to build manually.
                      </div>
                    )}
                  </>
                )}

                {/* Tab switcher */}
                <div className="timetable-tabs">
                  {(['image', 'scraper'] as Tab[]).map(tab => (
                    <button
                      key={tab}
                      className={`timetable-tab${s.tab === tab ? ' active' : ''}`}
                      onClick={() => setState(m.id, st => ({ ...st, tab, error: null, success: null }))}
                    >
                      {tab === 'image' && 'AI Image Scan'}
                      {tab === 'scraper' && 'Web Scraper'}
                    </button>
                  ))}
                </div>

                {/* AI Image Scan tab */}
                {s.tab === 'image' && (
                  <div>
                    <div className="form-field" style={{ maxWidth: 400 }}>
                      <label className="form-label">Upload timetable image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-input"
                        disabled={s.loading}
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(m.id, file)
                        }}
                      />
                      <span className="form-hint">Select a photo of a printed or digital timetable</span>
                    </div>
                    {s.loading && (
                      <p style={{ fontSize: 13, color: '#0ea5e9', marginTop: 12 }}>Extracting times…</p>
                    )}
                  </div>
                )}

                {/* Web Scraper tab */}
                {s.tab === 'scraper' && (
                  <div>
                    {m.scrapeUrl ? (
                      <>
                        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                          Syncs from <span style={{ fontFamily: 'monospace' }}>{m.scrapeUrl}</span>
                        </p>
                        <button
                          className="btn-admin btn-admin-primary btn-admin-sm"
                          disabled={s.loading}
                          onClick={() => handleSaveAndSync(m.id, m.scrapeUrl!)}
                        >
                          {s.loading ? 'Syncing…' : 'Sync now'}
                        </button>
                        {s.syncStatus && (
                          <span style={{ marginLeft: 12, fontSize: 12, color: '#16a34a' }}>{s.syncStatus}</span>
                        )}
                      </>
                    ) : (
                      <p style={{ fontSize: 13, color: '#94a3b8' }}>No scrape URL configured for this mosque.</p>
                    )}
                  </div>
                )}


                {/* Error / success messages */}
                {s.error && (
                  <div className="form-error-banner" style={{ marginTop: 16 }}>{s.error}</div>
                )}
                {s.success && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: '10px 14px',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: 7,
                      fontSize: 13,
                      color: '#16a34a',
                    }}
                  >
                    {s.success}
                  </div>
                )}

              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
