import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(submissions)
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many submissions, please try again later' }, { status: 429 })
  }

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
