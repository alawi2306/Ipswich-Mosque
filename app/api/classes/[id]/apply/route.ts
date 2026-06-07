import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`class-apply:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
  }

  const { id } = await params
  const body = await request.json()
  const { website, name, email, message } = body

  if (website) return NextResponse.json({ ok: true })

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }
  if (name.trim().length > 100) return NextResponse.json({ error: 'Name too long' }, { status: 400 })
  if (email.trim().length > 254) return NextResponse.json({ error: 'Email too long' }, { status: 400 })
  if (message && message.trim().length > 2000) return NextResponse.json({ error: 'Message too long' }, { status: 400 })

  const cls = await prisma.class.findUnique({ where: { id } })
  if (!cls) return NextResponse.json({ error: 'Class not found' }, { status: 404 })

  const existing = await prisma.classApplication.findFirst({
    where: { classId: id, email: email.trim().toLowerCase() },
  })
  if (existing) return NextResponse.json({ error: 'You have already applied for this class' }, { status: 409 })

  await prisma.classApplication.create({
    data: {
      classId: id,
      className: cls.title,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message?.trim() || null,
    },
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
