'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Setup2FAPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/auth/setup-2fa')
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else { setQrDataUrl(data.qrDataUrl); setSecret(data.secret) }
      })
      .catch(() => setError('Failed to load setup data'))
  }, [])

  return (
    <div style={{ maxWidth: 480, margin: '48px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Set up two-factor authentication</h1>
      <p style={{ color: '#64748b', marginBottom: 32, fontSize: 14 }}>
        Scan the QR code below with Google Authenticator, Authy, or any TOTP app.
        After scanning, every login will require your password plus a 6-digit code from the app.
      </p>

      {error && (
        <div className="form-error-banner" style={{ marginBottom: 24 }}>
          <strong>Setup not available:</strong> {error}
        </div>
      )}

      {qrDataUrl && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#fff' }}>
              <Image src={qrDataUrl} alt="2FA QR code" width={256} height={256} unoptimized />
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>
              Can&apos;t scan? Enter this secret manually in your app:
            </p>
            <code style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2, wordBreak: 'break-all' }}>
              {secret}
            </code>
          </div>

          <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: 16, fontSize: 13, color: '#92400e' }}>
            <strong>Done?</strong> Log out and log back in — you&apos;ll be prompted for your authenticator code.
            Keep your authenticator app safe; it&apos;s the only way to log in with 2FA enabled.
          </div>
        </>
      )}

      <div style={{ marginTop: 32 }}>
        <a href="/admin" style={{ fontSize: 13, color: '#64748b' }}>← Back to dashboard</a>
      </div>
    </div>
  )
}
