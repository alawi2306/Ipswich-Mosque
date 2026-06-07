import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await prisma.$queryRawUnsafe<object[]>(
    `SELECT id, title, content, excerpt, "imageUrl", published, "createdAt", "updatedAt" FROM "Announcement" WHERE id = $1`,
    id
  )
  if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(rows[0])
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  const body = await request.json()
  const a = await prisma.announcement.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      published: body.published ?? true,
    },
  })
  await prisma.$executeRawUnsafe(
    `UPDATE "Announcement" SET "imageUrl" = $1 WHERE id = $2`,
    body.imageUrl ?? null,
    id
  )
  return NextResponse.json({ ...a, imageUrl: body.imageUrl ?? null })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  await prisma.announcement.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
