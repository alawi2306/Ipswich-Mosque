import Link from 'next/link'
import { StarPattern } from '@/components/ui/StarPattern'
import { Icon } from '@/components/ui/icons'
import { HeroCarousel } from './HeroCarousel'

interface Announcement {
  id: string
  title: string
  excerpt: string
  createdAt: string | Date
}

interface Props {
  announcements: Announcement[]
}

export function Hero({ announcements }: Props) {
  return (
    <section className="hero">
      <div className="hero-pattern">
        <StarPattern id="hero-pat" color="#1B6B8A" scale={56} />
      </div>
      <div className="container">
        <div className="hero-grid">
          <HeroCarousel announcements={announcements} />
          <div className="hero-welcome">
              <div className="eyebrow"><Icon.Mosque width={13} height={13} /> Assalamu alaikum</div>
              <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.15 }}>
                Welcome to Suffolk Muslim Society.
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.6, margin: '0 0 18px' }}>
                Salah times, weekly classes, events and funeral support across the four Ipswich masaajid. Updated weekly by the committee.
              </p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
                <Link href="/prayer-times" className="btn btn-teal btn-sm">
                  Salah times <Icon.ChevronRight width={13} height={13} />
                </Link>
                {/* <Link href="/objectives" className="btn btn-outline btn-sm">
                  About SMS
                </Link> */}
              </div>
              <div className="welcome-links">
                {[
                  { icon: Icon.Calendar, label: 'Events',      href: '/events' },
                  { icon: Icon.Book,     label: 'Classes',     href: '/classes' },
                  { icon: Icon.Users,    label: 'Our History', href: '/timeline' },
                  { icon: Icon.Pin,      label: 'Location',    href: '/contact' },
                ].map((q) => {
                  const I = q.icon
                  return (
                    <Link key={q.href} href={q.href} className="welcome-link">
                      <span className="welcome-link-icon"><I width={16} height={16} /></span>
                      {q.label}
                      <Icon.ChevronRight width={13} height={13} style={{ marginLeft: 'auto', color: 'var(--muted)' }} />
                    </Link>
                  )
                })}
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
