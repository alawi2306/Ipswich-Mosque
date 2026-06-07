'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StarPattern } from '@/components/ui/StarPattern'
import { FUNERAL_TABS } from '@/lib/data'
import { Phone, Heart, Pin, Book, Download } from '@/components/ui/icons'
import type { ComponentType } from 'react'

interface IconProps {
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

const TAB_ICONS: Record<string, ComponentType<IconProps>> = {
  immediate: Phone,
  process: Heart,
  resources: Pin,
  guidance: Book,
}

export function FuneralPageClient() {
  const [tab, setTab] = useState('immediate')
  const current = FUNERAL_TABS.find(t => t.id === tab)

  return (
    <>
      <PageHeader
        crumb="Funeral Support"
        title="When someone you love passes away"
        sub="What to do, in plain English. The 24-hour line is the first number to call — Br. Mahmood will walk you through everything. Inna lillahi wa inna ilayhi raji'oon."
      />
      <section className="jnz-page">
        <div className="container">
          <div className="jnz-callout">
            <div className="pattern-bg"><StarPattern id="fnr-cal-pat" color="#B8962E" scale={50} /></div>
            <div className="jnz-callout-text">
              <h2>Need to call right now?</h2>
              <p>Our funeral coordinator is available any time, day or night. No cost to the family.</p>
            </div>
            <div className="jnz-callout-action">
              <button className="btn btn-primary"><Phone width="14" height="14" /> Contact us</button>
            </div>
          </div>

          <div className="funeral-tabs">
            {FUNERAL_TABS.map((t, i) => {
              const I = TAB_ICONS[t.id]
              return (
                <button
                  key={t.id}
                  className={`funeral-tab ${tab === t.id ? 'active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  <span className="funeral-tab-num">{i + 1}</span>
                  <I width="14" height="14" />
                  {t.label}
                </button>
              )
            })}
          </div>

          <div className="jnz-grid">
            <div className="jnz-steps">
              {current?.sections.map((s, i) => (
                <div key={i} className="jnz-step">
                  <div className="jnz-step-num">{i + 1}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    {s.list && (
                      <ul>
                        {s.list.map((li, j) => <li key={j}>{li}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="jnz-side">
              <div className="jnz-aside">
                <h4>Quick reference</h4>
                <div className="jnz-aside-list-item"><span>Suffolk Registry</span><b>0345 607 2050</b></div>
                <div className="jnz-aside-list-item"><span>Cemetery</span><b>IP4 2TQ</b></div>
                <div className="jnz-aside-list-item"><span>Plot fee (residents)</span><b>£0</b></div>
                <div className="jnz-aside-list-item"><span>Typical timeline</span><b>24–48 hrs</b></div>
                <div className="jnz-aside-list-item"><span>Out-of-area</span><b>By arrangement</b></div>
              </div>
              <div className="jnz-aside">
                <h4>Downloads</h4>
                <a href="#" className="section-link" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid var(--line-2)' }}>
                  <Download width="14" height="14" style={{ marginRight: 8 }} />Funeral process (PDF)
                </a>
                <a href="#" className="section-link" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid var(--line-2)' }}>
                  <Download width="14" height="14" style={{ marginRight: 8 }} />Mirath (inheritance) guide
                </a>
                <a href="#" className="section-link" style={{ display: 'flex', padding: '8px 0' }}>
                  <Download width="14" height="14" style={{ marginRight: 8 }} />Registry checklist
                </a>
              </div>
              <div className="jnz-aside" style={{ background: 'var(--teal-50)', borderColor: 'var(--teal-100)' }}>
                <h4 style={{ color: 'var(--teal-700)' }}>Bereavement support</h4>
                <p style={{ fontSize: 13.5, color: 'var(--ink-2)', margin: '0 0 12px', lineHeight: 1.55 }}>
                  Follow-up visits, meal rotas, and emotional support — no time limit.
                </p>
                <button className="btn btn-teal btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Request support</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
