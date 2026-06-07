import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const timetables = await prisma.timetable.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(timetables)
}
