// Homepage — matches SMS structure V1 spec

const PRAYERS_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const SalahSection = () => (
  <section className="salah-section">
    <div className="container">
      <div className="section-head" style={{marginBottom: 18}}>
        <div>
          <div className="eyebrow"><Icon.Clock width="13" height="13"/> Live salah times</div>
          <h2 className="section-title">Today's prayers across all four masaajid.</h2>
          <div className="section-sub">Auto-updated weekly by each masjid's admin team.</div>
        </div>
        <a href="#" className="section-link" onClick={(e) => { e.preventDefault(); window.__setRoute("prayer"); }}>
          Full weekly timetable <Icon.ChevronRight width="14" height="14"/>
        </a>
      </div>

      <div className="salah-date-strip">
        <div>
          <h3>Saturday, 25 May 2026</h3>
          <div className="date-line">8 Dhū al-Qaʿdah 1447 · <b>Jumu'ah this week — 1:30 PM</b></div>
        </div>
        <div></div>
        <div className="countdown">
          Next prayer <b className="tabnum">Asr</b> · begins in <b className="tabnum">2h 14m</b>
        </div>
      </div>

      <div className="salah-grid">
        {MASJIDS.map(m => {
          const t = TODAY_TIMES[m.id];
          const cells = [
            { name: "Fajr", begin: t.fajr[0], iqamah: t.fajr[1] },
            { name: "Sunrise", begin: t.sunrise, iqamah: null },
            { name: "Dhuhr", begin: t.dhuhr[0], iqamah: t.dhuhr[1] },
            { name: "Asr", begin: t.asr[0], iqamah: t.asr[1] },
            { name: "Maghrib", begin: t.maghrib[0], iqamah: t.maghrib[1] },
            { name: "Isha", begin: t.isha[0], iqamah: t.isha[1] },
          ];
          const passedSet = new Set(["Fajr", "Sunrise", "Dhuhr"]);
          return (
            <div key={m.id} className="salah-box">
              <div className="salah-box-head">
                <div>
                  <h3 className="salah-box-name">{m.name}</h3>
                  <div className="salah-box-area">{m.area}</div>
                </div>
                <div className="salah-box-jumuah">
                  <Icon.Calendar width="12" height="12"/>
                  Jumu'ah <b>{m.id === "ipswich" || m.id === "taqwa" ? "1:30" : m.id === "nawra" ? "1:30 & 2:00" : "1:45"}</b>
                </div>
              </div>
              <div className="salah-box-row">
                {cells.map(c => {
                  const isNext = c.name === "Asr";
                  const isPassed = passedSet.has(c.name);
                  return (
                    <div key={c.name} className={`salah-box-cell ${isNext ? "next" : ""} ${isPassed ? "passed" : ""}`}>
                      <span className="label">{c.name}</span>
                      <span className="begin">{c.begin}</span>
                      <span className="iqamah">{c.iqamah ? `Iq ${c.iqamah}` : "—"}</span>
                    </div>
                  );
                })}
              </div>
              <div className="salah-box-foot">
                <span>Updated <b>20 May, 9:12 PM</b></span>
                <a href="#" style={{color: "var(--teal-700)", fontWeight: 600}}>View full week →</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// Quick access — 6 buttons strip (matches spec exactly)
const QuickAccess = () => {
  const items = [
    { icon: Icon.Calendar, label: "Upcoming Events", sub: "What's on this week", route: "events" },
    { icon: Icon.Clock, label: "Salah Times", sub: "All four masaajid", route: "prayer" },
    { icon: Icon.Users, label: "Volunteer", sub: "Join the project", route: "volunteer" },
    { icon: Icon.Heart, label: "Sisters", sub: "Events & programmes", route: "sisters" },
    { icon: Icon.HandHeart, label: "Funeral Support", sub: "24-hr coordinator", route: "funeral" },
    { icon: Icon.Mail, label: "Contact Us", sub: "Get in touch", route: "contact" },
  ];
  return (
    <section className="qa-strip">
      <div className="container">
        <div className="qa-strip-grid">
          {items.map((it, i) => {
            const I = it.icon;
            return (
              <button key={i} className="qa-strip-item" onClick={() => window.__setRoute(it.route)}>
                <div className="qa-strip-icon"><I width="20" height="20"/></div>
                <div className="qa-strip-text">
                  <b>{it.label}</b>
                  <span>{it.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Top banner area — like v2 hero photo
const Hero = () => (
  <section className="hero">
    <div className="hero-pattern"><StarPattern id="hero-pat" color="#1B6B8A" scale={56}/></div>
    <div className="container">
      <div className="hero-grid">
        <div className="hero-photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1400&q=80)"}}>
          <div className="hero-photo-content">
            <span className="hero-photo-tag">Featured · Announcement</span>
            <h1 className="hero-photo-title">Eid al-Adha prayer arrangements confirmed</h1>
            <div className="hero-photo-meta">
              <span>21 May 2026</span>
              <span>3 min read</span>
            </div>
            <a href="#" className="hero-photo-cta">Read announcement <Icon.Arrow width="14" height="14"/></a>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16}}>
          <div style={{background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "24px 28px", boxShadow: "var(--shadow-md)"}}>
            <div className="eyebrow"><Icon.Mosque width="13" height="13" /> Welcome</div>
            <h2 style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.15}}>
              One platform. Four masaajid. <span style={{color: "var(--teal-700)"}}>One community.</span>
            </h2>
            <p style={{fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 18px"}}>
              Salah times, events, classes, funeral support and resources for Muslims across Ipswich and Suffolk — kept up to date, week by week.
            </p>
            <div style={{display: "flex", gap: 8}}>
              <button className="btn btn-teal btn-sm" onClick={() => window.__setRoute("prayer")}>
                Salah times <Icon.ChevronRight width="13" height="13"/>
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => window.__setRoute("objectives")}>
                About SMS
              </button>
            </div>
          </div>
          <div style={{background: "var(--gold-50)", border: "1px solid var(--gold-100)", borderRadius: "var(--radius)", padding: "20px 24px"}}>
            <div style={{display: "flex", gap: 14, alignItems: "center"}}>
              <div style={{width: 40, height: 40, background: "var(--gold-600)", color: "white", borderRadius: "50%", display: "grid", placeItems: "center", flexShrink: 0}}>
                <Icon.Live width="18" height="18"/>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "var(--gold-600)", textTransform: "uppercase", marginBottom: 2}}>Live now · Mixlr</div>
                <div style={{fontSize: 14.5, fontWeight: 600, color: "var(--ink)"}}>Tafsir circle — Ipswich Mosque</div>
              </div>
              <button className="btn btn-primary btn-sm">Listen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Upcoming events — poster + register button (per spec)
const UpcomingEvents = () => (
  <section>
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><Icon.Calendar width="13" height="13"/> Upcoming events</div>
          <h2 className="section-title">What's coming up.</h2>
          <div className="section-sub">Register your interest in advance — places fill up quickly for popular sessions.</div>
        </div>
        <a href="#" className="section-link" onClick={(e) => { e.preventDefault(); window.__setRoute("events"); }}>
          All events <Icon.ChevronRight width="14" height="14"/>
        </a>
      </div>
      <div className="home-events-grid">
        {EVENTS.slice(0, 3).map(e => (
          <div key={e.id} className="poster-card">
            <div className="poster-card-img" style={{backgroundImage: `url(${e.img})`}}>
              <span className="poster-card-tag">{e.tag}</span>
              <div className="poster-card-date">
                <b className="tabnum">{e.day}</b>
                <span>{e.mon} · {e.date.split(",")[0]}</span>
              </div>
            </div>
            <div className="poster-card-body">
              <h3 className="poster-card-title">{e.title}</h3>
              <div className="poster-card-meta">
                <Icon.Clock width="11" height="11" style={{verticalAlign: "middle", marginRight: 4}}/>{e.time} · <Icon.Pin width="11" height="11" style={{verticalAlign: "middle", marginRight: 4, marginLeft: 4}}/>{e.masjid}
              </div>
              <p className="poster-card-desc">{e.desc}</p>
              <div className="poster-card-foot">
                <button className="btn btn-teal btn-sm">Register</button>
                <button className="btn btn-outline btn-sm">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Community timeline / previous projects
const TIMELINE = [
  {
    date: "March 2026",
    tag: "Outreach",
    title: "Suffolk Foodbank — Ramadan iftar drives",
    desc: "Volunteers delivered 1,400 iftar meals across Ipswich during the last ten nights of Ramadan, working with local schools and the council foodbank.",
    meta: "1,400 meals · 60 volunteers · 4 masaajid",
    photos: [
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
    ],
  },
  {
    date: "December 2025",
    tag: "Youth",
    title: "Inter-mosque football tournament",
    desc: "Six teams across the four masaajid competed at Ipswich Sports Club. Shah Jalal Masjid took the cup; raised £2,300 for the new madrasah library.",
    meta: "6 teams · £2,300 raised",
    photos: [
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
    ],
  },
  {
    date: "September 2025",
    tag: "Education",
    title: "New madrasah opens at Nawra Mosque",
    desc: "Weekend Qur'an and Arabic classes launched for children aged 5–14. Two qualified teachers, 80 students enrolled in the first term.",
    meta: "80 students · Sat & Sun mornings",
    photos: [
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
    ],
  },
  {
    date: "June 2025",
    tag: "Community",
    title: "First annual community iftar — 500 attendees",
    desc: "Hosted at Ipswich Town Hall in partnership with the Mayor's office. Open to all faiths and none — our biggest cross-community event yet.",
    meta: "500+ guests · Mayor of Ipswich attended",
    photos: [
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
    ],
  },
];

const CommunityTimeline = () => (
  <section className="timeline-section" style={{background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)"}}>
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><Icon.Users width="13" height="13"/> Community timeline</div>
          <h2 className="section-title">What we've been doing.</h2>
          <div className="section-sub">Highlights from previous projects across Suffolk.</div>
        </div>
        <a href="#" className="section-link">Full archive <Icon.ChevronRight width="14" height="14"/></a>
      </div>
      <div className="timeline-container">
        {TIMELINE.map((t, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">{t.date}</div>
            <div className="timeline-body">
              <div className="timeline-tag">{t.tag}</div>
              <h3 className="timeline-title">{t.title}</h3>
              <p className="timeline-desc">{t.desc}</p>
              <div className="timeline-meta">{t.meta}</div>
            </div>
            <div className="timeline-photos">
              {t.photos.map((p, j) => (
                <div key={j}
                     className={`timeline-photo ${t.photos.length === 1 ? "span-2" : ""}`}
                     style={{backgroundImage: `url(${p})`}}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Community submission section
const CommunitySubmit = () => (
  <section className="submit-section">
    <div className="submit-pattern"><StarPattern id="submit-pat" color="#1B6B8A" scale={60}/></div>
    <div className="container submit-inner">
      <div className="submit-text">
        <div className="eyebrow"><Icon.Megaphone width="13" height="13"/> Get involved</div>
        <h2>Do you have something to share with the community?</h2>
        <p>If you're hosting an event, running a class, recommending a halal business, or have a reminder to share — we'd love to hear from you. Submissions are reviewed by the committee before being published.</p>
        <div className="submit-categories">
          <span className="submit-chip">Event submissions</span>
          <span className="submit-chip">Community announcements</span>
          <span className="submit-chip">Volunteer opportunities</span>
          <span className="submit-chip">Business recommendations</span>
          <span className="submit-chip">Islamic reminders</span>
        </div>
      </div>
      <div className="submit-cta-card">
        <div className="submit-cta-icon"><Icon.Arrow width="22" height="22"/></div>
        <h3>Share with us</h3>
        <p>A short form, takes 2 minutes.</p>
        <button className="btn btn-teal" style={{width: "100%", justifyContent: "center"}}>Click here <Icon.Arrow width="14" height="14"/></button>
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <>
    <Hero />
    <QuickAccess />
    <SalahSection />
    <UpcomingEvents />
    <CommunityTimeline />
    <CommunitySubmit />
  </>
);

Object.assign(window, { HomePage });
