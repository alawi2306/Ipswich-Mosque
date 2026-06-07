'use client'
import { useState } from 'react'
import { FileUpload } from './FileUpload'

interface Props {
  masjidId: string
  masjidName: string
  onSuccess: () => void
}

function getCurrentWeek() {
  const now = new Date()
  const year = now.getFullYear()
  const startOfYear = new Date(year, 0, 1)
  const week = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)
  return `${year}-W${String(week).padStart(2, '0')}`
}

export function TimetableUploadForm({ masjidId, masjidName, onSuccess }: Props) {
  const [fileUrl, setFileUrl] = useState('')
  const [fileType, setFileType] = useState('')
  const [weekOf, setWeekOf] = useState(getCurrentWeek)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function save() {
    if (!fileUrl) { setError('Please upload a file first'); return }
    setSaving(true)
    setError('')
    const res = await fetch(`/api/timetables/${masjidId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileUrl, fileType, weekOf }),
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Failed to save timetable')
      setSaving(false)
      return
    }
    setDone(true)
    setSaving(false)
    onSuccess()
  }

  if (done) {
    return <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>✓ Timetable uploaded for {masjidName}</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="form-field">
        <label className="form-label">Week of</label>
        <input type="week" className="form-input" value={weekOf} onChange={e => setWeekOf(e.target.value)} />
      </div>
      <FileUpload onUpload={({ url, fileType: ft }) => { setFileUrl(url); setFileType(ft) }} />
      {error && <div className="form-error-msg">{error}</div>}
      <button
        type="button"
        className="btn-admin btn-admin-primary"
        onClick={save}
        disabled={saving || !fileUrl}
      >
        {saving ? 'Saving…' : 'Save timetable'}
      </button>
    </div>
  )
}
