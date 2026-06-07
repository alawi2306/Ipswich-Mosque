import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  const body = await request.json()
  const submission = await prisma.halalSubmission.update({
    where: { id },
    data: { status: body.status },
  })
  return NextResponse.json(submission)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  await prisma.halalSubmission.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
