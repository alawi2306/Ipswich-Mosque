// Homepage

const HeroPrayers = () => {
  // Show today's prayer times across all 4 masjids
  const cols = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  // Next prayer is "Asr" right now (mocked)
  const nextCol = "Asr";
  return (
    <div className="hero-prayers">
      <div className="hero-prayers-head">
        <div className="hero-prayers-title">
          <Icon.Clock width="22" height="22" style={{color: "var(--gold)"}}/>
          Today's Prayer Times
        </div>
        <div className="hero-prayers-date">
          <span>Saturday · 25 May 2026</span>
          <span style={{color: "var(--gold)"}}>·</span>
          <span>8 Dhū al-Qaʿdah 1447</span>
        </div>
      </div>
      <div className="hero-prayers-table">
        <div className="hpt-cell hpt-head">Masjid</div>
        {cols.map(c => (
          <div key={c} className="hpt-cell hpt-head" style={{textAlign:"center"}}>{c}</div>
        ))}
        {MASJIDS.map(m => {
          const t = TODAY_TIMES[m.id];
          const cells = [
            { key: "Fajr", begin: t.fajr[0], iqamah: t.fajr[1] },
            { key: "Sunrise", begin: t.sunrise, iqamah: null },
            { key: "Dhuhr", begin: t.dhuhr[0], iqamah: t.dhuhr[1] },
            { key: "Asr", begin: t.asr[0], iqamah: t.asr[1] },
            { key: "Maghrib", begin: t.maghrib[0], iqamah: t.maghrib[1] },
            { key: "Isha", begin: t.isha[0], iqamah: t.isha[1] },
          ];
          return (
            <React.Fragment key={m.id}>
              <div className="hpt-cell hpt-masjid">
                {m.name}
                <small>{m.area}</small>
              </div>
              {cells.map((c, i) => {
                const isNext = c.key === nextCol;
                return (
                  <div key={c.key}
                       className={`hpt-cell hpt-time tabnum ${isNext ? "hpt-next" : ""}`}
                       style={{textAlign:"center"}}>
                    {isNext && i === 0 ? null : null}
                    {c.begin}
                    {c.iqamah ? <small>Iqamah {c.iqamah}</small> : c.key === "Sunrise" ? <small>—</small> : null}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div className="hero-prayers-foot">
        <span>Times shown as Begin / Iqamah. Updated weekly by each masjid.</span>
        <a href="#" onClick={(e)=>{e.preventDefault(); window.__setRoute("prayer");}}>
          Full weekly timetables <Icon.Arrow width="14" height="14"/>
        </a>
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="hero">
    <div className="hero-pattern"><StarPattern id="hero-pat" color="#B8962E" scale={90}/></div>
    <div className="hero-glow"></div>
    <div className="container hero-inner">
      <div className="hero-top">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line"></span>
            Suffolk Muslim Society
          </div>
          <h1 className="hero-title">
            One community, <em>four masjids,</em> one place to find everything.
          </h1>
          <p className="hero-lede">
            Prayer timetables, events, classes and janazah arrangements for Muslims across Ipswich and the wider Suffolk community — kept up to date, week by week.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => window.__setRoute("prayer")}>
              View prayer times <Icon.Arrow width="16" height="16"/>
            </button>
            <button className="btn btn-ghost" onClick={() => window.__setRoute("about")}>
              About the Society
            </button>
          </div>
        </div>
        <div className="hero-meta">
          <div className="hero-meta-row">
            <span className="hero-meta-label">Next Prayer</span>
            <span className="hero-meta-value">Asr <small>· 5:00 PM</small></span>
          </div>
          <div className="hero-meta-row">
            <span className="hero-meta-label">Jumu'ah</span>
            <span className="hero-meta-value">1:30 PM <small>· 29 May</small></span>
          </div>
          <div className="hero-meta-row" style={{borderBottom: "1px solid rgba(255,255,255,0.12)"}}>
            <span className="hero-meta-label">Masjids Across Suffolk</span>
            <span className="hero-meta-value">04</span>
          </div>
        </div>
      </div>
      <HeroPrayers />
    </div>
  </section>
);

const QuickLinks = () => {
  const items = [
    { icon: Icon.Clock, title: "Prayer Times", desc: "Daily and weekly timetables for all four masjids.", route: "prayer" },
    { icon: Icon.Calendar, title: "Events", desc: "Halaqas, family gatherings and community outreach.", route: "events" },
    { icon: Icon.Book, title: "Classes", desc: "Quran, Arabic and Islamic studies for all ages.", route: "events" },
    { icon: Icon.Heart, title: "Janazah", desc: "Step-by-step guidance and 24-hour coordinator.", route: "janazah" },
  ];
  return (
    <section className="quicklinks">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="section-eyebrow">
              <span className="section-eyebrow-line"></span>
              Where to start
            </div>
            <h2 className="section-title">Everything the community needs, in one place.</h2>
          </div>
        </div>
        <div className="ql-grid">
          {items.map((it, i) => {
            const I = it.icon;
            return (
              <div key={i} className="ql-card" onClick={() => window.__setRoute(it.route)}>
                <div className="ql-card-icon"><I width="28" height="28"/></div>
                <div className="ql-card-title">{it.title}</div>
                <div className="ql-card-desc">{it.desc}</div>
                <span className="ql-card-arrow">Open <Icon.Arrow width="14" height="14"/></span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Mission = () => (
  <section className="mission">
    <div className="container">
      <div className="mission-grid">
        <div className="mission-image-stack">
          <div className="mission-img" style={{backgroundImage: "url(https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80)"}}></div>
          <div className="mission-img-2" style={{backgroundImage: "url(https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80)"}}></div>
        </div>
        <div className="mission-body">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            Our Mission
          </div>
          <h2 className="section-title">Serving the Muslims of Suffolk — together.</h2>
          <p>Suffolk Muslim Society exists to bring our community closer. We work alongside the four masjids of Ipswich to provide clear information, consistent services, and a warm welcome to every Muslim — and every neighbour — in the county.</p>
          <p>Whether you are new to the area, raising a young family, or returning after years away, our doors are open and our timetables are up to date.</p>
          <div className="mission-pillars">
            <div className="mp">
              <div className="mp-num">01</div>
              <div>
                <div className="mp-title">Worship</div>
                <div className="mp-desc">Daily prayer times, Jumu'ah and Eid arrangements across every masjid.</div>
              </div>
            </div>
            <div className="mp">
              <div className="mp-num">02</div>
              <div>
                <div className="mp-title">Education</div>
                <div className="mp-desc">Tafsir, Arabic, halaqas and weekend classes for children and adults.</div>
              </div>
            </div>
            <div className="mp">
              <div className="mp-num">03</div>
              <div>
                <div className="mp-title">Community</div>
                <div className="mp-desc">Family iftars, youth circles, outreach and cleanups across Suffolk.</div>
              </div>
            </div>
            <div className="mp">
              <div className="mp-num">04</div>
              <div>
                <div className="mp-title">Care</div>
                <div className="mp-desc">Janazah, bereavement support and welfare for those in need.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MasjidCards = () => (
  <section className="masjids">
    <div className="container">
      <div className="section-head-row">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            Four Masjids
          </div>
          <h2 className="section-title">The places we pray.</h2>
          <p className="section-lede">Each masjid serves a different part of Ipswich. Visit any for daily prayers — and check the timetable before you set off.</p>
        </div>
      </div>
      <div className="masjid-grid">
        {MASJIDS.map(m => {
          const t = TODAY_TIMES[m.id];
          return (
            <div key={m.id} className="masjid-card">
              <div className="masjid-img" style={{backgroundImage: `url(${m.img})`}}></div>
              <div className="masjid-body">
                <h3 className="masjid-name">{m.name}</h3>
                <div className="masjid-area">{m.area}</div>
                <p className="masjid-addr">{m.address}</p>
                <div className="masjid-times tabnum">
                  <div><span>Fajr</span> <b>{t.fajr[1]}</b></div>
                  <div><span>Dhuhr</span> <b>{t.dhuhr[1]}</b></div>
                  <div><span>Asr</span> <b>{t.asr[1]}</b></div>
                  <div><span>Maghrib</span> <b>{t.maghrib[1]}</b></div>
                  <div><span>Isha</span> <b>{t.isha[1]}</b></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const EventsAnnouncements = () => (
  <section className="split">
    <div className="container">
      <div className="split-grid">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            Upcoming
          </div>
          <h2 className="section-title">Events & gatherings.</h2>
          <div className="event-list">
            {EVENTS.slice(0, 4).map(e => (
              <div key={e.id} className="event-row" onClick={() => window.__setRoute("events")}>
                <div className="event-date">
                  <span className="event-date-day">{e.day}</span>
                  <span className="event-date-mon">{e.mon}</span>
                </div>
                <div>
                  <div className="event-tag">{e.tag} · {e.masjid}</div>
                  <h3 className="event-title">{e.title}</h3>
                  <div className="event-meta">
                    <span>{e.time}</span>
                  </div>
                </div>
                <div className="event-cta">Details <Icon.Arrow width="14" height="14" style={{verticalAlign: "middle"}}/></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="announcement-list">
            <div className="pattern-bg"><StarPattern id="ann-pat" color="#B8962E" scale={70}/></div>
            <div style={{position: "relative"}}>
              <div className="ann-eyebrow">
                <Icon.Megaphone width="14" height="14"/>
                Latest Announcements
              </div>
              <h3 className="ann-title">News from the masjids.</h3>
              {ANNOUNCEMENTS.map((a, i) => (
                <div key={i} className="ann-item">
                  <h4 className="ann-item-title">{a.title}</h4>
                  <div className="ann-item-meta">{a.date}</div>
                  <p className="ann-item-excerpt">{a.excerpt}</p>
                </div>
              ))}
              <a href="#" style={{display:"inline-flex", alignItems:"center", gap: 8, marginTop: 24, color: "var(--gold-soft)", fontSize: 14, fontWeight: 500}}>
                All announcements <Icon.Arrow width="14" height="14"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DonateBand = () => {
  const [amount, setAmount] = React.useState(25);
  const [cycle, setCycle] = React.useState("one-off");
  const amounts = [10, 25, 50, 100, 250, 500];
  return (
    <section className="donate-band">
      <div className="donate-band-pattern"><StarPattern id="donate-pat" color="#B8962E" scale={120}/></div>
      <div className="container">
        <div className="donate-grid">
          <div className="donate-text">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line"></span>
              Sadaqah
            </div>
            <h2 className="section-title">Sustain the work, however you can.</h2>
            <p className="section-lede">Every pound supports prayer space upkeep, janazah services for Suffolk residents, and free classes for our young people. Donations are zakat-eligible where applicable.</p>
            <div className="donate-stats">
              <div>
                <div className="donate-stat-num tabnum">£128k</div>
                <div className="donate-stat-label">Raised in 2025</div>
              </div>
              <div>
                <div className="donate-stat-num tabnum">340+</div>
                <div className="donate-stat-label">Monthly donors</div>
              </div>
              <div>
                <div className="donate-stat-num tabnum">100%</div>
                <div className="donate-stat-label">To community work</div>
              </div>
            </div>
          </div>
          <div className="donate-card">
            <h3>Give once or monthly</h3>
            <p>Choose an amount or enter your own.</p>
            <div className="donate-cycle">
              <button className={cycle === "one-off" ? "active" : ""} onClick={() => setCycle("one-off")}>One-off</button>
              <button className={cycle === "monthly" ? "active" : ""} onClick={() => setCycle("monthly")}>Monthly</button>
            </div>
            <div className="donate-amounts">
              {amounts.map(a => (
                <button key={a}
                        className={`donate-amt ${amount === a ? "active" : ""}`}
                        onClick={() => setAmount(a)}>£{a}</button>
              ))}
            </div>
            <input className="donate-other tabnum" placeholder="Other amount" type="number"/>
            <button className="btn btn-dark" style={{width:"100%", justifyContent:"center"}}>
              Donate £{amount} {cycle === "monthly" ? "/ month" : ""} <Icon.HandHeart width="16" height="16"/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <QuickLinks />
    <Mission />
    <MasjidCards />
    <EventsAnnouncements />
    <DonateBand />
  </>
);

Object.assign(window, { HomePage });
