import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const { name, email, message } = body

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

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
