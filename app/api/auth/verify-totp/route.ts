import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, verifyPwOkToken, COOKIE_NAME, PW_OK_COOKIE } from '@/lib/auth'
import { verifyTOTP } from '@/lib/totp'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`totp:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts, try again later' }, { status: 429 })
  }

  const pwOkToken = request.cookies.get(PW_OK_COOKIE)?.value
  if (!verifyPwOkToken(pwOkToken)) {
    return NextResponse.json({ error: 'Session expired, please log in again' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const { code } = body as { code?: string }

  if (!code || !await verifyTOTP(code)) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  response.cookies.delete(PW_OK_COOKIE)
  return response
}
