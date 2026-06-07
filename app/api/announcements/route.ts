import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const publishedOnly = searchParams.get('published') === 'true'

  const announcements = await prisma.$queryRawUnsafe<object[]>(
    publishedOnly
      ? `SELECT id, title, content, excerpt, "imageUrl", published, "createdAt", "updatedAt" FROM "Announcement" WHERE published = true ORDER BY "createdAt" DESC`
      : `SELECT id, title, content, excerpt, "imageUrl", published, "createdAt", "updatedAt" FROM "Announcement" ORDER BY "createdAt" DESC`
  )
  return NextResponse.json(announcements)
}

export async function POST(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const body = await request.json()
  const announcement = await prisma.announcement.create({
    data: {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      published: body.published ?? true,
    },
  })
  if (body.imageUrl) {
    await prisma.$executeRawUnsafe(
      `UPDATE "Announcement" SET "imageUrl" = $1 WHERE id = $2`,
      body.imageUrl,
      announcement.id
    )
  }
  return NextResponse.json({ ...announcement, imageUrl: body.imageUrl ?? null }, { status: 201 })
}
