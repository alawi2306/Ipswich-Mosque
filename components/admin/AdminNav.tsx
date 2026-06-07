'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/timetables', label: 'Timetables' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/classes', label: 'Classes' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/contact', label: 'Contact' },
  { href: '/admin/audience', label: 'Audience' },
  // { href: '/admin/halal', label: 'Halal' },
  { href: '/admin/timeline', label: 'Timeline' },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-inner">
        <div className="admin-topbar-left">
          <span className="admin-topbar-brand">SMS Admin</span>
          <nav className="admin-topbar-nav">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-topbar-link${isActive(item.href, item.exact) ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="admin-topbar-right">
          <Link href="/" className="admin-topbar-home">← Back to site</Link>
          <button className="admin-topbar-logout" onClick={logout}>Sign out</button>
        </div>
      </div>
    </header>
  )
}
