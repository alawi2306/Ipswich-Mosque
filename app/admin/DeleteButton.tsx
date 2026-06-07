'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  endpoint: string
}

export function DeleteButton({ id, endpoint }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function doDelete() {
    setDeleting(true)
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  if (confirming) {
    return (
      <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#64748b' }}>Delete?</span>
        <button className="btn-admin btn-admin-danger btn-admin-sm" onClick={doDelete} disabled={deleting}>
          {deleting ? '…' : 'Yes'}
        </button>
        <button className="btn-admin btn-admin-ghost btn-admin-sm" onClick={() => setConfirming(false)}>No</button>
      </span>
    )
  }

  return (
    <button
      className="btn-admin btn-admin-ghost btn-admin-sm"
      style={{ color: '#ef4444' }}
      onClick={() => setConfirming(true)}
    >
      Delete
    </button>
  )
}
