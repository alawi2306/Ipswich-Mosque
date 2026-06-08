import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

const MASJID_IDS = ['nawra', 'taqwa', 'ipswich', 'shahjalal']
const KINDS = ['cover', 'gallery']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const masjidId = searchParams.get('masjidId') ?? undefined
  const kind = searchParams.get('kind') ?? undefined

  const images = await prisma.mosqueImage.findMany({
    where: { masjidId, kind },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(images)
}

export async function POST(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }

  const body = await request.json()
  const masjidId = String(body.masjidId ?? '')
  const url = String(body.url ?? '')
  const kind = String(body.kind ?? 'gallery')
  const caption = body.caption ? String(body.caption) : null

  if (!MASJID_IDS.includes(masjidId)) {
    return NextResponse.json({ error: 'Unknown masjid' }, { status: 400 })
  }
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
  }
  if (!url) {
    return NextResponse.json({ error: 'Missing image url' }, { status: 400 })
  }

  // A masjid has at most one homepage cover — replace any existing one.
  if (kind === 'cover') {
    await prisma.mosqueImage.deleteMany({ where: { masjidId, kind: 'cover' } })
  }

  const image = await prisma.mosqueImage.create({
    data: { masjidId, url, kind, caption },
  })
  return NextResponse.json(image, { status: 201 })
}
