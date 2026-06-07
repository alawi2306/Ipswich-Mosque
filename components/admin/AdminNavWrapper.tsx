'use client'
import { usePathname } from 'next/navigation'
import { AdminNav } from './AdminNav'

export function AdminNavWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/admin/login') return <>{children}</>
  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-content">{children}</div>
      </main>
    </div>
  )
}
