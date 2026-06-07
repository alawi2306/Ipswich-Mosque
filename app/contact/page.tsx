import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import { MASJIDS } from '@/lib/data'
import { Phone, Mail, Clock, Pin } from '@/components/ui/icons'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Get in touch"
        sub="For general enquiries, contact SMS directly. For prayer space or imam enquiries, please contact the relevant masjid below."
      />
      <section>
        <div className="container">
          <div className="contact-grid">
            <ContactForm />
            <div className="contact-info">
              <div className="contact-card" style={{ background: 'var(--teal-50)', borderColor: 'var(--teal-100)' }}>
                <h3>Suffolk Muslim Society</h3>
                <div className="contact-card-area">Main office</div>
                <div className="contact-card-rows" style={{ marginTop: 14 }}>
                  <div className="contact-card-row"><Mail width="15" height="15" /><span>info@suffolkmuslim.org</span></div>
                  <div className="contact-card-row"><Clock width="15" height="15" /><span>Mon–Fri, 9am–5pm</span></div>
                </div>
              </div>
              {MASJIDS.map(m => (
                <div key={m.id} className="contact-card">
                  <div className="contact-card-head">
                    <div>
                      <h3>{m.name}</h3>
                      <div className="contact-card-area">{m.area}</div>
                    </div>
                    <Link href="/prayer-times" className="contact-card-pill">View timetable</Link>
                  </div>
                  <div className="contact-card-rows">
                    <div className="contact-card-row"><Pin width="15" height="15" /><span>{m.address}</span></div>
                    {m.phone && <div className="contact-card-row"><Phone width="15" height="15" /><span className="tabnum">{m.phone}</span></div>}
                    <div className="contact-card-row"><Mail width="15" height="15" /><span>{m.email}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
