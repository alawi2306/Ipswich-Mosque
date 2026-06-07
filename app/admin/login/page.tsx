'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'password' | 'totp'>('password')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [showSecret, setShowSecret] = useState(false)

  useEffect(() => {
    if (step === 'totp') {
      fetch('/api/auth/setup-2fa')
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.qrDataUrl) setQrDataUrl(data.qrDataUrl)
          if (data?.secret) setSecret(data.secret)
        })
        .catch(() => null)
    }
  }, [step])

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const data = await res.json()
    if (res.ok && data.needsTotp) {
      setStep('totp')
      setLoading(false)
    } else if (res.ok) {
      router.push('/admin')
    } else {
      setError(data.error || 'Invalid password')
      setLoading(false)
    }
  }

  async function handleTotp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Invalid code')
      if (data.error?.includes('expired')) setStep('password')
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card" style={{ maxWidth: step === 'totp' && qrDataUrl ? 400 : undefined }}>
        <div className="admin-login-logo">
          <h1>SMS Admin</h1>
          <p>Suffolk Muslim Society</p>
        </div>

        {error && <div className="form-error-banner" style={{ marginBottom: 16 }}>{error}</div>}

        {step === 'password' ? (
          <form onSubmit={handlePassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-field">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              className="btn-admin btn-admin-primary admin-login-submit"
              disabled={loading}
            >
              {loading ? 'Checking…' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleTotp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {qrDataUrl && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                  First time? Open your authenticator app and scan this code.
                </p>
                <div style={{ display: 'inline-block', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, background: '#fff' }}>
                  <Image src={qrDataUrl} alt="Scan with authenticator app" width={200} height={200} unoptimized />
                </div>
                {secret && (
                  <div style={{ marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => setShowSecret(s => !s)}
                      style={{ background: 'none', border: 'none', fontSize: 12, color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {showSecret ? 'Hide' : 'Can\'t scan? Show secret key'}
                    </button>
                    {showSecret && (
                      <div style={{ marginTop: 6, padding: '6px 10px', background: '#f8fafc', borderRadius: 6, fontSize: 12, fontFamily: 'monospace', letterSpacing: 1, wordBreak: 'break-all', color: '#334155' }}>
                        {secret}
                      </div>
                    )}
                  </div>
                )}
                <hr style={{ margin: '16px 0', borderColor: '#e2e8f0' }} />
              </div>
            )}

            <div className="form-field">
              <label className="form-label">6-digit code from your app</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                className="form-input"
                placeholder="000000"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              className="btn-admin btn-admin-primary admin-login-submit"
              disabled={loading}
            >
              {loading ? 'Verifying…' : 'Sign in'}
            </button>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, cursor: 'pointer' }}
              onClick={() => { setStep('password'); setCode(''); setError('') }}
            >
              ← Back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
