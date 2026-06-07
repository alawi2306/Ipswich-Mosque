import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  const body = await request.json()
  const submission = await prisma.contactSubmission.update({
    where: { id },
    data: { read: body.read },
  })
  return NextResponse.json(submission)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const { id } = await params
  await prisma.contactSubmission.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
