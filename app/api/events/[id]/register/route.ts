import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`event-reg:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
  }

  const { id } = await params
  const body = await request.json()
  const { website, name, email } = body

  if (website) return NextResponse.json({ ok: true })

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }
  if (name.trim().length > 100) return NextResponse.json({ error: 'Name too long' }, { status: 400 })
  if (email.trim().length > 254) return NextResponse.json({ error: 'Email too long' }, { status: 400 })

  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

  const existing = await prisma.eventRegistration.findFirst({ where: { eventId: id, email: email.trim().toLowerCase() } })
  if (existing) return NextResponse.json({ error: 'You are already registered for this event' }, { status: 409 })

  await prisma.eventRegistration.create({
    data: { eventId: id, name: name.trim(), email: email.trim().toLowerCase() },
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const count = await prisma.eventRegistration.count({ where: { eventId: id } })
  return NextResponse.json({ count })
}
