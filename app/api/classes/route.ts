import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET() {
  const classes = await prisma.class.findMany({ orderBy: { category: 'asc' } })
  return NextResponse.json(classes)
}

export async function POST(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const body = await request.json()
  const cls = await prisma.class.create({
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
  return NextResponse.json(cls, { status: 201 })
}
