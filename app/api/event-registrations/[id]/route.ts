import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  await prisma.eventRegistration.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
