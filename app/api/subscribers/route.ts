import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const subscribers = await prisma.subscriber.findMany({ orderBy: { subscribedAt: 'desc' } })
  return NextResponse.json(subscribers)
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`subscribe:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
  }

  const body = await request.json()
  const { website, name, email } = body

  if (website) return NextResponse.json({ ok: true })

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  }
  if (String(name).length > 100) return NextResponse.json({ error: 'Name too long' }, { status: 400 })
  if (String(email).length > 254) return NextResponse.json({ error: 'Email too long' }, { status: 400 })
  try {
    const subscriber = await prisma.subscriber.create({ data: { name, email } })
    return NextResponse.json(subscriber, { status: 201 })
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    throw e
  }
}
