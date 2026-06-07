// SMS v2 — inner pages

const PrayerPage = () => {
  const [active, setActive] = React.useState("ipswich");
  const masjid = MASJIDS.find(m => m.id === active);
  return (
    <>
      <PageHeader
        crumb="Prayer Times"
        title="Prayer timetables"
        sub="Begin times calculated by Muslim World League method. Jammat times set by each masjid committee and updated weekly."
      />
      <section className="pt-page">
        <div className="container">
          <div className="pt-layout">
            <aside className="pt-side">
              <h4>Choose masjid</h4>
              {MASJIDS.map(m => (
                <button key={m.id}
                        className={`pt-side-item ${active === m.id ? "active" : ""}`}
                        onClick={() => setActive(m.id)}>
                  {m.name}
                  <small>{m.area}</small>
                </button>
              ))}
              <h4 style={{marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line-2)"}}>Resources</h4>
              <button className="pt-side-item"><Icon.Download width="14" height="14" style={{verticalAlign: "middle", marginRight: 8}}/>Annual calendar</button>
              <button className="pt-side-item"><Icon.Calendar width="14" height="14" style={{verticalAlign: "middle", marginRight: 8}}/>Subscribe (iCal)</button>
              <button className="pt-side-item"><Icon.Bell width="14" height="14" style={{verticalAlign: "middle", marginRight: 8}}/>Adhan notifications</button>
            </aside>
            <div>
              <div className="pt-card">
                <div className="pt-card-head">
                  <div>
                    <h2>{masjid.name}</h2>
                    <div className="pt-card-head-meta">{masjid.address}</div>
                  </div>
                  <div className="pt-card-head-week">
                    <button><Icon.ChevronLeft width="14" height="14"/></button>
                    Week of 25–31 May 2026
                    <button><Icon.ChevronRight width="14" height="14"/></button>
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
                      <th>Jumu'ah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEEK_TIMETABLE.map((r, i) => {
                      const cell = (val) => {
                        const parts = val.split("/");
                        if (parts.length === 1) return <div className="pt-cell"><b>{parts[0]}</b></div>;
                        return (
                          <div className="pt-cell">
                            <b>{parts[0]}</b>
                            <span className="pt-jammat">Jammat {parts[1]}</span>
                          </div>
                        );
                      };
                      const isFri = (r.day || "").startsWith("Fri");
                      return (
                        <tr key={i} className={i === 0 ? "today" : ""}>
                          <td>{r.day}<small>{r.date}</small></td>
                          <td>{cell(r.fajr)}</td>
                          <td><div className="pt-cell"><b>{r.sunrise}</b></div></td>
                          <td>{cell(r.dhuhr)}</td>
                          <td>{cell(r.asr)}</td>
                          <td><div className="pt-cell"><b>{r.maghrib}</b></div></td>
                          <td>{cell(r.isha)}</td>
                          <td><div className="pt-cell">{isFri ? <><b className="pt-jum">1:30</b><span className="pt-jammat">& 2:00</span></> : <span style={{color:"var(--line)"}}>—</span>}</div></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="pt-card-foot">
                  <span>Last updated by masjid admin · <b style={{color:"var(--ink-2)"}}>20 May 2026, 9:12 PM</b></span>
                  <a href="#" className="section-link"><Icon.Download width="13" height="13"/> Download PDF</a>
                </div>
              </div>

              <div className="pt-notes">
                <div className="pt-note">
                  <div className="pt-note-icon"><Icon.Calendar width="16" height="16"/></div>
                  <h4>Jumu'ah this week</h4>
                  <p>First congregation 1:30 PM · second congregation 2:00 PM. Khutbah begins 15 minutes prior to each.</p>
                </div>
                <div className="pt-note">
                  <div className="pt-note-icon"><Icon.Clock width="16" height="16"/></div>
                  <h4>How times are set</h4>
                  <p>Begin times follow MWL calculation. Jammat times are decided by each masjid committee.</p>
                </div>
                <div className="pt-note">
                  <div className="pt-note-icon"><Icon.Mail width="16" height="16"/></div>
                  <h4>Notice an error?</h4>
                  <p>Email <a href="#" style={{color:"var(--teal-700)", fontWeight: 600}}>admin@suffolkmuslim.org</a> and we'll forward it to the relevant masjid committee.</p>
                </div>
              </div>
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
        crumb="Events & Classes"
        title="What's on across Suffolk"
        sub="Weekly halaqas, family gatherings, youth circles and outreach. Open to all unless otherwise noted."
      />
      <section className="evt-page">
        <div className="container">
          <div className="evt-toolbar">
            <div className="evt-filters">
              {filters.map(f => (
                <button key={f}
                        className={`evt-filter ${filter === f ? "active" : ""}`}
                        onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div style={{display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--muted)"}}>
              <span>{list.length} events</span>
              <select style={{padding: "7px 10px", border: "1px solid var(--line)", borderRadius: 6, background: "white", fontFamily: "inherit", fontSize: 13, color: "var(--ink-2)"}}>
                <option>Upcoming first</option>
                <option>Newest first</option>
                <option>By masjid</option>
              </select>
            </div>
          </div>
          <div className="evt-grid">
            {list.map(e => (
              <div key={e.id} className="evt-card">
                <div className="evt-card-img" style={{backgroundImage: `url(${e.img})`}}>
                  <div className="evt-card-date-tag">
                    <b className="tabnum">{e.day}</b>
                    <span>{e.mon}</span>
                  </div>
                </div>
                <div className="evt-card-body">
                  <div className="evt-card-tag">{e.tag} · {e.masjid}</div>
                  <h3 className="evt-card-title">{e.title}</h3>
                  <p className="evt-card-desc">{e.desc}</p>
                  <div className="evt-card-meta">
                    <span><Icon.Clock width="12" height="12" style={{verticalAlign:"middle", marginRight: 4}}/>{e.time}</span>
                    <span><Icon.Pin width="12" height="12" style={{verticalAlign:"middle", marginRight: 4}}/>{e.masjid.split(" ")[0]}</span>
                  </div>
                  <div style={{display: "flex", gap: 8, marginTop: 14}}>
                    <button className="btn btn-teal btn-sm" style={{flex: 1, justifyContent: "center"}}>Register</button>
                    <button className="btn btn-outline btn-sm">Details</button>
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
      title="Janazah & bereavement support"
      sub="Step-by-step guidance for arranging an Islamic burial in Suffolk. Our coordinator is available 24 hours."
    />
    <section className="jnz-page">
      <div className="container">
        <div className="jnz-callout">
          <div className="pattern-bg"><StarPattern id="jnz-cal-pat" color="#B8962E" scale={50}/></div>
          <div className="jnz-callout-text">
            <h2>Need to call now?</h2>
            <p>Br. Mahmood Iqbal — Janazah Coordinator. Available day or night, every day of the year.</p>
          </div>
          <div className="jnz-callout-action">
            <div className="jnz-callout-phone tabnum">07700 900 123</div>
            <button className="btn btn-primary"><Icon.Phone width="14" height="14"/> Call now</button>
          </div>
        </div>
        <div className="jnz-grid">
          <div className="jnz-steps">
            {JANAZAH_STEPS.map((s, i) => (
              <div key={i} className="jnz-step">
                <div className="jnz-step-num">{i+1}</div>
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
              <h4>Bereavement support</h4>
              <p style={{fontSize: 13.5, color: "var(--ink-2)", margin: "0 0 12px", lineHeight: 1.55}}>
                Follow-up visits, meal rotas through the local sisters' group, and guidance on inheritance (Mirath) and probate.
              </p>
              <button className="btn btn-outline btn-sm" style={{width:"100%", justifyContent:"center"}}>Request support</button>
            </div>
            <div className="jnz-aside">
              <h4>Downloads</h4>
              <a href="#" className="section-link" style={{display: "flex", padding: "8px 0", borderBottom: "1px solid var(--line-2)"}}>
                <Icon.Download width="14" height="14" style={{marginRight: 8}}/>Janazah process (PDF)
              </a>
              <a href="#" className="section-link" style={{display: "flex", padding: "8px 0", borderBottom: "1px solid var(--line-2)"}}>
                <Icon.Download width="14" height="14" style={{marginRight: 8}}/>Mirath guide (PDF)
              </a>
              <a href="#" className="section-link" style={{display: "flex", padding: "8px 0"}}>
                <Icon.Download width="14" height="14" style={{marginRight: 8}}/>Registry checklist (PDF)
              </a>
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
      title="A society for our community"
      sub="Suffolk Muslim Society works alongside Ipswich's four masjids to serve a community that has called this county home for three generations."
    />
    <section style={{paddingTop: 0}}>
      <div className="container">
        <div className="about-intro">
          <div className="about-img" style={{backgroundImage: "url(https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80)"}}></div>
          <div>
            <div className="eyebrow"><Icon.Users width="13" height="13"/> Who we are</div>
            <h2>Volunteers, neighbours, friends.</h2>
            <p>SMS is a registered charity led by a volunteer committee drawn from across Ipswich. We don't run the masjids — we connect them. Our work is to make sure every Muslim in Suffolk knows where to pray, who to call, and what's happening this week.</p>
            <p>We were formed in 2019 as a coordinating body. Today we maintain prayer schedules, run the joint janazah service, host quarterly committee meetings, and keep the community informed. We're funded entirely by community donations and gift aid — every penny stays in Suffolk.</p>
            <button className="btn btn-teal" style={{marginTop: 8}}>Our annual report 2024 <Icon.Download width="14" height="14"/></button>
          </div>
        </div>
      </div>
    </section>
    <section className="about-values">
      <div className="container">
        <div className="eyebrow"><Icon.Heart width="13" height="13"/> What guides us</div>
        <h2 className="section-title">Three principles.</h2>
        <div className="about-values-grid">
          <div className="about-value">
            <div className="about-value-num tabnum">01</div>
            <h3>Service before self</h3>
            <p>Every committee role is voluntary. We are here to serve the community — not to lead it from above.</p>
          </div>
          <div className="about-value">
            <div className="about-value-num tabnum">02</div>
            <h3>Open and accountable</h3>
            <p>Our accounts are published yearly. Committee meetings are open to members. Concerns addressed within seven days.</p>
          </div>
          <div className="about-value">
            <div className="about-value-num tabnum">03</div>
            <h3>Together with neighbours</h3>
            <p>We work with Suffolk's faith communities, schools and the council. A masjid is part of the wider town.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="committee-section">
      <div className="container">
        <div className="eyebrow"><Icon.Users width="13" height="13"/> The committee</div>
        <h2 className="section-title">2025–2026 committee.</h2>
        <div className="committee-grid">
          {COMMITTEE.map((c, i) => {
            const initials = c.name.split(" ").slice(-2).map(w => w[0]).join("").toUpperCase();
            return (
              <div key={i} className="committee-card">
                <div className="committee-img">{initials}</div>
                <div className="committee-body">
                  <h4 className="committee-name">{c.name}</h4>
                  <div className="committee-role">{c.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

const ContactPage = () => (
  <>
    <PageHeader
      crumb="Contact"
      title="Get in touch"
      sub="For general enquiries, contact SMS directly. For prayer space or imam enquiries, please contact the relevant masjid below."
    />
    <section>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-form-card">
            <h2>Send us a message</h2>
            <div className="contact-form-sub">We aim to respond within two working days.</div>
            <div className="field-row">
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
              <label>Email address</label>
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
                <option>Marriage (Nikah)</option>
              </select>
            </div>
            <div className="field">
              <label>Message</label>
              <textarea placeholder="How can we help?"></textarea>
            </div>
            <button className="btn btn-teal" style={{width: "100%", justifyContent: "center"}}>
              Send message <Icon.Arrow width="14" height="14"/>
            </button>
          </div>
          <div className="contact-info">
            <div className="contact-card" style={{background: "var(--teal-50)", borderColor: "var(--teal-100)"}}>
              <h3>Suffolk Muslim Society</h3>
              <div className="contact-card-area">Main office</div>
              <div className="contact-card-rows" style={{marginTop: 14}}>
                <div className="contact-card-row"><Icon.Phone width="15" height="15"/><span className="tabnum">01473 100 200</span></div>
                <div className="contact-card-row"><Icon.Mail width="15" height="15"/><span>info@suffolkmuslim.org</span></div>
                <div className="contact-card-row"><Icon.Clock width="15" height="15"/><span>Mon–Fri, 9am–5pm</span></div>
              </div>
            </div>
            {MASJIDS.map(m => (
              <div key={m.id} className="contact-card">
                <div className="contact-card-head">
                  <div>
                    <h3>{m.name}</h3>
                    <div className="contact-card-area">{m.area}</div>
                  </div>
                  <span className="contact-card-pill">View timetable</span>
                </div>
                <div className="contact-card-rows">
                  <div className="contact-card-row"><Icon.Pin width="15" height="15"/><span>{m.address}</span></div>
                  <div className="contact-card-row"><Icon.Phone width="15" height="15"/><span className="tabnum">{m.phone}</span></div>
                  <div className="contact-card-row"><Icon.Mail width="15" height="15"/><span>{m.email}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

Object.assign(window, { PrayerPage, EventsPage, JanazahPage, AboutPage, ContactPage });
