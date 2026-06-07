// Inner pages: Prayer Times, Events, Janazah, About, Contact

const PrayerPage = () => {
  const [active, setActive] = React.useState("nawra");
  const masjid = MASJIDS.find(m => m.id === active);
  return (
    <>
      <PageHeader
        crumb="Prayer Times"
        title="Prayer timetables."
        sub="Updated weekly by each masjid. Times shown as begin and iqamah. Jumu'ah listed where applicable."
      />
      <section className="pt-page">
        <div className="container">
          <div className="pt-tabs">
            {MASJIDS.map(m => (
              <button key={m.id}
                      className={`pt-tab ${active === m.id ? "active" : ""}`}
                      onClick={() => setActive(m.id)}>{m.name}</button>
            ))}
          </div>
          <div className="pt-card">
            <div className="pt-head">
              <div>
                <h2>{masjid.name}</h2>
                <div className="pt-head-meta">
                  <span>{masjid.address}</span>
                </div>
              </div>
              <div className="pt-head-meta" style={{textAlign:"right"}}>
                <span><b>Week of 25–31 May 2026</b></span>
                <span>8–14 Dhū al-Qaʿdah 1447</span>
              </div>
            </div>
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Fajr</th>
                  <th>Sunrise</th>
                  <th>Dhuhr</th>
                  <th>Asr</th>
                  <th>Maghrib</th>
                  <th>Isha</th>
                </tr>
              </thead>
              <tbody>
                {WEEK_TIMETABLE.map((r, i) => {
                  const cell = (val) => {
                    const parts = val.split("/");
                    if (parts.length === 1) return <><b>{parts[0]}</b></>;
                    return <><b>{parts[0]}</b><span>Iq {parts[1]}</span></>;
                  };
                  return (
                    <tr key={i} className={i === 0 ? "today" : ""}>
                      <td>{r.day}</td>
                      <td>{cell(r.fajr)}</td>
                      <td><b>{r.sunrise}</b><span>Begin</span></td>
                      <td>{cell(r.dhuhr)}</td>
                      <td>{cell(r.asr)}</td>
                      <td><b>{r.maghrib}</b><span>Begin</span></td>
                      <td>{cell(r.isha)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pt-foot">
              <span>Last updated by masjid admin: <b>20 May 2026, 9:12 PM</b></span>
              <a href="#"><Icon.Download width="14" height="14" style={{verticalAlign:"middle", marginRight: 6}}/>Download PDF</a>
            </div>
          </div>

          <div className="pt-info-grid">
            <div className="pt-info">
              <h3>Jumu'ah this week</h3>
              <p>First congregation 1:30 PM · second congregation 2:00 PM. Khutbah begins 15 minutes prior.</p>
            </div>
            <div className="pt-info">
              <h3>How times are set</h3>
              <p>Begin times follow MWL calculation method. Iqamah times are decided by each masjid committee and updated weekly.</p>
            </div>
            <div className="pt-info">
              <h3>Notice an error?</h3>
              <p>Email <a href="#" style={{color: "var(--teal)"}}>admin@suffolkmuslim.org</a> and we'll forward it to the masjid committee.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const EventsPage = () => {
  const [filter, setFilter] = React.useState("All");
  const filters = ["All", "Community", "Education", "Youth", "Outreach"];
  const list = filter === "All" ? EVENTS : EVENTS.filter(e => e.tag === filter);
  return (
    <>
      <PageHeader
        crumb="Events"
        title="What's on across Suffolk."
        sub="Weekly halaqas, family gatherings, youth circles and outreach. Open to all unless otherwise noted."
      />
      <section className="evt-page">
        <div className="container">
          <div className="evt-filters">
            {filters.map(f => (
              <button key={f}
                      className={`evt-filter ${filter === f ? "active" : ""}`}
                      onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="evt-grid">
            {list.map(e => (
              <div key={e.id} className="evt-card">
                <div className="evt-card-img" style={{backgroundImage: `url(${e.img})`}}>
                  <div className="evt-card-date">
                    <b>{e.day}</b>
                    <span>{e.mon}</span>
                  </div>
                </div>
                <div className="evt-card-body">
                  <div className="evt-card-tag">{e.tag} · {e.masjid}</div>
                  <h3 className="evt-card-title">{e.title}</h3>
                  <p className="evt-card-desc">{e.desc}</p>
                  <div className="evt-card-meta">
                    <span><Icon.Clock width="13" height="13" style={{verticalAlign: "middle", marginRight: 4}}/>{e.time}</span>
                    <span><Icon.Pin width="13" height="13" style={{verticalAlign: "middle", marginRight: 4}}/>{e.masjid}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const JanazahPage = () => (
  <>
    <PageHeader
      crumb="Janazah"
      title="Janazah & bereavement support."
      sub="Step-by-step guidance for arranging an Islamic burial in Suffolk. Our coordinator is available 24 hours."
    />
    <section className="jnz-page">
      <div className="container">
        <div className="jnz-grid">
          <div className="jnz-steps">
            <div className="section-eyebrow" style={{marginBottom: 24}}>
              <span className="section-eyebrow-line"></span>
              The process
            </div>
            {JANAZAH_STEPS.map((s, i) => (
              <div key={i} className="jnz-step">
                <div className="jnz-step-num tabnum">{String(i+1).padStart(2,'0')}</div>
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
            <div className="jnz-contact">
              <div className="pattern-bg"><StarPattern id="jnz-pat" color="#B8962E" scale={70}/></div>
              <div style={{position:"relative"}}>
                <div className="jnz-contact-eyebrow">24-hour coordinator</div>
                <h3>Call the Janazah line</h3>
                <div className="jnz-contact-phone tabnum">07700 900 123</div>
                <p className="jnz-contact-blurb">Br. Mahmood Iqbal — Janazah Coordinator. Available day or night, every day of the year.</p>
                <button className="btn btn-primary" style={{marginTop: 18}}>
                  <Icon.Phone width="14" height="14"/> Call now
                </button>
              </div>
            </div>
            <div className="jnz-aside">
              <h4>Quick reference</h4>
              <div className="jnz-aside-list">
                <div className="jnz-aside-list-item"><span>Suffolk Registry</span><b>0345 607 2050</b></div>
                <div className="jnz-aside-list-item"><span>Cemetery</span><b>IP4 2TQ</b></div>
                <div className="jnz-aside-list-item"><span>Plot fee (residents)</span><b>£0</b></div>
                <div className="jnz-aside-list-item"><span>Typical timeline</span><b>24–48 hrs</b></div>
              </div>
            </div>
            <div className="jnz-aside" style={{marginTop: 20}}>
              <h4>Bereavement support</h4>
              <p style={{fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0}}>
                We offer follow-up visits, meal rotas through the local sisters' group, and guidance on inheritance (Mirath) and probate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const AboutPage = () => (
  <>
    <PageHeader
      crumb="About"
      title="A society for our community."
      sub="Suffolk Muslim Society works alongside Ipswich's four masjids to serve a community that has called this county home for three generations."
    />
    <section style={{paddingTop: 0}}>
      <div className="container">
        <div className="about-hero-grid">
          <div className="about-img" style={{backgroundImage: "url(https://images.unsplash.com/photo-1591104292683-aff7bf6abfcb?w=1400&q=80)"}}></div>
          <div>
            <div className="section-eyebrow">
              <span className="section-eyebrow-line"></span>
              Who we are
            </div>
            <h2 className="section-title">Volunteers, neighbours, friends.</h2>
            <p style={{fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 16px"}}>
              SMS is a registered charity led by a volunteer committee drawn from across Ipswich. We don't run the masjids — we connect them. Our work is to make sure that every Muslim in Suffolk knows where to pray, who to call, and what's happening this week.
            </p>
            <p style={{fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 16px"}}>
              We are funded entirely by community donations and gift aid. Every penny stays in Suffolk.
            </p>
          </div>
        </div>
        <div className="about-history-grid">
          <h2>Our<br/>history.</h2>
          <div>
            <p>The first Muslim community in Ipswich settled in the 1960s, mainly families from Bangladesh, Pakistan and East Africa who came to work in the textile and engineering trades. The first masjid — what is now Ipswich Mosque on Bond Street — opened its doors in 1979.</p>
            <p>Over the next four decades, the community grew. Masjid Taqwa was established to serve the west of the town; Shah Jalal Masjid followed for the Bangladeshi community; and Nawra Mosque was founded most recently to serve families in the east.</p>
            <p>Suffolk Muslim Society was formed in 2019 to act as a coordinating body — not to replace the masjids, but to support them. Today we maintain prayer schedules, run the joint janazah service, host quarterly committee meetings, and keep the community informed.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="about-values">
      <div className="container">
        <div className="section-eyebrow">
          <span className="section-eyebrow-line"></span>
          What guides us
        </div>
        <h2 className="section-title" style={{margin: 0}}>Three principles.</h2>
        <div className="about-values-grid">
          <div className="about-value">
            <div className="about-value-num">01</div>
            <h3>Service before self</h3>
            <p>Every committee role is voluntary. We are here to serve the community — not to lead it from above.</p>
          </div>
          <div className="about-value">
            <div className="about-value-num">02</div>
            <h3>Open and accountable</h3>
            <p>Our accounts are published yearly. Committee meetings are open to members. Concerns are addressed within seven days.</p>
          </div>
          <div className="about-value">
            <div className="about-value-num">03</div>
            <h3>Together with our neighbours</h3>
            <p>We work with Suffolk's faith communities, local schools and the council. A masjid is part of the wider town.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="committee">
      <div className="container">
        <div className="section-eyebrow">
          <span className="section-eyebrow-line"></span>
          The committee
        </div>
        <h2 className="section-title">2025–2026 committee.</h2>
        <div className="committee-grid">
          {COMMITTEE.map((c, i) => (
            <div key={i} className="committee-card">
              <div className="committee-img" style={{
                backgroundColor: i % 2 ? "var(--teal-50)" : "var(--cream-warm)",
                backgroundImage: "linear-gradient(135deg, var(--cream-warm) 25%, transparent 25%, transparent 50%, var(--cream-warm) 50%, var(--cream-warm) 75%, transparent 75%, transparent)",
                backgroundSize: "16px 16px"
              }}></div>
              <h4 className="committee-name">{c.name}</h4>
              <div className="committee-role">{c.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const ContactPage = () => (
  <>
    <PageHeader
      crumb="Contact"
      title="Get in touch."
      sub="For general enquiries, contact SMS directly. For prayer space or imam enquiries, please contact the relevant masjid."
    />
    <section>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-form">
            <h2>Send us a message</h2>
            <div className="contact-form-sub">We'll get back to you within two working days.</div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16}}>
              <div className="field">
                <label>First name</label>
                <input type="text" placeholder="Your first name"/>
              </div>
              <div className="field">
                <label>Last name</label>
                <input type="text" placeholder="Your last name"/>
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com"/>
            </div>
            <div className="field">
              <label>Topic</label>
              <select>
                <option>General enquiry</option>
                <option>Volunteer with SMS</option>
                <option>Donation / gift aid</option>
                <option>Janazah enquiry</option>
                <option>Press / media</option>
              </select>
            </div>
            <div className="field">
              <label>Message</label>
              <textarea placeholder="How can we help?"></textarea>
            </div>
            <button className="btn btn-dark" style={{width: "100%", justifyContent: "center"}}>
              Send message <Icon.Arrow width="14" height="14"/>
            </button>
          </div>
          <div>
            <div className="section-eyebrow">
              <span className="section-eyebrow-line"></span>
              Direct contacts
            </div>
            <h2 className="section-title" style={{fontSize: 32}}>The four masjids.</h2>
            <div className="contact-info-block">
              {MASJIDS.map(m => (
                <div key={m.id} className="contact-info-item">
                  <h3>{m.name}</h3>
                  <div className="contact-info-area">{m.area}</div>
                  <div className="contact-info-row">
                    <Icon.Pin width="16" height="16"/>
                    <span>{m.address}</span>
                  </div>
                  <div className="contact-info-row">
                    <Icon.Phone width="16" height="16"/>
                    <span className="tabnum">{m.phone}</span>
                  </div>
                  <div className="contact-info-row">
                    <Icon.Mail width="16" height="16"/>
                    <span>{m.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

Object.assign(window, { PrayerPage, EventsPage, JanazahPage, AboutPage, ContactPage });
