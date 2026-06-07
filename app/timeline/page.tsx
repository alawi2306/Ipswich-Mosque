import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { Icon } from '@/components/ui/icons'

export default async function TimelinePage() {
  const entries = await prisma.timelineEntry.findMany({
    orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
  })

  return (
    <>
      <PageHeader
        crumb="Our History"
        title="Our story so far."
        sub="Events, milestones and community moments across the Suffolk Muslim Society."
      />
      <section>
        <div className="container">
          <div className="timeline-container" style={{ paddingTop: 8, paddingBottom: 48 }}>
            {entries.map(entry => {
              const photos = entry.photos as string[]
              return (
                <div key={entry.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">{entry.date}</div>
                  <div className="timeline-body">
                    <div className="timeline-date timeline-date-mobile">{entry.date}</div>
                    <div className="timeline-tag">{entry.tag}</div>
                    <h3 className="timeline-title">{entry.title}</h3>
                    <p className="timeline-desc">{entry.desc}</p>
                    {entry.meta && <div className="timeline-meta">{entry.meta}</div>}
                  </div>
                  {photos.length > 0 && (
                    <div className="timeline-photos">
                      {photos.map((p, j) => (
                        <div
                          key={j}
                          className={`timeline-photo ${photos.length === 1 ? 'span-2' : ''}`}
                          style={{ backgroundImage: `url(${p})` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            {entries.length === 0 && (
              <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--muted)' }}>
                <Icon.Users width={32} height={32} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p>No entries yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
