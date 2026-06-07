'use client'
import { useState, useRef } from 'react'

interface Props {
  onUpload: (result: { url: string; fileType: string }) => void
  accept?: string
}

export function FileUpload({ onUpload, accept = 'application/pdf,image/jpeg,image/png,image/webp' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<{ name: string; url: string } | null>(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function upload(file: File) {
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Upload failed')
        return
      }
      const data = await res.json()
      setUploaded({ name: file.name, url: data.url })
      onUpload({ url: data.url, fileType: data.fileType || file.type })
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div
        className={`upload-zone${dragging ? ' dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) upload(f) }}
      >
        <div className="upload-zone-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p>{uploading ? 'Uploading…' : 'Click or drag to upload'}</p>
        <small>PDF, JPEG, PNG or WebP — max 20 MB</small>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f) }}
        />
      </div>
      {uploaded && (
        <div className="upload-preview">
          <div>
            <div className="upload-preview-name">{uploaded.name}</div>
            <div className="upload-success">✓ Uploaded successfully</div>
          </div>
          <a href={uploaded.url} target="_blank" rel="noopener" style={{ fontSize: 12, color: '#0ea5e9', textDecoration: 'none' }}>View file</a>
        </div>
      )}
      {error && <div className="form-error-msg" style={{ marginTop: 8 }}>{error}</div>}
    </div>
  )
}
