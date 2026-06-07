import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { DeleteButton } from '../DeleteButton'

export default async function EventsPage() {
  const [events, registrations] = await Promise.all([
    prisma.event.findMany({ orderBy: { date: 'asc' } }),
    prisma.eventRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
  ])

  // Build a lookup: eventId → event title
  const eventMap = Object.fromEntries(events.map(e => [e.id, e.title]))

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Events</h1>
          <p>{events.length} event{events.length !== 1 ? 's' : ''} · {registrations.length} registration{registrations.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/events/new" className="btn-admin btn-admin-primary">+ New event</Link>
      </div>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Tag</th>
                <th>Masjid</th>
                <th>Registrations</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => {
                const count = registrations.filter(r => r.eventId === e.id).length
                return (
                  <tr key={e.id}>
                    <td className="font-bold">{e.title}</td>
                    <td className="text-muted text-sm">
                      {new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td><span className="admin-badge admin-badge-blue">{e.tag}</span></td>
                    <td className="text-muted text-sm">{e.masjid}</td>
                    <td className="text-sm">{count > 0 ? <span style={{ fontWeight: 600 }}>{count}</span> : <span style={{ color: '#94a3b8' }}>0</span>}</td>
                    <td>
                      <div className="admin-table-actions">
                        <Link href={`/admin/events/${e.id}`} className="btn-admin btn-admin-ghost btn-admin-sm">Edit</Link>
                        <DeleteButton id={e.id} endpoint="/api/events" />
                      </div>
                    </td>
                  </tr>
                )
              })}
              {events.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No events yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-page-header" style={{ marginTop: 8 }}>
        <div className="admin-page-header-text">
          <h2 style={{ fontSize: 18 }}>Registrations</h2>
          <p>{registrations.length} total</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(r => (
                <tr key={r.id}>
                  <td className="font-bold">{r.name}</td>
                  <td className="text-muted text-sm">{r.email}</td>
                  <td className="text-sm">{eventMap[r.eventId] ?? <span style={{ color: '#94a3b8' }}>Deleted event</span>}</td>
                  <td className="text-muted text-sm" style={{ whiteSpace: 'nowrap' }}>
                    {new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <DeleteButton id={r.id} endpoint="/api/event-registrations" />
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No registrations yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
