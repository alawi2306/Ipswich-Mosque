import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual, randomInt } from 'crypto'
import { createSessionToken, createOtpToken, COOKIE_NAME, OTP_COOKIE } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendOtp } from '@/lib/email'

function safePasswordCompare(input: string, actual: string): boolean {
  const secret = process.env.SESSION_SECRET ?? 'compare-fallback'
  const a = createHmac('sha256', secret).update(input).digest()
  const b = createHmac('sha256', secret).update(actual).digest()
  return timingSafeEqual(a, b)
}

function isWhitelisted(email: string): boolean {
  const list = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  return list.includes(email.toLowerCase())
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts, try again later' }, { status: 429 })
  }

  const body = await request.json().catch(() => ({}))
  const { email, password } = body as { email?: string; password?: string }

  const adminPassword = process.env.ADMIN_PASSWORD ?? ''
  if (!password || !safePasswordCompare(password, adminPassword)) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  if (!email || !isWhitelisted(email)) {
    return NextResponse.json({ error: 'Your email has not been granted access. Contact the developer to add it.' }, { status: 403 })
  }

  const adminEmails = process.env.ADMIN_EMAILS
  if (!adminEmails) {
    // No whitelist configured — skip 2FA and log straight in
    const response = NextResponse.json({ ok: true })
    response.cookies.set(COOKIE_NAME, createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  }

  const otp = String(randomInt(100000, 999999))
  try {
    await sendOtp(email, otp)
  } catch (err) {
    console.error('[login] failed to send OTP:', err)
    return NextResponse.json({ error: 'Failed to send login code. Please try again.' }, { status: 500 })
  }

  const response = NextResponse.json({ needsOtp: true })
  response.cookies.set(OTP_COOKIE, createOtpToken(otp), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60,
  })
  return response
}
