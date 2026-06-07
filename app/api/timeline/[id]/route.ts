import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  const body = await request.json()
  const entry = await prisma.timelineEntry.update({
    where: { id },
    data: {
      date: body.date,
      tag: body.tag,
      title: body.title,
      desc: body.desc,
      meta: body.meta || null,
      photos: body.photos ?? [],
      sortOrder: body.sortOrder ?? 0,
    },
  })
  return NextResponse.json(entry)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  await prisma.timelineEntry.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
