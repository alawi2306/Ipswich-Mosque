import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ masjidId: string }> }) {
  const { masjidId } = await params
  const timetable = await prisma.timetable.findFirst({
    where: { masjidId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(timetable ?? null)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ masjidId: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { masjidId } = await params
  const body = await request.json()
  const timetable = await prisma.timetable.create({
    data: {
      masjidId,
      fileUrl: body.fileUrl,
      fileType: body.fileType,
      weekOf: body.weekOf,
    },
  })
  return NextResponse.json(timetable, { status: 201 })
}
