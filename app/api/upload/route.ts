import { NextRequest, NextResponse } from 'next/server'
import { uploadToR2 } from '@/lib/r2'
import { requireAdminSession } from '@/lib/auth'

async function hasValidMagicBytes(file: File): Promise<boolean> {
  const buf = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  // PDF: %PDF
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) return true
  // JPEG: FF D8 FF
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return true
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return true
  // WebP: RIFF....WEBP
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return true
  return false
}

export async function POST(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const maxBytes = 20 * 1024 * 1024
  if (file.size > maxBytes) {
    return NextResponse.json({ error: 'File too large (max 20 MB)' }, { status: 413 })
  }

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'File type not allowed' }, { status: 415 })
  }

  if (!await hasValidMagicBytes(file)) {
    return NextResponse.json({ error: 'File content does not match declared type' }, { status: 415 })
  }

  const ALLOWED_FOLDERS = ['timetables', 'timeline', 'events', 'classes', 'announcements']
  const folder = ALLOWED_FOLDERS.includes(request.nextUrl.searchParams.get('folder') ?? '')
    ? (request.nextUrl.searchParams.get('folder') as string)
    : 'uploads'

  const result = await uploadToR2(file, folder)
  return NextResponse.json(result)
}
