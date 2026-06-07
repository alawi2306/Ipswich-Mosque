import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

// Lightweight TipTap JSON → HTML — no browser APIs needed
type TipTapNode = {
  type: string
  text?: string
  attrs?: Record<string, unknown>
  marks?: { type: string; attrs?: Record<string, string> }[]
  content?: TipTapNode[]
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function serializeNode(node: TipTapNode): string {
  if (node.type === 'text') {
    let t = esc(node.text ?? '')
    for (const m of node.marks ?? []) {
      if (m.type === 'bold') t = `<strong>${t}</strong>`
      else if (m.type === 'italic') t = `<em>${t}</em>`
      else if (m.type === 'underline') t = `<u>${t}</u>`
      else if (m.type === 'code') t = `<code>${t}</code>`
      else if (m.type === 'link') {
        const href = esc(m.attrs?.href ?? '#')
        t = `<a href="${href}" target="_blank" rel="noopener noreferrer">${t}</a>`
      }
    }
    return t
  }

  const inner = (node.content ?? []).map(serializeNode).join('')
  const lvl = Number(node.attrs?.level ?? 2)

  switch (node.type) {
    case 'doc':             return inner
    case 'paragraph':       return inner ? `<p>${inner}</p>` : '<p><br/></p>'
    case 'heading':         return `<h${lvl}>${inner}</h${lvl}>`
    case 'bulletList':      return `<ul>${inner}</ul>`
    case 'orderedList':     return `<ol>${inner}</ol>`
    case 'listItem':        return `<li>${inner}</li>`
    case 'blockquote':      return `<blockquote>${inner}</blockquote>`
    case 'codeBlock':       return `<pre><code>${inner}</code></pre>`
    case 'horizontalRule':  return '<hr/>'
    case 'hardBreak':       return '<br/>'
    default:                return inner
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const a = await prisma.announcement.findUnique({ where: { id } })
  if (!a) return {}
  return { title: a.title, description: a.excerpt }
}

export default async function AnnouncementPage({ params }: Props) {
  const { id } = await params
  const a = await prisma.announcement.findUnique({ where: { id, published: true } })
  if (!a) notFound()

  const html = serializeNode(a.content as TipTapNode)

  const date = new Date(a.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <main className="container" style={{ maxWidth: 720, padding: '48px 24px 80px' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, fontSize: 13, color: '#64748b' }}>
        <a href="/" style={{ color: '#64748b' }}>← Home</a>
        <span style={{ color: '#cbd5e1' }}>·</span>
        <a href="/announcements" style={{ color: '#64748b' }}>All announcements</a>
      </div>

      <img
        src={a.imageUrl || '/placeholder.svg'}
        alt={a.title}
        style={{ width: '100%', height: 340, objectFit: 'cover', borderRadius: 12, marginBottom: 32 }}
      />

      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-600, #0e7490)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Announcement
        </span>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '8px 0 12px', lineHeight: 1.2 }}>
          {a.title}
        </h1>
        <p style={{ color: '#64748b', fontSize: 14 }}>{date}</p>
      </div>

      {a.excerpt && (
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.65, marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid #e2e8f0' }}>
          {a.excerpt}
        </p>
      )}

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ fontSize: 16, lineHeight: 1.75, color: '#1e293b' }}
      />
    </main>
  )
}
