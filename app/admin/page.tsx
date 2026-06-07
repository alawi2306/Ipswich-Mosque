import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [eventsCount, classesCount, announcementsCount, timetablesCount, contactCount, subscriberCount] = await Promise.all([
    prisma.event.count(),
    prisma.class.count(),
    prisma.announcement.count(),
    prisma.timetable.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.subscriber.count(),
    // prisma.halalSubmission.count({ where: { status: 'pending' } }),
  ])

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Dashboard</h1>
          <p>Suffolk Muslim Society — content management</p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-card-label">Events</div>
          <div className="stat-card-value">{eventsCount}</div>
          <Link href="/admin/events" className="stat-card-link">Manage events →</Link>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Classes</div>
          <div className="stat-card-value">{classesCount}</div>
          <Link href="/admin/classes" className="stat-card-link">Manage classes →</Link>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Announcements</div>
          <div className="stat-card-value">{announcementsCount}</div>
          <Link href="/admin/announcements" className="stat-card-link">Manage →</Link>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Timetable uploads</div>
          <div className="stat-card-value">{timetablesCount}</div>
          <Link href="/admin/timetables" className="stat-card-link">Manage →</Link>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Unread messages</div>
          <div className="stat-card-value">{contactCount}</div>
          <Link href="/admin/contact" className="stat-card-link">View inbox →</Link>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Subscribers</div>
          <div className="stat-card-value">{subscriberCount}</div>
          <Link href="/admin/audience" className="stat-card-link">View audience →</Link>
        </div>
        {/* <div className="stat-card">
          <div className="stat-card-label">Halal pending</div>
          <div className="stat-card-value">{halalPendingCount}</div>
          <Link href="/admin/halal" className="stat-card-link">Review →</Link>
        </div> */}
      </div>

      <div className="admin-dash-grid">
        <Link href="/admin/timetables" className="admin-dash-card">
          <div className="admin-dash-icon teal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <h3>Prayer Timetables</h3>
          <p>Upload weekly prayer time PDFs or images for all four masaajid</p>
        </Link>
        <Link href="/admin/events" className="admin-dash-card">
          <div className="admin-dash-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
          </div>
          <h3>Events</h3>
          <p>Create and manage community events shown on the website</p>
        </Link>
        <Link href="/admin/classes" className="admin-dash-card">
          <div className="admin-dash-icon amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <h3>Classes &amp; Activities</h3>
          <p>Manage recurring weekly classes and activities across masaajid</p>
        </Link>
        <Link href="/admin/announcements" className="admin-dash-card">
          <div className="admin-dash-icon violet">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
          </div>
          <h3>Announcements</h3>
          <p>Write and publish announcements that appear in the home carousel</p>
        </Link>
        <Link href="/admin/contact" className="admin-dash-card">
          <div className="admin-dash-icon teal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <h3>Contact inbox</h3>
          <p>View and respond to messages submitted via the contact form</p>
        </Link>
        <Link href="/admin/audience" className="admin-dash-card">
          <div className="admin-dash-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3>Audience</h3>
          <p>Manage newsletter subscribers and export mailing lists</p>
        </Link>
        {/* <Link href="/admin/halal" className="admin-dash-card">
          <div className="admin-dash-icon amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <h3>Halal guide</h3>
          <p>Review community-submitted halal businesses and publish to the guide</p>
        </Link> */}
      </div>
    </>
  )
}
