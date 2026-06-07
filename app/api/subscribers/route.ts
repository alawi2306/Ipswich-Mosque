import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const subscribers = await prisma.subscriber.findMany({ orderBy: { subscribedAt: 'desc' } })
  return NextResponse.json(subscribers)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email } = body
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  }
  try {
    const subscriber = await prisma.subscriber.create({ data: { name, email } })
    return NextResponse.json(subscriber, { status: 201 })
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    throw e
  }
}
