import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { DeleteButton } from '../DeleteButton'

export default async function ClassesPage() {
  const [classes, applications] = await Promise.all([
    prisma.class.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.classApplication.findMany({ orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Classes &amp; Activities</h1>
          <p>{classes.length} class{classes.length !== 1 ? 'es' : ''} · {applications.length} application{applications.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/classes/new" className="btn-admin btn-admin-primary">+ New class</Link>
      </div>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Day / Time</th>
                <th>Category</th>
                <th>Masjid</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {classes.map(c => (
                <tr key={c.id}>
                  <td className="font-bold">{c.title}</td>
                  <td className="text-muted text-sm">{c.dayTime}</td>
                  <td><span className="admin-badge admin-badge-blue">{c.category}</span></td>
                  <td className="text-muted text-sm">{c.masjid}</td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/classes/${c.id}`} className="btn-admin btn-admin-ghost btn-admin-sm">Edit</Link>
                      <DeleteButton id={c.id} endpoint="/api/classes" />
                    </div>
                  </td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No classes yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-page-header" style={{ marginTop: 8 }}>
        <div className="admin-page-header-text">
          <h2 style={{ fontSize: 18 }}>User Applications</h2>
          <p>{applications.length} total</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Message</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {applications.map(a => (
                <tr key={a.id}>
                  <td className="font-bold">{a.name}</td>
                  <td className="text-muted text-sm">{a.email}</td>
                  <td className="text-sm">{a.className}</td>
                  <td className="text-muted text-sm" style={{ maxWidth: 240, fontSize: 12 }}>{a.message || '—'}</td>
                  <td className="text-muted text-sm" style={{ whiteSpace: 'nowrap' }}>
                    {new Date(a.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <DeleteButton id={a.id} endpoint="/api/class-applications" />
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>No applications yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
