'use client'
import { useEffect, useState } from 'react'
import { Icon } from '@/components/ui/icons'

const MIXLR_USERNAME = process.env.NEXT_PUBLIC_MIXLR_USERNAME

async function checkLive(username: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.mixlr.com/users/${username}`, { cache: 'no-store' })
    if (!res.ok) return false
    const data = await res.json()
    return data.is_live === true
  } catch {
    return false
  }
}

export function StatusBar() {
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!MIXLR_USERNAME) return

    let cancelled = false

    async function poll() {
      const live = await checkLive(MIXLR_USERNAME!)
      if (!cancelled) setIsLive(live)
    }

    poll()
    const id = setInterval(poll, 60_000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  return (
    <div className="statusbar">
      <div className="container statusbar-inner">
        <div className="sb-left">
          {isLive && (
            <span className="sb-pill">
              <span className="dot"></span> Live · Mixlr
            </span>
          )}
        </div>
        <div className="sb-right">
          <span className="tabnum">Sat 25 May 2026 · 8 Dhū al-Qaʿdah 1447</span>
          <div className="sb-socials">
            <a href="#" aria-label="Facebook"><Icon.Facebook width={13} height={13} /></a>
            <a href="#" aria-label="Instagram"><Icon.Instagram width={13} height={13} /></a>
            <a href="#" aria-label="YouTube"><Icon.Youtube width={13} height={13} /></a>
            <a href="#" aria-label="Twitter"><Icon.Twitter width={13} height={13} /></a>
          </div>
          <a href="#">EN</a>
        </div>
      </div>
    </div>
  )
}
