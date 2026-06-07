import { prisma } from '@/lib/prisma'
import { DeleteButton } from '../DeleteButton'
import { MarkReadButton } from './MarkReadButton'

export default async function ContactAdminPage() {
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
  const unread = submissions.filter(s => !s.read).length

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Contact submissions</h1>
          <p>{submissions.length} message{submissions.length !== 1 ? 's' : ''}{unread > 0 ? ` · ${unread} unread` : ''}</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Topic</th>
                <th>Message</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(s => (
                <tr key={s.id} style={!s.read ? { background: 'var(--teal-50, #f0fdfa)' } : undefined}>
                  <td className="font-bold" style={{ whiteSpace: 'nowrap' }}>
                    {!s.read && <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--teal-500, #14b8a6)', marginRight: 6, verticalAlign: 'middle' }} />}
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="text-muted text-sm">{s.email}</td>
                  <td><span className="admin-badge admin-badge-blue">{s.topic}</span></td>
                  <td className="text-muted text-sm" style={{ maxWidth: 300 }}>
                    <div style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {s.message}
                    </div>
                  </td>
                  <td className="text-muted text-sm" style={{ whiteSpace: 'nowrap' }}>
                    {new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <MarkReadButton id={s.id} read={s.read} />
                      <DeleteButton id={s.id} endpoint="/api/contact" />
                    </div>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No messages yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
