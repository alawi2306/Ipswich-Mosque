import { verify, generateURI } from 'otplib'

export function isTOTPEnabled(): boolean {
  return !!process.env.TOTP_SECRET
}

export async function verifyTOTP(token: string): Promise<boolean> {
  const secret = process.env.TOTP_SECRET
  if (!secret) return false
  try {
    const result = await verify({ secret, token })
    return result.valid
  } catch {
    return false
  }
}

export function getTOTPUri(): string {
  const secret = process.env.TOTP_SECRET
  if (!secret) throw new Error('TOTP_SECRET not configured')
  return generateURI({ issuer: 'SMS Admin', label: 'admin', secret })
}
