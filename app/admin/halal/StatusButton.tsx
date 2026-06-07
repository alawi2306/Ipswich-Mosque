'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function StatusButton({ id, status }: { id: string; status: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function setStatus(newStatus: string) {
    setLoading(true)
    await fetch(`/api/halal/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
  }

  if (status === 'approved') {
    return (
      <button className="btn-admin btn-admin-ghost btn-admin-sm" onClick={() => setStatus('pending')} disabled={loading}>
        Revoke
      </button>
    )
  }
  if (status === 'rejected') {
    return (
      <button className="btn-admin btn-admin-ghost btn-admin-sm" onClick={() => setStatus('pending')} disabled={loading}>
        Restore
      </button>
    )
  }
  return (
    <span style={{ display: 'flex', gap: 4 }}>
      <button className="btn-admin btn-admin-primary btn-admin-sm" onClick={() => setStatus('approved')} disabled={loading}>Approve</button>
      <button className="btn-admin btn-admin-ghost btn-admin-sm" style={{ color: '#ef4444' }} onClick={() => setStatus('rejected')} disabled={loading}>Reject</button>
    </span>
  )
}
