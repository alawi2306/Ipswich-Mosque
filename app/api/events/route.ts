import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(events)
}

export async function POST(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const body = await request.json()
  const event = await prisma.event.create({
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
  return NextResponse.json(event, { status: 201 })
}
