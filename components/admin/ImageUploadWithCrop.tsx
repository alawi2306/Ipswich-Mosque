'use client'
import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface Props {
  folder: string
  aspect: number
  hint: string
  onUpload: (url: string) => void
  currentUrl?: string
  onRemove?: () => void
}

function initCrop(width: number, height: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, width, height),
    width, height
  )
}

async function cropToBlob(img: HTMLImageElement, px: PixelCrop): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const scaleX = img.naturalWidth / img.width
  const scaleY = img.naturalHeight / img.height
  canvas.width = px.width * scaleX
  canvas.height = px.height * scaleY
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    img,
    px.x * scaleX, px.y * scaleY,
    px.width * scaleX, px.height * scaleY,
    0, 0,
    canvas.width, canvas.height,
  )
  return new Promise((res, rej) =>
    canvas.toBlob(b => b ? res(b) : rej(new Error('Canvas empty')), 'image/jpeg', 0.92)
  )
}

export function ImageUploadWithCrop({ folder, aspect, hint, onUpload, currentUrl, onRemove }: Props) {
  const [srcUrl, setSrcUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function pickFile() { inputRef.current?.click() }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setSrcUrl(url)
    setCrop(undefined)
    setCompletedCrop(undefined)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(initCrop(width, height, aspect))
  }, [aspect])

  function cancel() {
    if (srcUrl) URL.revokeObjectURL(srcUrl)
    setSrcUrl(null)
  }

  async function applyCrop() {
    if (!imgRef.current || !completedCrop) return
    setUploading(true)
    setError('')
    try {
      const blob = await cropToBlob(imgRef.current, completedCrop)
      const fd = new FormData()
      fd.append('file', new File([blob], 'image.jpg', { type: 'image/jpeg' }))
      const res = await fetch(`/api/upload?folder=${folder}`, { method: 'POST', body: fd })
      if (!res.ok) { setError('Upload failed'); return }
      const { url } = await res.json()
      onUpload(url)
      cancel()
    } catch {
      setError('Upload failed, please try again.')
    } finally {
      setUploading(false)
    }
  }

  const [w, h] = aspect >= 1
    ? [Math.round(aspect * 100), 100]
    : [100, Math.round(100 / aspect)]
  const ratioLabel = `${w}:${h}`

  return (
    <>
      {/* Trigger + current image */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {currentUrl && (
          <div style={{ position: 'relative', width: '100%', maxWidth: 420, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <img src={currentUrl} alt="Cover" style={{ width: '100%', aspectRatio: `${aspect}`, objectFit: 'cover', display: 'block' }} />
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 13 }}
              >
                Remove
              </button>
            )}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            onClick={pickFile}
            className="btn-admin btn-admin-outline btn-admin-sm"
          >
            {currentUrl ? 'Replace image' : '+ Upload image'}
          </button>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{ratioLabel} · {hint}</span>
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={onFileChange} />
      </div>

      {/* Crop modal */}
      {srcUrl && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', maxWidth: 780, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Crop image</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                  Drag to reposition · {ratioLabel} ratio ({hint})
                </div>
              </div>
              <button type="button" onClick={cancel} style={{ background: 'none', border: 'none', fontSize: 22, color: '#94a3b8', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>

            {/* Crop area */}
            <div style={{ background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, maxHeight: '65vh', overflow: 'auto' }}>
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
                aspect={aspect}
                style={{ maxWidth: '100%' }}
              >
                <img
                  ref={imgRef}
                  src={srcUrl}
                  onLoad={onImageLoad}
                  alt="Crop preview"
                  style={{ maxWidth: '100%', maxHeight: '55vh', display: 'block' }}
                />
              </ReactCrop>
            </div>

            {/* Footer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
              {error && <span style={{ fontSize: 13, color: '#ef4444', marginRight: 'auto' }}>{error}</span>}
              <button type="button" onClick={cancel} className="btn-admin btn-admin-outline">Cancel</button>
              <button
                type="button"
                onClick={applyCrop}
                disabled={uploading || !completedCrop}
                className="btn-admin btn-admin-primary"
              >
                {uploading ? 'Uploading…' : 'Use this crop'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
