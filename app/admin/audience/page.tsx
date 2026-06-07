import { prisma } from '@/lib/prisma'
import { DeleteButton } from '../DeleteButton'

export default async function AudiencePage() {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { subscribedAt: 'desc' } })

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Audience</h1>
          <p>{subscribers.length} newsletter subscriber{subscribers.length !== 1 ? 's' : ''}</p>
        </div>
        <a
          href={`data:text/csv;charset=utf-8,Name,Email,Subscribed\n${subscribers.map(s => `${s.name},${s.email},${s.subscribedAt.toISOString()}`).join('\n')}`}
          download="subscribers.csv"
          className="btn-admin btn-admin-primary"
        >
          Export CSV
        </a>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subscribed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(s => (
                <tr key={s.id}>
                  <td className="font-bold">{s.name}</td>
                  <td className="text-muted text-sm">{s.email}</td>
                  <td className="text-muted text-sm">
                    {new Date(s.subscribedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <DeleteButton id={s.id} endpoint="/api/subscribers" />
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No subscribers yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
