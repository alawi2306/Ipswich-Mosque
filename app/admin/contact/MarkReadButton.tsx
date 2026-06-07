'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function MarkReadButton({ id, read }: { id: string; read: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !read }),
    })
    router.refresh()
  }

  return (
    <button className="btn-admin btn-admin-ghost btn-admin-sm" onClick={toggle} disabled={loading}>
      {read ? 'Mark unread' : 'Mark read'}
    </button>
  )
}
