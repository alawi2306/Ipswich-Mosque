import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import type { Prisma } from '@prisma/client'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ masjidId: string }> }
) {
  const { masjidId } = await params
  const weeks = await prisma.prayerWeek.findMany({
    where: { masjidId },
    orderBy: { weekStart: 'desc' },
    take: 10,
  })
  return NextResponse.json(weeks)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ masjidId: string }> }
) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { masjidId } = await params
  const body = await request.json()
  const { weekStart, source, days } = body

  if (!weekStart || !source || !days) {
    return NextResponse.json({ error: 'weekStart, source, and days are required' }, { status: 400 })
  }

  const daysJson = days as Prisma.InputJsonValue
  const week = await prisma.prayerWeek.upsert({
    where: { masjidId_weekStart: { masjidId, weekStart } },
    create: { masjidId, weekStart, source, days: daysJson },
    update: { source, days: daysJson },
  })

  return NextResponse.json(week, { status: 201 })
}
