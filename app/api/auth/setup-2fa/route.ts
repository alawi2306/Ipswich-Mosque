import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, verifyPwOkToken, PW_OK_COOKIE } from '@/lib/auth'
import { getTOTPUri } from '@/lib/totp'
import QRCode from 'qrcode'

export async function GET(request: NextRequest) {
  const hasPwOk = verifyPwOkToken(request.cookies.get(PW_OK_COOKIE)?.value)
  if (!hasPwOk) {
    try { requireAdminSession(request) } catch (r) { return r as Response }
  }

  try {
    const uri = getTOTPUri()
    const qrDataUrl = await QRCode.toDataURL(uri, { width: 256, margin: 2 })
    return NextResponse.json({ qrDataUrl, secret: process.env.TOTP_SECRET })
  } catch {
    return NextResponse.json(
      { error: 'TOTP_SECRET is not set in environment variables. Add it and redeploy.' },
      { status: 500 }
    )
  }
}
