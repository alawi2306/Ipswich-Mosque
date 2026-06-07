import { prisma } from '@/lib/prisma'
import { DeleteButton } from '../DeleteButton'
import { StatusButton } from './StatusButton'
import { AddPlaceForm } from './AddPlaceForm'

export default async function HalalAdminPage() {
  const submissions = await prisma.halalSubmission.findMany({ orderBy: { submittedAt: 'desc' } })
  const pending = submissions.filter(s => s.status === 'pending').length
  const approved = submissions.filter(s => s.status === 'approved').length

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Halal guide</h1>
          <p>{submissions.length} total · {pending} pending · {approved} live</p>
        </div>
      </div>
      <AddPlaceForm />
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Category</th>
                <th>Address</th>
                <th>Rating</th>
                <th>Flags</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="font-bold">{s.name}</div>
                    {s.googleUrl && (
                      <a href={s.googleUrl} target="_blank" rel="noopener" style={{ fontSize: 11, color: 'var(--teal-600)', textDecoration: 'none' }}>
                        Google Maps ↗
                      </a>
                    )}
                  </td>
                  <td className="text-muted text-sm">{s.category}</td>
                  <td className="text-muted text-sm" style={{ maxWidth: 200, fontSize: 12 }}>{s.address ?? '—'}</td>
                  <td className="text-sm">
                    {s.rating ? (
                      <span>★ {s.rating.toFixed(1)}{s.reviewCount ? <span style={{ color: 'var(--muted)', fontSize: 11 }}> ({s.reviewCount})</span> : null}</span>
                    ) : '—'}
                  </td>
                  <td style={{ fontSize: 13 }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {s.hmc && <span className="admin-badge admin-badge-blue">HMC</span>}
                      {s.prayer && <span className="admin-badge admin-badge-blue">Prayer</span>}
                      {s.family && <span className="admin-badge admin-badge-blue">Family</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge ${s.status === 'approved' ? 'admin-badge-green' : s.status === 'rejected' ? 'admin-badge-red' : 'admin-badge-amber'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="text-muted text-sm" style={{ whiteSpace: 'nowrap' }}>
                    {new Date(s.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <StatusButton id={s.id} status={s.status} />
                      <DeleteButton id={s.id} endpoint="/api/halal" />
                    </div>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No submissions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
