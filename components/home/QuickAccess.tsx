import Link from 'next/link'
import { Icon } from '@/components/ui/icons'

const ITEMS = [
  { icon: Icon.Calendar,    label: 'Upcoming Events',      sub: "What's on this week",  href: '/events' },
  { icon: Icon.Clock,       label: 'Salah Times',          sub: 'All four masaajid',    href: '/prayer-times' },
  { icon: Icon.Book,        label: 'Classes',              sub: 'Weekly activities',    href: '/classes' },
  { icon: Icon.Pin,         label: 'Addresses & contacts', sub: 'Find your masjid',     href: '/contact' },
  { icon: Icon.Users,       label: 'Our History',          sub: 'Community milestones',  href: '/timeline' },
  // { icon: Icon.Users,    label: 'Volunteer',        sub: 'Join the project',    href: '/volunteer' },
  // { icon: Icon.Heart,    label: 'Sisters',          sub: 'Events & programmes', href: '/sisters' },
  // { icon: Icon.HandHeart,label: 'Funeral Support', sub: '24-hr coordinator',   href: '/funeral' },
]

export function QuickAccess() {
  return (
    <section className="qa-strip" style={{ height: '208px' }}>
      <div className="container">
        <div className="qa-strip-grid">
          {ITEMS.map((it) => {
            const I = it.icon
            return (
              <Link key={it.href} href={it.href} className="qa-strip-item">
                <div className="qa-strip-icon"><I width={20} height={20} /></div>
                <div className="qa-strip-text">
                  <b>{it.label}</b>
                  <span>{it.sub}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
