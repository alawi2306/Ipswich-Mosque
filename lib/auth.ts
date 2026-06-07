import { createHmac, timingSafeEqual } from 'crypto'

export const COOKIE_NAME = 'sms_session'
export const OTP_COOKIE = 'sms_otp'
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000
const OTP_MAX_AGE_MS = 10 * 60 * 1000

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET env var is not set')
  return secret
}

export function createSessionToken(): string {
  const payload = `admin.${Date.now()}`
  const sig = createHmac('sha256', getSecret()).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false

  const payload = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)

  const parts = payload.split('.')
  if (parts.length < 2) return false
  const ts = parseInt(parts[1], 10)
  if (isNaN(ts) || Date.now() - ts > SESSION_MAX_AGE_MS) return false

  try {
    const expected = createHmac('sha256', getSecret()).update(payload).digest('hex')
    const sigBuf = Buffer.from(sig, 'hex')
    const expBuf = Buffer.from(expected, 'hex')
    if (sigBuf.length !== expBuf.length) return false
    return timingSafeEqual(sigBuf, expBuf)
  } catch {
    return false
  }
}

export function createOtpToken(otp: string): string {
  const payload = `otp.${otp}.${Date.now()}`
  const sig = createHmac('sha256', getSecret()).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export function verifyOtpToken(token: string | undefined, code: string): boolean {
  if (!token || !code) return false
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false

  const payload = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)

  const parts = payload.split('.')
  if (parts[0] !== 'otp' || parts.length < 3) return false
  const ts = parseInt(parts[2], 10)
  if (isNaN(ts) || Date.now() - ts > OTP_MAX_AGE_MS) return false

  try {
    const expected = createHmac('sha256', getSecret()).update(payload).digest('hex')
    const sigBuf = Buffer.from(sig, 'hex')
    const expBuf = Buffer.from(expected, 'hex')
    if (sigBuf.length !== expBuf.length) return false
    if (!timingSafeEqual(sigBuf, expBuf)) return false
  } catch {
    return false
  }

  const storedOtp = parts[1]
  const a = createHmac('sha256', getSecret()).update(code).digest()
  const b = createHmac('sha256', getSecret()).update(storedOtp).digest()
  return timingSafeEqual(a, b)
}

export function requireAdminSession(request: Request): void {
  const cookie = request.headers.get('cookie') ?? ''
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`))
  const token = match?.[1]
  if (!verifySessionToken(token)) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
