'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Clock, Pin, Mail, Book } from '@/components/ui/icons'
import { ApplyModal } from './ApplyModal'

interface ClassItem {
  id: string
  title: string
  teacher: string
  dayTime: string
  schedule: string
  description?: string | null
  masjid: string
  category: string
}

const TABS = ['All', 'Education', 'Sisters', 'Youth', 'Children', 'Community']

export function ActivitiesPageClient({ classes }: { classes: ClassItem[] }) {
  const [tab, setTab] = useState('All')
  const [applyTarget, setApplyTarget] = useState<ClassItem | null>(null)

  const list = tab === 'All' ? classes : classes.filter(c => c.category === tab)

  return (
    <>
      <PageHeader
        crumb="Regular Activities"
        title="Weekly activities"
        sub="What runs every week, term-time or otherwise. Most are drop-in — if something needs booking, it'll say so on the card."
      />
      <section className="activities-page">
        <div className="container">
          <div className="activities-tabs">
            {TABS.map(t => (
              <button key={t} className={`activities-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
          {list.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: 15 }}>No classes in this category yet — check back soon.</p>
            </div>
          )}
          <div className="activities-grid">
            {list.map(c => (
              <div key={c.id} className="activity-card">
                <div className="activity-card-icon"><Book width="20" height="20" /></div>
                <div className="activity-card-tag">{c.schedule}</div>
                <h3 className="activity-card-name">{c.title}</h3>
                <div className="activity-card-when"><Clock width="11" height="11" />{c.dayTime}</div>
                <p className="activity-card-desc">{c.description || ''}</p>
                <div className="activity-card-meta">
                  <div><Pin width="13" height="13" />{c.masjid}</div>
                  <div><Mail width="13" height="13" />{c.teacher}</div>
                </div>
                <button
                  className="btn btn-teal btn-sm"
                  style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
                  onClick={() => setApplyTarget(c)}
                >
                  Apply / Enquire
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {applyTarget && (
        <ApplyModal cls={applyTarget} onClose={() => setApplyTarget(null)} />
      )}
    </>
  )
}
