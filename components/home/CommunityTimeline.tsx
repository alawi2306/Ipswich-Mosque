import Link from 'next/link'
import { Icon } from '@/components/ui/icons'

interface TimelineEntry {
  id: string
  date: string
  tag: string
  title: string
  desc: string
  meta?: string | null
  photos: string[]
}

interface Props {
  entries: TimelineEntry[]
}

export function CommunityTimeline({ entries }: Props) {
  return (
    <section className="timeline-section" style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Users width={13} height={13} /> Looking back</div>
            <h2 className="section-title">Some of what&apos;s happened recently.</h2>
            <div className="section-sub">A few highlights from the past year.</div>
          </div>
          <Link href="/timeline" className="section-link">Full archive <Icon.ChevronRight width={14} height={14} /></Link>
        </div>
        <div className="timeline-container">
          {entries.map((entry) => (
            <div key={entry.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">{entry.date}</div>
              <div className="timeline-body">
                <div className="timeline-date timeline-date-mobile">{entry.date}</div>
                <div className="timeline-tag">{entry.tag}</div>
                <h3 className="timeline-title">{entry.title}</h3>
                <p className="timeline-desc">{entry.desc}</p>
                <div className="timeline-meta">{entry.meta}</div>
              </div>
              <div className="timeline-photos">
                {entry.photos.map((p, j) => (
                  <div
                    key={j}
                    className={`timeline-photo ${entry.photos.length === 1 ? 'span-2' : ''}`}
                    style={{ backgroundImage: `url(${p})` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
