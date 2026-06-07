import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { createSessionToken, createPwOkToken, COOKIE_NAME, PW_OK_COOKIE } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'
import { isTOTPEnabled } from '@/lib/totp'

function safePasswordCompare(input: string, actual: string): boolean {
  const secret = process.env.SESSION_SECRET ?? 'compare-fallback'
  const a = createHmac('sha256', secret).update(input).digest()
  const b = createHmac('sha256', secret).update(actual).digest()
  return timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts, try again later' }, { status: 429 })
  }

  const body = await request.json().catch(() => ({}))
  const { password } = body as { password?: string }

  const adminPassword = process.env.ADMIN_PASSWORD ?? ''
  if (!password || !safePasswordCompare(password, adminPassword)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  if (isTOTPEnabled()) {
    const response = NextResponse.json({ needsTotp: true })
    response.cookies.set(PW_OK_COOKIE, createPwOkToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 5 * 60,
    })
    return response
  }

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
