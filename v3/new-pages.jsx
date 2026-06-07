// SMS — new pages: Sisters, Halal Guide, Activities, Objectives, Volunteer
// Also: rebuilt Funeral Support (replaces Janazah)

// ---------- SISTERS ----------
const SistersPage = () => (
  <>
    <PageHeader
      crumb="Sisters Section"
      title="Sisters Section"
      sub="A dedicated space for sisters in Suffolk — weekly circles, social events, support, and a separate point of contact."
    />
    <section className="sisters-page">
      <div className="container">
        <div className="sisters-intro">
          <div>
            <div className="eyebrow"><Icon.Heart width="13" height="13"/> Welcome</div>
            <h2>A community within our community.</h2>
            <p>The sisters' section of SMS runs alongside the main programme but is led by sisters, for sisters. From weekly Qur'an circles to mother-and-baby groups and informal walks, our aim is for every sister in Suffolk to have a place she belongs.</p>
            <p>If you're new to the area, recently reverted, or just looking to connect — please get in touch. Our sisters' coordinator will personally make sure you're welcomed.</p>
            <div style={{display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap"}}>
              <button className="btn btn-teal">Join WhatsApp group <Icon.Arrow width="14" height="14"/></button>
              <button className="btn btn-outline">Read more <Icon.ChevronRight width="14" height="14"/></button>
            </div>
          </div>
          <div className="sisters-intro-img" style={{backgroundImage: "url(https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80)"}}></div>
        </div>
      </div>
    </section>

    <section className="sisters-weekly">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Calendar width="13" height="13"/> Weekly programme</div>
            <h2 className="section-title">What's on each week.</h2>
            <div className="section-sub">All sessions for sisters only. Children welcome unless otherwise noted.</div>
          </div>
        </div>
        <div className="weekly-grid">
          {SISTERS_WEEKLY.map((w, i) => (
            <div key={i} className="weekly-card">
              <div className="weekly-card-day">{w.day}</div>
              <h3>{w.name}</h3>
              <div className="weekly-card-time"><Icon.Clock width="12" height="12"/>{w.time}</div>
              <p className="weekly-card-desc">{w.desc}</p>
              <div className="weekly-card-foot">
                <span><Icon.Pin width="11" height="11" style={{verticalAlign: "middle", marginRight: 4}}/>{w.where}</span>
                <a href="#" style={{color: "var(--teal-700)", fontWeight: 600}}>Register</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="gallery-section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Users width="13" height="13"/> Previous sisters events</div>
            <h2 className="section-title">A look back.</h2>
            <div className="section-sub">From iftars to retreats, welfare drives to weekly halaqas.</div>
          </div>
          <a href="#" className="section-link">Full gallery <Icon.ChevronRight width="14" height="14"/></a>
        </div>
        <div className="gallery-grid">
          {SISTERS_GALLERY.map((g, i) => (
            <div key={i}
                 className={`gallery-tile ${i === 0 ? "span-2" : ""}`}
                 style={{backgroundImage: `url(${g.src})`}}>
              <div className="gallery-tile-caption">
                <b>{g.caption}</b>
                <span>{g.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="sisters-contact">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Mail width="13" height="13"/> Sisters contact</div>
            <h2 className="section-title">Get in touch directly.</h2>
            <div className="section-sub">This form goes only to the sisters' coordinator — handled separately from general enquiries.</div>
          </div>
        </div>
        <div className="sisters-contact-grid">
          <div className="contact-form-card">
            <h2>Send a message</h2>
            <div className="contact-form-sub">Replied to by Sr. Aisha within 2 working days, in confidence.</div>
            <div className="field"><label>Your name</label><input type="text" placeholder="First name"/></div>
            <div className="field"><label>Email</label><input type="email" placeholder="you@example.com"/></div>
            <div className="field">
              <label>Topic</label>
              <select>
                <option>General enquiry</option>
                <option>Join the WhatsApp group</option>
                <option>Welfare / support request</option>
                <option>Volunteer with sisters' team</option>
                <option>New revert support</option>
                <option>Event suggestion</option>
              </select>
            </div>
            <div className="field"><label>Message</label><textarea placeholder="How can we help?"></textarea></div>
            <button className="btn btn-teal" style={{width: "100%", justifyContent: "center"}}>Send to sisters' team <Icon.Arrow width="14" height="14"/></button>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: 14}}>
            <div className="contact-card" style={{background: "var(--teal-50)", borderColor: "var(--teal-100)"}}>
              <h3>Sr. Aisha Begum</h3>
              <div className="contact-card-area">Sisters' Coordinator</div>
              <div className="contact-card-rows" style={{marginTop: 14}}>
                <div className="contact-card-row"><Icon.Phone width="15" height="15"/><span className="tabnum">07700 900 200</span></div>
                <div className="contact-card-row"><Icon.Mail width="15" height="15"/><span>sisters@suffolkmuslim.org</span></div>
                <div className="contact-card-row"><Icon.Clock width="15" height="15"/><span>Replies Mon–Fri, evenings</span></div>
              </div>
            </div>
            <div className="contact-card">
              <h3>WhatsApp group</h3>
              <div className="contact-card-area">600+ sisters · invite only</div>
              <p style={{fontSize: 13.5, color: "var(--ink-2)", margin: "12px 0", lineHeight: 1.55}}>The main hub for weekly updates, prayer reminders, event invites and informal chat. Sisters only — admins verify each request.</p>
              <a href="#" className="whatsapp-strip" style={{margin: 0}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.4 24l1.7-6.2A11.9 11.9 0 0 1 .5 11.9C.5 5.3 5.8 0 12.4 0a11.9 11.9 0 0 1 11.9 11.9c0 6.6-5.3 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.4L.4 24z"/></svg>
                Request to join
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

// ---------- HALAL GUIDE ----------
const HalalPage = () => {
  const [cat, setCat] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const categories = ["All", "Restaurants", "Takeaways", "Butchers", "Grocery shops", "Dessert shops"];
  let list = HALAL_PLACES;
  if (cat !== "All") list = list.filter(p => p.category === cat);
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <PageHeader
        crumb="Halal Guide"
        title="Halal shops & restaurants in Ipswich"
        sub="A community-maintained directory. HMC status, prayer facilities and family-friendliness noted where applicable. Submit a recommendation if we're missing somewhere."
      />
      <section className="halal-page">
        <div className="container">
          <div className="halal-toolbar">
            <div className="halal-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
              <input placeholder="Search by name…" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div style={{display: "flex", gap: 8}}>
              <button className="btn btn-outline btn-sm"><Icon.Pin width="13" height="13"/> Show on map</button>
              <button className="btn btn-primary btn-sm"><Icon.Arrow width="13" height="13"/> Submit a place</button>
            </div>
          </div>
          <div className="halal-grid">
            <aside className="halal-categories">
              <h4 style={{fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, margin: "6px 12px 12px"}}>Categories</h4>
              {categories.map(c => {
                const count = c === "All" ? HALAL_PLACES.length : HALAL_PLACES.filter(p => p.category === c).length;
                return (
                  <button key={c}
                          className={`halal-cat-item ${cat === c ? "active" : ""}`}
                          onClick={() => setCat(c)}>
                    {c} <span className="halal-cat-count">{count}</span>
                  </button>
                );
              })}
              <h4 style={{fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, margin: "16px 12px 12px", paddingTop: 14, borderTop: "1px solid var(--line-2)"}}>Filters</h4>
              <label className="halal-cat-item" style={{cursor: "pointer"}}><span><input type="checkbox" style={{marginRight: 8}}/>HMC certified</span></label>
              <label className="halal-cat-item" style={{cursor: "pointer"}}><span><input type="checkbox" style={{marginRight: 8}}/>Prayer facilities</span></label>
              <label className="halal-cat-item" style={{cursor: "pointer"}}><span><input type="checkbox" style={{marginRight: 8}}/>Family friendly</span></label>
            </aside>
            <div className="halal-list">
              {list.map(p => (
                <div key={p.id} className="halal-card">
                  <div className="halal-card-img" style={{backgroundImage: `url(${p.img})`}}></div>
                  <div className="halal-card-body">
                    <div className="halal-card-head">
                      <div style={{minWidth: 0}}>
                        <h3 className="halal-card-name">{p.name}</h3>
                        <div className="halal-card-cat">{p.category}</div>
                      </div>
                      <span className="halal-card-rating">★ {p.rating}</span>
                    </div>
                    <div className="halal-card-addr"><Icon.Pin width="11" height="11"/>{p.addr}</div>
                    <div className="halal-card-badges">
                      {p.hmc && <span className="halal-badge hmc">✓ HMC</span>}
                      {p.prayer && <span className="halal-badge prayer">⛧ Prayer space</span>}
                      {p.family && <span className="halal-badge family">♡ Family</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ---------- ACTIVITIES ----------
const ActivitiesPage = () => {
  const [tab, setTab] = React.useState("All");
  const tabs = ["All", "Education", "Sisters", "Youth", "Children", "Community"];
  const list = tab === "All" ? ACTIVITIES : ACTIVITIES.filter(a => a.category === tab);
  return (
    <>
      <PageHeader
        crumb="Regular Activities"
        title="Regular activities in Ipswich"
        sub="Recurring classes, circles and community programmes. Most are drop-in — register only if explicitly stated."
      />
      <section className="activities-page">
        <div className="container">
          <div className="activities-tabs">
            {tabs.map(t => (
              <button key={t}
                      className={`activities-tab ${tab === t ? "active" : ""}`}
                      onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <div className="activities-grid">
            {list.map((a, i) => {
              const I = Icon[a.icon] || Icon.Book;
              return (
                <div key={i} className="activity-card">
                  <div className="activity-card-icon"><I width="20" height="20"/></div>
                  <div className="activity-card-tag">{a.tag}</div>
                  <h3 className="activity-card-name">{a.name}</h3>
                  <div className="activity-card-when"><Icon.Clock width="11" height="11"/>{a.when}</div>
                  <p className="activity-card-desc">{a.desc}</p>
                  <div className="activity-card-meta">
                    <div><Icon.Pin width="13" height="13"/>{a.masjid}</div>
                    <div><Icon.Mail width="13" height="13"/>{a.contact}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

// ---------- OBJECTIVES (replaces About) ----------
const ObjectivesPage = () => (
  <>
    <section className="obj-hero">
      <div className="obj-hero-pattern"><StarPattern id="obj-hero-pat" color="#B8962E" scale={60}/></div>
      <div className="container">
        <div className="crumb" style={{color: "rgba(255,255,255,0.55)"}}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.__setRoute("home"); }} style={{color: "rgba(255,255,255,0.7)"}}>Home</a>
          <Icon.ChevronRight width="12" height="12"/>
          <span style={{color: "rgba(255,255,255,0.85)", fontWeight: 500}}>Objectives of SMS</span>
        </div>
        <div className="obj-hero-inner">
          <h1>Strengthening Muslims in Suffolk — together.</h1>
          <p>Suffolk Muslim Society exists to serve, connect and support Muslims across our county. Below are the principles that guide us, why this work matters now, and what we're building for the next generation.</p>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        <div className="section-head" style={{marginBottom: 0}}>
          <div>
            <div className="eyebrow"><Icon.Heart width="13" height="13"/> Our Vision</div>
            <h2 className="section-title">Five pillars of our work.</h2>
          </div>
        </div>
        <div className="vision-grid">
          {[
            { num: "01", title: "Strengthening Muslims in Suffolk", desc: "A clear, connected community where every Muslim has a place to pray, learn and belong." },
            { num: "02", title: "Supporting Islamic identity", desc: "Helping young people, new reverts and families anchor their identity in faith." },
            { num: "03", title: "Building unity", desc: "Bridging the four masaajid and the wider diaspora — across languages, generations and backgrounds." },
            { num: "04", title: "Educating the community", desc: "Quality Islamic education for children and adults, rooted in tradition." },
            { num: "05", title: "Supporting youth", desc: "Mentorship, halaqas and safe spaces for ages 16–25 — the future of our community." },
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
            <div className="eyebrow"><Icon.Megaphone width="13" height="13"/> Why this work matters</div>
            <h2 className="section-title">Now, more than ever.</h2>
          </div>
        </div>
        <div className="why-grid">
          {[
            { icon: Icon.Mosque, title: "The importance of dawah", body: "Across Suffolk there are Muslims unconnected to any masjid. Our role is to reach them, welcome them, and walk alongside them — without pressure or judgement." },
            { icon: Icon.Users, title: "Community cohesion", body: "Our community draws from Bangladesh, Pakistan, the Middle East, East Africa, and many converts. Cohesion isn't automatic — it takes work, and it's worth it." },
            { icon: Icon.Heart, title: "Supporting future generations", body: "The children growing up in our masaajid today will inherit them. We owe them institutions worth inheriting — well-run, transparent, and welcoming." },
            { icon: Icon.Book, title: "Preserving Islamic identity locally", body: "Faith lived in community is faith preserved. Our work is to make Islam visible, accessible and dignified in our county." },
          ].map((c, i) => {
            const I = c.icon;
            return (
              <div key={i} className="why-card">
                <div className="why-card-icon"><I width="22" height="22"/></div>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section className="goals-section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Arrow width="13" height="13"/> Long-term goals</div>
            <h2 className="section-title">What we're building.</h2>
          </div>
        </div>
        <div className="goals-grid">
          {[
            { num: "01", title: "Islamic education for every age", body: "A continuous education pathway — from weekend madrasah through to adult tafsir circles — accessible to every Muslim in Suffolk." },
            { num: "02", title: "Youth development", body: "Mentorship, sport, halaqas, work experience and pastoral support for the 16–25 age group." },
            { num: "03", title: "Strong Muslim infrastructure", body: "Sustainable masaajid, a permanent funeral facility, dedicated sisters' space, and a community centre fit for the decades ahead." },
            { num: "04", title: "Community support systems", body: "Welfare for families in hardship, bereavement support, marriage services, new revert programmes — a safety net woven by the community itself." },
          ].map((g, i) => (
            <div key={i} className="goal-card">
              <div className="pattern-bg"><StarPattern id={`goal-pat-${i}`} color="#B8962E" scale={60}/></div>
              <div className="goal-card-num tabnum">{g.num}</div>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

// ---------- VOLUNTEER (Be Part of the Project) ----------
const VolunteerPage = () => (
  <>
    <PageHeader
      crumb="Be part of the project"
      title="Be part of the project."
      sub="Your time, skills or ideas — all welcome. The community is built by its members."
    />
    <section className="volunteer-page">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Users width="13" height="13"/> Volunteer opportunities</div>
            <h2 className="section-title">Where you can help.</h2>
            <div className="section-sub">Choose one or more — even a couple of hours a month makes a difference.</div>
          </div>
          <a href="#" className="section-link">Volunteer FAQ <Icon.ChevronRight width="14" height="14"/></a>
        </div>
        <div className="vol-roles-grid">
          {VOLUNTEER_ROLES.map((r, i) => {
            const I = Icon[r.icon] || Icon.Heart;
            return (
              <div key={i} className="vol-role">
                <div className="vol-role-icon"><I width="20" height="20"/></div>
                <h3 className="vol-role-name">{r.name}</h3>
                <p className="vol-role-desc">{r.desc}</p>
                <span className="vol-role-cta">Express interest <Icon.ChevronRight width="12" height="12"/></span>
              </div>
            );
          })}
        </div>

        <div className="vol-actions-grid">
          <div className="vol-action-card">
            <div className="vol-action-icon"><Icon.Book width="26" height="26"/></div>
            <div>
              <h3>Submit Islamic articles</h3>
              <p>We welcome short Islamic articles from members of the community — reminders, reflections, summaries of khutbahs, or research pieces. All submissions are reviewed by the committee before publication on the website and newsletter.</p>
              <button className="btn btn-teal">Submit an article <Icon.Arrow width="14" height="14"/></button>
            </div>
          </div>
          <div className="vol-action-card">
            <div className="vol-action-icon"><Icon.Megaphone width="26" height="26"/></div>
            <div>
              <h3>Submit an idea</h3>
              <p>Have an idea for an event, programme or service we should be offering? We'd love to hear it.</p>
              <div className="vol-action-quote">
                "Even better if you can help action the idea. Tell us what you'd need, and we'll see what we can do together."
              </div>
              <button className="btn btn-teal">Share your idea <Icon.Arrow width="14" height="14"/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

// ---------- FUNERAL (restructured per spec) ----------
const FuneralPage = () => {
  const [tab, setTab] = React.useState("immediate");
  const current = FUNERAL_TABS.find(t => t.id === tab);
  const tabIcons = {
    immediate: Icon.Phone,
    process: Icon.Heart,
    resources: Icon.Pin,
    guidance: Icon.Book,
  };
  return (
    <>
      <PageHeader
        crumb="Funeral Support"
        title="When a loved one passes away in Ipswich"
        sub="Step-by-step guidance for arranging an Islamic burial. Our coordinator is available 24 hours — call any time."
      />
      <section className="jnz-page">
        <div className="container">
          <div className="jnz-callout">
            <div className="pattern-bg"><StarPattern id="fnr-cal-pat" color="#B8962E" scale={50}/></div>
            <div className="jnz-callout-text">
              <h2>Need to call now?</h2>
              <p>Br. Mahmood Iqbal — SMS Funeral Coordinator. Available day or night, every day of the year. No cost to the bereaved family.</p>
            </div>
            <div className="jnz-callout-action">
              <div className="jnz-callout-phone tabnum">07700 900 123</div>
              <button className="btn btn-primary"><Icon.Phone width="14" height="14"/> Call now</button>
            </div>
          </div>

          <div className="funeral-tabs">
            {FUNERAL_TABS.map((t, i) => {
              const I = tabIcons[t.id];
              return (
                <button key={t.id}
                        className={`funeral-tab ${tab === t.id ? "active" : ""}`}
                        onClick={() => setTab(t.id)}>
                  <span className="funeral-tab-num">{i+1}</span>
                  <I width="14" height="14"/>
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="jnz-grid">
            <div className="jnz-steps">
              {current.sections.map((s, i) => (
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
                <h4>Downloads</h4>
                <a href="#" className="section-link" style={{display: "flex", padding: "8px 0", borderBottom: "1px solid var(--line-2)"}}>
                  <Icon.Download width="14" height="14" style={{marginRight: 8}}/>Funeral process (PDF)
                </a>
                <a href="#" className="section-link" style={{display: "flex", padding: "8px 0", borderBottom: "1px solid var(--line-2)"}}>
                  <Icon.Download width="14" height="14" style={{marginRight: 8}}/>Mirath (inheritance) guide
                </a>
                <a href="#" className="section-link" style={{display: "flex", padding: "8px 0"}}>
                  <Icon.Download width="14" height="14" style={{marginRight: 8}}/>Registry checklist
                </a>
              </div>
              <div className="jnz-aside" style={{background: "var(--teal-50)", borderColor: "var(--teal-100)"}}>
                <h4 style={{color: "var(--teal-700)"}}>Bereavement support</h4>
                <p style={{fontSize: 13.5, color: "var(--ink-2)", margin: "0 0 12px", lineHeight: 1.55}}>
                  Follow-up visits, meal rotas, and emotional support — no time limit.
                </p>
                <button className="btn btn-teal btn-sm" style={{width:"100%", justifyContent:"center"}}>Request support</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Object.assign(window, { SistersPage, HalalPage, ActivitiesPage, ObjectivesPage, VolunteerPage, FuneralPage });
