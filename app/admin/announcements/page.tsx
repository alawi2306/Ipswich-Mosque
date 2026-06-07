import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { DeleteButton } from '../DeleteButton'
import { ReorderButtons } from './ReorderButtons'

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Announcements</h1>
          <p>{announcements.length} announcement{announcements.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/announcements/new" className="btn-admin btn-admin-primary">+ New announcement</Link>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 72 }}>Order</th>
                <th>Title</th>
                <th>Excerpt</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a, i) => (
                <tr key={a.id}>
                  <td>
                    <ReorderButtons
                      id={a.id}
                      isFirst={i === 0}
                      isLast={i === announcements.length - 1}
                    />
                  </td>
                  <td className="font-bold">{a.title}</td>
                  <td className="text-muted text-sm truncate">{a.excerpt}</td>
                  <td>
                    <span className={`admin-badge ${a.published ? 'admin-badge-green' : 'admin-badge-gray'}`}>
                      {a.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="text-muted text-sm">
                    {new Date(a.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/announcements/${a.id}`} className="btn-admin btn-admin-ghost btn-admin-sm">Edit</Link>
                      <DeleteButton id={a.id} endpoint="/api/announcements" />
                    </div>
                  </td>
                </tr>
              ))}
              {announcements.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No announcements yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
