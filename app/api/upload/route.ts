import { NextRequest, NextResponse } from 'next/server'
import { uploadToR2 } from '@/lib/r2'
import { requireAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const maxBytes = 20 * 1024 * 1024 // 20 MB
  if (file.size > maxBytes) {
    return NextResponse.json({ error: 'File too large (max 20 MB)' }, { status: 413 })
  }

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'File type not allowed' }, { status: 415 })
  }

  const ALLOWED_FOLDERS = ['timetables', 'timeline', 'events', 'classes', 'announcements']
  const folder = ALLOWED_FOLDERS.includes(request.nextUrl.searchParams.get('folder') ?? '')
    ? (request.nextUrl.searchParams.get('folder') as string)
    : 'uploads'

  const result = await uploadToR2(file, folder)
  return NextResponse.json(result)
}
