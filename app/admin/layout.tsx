import './admin.css'
import { AdminNavWrapper } from '@/components/admin/AdminNavWrapper'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminNavWrapper>{children}</AdminNavWrapper>
}
