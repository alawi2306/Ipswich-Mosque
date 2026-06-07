import './admin.css'
import { AdminNavWrapper } from '@/components/admin/AdminNavWrapper'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminNavWrapper>{children}</AdminNavWrapper>
}
