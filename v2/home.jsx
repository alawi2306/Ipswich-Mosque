// SMS v2 — Homepage

const PRAYERS_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const PRAYER_ICONS = {
  Fajr: Icon.Moon,
  Sunrise: Icon.Sunrise,
  Dhuhr: Icon.Sun,
  Asr: Icon.CloudSun,
  Maghrib: Icon.Sunset,
  Isha: Icon.Moon,
};
const PRAYER_ARABIC = {
  Fajr: "Dawn",
  Sunrise: "Shuruq",
  Dhuhr: "Midday",
  Asr: "Afternoon",
  Maghrib: "Sunset",
  Isha: "Night",
};

const PrayerCard = () => {
  const [active, setActive] = React.useState("ipswich");
  const masjid = MASJIDS.find(m => m.id === active);
  const t = TODAY_TIMES[active];
  // Simulated next prayer = Asr
  const nextPrayer = "Asr";
  const passed = ["Fajr", "Sunrise", "Dhuhr"];
  return (
    <div className="prayer-card">
      <div className="prayer-card-head">
        <div>
          <h2>Prayer times today</h2>
          <div className="prayer-card-date">Saturday, 25 May 2026 · 8 Dhū al-Qaʿdah</div>
        </div>
        <div className="prayer-card-masjid-switch">
          {MASJIDS.map(m => (
            <button key={m.id}
                    className={active === m.id ? "active" : ""}
                    onClick={() => setActive(m.id)}>{m.short}</button>
          ))}
        </div>
      </div>
      {PRAYERS_ORDER.map(p => {
        const data = {
          Fajr: t.fajr, Sunrise: [t.sunrise, null], Dhuhr: t.dhuhr,
          Asr: t.asr, Maghrib: t.maghrib, Isha: t.isha,
        }[p];
        const I = PRAYER_ICONS[p];
        const isNext = p === nextPrayer;
        const isPassed = passed.includes(p);
        return (
          <div key={p} className={`prayer-row ${isNext ? "next" : ""} ${isPassed ? "passed" : ""}`}>
            <div className="pr-name">
              <div className="pr-name-icon"><I width="16" height="16"/></div>
              <div>
                <b>{p}</b>
                <span>{PRAYER_ARABIC[p]}</span>
              </div>
            </div>
            <div className="pr-time">
              <b className="tabnum">{data[0]}</b>
              <span>Begins</span>
            </div>
            <div className={`pr-time iqamah ${isNext ? "next-time" : ""}`}>
              <b className="tabnum">{data[1] || "—"}</b>
              <span>Jamāʿah</span>
            </div>
          </div>
        );
      })}
      <div className="prayer-card-foot">
        <span>{masjid.name} · updated weekly</span>
        <a href="#" onClick={(e) => { e.preventDefault(); window.__setRoute("prayer"); }}>
          Full timetable <Icon.ChevronRight width="13" height="13"/>
        </a>
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="hero">
    <div className="hero-pattern"><StarPattern id="hero-pat" color="#1B6B8A" scale={56}/></div>
    <div className="container">
      <div className="hero-grid">
        <div className="hero-photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1400&q=80)"}}>
          <div className="hero-photo-content">
            <span className="hero-photo-tag">Latest news</span>
            <h1 className="hero-photo-title">Eid al-Adha prayer arrangements confirmed across Suffolk</h1>
            <div className="hero-photo-meta">
              <span>21 May 2026</span>
              <span>3 min read</span>
            </div>
            <a href="#" className="hero-photo-cta">Read announcement <Icon.Arrow width="14" height="14"/></a>
          </div>
        </div>
        <PrayerCard />
      </div>
    </div>
  </section>
);

const QuickActions = () => {
  const items = [
    { icon: Icon.Clock, title: "Prayer Times", desc: "All four masjids", route: "prayer" },
    { icon: Icon.Calendar, title: "Events", desc: "What's on this week", route: "events" },
    { icon: Icon.Book, title: "Classes", desc: "Quran & Arabic", route: "events" },
    { icon: Icon.Heart, title: "Janazah", desc: "24-hr support", route: "janazah" },
    { icon: Icon.Users, title: "About SMS", desc: "Who we are", route: "about" },
    { icon: Icon.HandHeart, title: "Donate", desc: "Sadaqah & Zakat", route: "donate" },
  ];
  return (
    <section className="quickactions">
      <div className="container">
        <div className="qa-grid">
          {items.map((it, i) => {
            const I = it.icon;
            return (
              <button key={i} className="qa-card" onClick={() => window.__setRoute(it.route)}>
                <div className="qa-card-icon"><I width="18" height="18"/></div>
                <div className="qa-card-title">{it.title}</div>
                <div className="qa-card-desc">{it.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const NEWS = [
  { tag: "Announcement", title: "Eid al-Adha prayer arrangements", excerpt: "Three congregations across Suffolk on Friday 6 June. See full schedule and parking guidance for each masjid.", date: "21 May 2026", read: "3 min", img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=900&q=80" },
  { tag: "Hajj 2026", title: "Pre-departure briefing for pilgrims", excerpt: "Committee-led session for this year's Hajj group and their families. Refreshments after Maghrib at Ipswich Mosque.", date: "18 May 2026", read: "2 min", img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=900&q=80" },
  { tag: "Community", title: "Summer Jumu'ah schedule begins 30 May", excerpt: "First congregation moves to 1:30 PM across all four Ipswich masjids. Updated khutbah times included.", date: "16 May 2026", read: "4 min", img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=900&q=80" },
];

const News = () => (
  <section className="news-section">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><Icon.Megaphone width="13" height="13"/> Latest news</div>
          <h2 className="section-title">From the masjids.</h2>
        </div>
        <a href="#" className="section-link">All news <Icon.ChevronRight width="14" height="14"/></a>
      </div>
      <div className="news-grid">
        {NEWS.map((n, i) => (
          <div key={i} className="news-card">
            <div className="news-card-img" style={{backgroundImage: `url(${n.img})`}}></div>
            <div className="news-card-body">
              <div className="news-card-tag">{n.tag}</div>
              <h3 className="news-card-title">{n.title}</h3>
              <p className="news-card-excerpt">{n.excerpt}</p>
              <div className="news-card-meta">
                <span>{n.date}</span>
                <span>{n.read}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhatsOn = () => {
  const [amount, setAmount] = React.useState(25);
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Calendar width="13" height="13"/> What's on</div>
            <h2 className="section-title">This week in Suffolk.</h2>
          </div>
          <a href="#" className="section-link" onClick={(e) => { e.preventDefault(); window.__setRoute("events"); }}>All events <Icon.ChevronRight width="14" height="14"/></a>
        </div>
        <div className="whatson-grid">
          <div className="whatson-list">
            {EVENTS.slice(0, 5).map(e => (
              <div key={e.id} className="whatson-row" onClick={() => window.__setRoute("events")}>
                <div className="whatson-date">
                  <b className="tabnum">{e.day}</b>
                  <span>{e.mon}</span>
                </div>
                <div>
                  <h4 className="whatson-title">{e.title}</h4>
                  <div className="whatson-meta">
                    <span><Icon.Clock width="12" height="12" style={{verticalAlign:"middle", marginRight: 4}}/>{e.time}</span>
                    <span><Icon.Pin width="12" height="12" style={{verticalAlign:"middle", marginRight: 4}}/>{e.masjid}</span>
                    <span style={{color:"var(--gold-600)", fontWeight:600}}>{e.tag}</span>
                  </div>
                </div>
                <div className="whatson-cta">Details <Icon.ChevronRight width="13" height="13"/></div>
              </div>
            ))}
          </div>
          <div className="donate-mini">
            <div className="pattern-bg"><StarPattern id="dm-pat" color="#B8962E" scale={60}/></div>
            <div className="eyebrow"><Icon.HandHeart width="13" height="13"/> Sadaqah</div>
            <h3>Support our work</h3>
            <p>£100k+ raised in 2025 — every pound stays in Suffolk. Donations are zakat-eligible where applicable.</p>
            <div className="donate-amounts">
              {[10, 25, 50, 100, 250, 500].map(a => (
                <button key={a}
                        className={`donate-amt tabnum ${amount === a ? "active" : ""}`}
                        onClick={() => setAmount(a)}>£{a}</button>
              ))}
            </div>
            <button className="btn btn-primary">Donate £{amount} <Icon.Arrow width="14" height="14"/></button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Masjids = () => (
  <section style={{background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)"}}>
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><Icon.Pin width="13" height="13"/> The four masjids</div>
          <h2 className="section-title">Where to pray in Ipswich.</h2>
          <div className="section-sub">Each masjid serves a different part of the town. Visit any for daily prayers.</div>
        </div>
      </div>
      <div className="masjid-grid">
        {MASJIDS.map(m => {
          const t = TODAY_TIMES[m.id];
          return (
            <div key={m.id} className="masjid-card">
              <div className="masjid-card-img" style={{backgroundImage: `url(${m.img})`}}></div>
              <div className="masjid-card-body">
                <h3 className="masjid-card-name">{m.name}</h3>
                <div className="masjid-card-area">{m.area}</div>
                <div className="masjid-card-times">
                  <div className="mc-time"><b>{t.fajr[1]}</b><span>Fajr</span></div>
                  <div className="mc-time"><b>{t.dhuhr[1]}</b><span>Dhuhr</span></div>
                  <div className="mc-time"><b>{t.asr[1]}</b><span>Asr</span></div>
                  <div className="mc-time"><b>{t.maghrib[1]}</b><span>Magh</span></div>
                  <div className="mc-time"><b>{t.isha[1]}</b><span>Isha</span></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="stats">
    <div className="stats-pattern"><StarPattern id="stats-pat" color="#B8962E" scale={80}/></div>
    <div className="container">
      <div className="stats-grid">
        <div>
          <div className="stat-num">4</div>
          <div className="stat-label">Masjids across Suffolk</div>
        </div>
        <div>
          <div className="stat-num">7,200+</div>
          <div className="stat-label">Muslims in the community</div>
        </div>
        <div>
          <div className="stat-num">£128k</div>
          <div className="stat-label">Raised in 2025</div>
        </div>
        <div>
          <div className="stat-num">340+</div>
          <div className="stat-label">Monthly donors</div>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <>
    <Hero />
    <QuickActions />
    <News />
    <WhatsOn />
    <Masjids />
    <Stats />
  </>
);

Object.assign(window, { HomePage });
