import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(submissions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { firstName, lastName, email, topic, message } = body
  if (!firstName || !lastName || !email || !topic || !message) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }
  const submission = await prisma.contactSubmission.create({
    data: { firstName, lastName, email, topic, message },
  })
  return NextResponse.json(submission, { status: 201 })
}
