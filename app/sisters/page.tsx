import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { SISTERS_WEEKLY, SISTERS_GALLERY } from '@/lib/data'
import { SistersContactForm } from '@/components/sisters/SistersContactForm'
import { Heart, Calendar, Clock, Pin, Phone, Users, Mail, Arrow, ChevronRight } from '@/components/ui/icons'

export default async function SistersPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [dbClasses, dbEvents] = await Promise.all([
    prisma.class.findMany({ where: { category: 'Sisters' }, orderBy: { createdAt: 'asc' } }),
    prisma.event.findMany({
      where: { tag: 'Sisters', date: { gte: today } },
      orderBy: { date: 'asc' },
      take: 6,
    }),
  ])

  return (
    <>
      <PageHeader
        crumb="Sisters Section"
        title="Sisters Section"
        sub="Run by sisters, for sisters. Weekly circles, social events, welfare support, and a direct line to Sr. Aisha — handled separately from general enquiries."
      />
      <section className="sisters-page">
        <div className="container">
          <div className="sisters-intro">
            <div>
              <div className="eyebrow"><Heart width="13" height="13" /> Salaam, sisters</div>
              <h2>This space is for you.</h2>
              <p>The sisters&apos; section runs alongside the main programme but is organised by sisters, for sisters. Weekly Qur&apos;an circles, mother-and-baby mornings, walking group, and the occasional brunch.</p>
              <p>New to Ipswich, recently reverted, or just want to meet other sisters? Email Sr. Aisha and she&apos;ll add you to the WhatsApp group. No pressure, no awkward introductions — just turn up to whichever session looks good.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
                <a href="https://wa.me/447700900200" target="_blank" rel="noreferrer" className="btn btn-teal">
                  Join WhatsApp group <Arrow width="14" height="14" />
                </a>
                <button className="btn btn-outline">Read more <ChevronRight width="14" height="14" /></button>
              </div>
            </div>
            <div className="sisters-intro-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80)' }}></div>
          </div>
        </div>
      </section>

      <section className="sisters-weekly">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><Calendar width="13" height="13" /> Weekly programme</div>
              <h2 className="section-title">What&apos;s on each week.</h2>
              <div className="section-sub">All sessions are sisters only. Babies and toddlers welcome unless otherwise noted — there&apos;s a quiet corner at the back of each space.</div>
            </div>
          </div>
          <div className="weekly-grid">
            {dbClasses.length > 0 ? dbClasses.map(c => (
              <div key={c.id} className="weekly-card">
                <div className="weekly-card-day">{c.dayTime.split(/[,\s]/)[0]}</div>
                <h3>{c.title}</h3>
                <div className="weekly-card-time"><Clock width="12" height="12" />{c.dayTime}</div>
                {c.description && <p className="weekly-card-desc">{c.description}</p>}
                <div className="weekly-card-foot">
                  <span><Pin width="11" height="11" style={{ verticalAlign: 'middle', marginRight: 4 }} />{c.masjid}</span>
                  {c.teacher && <span style={{ color: 'var(--muted)', fontSize: 12 }}>{c.teacher}</span>}
                </div>
              </div>
            )) : SISTERS_WEEKLY.map((w, i) => (
              <div key={i} className="weekly-card">
                <div className="weekly-card-day">{w.day}</div>
                <h3>{w.name}</h3>
                <div className="weekly-card-time"><Clock width="12" height="12" />{w.time}</div>
                <p className="weekly-card-desc">{w.desc}</p>
                <div className="weekly-card-foot">
                  <span><Pin width="11" height="11" style={{ verticalAlign: 'middle', marginRight: 4 }} />{w.where}</span>
                  <a href="#" style={{ color: 'var(--teal-700)', fontWeight: 600 }}>Register</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {dbEvents.length > 0 && (
        <section style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow"><Calendar width="13" height="13" /> Upcoming</div>
                <h2 className="section-title">Sisters events coming up.</h2>
              </div>
            </div>
            <div className="events-grid">
              {dbEvents.map(e => (
                <div key={e.id} className="event-card">
                  {e.imageUrl && <div className="event-card-img" style={{ backgroundImage: `url(${e.imageUrl})` }} />}
                  <div className="event-card-body">
                    <span className="event-tag">{e.tag}</span>
                    <h3 className="event-card-title">{e.title}</h3>
                    <div className="event-card-meta">
                      <span><Calendar width="12" height="12" /> {new Date(e.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                      <span><Clock width="12" height="12" /> {e.time}</span>
                      <span><Pin width="12" height="12" /> {e.masjid}</span>
                    </div>
                    {e.description && <p className="event-card-desc">{e.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="gallery-section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><Users width="13" height="13" /> A look back</div>
              <h2 className="section-title">Some of our recent gatherings.</h2>
              <div className="section-sub">Photos shared with permission. If you&apos;d rather not appear, just let us know and we&apos;ll take them down.</div>
            </div>
            <a href="#" className="section-link">Full gallery <ChevronRight width="14" height="14" /></a>
          </div>
          <div className="gallery-grid">
            {SISTERS_GALLERY.map((g, i) => (
              <div
                key={i}
                className={`gallery-tile ${i === 0 ? 'span-2' : ''}`}
                style={{ backgroundImage: `url(${g.src})` }}
              >
                <div className="gallery-tile-caption">
                  <b>{g.caption}</b>
                  <span>{g.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sisters-contact">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><Mail width="13" height="13" /> Sisters contact</div>
              <h2 className="section-title">Or just send a message.</h2>
              <div className="section-sub">Goes straight to Sr. Aisha and stays between you and the sisters&apos; team.</div>
            </div>
          </div>
          <div className="sisters-contact-grid">
            <SistersContactForm />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="contact-card" style={{ background: 'var(--teal-50)', borderColor: 'var(--teal-100)' }}>
                <h3>Sr. Aisha Begum</h3>
                <div className="contact-card-area">Sisters&apos; Coordinator</div>
                <div className="contact-card-rows" style={{ marginTop: 14 }}>
                  <div className="contact-card-row"><Phone width="15" height="15" /><span className="tabnum">07700 900 200</span></div>
                  <div className="contact-card-row"><Mail width="15" height="15" /><span>sisters@suffolkmuslim.org</span></div>
                  <div className="contact-card-row"><Clock width="15" height="15" /><span>Replies Mon–Fri, evenings</span></div>
                </div>
              </div>
              <div className="contact-card">
                <h3>WhatsApp group</h3>
                <div className="contact-card-area">600+ sisters · invite only</div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-2)', margin: '12px 0', lineHeight: 1.55 }}>
                  The main hub for weekly updates, prayer reminders, event invites and informal chat. Sisters only — admins verify each request.
                </p>
                <a href="https://wa.me/447700900200" target="_blank" rel="noreferrer" className="whatsapp-strip" style={{ margin: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.4 24l1.7-6.2A11.9 11.9 0 0 1 .5 11.9C.5 5.3 5.8 0 12.4 0a11.9 11.9 0 0 1 11.9 11.9c0 6.6-5.3 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.4L.4 24z" />
                  </svg>
                  Request to join
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
