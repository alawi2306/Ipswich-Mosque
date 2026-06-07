import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, verifyOtpToken, COOKIE_NAME, OTP_COOKIE } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`otp:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts, try again later' }, { status: 429 })
  }

  const body = await request.json().catch(() => ({}))
  const { code } = body as { code?: string }

  const otpToken = request.cookies.get(OTP_COOKIE)?.value
  if (!code || !verifyOtpToken(otpToken, code)) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  response.cookies.set(OTP_COOKIE, '', { maxAge: 0, path: '/' })
  return response
}
