import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function PATCH(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }

  const { id, direction } = await request.json() as { id: string; direction: 'up' | 'down' }
  if (!id || (direction !== 'up' && direction !== 'down')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const all = await prisma.announcement.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, sortOrder: true },
  })

  const idx = all.findIndex(a => a.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Assign sequential sortOrder values if all items still have the default 0
  if (all.every(a => a.sortOrder === 0)) {
    await prisma.$transaction(
      all.map((a, i) => prisma.announcement.update({ where: { id: a.id }, data: { sortOrder: i } }))
    )
    all.forEach((a, i) => { a.sortOrder = i })
  }

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= all.length) return NextResponse.json({ ok: true })

  const a = all[idx]
  const b = all[swapIdx]
  await prisma.$transaction([
    prisma.announcement.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.announcement.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ])

  return NextResponse.json({ ok: true })
}
