import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cls = await prisma.class.findUnique({ where: { id } })
  if (!cls) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(cls)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  const body = await request.json()
  const cls = await prisma.class.update({
    where: { id },
    data: {
      title: body.title,
      teacher: body.teacher,
      dayTime: body.dayTime,
      schedule: body.schedule,
      description: body.description || null,
      masjid: body.masjid,
      category: body.category,
    },
  })
  return NextResponse.json(cls)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  await prisma.class.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
