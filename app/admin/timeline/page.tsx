import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { DeleteButton } from '../DeleteButton'

export default async function TimelinePage() {
  const entries = await prisma.timelineEntry.findMany({
    orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
  })
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Timeline</h1>
          <p>{entries.length} entr{entries.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <Link href="/admin/timeline/new" className="btn-admin btn-admin-primary">+ New entry</Link>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Tag</th>
                <th>Title</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e => (
                <tr key={e.id}>
                  <td className="text-muted text-sm">{e.date}</td>
                  <td><span className="admin-badge admin-badge-blue">{e.tag}</span></td>
                  <td className="font-bold">{e.title}</td>
                  <td className="text-muted text-sm">{e.sortOrder}</td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/timeline/${e.id}`} className="btn-admin btn-admin-ghost btn-admin-sm">Edit</Link>
                      <DeleteButton id={e.id} endpoint="/api/timeline" />
                    </div>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No entries yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
