import Link from 'next/link'
import { StarPattern } from '@/components/ui/StarPattern'
import { Heart, Megaphone, Arrow, ChevronRight, Mosque, Users, Book } from '@/components/ui/icons'

export default function ObjectivesPage() {
  return (
    <>
      <section className="obj-hero">
        <div className="obj-hero-pattern"><StarPattern id="obj-hero-pat" color="#B8962E" scale={60} /></div>
        <div className="container">
          <div className="crumb" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link>
            <ChevronRight width="12" height="12" />
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Objectives of SMS</span>
          </div>
          <div className="obj-hero-inner">
            <h1>What Suffolk Muslim Society is here for.</h1>
            <p>We're a small registered charity, run by volunteers, working alongside the four masaajid in Ipswich. The pages below set out what we're trying to do, why it matters, and where we're heading. It's not glossy and it's not finished — this is a living document.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div>
              <div className="eyebrow"><Heart width="13" height="13" /> What we focus on</div>
              <h2 className="section-title">Five things we keep coming back to.</h2>
            </div>
          </div>
          <div className="vision-grid">
            {[
              { num: '01', title: 'A place to pray, learn and belong', desc: 'Every Muslim in Suffolk knowing where to go for salah, who to ask, and where they fit.' },
              { num: '02', title: 'Holding onto our faith', desc: 'Practical support for young people, reverts, and families trying to keep Islam at the centre of life here.' },
              { num: '03', title: 'Working across the four masaajid', desc: "We don't replace any masjid — we sit between them, sharing information, splitting work, agreeing dates." },
              { num: '04', title: "Education that's actually good", desc: 'Madrasah, tafsir, Arabic, hadith circles — taught by qualified people, not corner-cut.' },
              { num: '05', title: 'The 16–25s', desc: 'Mentorship, sport, halaqas and informal spaces. The committee will all be retired one day; these are the people taking over.' },
            ].map((p, i) => (
              <div key={i} className="vision-pillar">
                <div className="vision-pillar-num tabnum">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><Megaphone width="13" height="13" /> Why bother</div>
              <h2 className="section-title">Why this is worth doing.</h2>
            </div>
          </div>
          <div className="why-grid">
            {[
              { Icon: Mosque, title: 'Quietly being there', body: "There are Muslims in Suffolk who haven't set foot in a masjid in years. No judgement. The door is open whenever — for Eid, for janazah, for the school holidays, or just to drop in." },
              { Icon: Users, title: 'Getting on with each other', body: 'Our community is Bangladeshi, Pakistani, Arab, Somali, Turkish, white British, and more. Getting on takes intention. Most of what we do is just creating reasons to be in the same room.' },
              { Icon: Heart, title: 'What we hand to the kids', body: 'The children at Nawracy madrasah will run our masaajid in twenty years. We want them to inherit something worth keeping — proper accounts, sensible governance, no hangers-on.' },
              { Icon: Book, title: 'Being visible in our town', body: "We work with the council, schools, and other faith communities. Most people in Ipswich don't know much about Islam — that's on us to fix, gently." },
            ].map((c, i) => (
              <div key={i} className="why-card">
                <div className="why-card-icon"><c.Icon width="22" height="22" /></div>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="goals-section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><Arrow width="13" height="13" /> Longer-term</div>
              <h2 className="section-title">A few things we're working towards.</h2>
            </div>
          </div>
          <div className="goals-grid">
            {[
              { num: '01', title: "Learning that doesn't stop at 14", body: 'A clear path from weekend madrasah through Arabic, tafsir, hadith — all the way to adult circles. Nobody graduating into a vacuum.' },
              { num: '02', title: 'Real investment in youth', body: "Mentors who actually answer their phones. Sports, halaqas, work experience, pastoral support. Building the next layer of the community." },
              { num: '03', title: 'A permanent funeral facility', body: 'At the moment we use a partner mortuary out of town. A dedicated facility closer to home would change a hard week for many families.' },
              { num: '04', title: 'A proper safety net', body: 'Quiet welfare help for families having a tough time, marriage services, support for reverts, bereavement check-ins. Woven by the community itself.' },
            ].map((g, i) => (
              <div key={i} className="goal-card">
                <div className="pattern-bg"><StarPattern id={`goal-pat-${i}`} color="#B8962E" scale={60} /></div>
                <div className="goal-card-num tabnum">{g.num}</div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
