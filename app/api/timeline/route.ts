import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET() {
  const entries = await prisma.timelineEntry.findMany({
    orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(entries)
}

export async function POST(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const body = await request.json()
  const entry = await prisma.timelineEntry.create({
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
  return NextResponse.json(entry, { status: 201 })
}
