import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Announcements — Suffolk Muslim Society',
  description: 'News and announcements from Suffolk Muslim Society',
}

export default async function AnnouncementsListPage() {
  const announcements = await prisma.announcement.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, title: true, excerpt: true, imageUrl: true, createdAt: true },
  })

  return (
    <main className="container" style={{ maxWidth: 800, padding: '48px 24px 80px' }}>
      <a href="/" style={{ fontSize: 13, color: '#64748b', marginBottom: 32, display: 'inline-block' }}>
        ← Back to home
      </a>

      <div style={{ marginBottom: 40 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-600, #0e7490)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Latest News
        </span>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '8px 0 0' }}>
          Announcements
        </h1>
      </div>

      {announcements.length === 0 && (
        <p style={{ color: '#94a3b8' }}>No announcements yet.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {announcements.map(a => (
          <Link
            key={a.id}
            href={`/announcements/${a.id}`}
            style={{ display: 'flex', gap: 20, textDecoration: 'none', color: 'inherit', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', transition: 'box-shadow 0.15s' }}
          >
            <img
              src={a.imageUrl || '/placeholder.svg'}
              alt={a.title}
              style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
            />
            <div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
                {new Date(a.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <h2 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 6px', lineHeight: 1.3 }}>{a.title}</h2>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
