import { PageHeader } from '@/components/layout/PageHeader'
import { VOLUNTEER_ROLES } from '@/lib/data'
import { Users, Heart, Book, Megaphone, Arrow, ChevronRight } from '@/components/ui/icons'
import { Icon } from '@/components/ui/icons'
import type { ComponentType } from 'react'

interface IconProps {
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        crumb="Be part of the project"
        title="Help out, however you can."
        sub="Most of what SMS does runs on volunteers. A few hours a month genuinely matters."
      />
      <section className="volunteer-page">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><Users width="13" height="13" /> Roles</div>
              <h2 className="section-title">Where we always need a hand.</h2>
              <div className="section-sub">Pick one (or more). No commitment beyond what you can give. Br. Hasan will get back to you within a few days.</div>
            </div>
            <a href="#" className="section-link">Volunteer FAQ <ChevronRight width="14" height="14" /></a>
          </div>
          <div className="vol-roles-grid">
            {VOLUNTEER_ROLES.map((r, i) => {
              const I = ((Icon as unknown) as Record<string, ComponentType<IconProps>>)[r.icon] || Heart
              return (
                <div key={i} className="vol-role">
                  <div className="vol-role-icon"><I width="20" height="20" /></div>
                  <h3 className="vol-role-name">{r.name}</h3>
                  <p className="vol-role-desc">{r.desc}</p>
                  <span className="vol-role-cta">Express interest <ChevronRight width="12" height="12" /></span>
                </div>
              )
            })}
          </div>

          <div className="vol-actions-grid">
            <div className="vol-action-card">
              <div className="vol-action-icon"><Book width="26" height="26" /></div>
              <div>
                <h3>Write something</h3>
                <p>If you've benefited from a khutbah, a book, or a circle you've been to — write it up. A short reflection, a hadith you keep coming back to, a summary of something useful. We'll publish it on the site and the newsletter (after a light edit and a check). Pseudonym fine.</p>
                <button className="btn btn-teal">Submit an article <Arrow width="14" height="14" /></button>
              </div>
            </div>
            <div className="vol-action-card">
              <div className="vol-action-icon"><Megaphone width="26" height="26" /></div>
              <div>
                <h3>Suggest something</h3>
                <p>Spotted a gap? Got an idea for something we should be doing? Send it in.</p>
                <div className="vol-action-quote">
                  Honestly the best ideas come from people who'd be willing to help run them. Tell us what you'd need and we'll figure it out together.
                </div>
                <button className="btn btn-teal">Share your idea <Arrow width="14" height="14" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
