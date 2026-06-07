import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(event)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  const body = await request.json()
  const event = await prisma.event.update({
    where: { id },
    data: {
      title: body.title,
      date: new Date(body.date),
      time: body.time,
      description: body.description,
      tag: body.tag,
      masjid: body.masjid,
      imageUrl: body.imageUrl || null,
    },
  })
  return NextResponse.json(event)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  await prisma.event.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
