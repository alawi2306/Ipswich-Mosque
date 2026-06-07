// Homepage — matches SMS structure V1 spec

const PRAYERS = [
{ key: "Fajr", begin: (t) => t.fajr[0], jammat: (t) => t.fajr[1] },
{ key: "Sunrise", begin: (t) => t.sunrise, jammat: () => null },
{ key: "Dhuhr", begin: (t) => t.dhuhr[0], jammat: (t) => t.dhuhr[1] },
{ key: "Asr", begin: (t) => t.asr[0], jammat: (t) => t.asr[1] },
{ key: "Maghrib", begin: (t) => t.maghrib[0], jammat: (t) => t.maghrib[1] },
{ key: "Isha", begin: (t) => t.isha[0], jammat: (t) => t.isha[1] }];

const NEXT_PRAYER = "Asr";

const SalahSection = () =>
<section className="salah-section">
  <div className="container">
    <div className="salah-table-card">
      <div className="hero-prayers-head">
        <div className="hero-prayers-title">
          <Icon.Clock width="20" height="20" style={{ color: "var(--gold-600)" }} />
          Today's Prayer Times
        </div>
        <div className="hero-prayers-date">
          <span>Saturday · 25 May 2026</span>
          <span style={{ color: "var(--muted)" }}>·</span>
          <span>8 Dhū al-Qaʿdah 1447</span>
        </div>
      </div>
      <div className="salah-table-scroll">
        <div className="hero-prayers-table">
          <div className="hpt-cell hpt-head">Masjid</div>
          {PRAYERS.map((p) =>
          <div key={p.key} className={`hpt-cell hpt-head ${p.key === NEXT_PRAYER ? "hpt-next-head" : ""}`} style={{ textAlign: "center" }}>{p.key}</div>
          )}
        {MASJIDS.map((m, ri) => {
            const t = TODAY_TIMES[m.id];
            return (
              <React.Fragment key={m.id}>
              <div className="hpt-cell hpt-masjid">
                {m.name}
                <small>{m.area}</small>
              </div>
              {PRAYERS.map((p, pi) => {
                  const isNext = p.key === NEXT_PRAYER;
                  const begin = p.begin(t);
                  const jammat = p.jammat(t);
                  return (
                    <div key={p.key}
                    className={`hpt-cell hpt-time tabnum ${isNext ? "hpt-next" : ""}`}
                    style={{ textAlign: "center" }}>

                    {begin}
                    {jammat ?
                      <small>Jammat {jammat}</small> :
                      <small>—</small>}
                  </div>);

                })}
            </React.Fragment>);

          })}
        </div>
      </div>
      <div className="hero-prayers-foot">
        <span>Times shown as Begin / Jammat. Updated weekly by each masjid.</span>
        <a href="#" onClick={(e) => {e.preventDefault();window.__setRoute("prayer");}}>
          Full weekly timetables <Icon.Arrow width="14" height="14" />
        </a>
      </div>
    </div>
  </div>
</section>;

// Quick access — 6 buttons strip (matches spec exactly)
const QuickAccess = () => {
  const items = [
  { icon: Icon.Calendar, label: "Upcoming Events", sub: "What's on this week", route: "events" },
  { icon: Icon.Clock, label: "Salah Times", sub: "All four masaajid", route: "prayer" },
  { icon: Icon.Users, label: "Volunteer", sub: "Join the project", route: "volunteer" },
  { icon: Icon.Heart, label: "Sisters", sub: "Events & programmes", route: "sisters" },
  { icon: Icon.HandHeart, label: "Funeral Support", sub: "24-hr coordinator", route: "funeral" },
  { icon: Icon.Mail, label: "Contact Us", sub: "Get in touch", route: "contact" }];

  return (
    <section className="qa-strip" style={{ height: "208px" }}>
      <div className="container">
        <div className="qa-strip-grid">
          {items.map((it, i) => {
            const I = it.icon;
            return (
              <button key={i} className="qa-strip-item" onClick={() => window.__setRoute(it.route)}>
                <div className="qa-strip-icon"><I width="20" height="20" /></div>
                <div className="qa-strip-text">
                  <b>{it.label}</b>
                  <span>{it.sub}</span>
                </div>
              </button>);

          })}
        </div>
      </div>
    </section>);

};

// Top banner area — like v2 hero photo
const HERO_SLIDES = [
{
  tag: "Announcement",
  title: "Eid al-Adha prayer arrangements",
  date: "21 May 2026", read: "3 min read",
  img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1400&q=80"
},
{
  tag: "Notice",
  title: "Summer Jumuʿah times from 30 May",
  date: "18 May 2026", read: "2 min read",
  img: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1400&q=80"
},
{
  tag: "Community",
  title: "Hajj 2026 — pre-departure briefing",
  date: "12 May 2026", read: "2 min read",
  img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1400&q=80"
}];


const HERO_WASH =
"linear-gradient(180deg, rgba(14,61,82,0.25) 0%, rgba(14,61,82,0.1) 34%, rgba(14,61,82,0.62) 68%, rgba(14,61,82,0.95) 100%), ";

const HeroCarousel = () => {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = HERO_SLIDES.length;
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5500);
    return () => clearInterval(t);
  }, [paused, n]);
  const go = (i) => setIdx((i + n) % n);
  return (
    <div className="hero-carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}>
      {HERO_SLIDES.map((s, i) =>
      <div key={i}
      className={`hero-slide ${i === idx ? "active" : ""}`}
      style={{ backgroundImage: HERO_WASH + `url(${s.img})` }}>
          <div className="hero-photo-content">
            <span className="hero-photo-tag">Featured · {s.tag}</span>
            <h1 className="hero-photo-title">{s.title}</h1>
            <div className="hero-photo-meta">
              <span>{s.date}</span>
              <span>{s.read}</span>
            </div>
            <a href="#" className="hero-photo-cta">Read more <Icon.Arrow width="14" height="14" /></a>
          </div>
        </div>
      )}
      <button className="hero-arrow prev" aria-label="Previous" onClick={() => go(idx - 1)}>
        <Icon.ChevronLeft width="18" height="18" />
      </button>
      <button className="hero-arrow next" aria-label="Next" onClick={() => go(idx + 1)}>
        <Icon.ChevronRight width="18" height="18" />
      </button>
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) =>
        <button key={i}
        className={`hero-dot ${i === idx ? "active" : ""}`}
        aria-label={`Slide ${i + 1}`}
        onClick={() => setIdx(i)}></button>
        )}
      </div>
    </div>);

};

const Hero = () =>
<section className="hero">
    <div className="hero-pattern"><StarPattern id="hero-pat" color="#1B6B8A" scale={56} /></div>
    <div className="container">
      <div className="hero-grid">
        <HeroCarousel />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "36px", boxShadow: "var(--shadow-md)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="eyebrow"><Icon.Mosque width="13" height="13" /> Assalamu alaikum</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.15 }}>
              Welcome to Suffolk Muslim Society.
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 18px" }}>Salah times, weekly classes, events and funeral support across the four Ipswich masaajid. Updated weekly by the committee. 

          </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
              <button className="btn btn-teal btn-sm" onClick={() => window.__setRoute("prayer")}>
                Salah times <Icon.ChevronRight width="13" height="13" />
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => window.__setRoute("objectives")}>
                About SMS
              </button>
            </div>
            <div className="welcome-links">
              {[
            { icon: Icon.Calendar, label: "Events & classes", route: "events" },
            { icon: Icon.Heart, label: "Sisters section", route: "sisters" },
            { icon: Icon.HandHeart, label: "Funeral support", route: "funeral" },
            { icon: Icon.Users, label: "Volunteer", route: "volunteer" }].
            map((q, i) => {
              const I = q.icon;
              return (
                <button key={i} className="welcome-link" onClick={() => window.__setRoute(q.route)}>
                    <span className="welcome-link-icon"><I width="16" height="16" /></span>
                    {q.label}
                    <Icon.ChevronRight width="13" height="13" style={{ marginLeft: "auto", color: "var(--muted)" }} />
                  </button>);

            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;


// Upcoming events — poster + register button (per spec)
const UpcomingEvents = () =>
<section>
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><Icon.Calendar width="13" height="13" /> What's on</div>
          <h2 className="section-title">Coming up.</h2>
          <div className="section-sub">A few of the events on across our masaajid this fortnight.</div>
        </div>
        <a href="#" className="section-link" onClick={(e) => {e.preventDefault();window.__setRoute("events");}}>
          All events <Icon.ChevronRight width="14" height="14" />
        </a>
      </div>
      <div className="home-events-grid">
        {EVENTS.slice(0, 3).map((e) =>
      <div key={e.id} className="poster-card">
            <div className="poster-card-img" style={{ backgroundImage: `url(${e.img})` }}>
              <span className="poster-card-tag">{e.tag}</span>
              <div className="poster-card-date">
                <b className="tabnum">{e.day}</b>
                <span>{e.mon} · {e.date.split(",")[0]}</span>
              </div>
            </div>
            <div className="poster-card-body">
              <h3 className="poster-card-title">{e.title}</h3>
              <div className="poster-card-meta">
                <Icon.Clock width="11" height="11" style={{ verticalAlign: "middle", marginRight: 4 }} />{e.time} · <Icon.Pin width="11" height="11" style={{ verticalAlign: "middle", marginRight: 4, marginLeft: 4 }} />{e.masjid}
              </div>
              <p className="poster-card-desc">{e.desc}</p>
              <div className="poster-card-foot">
                <button className="btn btn-teal btn-sm">Register</button>
                <button className="btn btn-outline btn-sm">Details</button>
              </div>
            </div>
          </div>
      )}
      </div>
    </div>
  </section>;


// Community timeline / previous projects
const TIMELINE = [
{
  date: "March 2026",
  tag: "Outreach",
  title: "Ramadan iftar deliveries with the foodbank",
  desc: "Volunteers across the four masaajid put together iftar meals for families using Ipswich Foodbank during the last ten nights. The schools at Murrayfield and Springfield helped distribute. Around 1,400 meals went out — JazakAllah Khair to everyone who chipped in.",
  meta: "~1,400 meals · 60+ volunteers",
  photos: [
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80"]

},
{
  date: "December 2025",
  tag: "Youth",
  title: "Brothers' football tournament",
  desc: "Six teams from across the masaajid played a friendly tournament at Ipswich Sports Club one Saturday. Shah Jalal won (just). Entry fees and a small raffle raised £2,300 — going to the new madrasah library at Nawra.",
  meta: "6 teams · £2,300 raised",
  photos: [
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80"]

},
{
  date: "September 2025",
  tag: "Education",
  title: "Weekend madrasah opens at Nawra",
  desc: "Saturday and Sunday morning classes for children 5–14. Two qualified teachers, 80 students enrolled. Spaces are limited and there's a small waiting list — please email if you'd like to add your child.",
  meta: "80 students · Sat & Sun · 10am–1pm",
  photos: [
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80"]

},
{
  date: "June 2025",
  tag: "Community",
  title: "Open iftar at the Town Hall",
  desc: "We hosted an open iftar at Ipswich Town Hall with the Mayor's office — open to anyone curious about Ramadan, of any faith or none. Around 500 came. The biryani team are still recovering.",
  meta: "~500 guests · Mayor in attendance",
  photos: [
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80"]

}];


const CommunityTimeline = () =>
<section className="timeline-section" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><Icon.Users width="13" height="13" /> Looking back</div>
          <h2 className="section-title">Some of what's happened recently.</h2>
          <div className="section-sub">A few highlights from the past year. The full archive goes back to 2019 when SMS was set up.</div>
        </div>
        <a href="#" className="section-link">Full archive <Icon.ChevronRight width="14" height="14" /></a>
      </div>
      <div className="timeline-container">
        {TIMELINE.map((t, i) =>
      <div key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">{t.date}</div>
            <div className="timeline-body">
              <div className="timeline-date timeline-date-mobile" style={{ padding: "0px" }}>{t.date}</div>
              <div className="timeline-tag">{t.tag}</div>
              <h3 className="timeline-title">{t.title}</h3>
              <p className="timeline-desc">{t.desc}</p>
              <div className="timeline-meta">{t.meta}</div>
            </div>
            <div className="timeline-photos">
              {t.photos.map((p, j) =>
          <div key={j}
          className={`timeline-photo ${t.photos.length === 1 ? "span-2" : ""}`}
          style={{ backgroundImage: `url(${p})` }}></div>
          )}
            </div>
          </div>
      )}
      </div>
    </div>
  </section>;


// Community submission section
const Masaajid = () =>
<section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><Icon.Pin width="13" height="13" /> Visit us</div>
          <h2 className="section-title">Our four masaajid.</h2>
          <div className="section-sub">Each masjid serves a different part of Ipswich. All are open for daily prayers — everyone is welcome.</div>
        </div>
        <a href="#" className="section-link" onClick={(e) => {e.preventDefault();window.__setRoute("contact");}}>
          Addresses & contacts <Icon.ChevronRight width="14" height="14" />
        </a>
      </div>
      <div className="masjid-grid">
        {MASJIDS.map((m) =>
      <div key={m.id} className="masjid-card">
            <div className="masjid-card-img" style={{ backgroundImage: `linear-gradient(180deg, rgba(14,61,82,0) 40%, rgba(14,61,82,0.55)), url(${m.img})` }}></div>
            <div className="masjid-card-body">
              <h3 className="masjid-card-name">{m.name}</h3>
              <div className="masjid-card-area">{m.area}</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Icon.Pin width="14" height="14" style={{ color: "var(--teal-500)", flexShrink: 0, marginTop: 2 }} />
                {m.address}
              </div>
            </div>
          </div>
      )}
      </div>
    </div>
  </section>;


const CommunitySubmit = () =>
<section className="submit-section">
    <div className="submit-pattern"><StarPattern id="submit-pat" color="#1B6B8A" scale={60} /></div>
    <div className="container submit-inner">
      <div className="submit-text">
        <div className="eyebrow"><Icon.Megaphone width="13" height="13" /> Get involved</div>
        <h2>Got something to share?</h2>
        <p>Running an event, starting a class, want to recommend a halal place we've missed, or have a short reminder to share — please send it our way. Everything is read by one of the committee before going up.</p>
        <div className="submit-categories">
          <span className="submit-chip">Event submissions</span>
          <span className="submit-chip">Community announcements</span>
          <span className="submit-chip">Volunteer opportunities</span>
          <span className="submit-chip">Business recommendations</span>
          <span className="submit-chip">Islamic reminders</span>
        </div>
      </div>
      <div className="submit-cta-card">
        <div className="submit-cta-icon"><Icon.Arrow width="22" height="22" /></div>
        <h3>Share with us</h3>
        <p>A short form, takes 2 minutes.</p>
        <button className="btn btn-teal" style={{ width: "100%", justifyContent: "center" }}>Click here <Icon.Arrow width="14" height="14" /></button>
      </div>
    </div>
  </section>;


// Small editorial note from the committee — adds soul, breaks the template feel
const CommitteeNote = () =>
<section className="committee-note">
    <div className="container">
      <div className="committee-note-inner">
        <div className="committee-note-label">
          A note from the committee
          <small>Week of 25 May</small>
        </div>
        <div>
          <div className="committee-note-body">
            <p>It's been a busy fortnight. Eid al-Adha falls on Friday 6 June this year, and we'll have three congregations across Ipswich — full timings are pinned on the announcements page and going out on the WhatsApp channel this week. Parking on Cauldwell Hall and Norwich Road will be tight, so please walk if you can.</p>
            <p>Big thanks to the brothers and sisters who stayed back after Jumu'ah last week to help paint the wudu area at Nawra. We still need someone with a van for the litter pick on the 7th — drop Br. Hasan a line if you can help.</p>
          </div>
          <div className="committee-note-sig">— <b>Br. Raydwan</b>, on behalf of the committee</div>
        </div>
      </div>
    </div>
  </section>;


const HomePage = () =>
<>
    <Hero />
    <SalahSection />
    <UpcomingEvents />
    <CommunityTimeline />
    <CommunitySubmit />
    <Masaajid />
  </>;


Object.assign(window, { HomePage });