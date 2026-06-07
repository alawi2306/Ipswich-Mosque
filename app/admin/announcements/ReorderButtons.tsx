'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  id: string
  isFirst: boolean
  isLast: boolean
}

export function ReorderButtons({ id, isFirst, isLast }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function move(direction: 'up' | 'down') {
    setLoading(true)
    await fetch('/api/announcements/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, direction }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', gap: 2 }}>
      <button
        onClick={() => move('up')}
        disabled={isFirst || loading}
        className="btn-admin btn-admin-ghost btn-admin-sm"
        style={{ padding: '2px 6px', opacity: isFirst ? 0.3 : 1 }}
        title="Move up"
      >
        ↑
      </button>
      <button
        onClick={() => move('down')}
        disabled={isLast || loading}
        className="btn-admin btn-admin-ghost btn-admin-sm"
        style={{ padding: '2px 6px', opacity: isLast ? 0.3 : 1 }}
        title="Move down"
      >
        ↓
      </button>
    </div>
  )
}
