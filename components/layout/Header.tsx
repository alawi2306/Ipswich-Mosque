'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMasjid } from '@/contexts/MasjidContext'
import { Icon } from '@/components/ui/icons'
import { SalahStrip } from './SalahStrip'

const NAV_ITEMS: [string, string][] = [
  ['/', 'Home'],
  ['/prayer-times', 'Salah Times'],
  ['/events', 'Events'],
  ['/classes', 'Classes'],
  ['/contact', 'Addresses & Contacts'],
  ['/gallery', 'Gallery'],
  ['/timeline', 'Our History'],
  // ['/sisters', 'Sisters'],
  // ['/halal', 'Halal Guide'],
  // ['/funeral', 'Funeral Support'],
]

// const ABOUT_ITEMS: [string, string, keyof typeof Icon][] = [
//   ['/objectives', 'Objectives of SMS', 'Heart'],
//   ['/activities', 'Regular Activities', 'Calendar'],
//   ['/volunteer', 'Be Part of the Project', 'Users'],
//   ['/contact', 'Contact Us', 'Mail'],
// ]

const ALL_MOBILE_ITEMS: [string, string][] = [
  ...NAV_ITEMS,
  // ['/objectives', 'Objectives'],
  // ['/volunteer', 'Volunteer'],
]

export function Header() {
  const pathname = usePathname()
  const { activeMasjid } = useMasjid()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <img src="/logo-tight.png" alt="Suffolk Muslim Society" className="brand-logo" />
          </Link>

          <nav className="nav">
            {NAV_ITEMS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`nav-item ${pathname === href ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="nav-end">
            {/* <button className="btn btn-outline btn-sm"><Icon.Live width={14} height={14} /> Listen Live</button> */}
            {/* <button className="btn btn-primary btn-sm"><Icon.HandHeart width={14} height={14} /> Donate</button> */}
            <Link href="/contact" className="btn btn-primary btn-sm"><Icon.Mail width={14} height={14} /> Contact Us</Link>
            <button
              className={`hamburger-btn${mobileNavOpen ? ' open' : ''}`}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${mobileNavOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>×</button>
        {ALL_MOBILE_ITEMS.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={`mobile-nav-item${pathname === href ? ' active' : ''}`}
            onClick={() => setMobileNavOpen(false)}
          >
            <Icon.ChevronRight width={16} height={16} />
            {label}
          </Link>
        ))}
        <div className="mobile-nav-divider" />
        <div className="mobile-nav-footer">
          {/* <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <Icon.HandHeart width={14} height={14} /> Donate
          </button>
          <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
            <Icon.Live width={14} height={14} /> Listen Live
          </button> */}
          <Link href="/contact" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <Icon.Mail width={14} height={14} /> Contact Us
          </Link>
        </div>
      </div>

      <SalahStrip />
    </>
  )
}
