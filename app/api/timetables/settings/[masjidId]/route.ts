import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ masjidId: string }> }
) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { masjidId } = await params
  const settings = await prisma.masjidSettings.findUnique({ where: { masjidId } })
  return NextResponse.json(settings ?? {
    masjidId,
    scrapeUrl: null,
    postcode: null,
    autoMethod: null,
    lastSynced: null,
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ masjidId: string }> }
) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { masjidId } = await params
  const body = await request.json()
  const { scrapeUrl, postcode, autoMethod } = body

  const settings = await prisma.masjidSettings.upsert({
    where: { masjidId },
    create: {
      masjidId,
      scrapeUrl: scrapeUrl ?? null,
      postcode: postcode ?? null,
      autoMethod: autoMethod ?? null,
    },
    update: {
      scrapeUrl: scrapeUrl ?? null,
      postcode: postcode ?? null,
      autoMethod: autoMethod ?? null,
    },
  })

  return NextResponse.json(settings)
}
