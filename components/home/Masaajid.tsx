import Link from 'next/link'
import { MASJIDS } from '@/lib/data'
import { Icon } from '@/components/ui/icons'

export function Masaajid() {
  return (
    <section style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Pin width={13} height={13} /> Visit us</div>
            <h2 className="section-title">Our four masaajid.</h2>
            <div className="section-sub">Each masjid serves a different part of Ipswich. All are open for daily prayers — everyone is welcome.</div>
          </div>
          <Link href="/contact" className="section-link">
            Addresses &amp; contacts <Icon.ChevronRight width={14} height={14} />
          </Link>
        </div>
        <div className="masjid-grid">
          {MASJIDS.map((m) => (
            <div key={m.id} className="masjid-card">
              <div
                className="masjid-card-img"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(14,61,82,0) 40%, rgba(14,61,82,0.55)), url(${m.img})` }}
              />
              <div className="masjid-card-body">
                <h3 className="masjid-card-name">{m.name}</h3>
                <div className="masjid-card-area">{m.area}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <Icon.Pin width={14} height={14} style={{ color: 'var(--teal-500)', flexShrink: 0, marginTop: 2 }} />
                  {m.address}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
