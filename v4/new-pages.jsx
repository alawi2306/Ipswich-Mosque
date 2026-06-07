// SMS — new pages: Sisters, Halal Guide, Activities, Objectives, Volunteer
// Also: rebuilt Funeral Support (replaces Janazah)

// ---------- SISTERS ----------
const SistersPage = () => (
  <>
    <PageHeader
      crumb="Sisters Section"
      title="Sisters Section"
      sub="Run by sisters, for sisters. Weekly circles, social events, welfare support, and a direct line to Sr. Aisha — handled separately from general enquiries."
    />
    <section className="sisters-page">
      <div className="container">
        <div className="sisters-intro">
          <div>
            <div className="eyebrow"><Icon.Heart width="13" height="13"/> Salaam, sisters</div>
            <h2>This space is for you.</h2>
            <p>The sisters' section runs alongside the main programme but is organised by sisters, for sisters. Weekly Qur'an circles, mother-and-baby mornings, walking group, and the occasional brunch.</p>
            <p>New to Ipswich, recently reverted, or just want to meet other sisters? Email Sr. Aisha and she'll add you to the WhatsApp group. No pressure, no awkward introductions — just turn up to whichever session looks good.</p>
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
            <div className="section-sub">All sessions are sisters only. Babies and toddlers welcome unless otherwise noted — there's a quiet corner at the back of each space.</div>
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
            <div className="eyebrow"><Icon.Users width="13" height="13"/> A look back</div>
            <h2 className="section-title">Some of our recent gatherings.</h2>
            <div className="section-sub">Photos shared with permission. If you'd rather not appear, just let us know and we'll take them down.</div>
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
            <h2 className="section-title">Or just send a message.</h2>
            <div className="section-sub">Goes straight to Sr. Aisha and stays between you and the sisters' team.</div>
          </div>
        </div>
        <div className="sisters-contact-grid">
          <div className="contact-form-card">
            <h2>Send a message</h2>
            <div className="contact-form-sub">Sr. Aisha usually replies within a day or two. Anything you write here stays with the sisters' team.</div>
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
        title="Halal places around Ipswich"
        sub="Kept up to date by the community. HMC status, prayer space and family-friendliness noted where we know. If we've missed somewhere or got something wrong, please tell us."
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
        title="Weekly activities"
        sub="What runs every week, term-time or otherwise. Most are drop-in — if something needs booking, it'll say so on the card."
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
          <h1>What Suffolk Muslim Society is here for.</h1>
          <p>We're a small registered charity, run by volunteers, working alongside the four masaajid in Ipswich. The pages below set out what we're trying to do, why it matters, and where we're heading. It's not glossy and it's not finished — this is a living document.</p>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        <div className="section-head" style={{marginBottom: 0}}>
          <div>
            <div className="eyebrow"><Icon.Heart width="13" height="13"/> What we focus on</div>
            <h2 className="section-title">Five things we keep coming back to.</h2>
          </div>
        </div>
        <div className="vision-grid">
          {[
            { num: "01", title: "A place to pray, learn and belong", desc: "Every Muslim in Suffolk knowing where to go for salah, who to ask, and where they fit." },
            { num: "02", title: "Holding onto our faith", desc: "Practical support for young people, reverts, and families trying to keep Islam at the centre of life here." },
            { num: "03", title: "Working across the four masaajid", desc: "We don't replace any masjid — we sit between them, sharing information, splitting work, agreeing dates." },
            { num: "04", title: "Education that's actually good", desc: "Madrasah, tafsir, Arabic, hadith circles — taught by qualified people, not corner-cut." },
            { num: "05", title: "The 16–25s", desc: "Mentorship, sport, halaqas and informal spaces. The committee will all be retired one day; these are the people taking over." },
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
            <div className="eyebrow"><Icon.Megaphone width="13" height="13"/> Why bother</div>
            <h2 className="section-title">Why this is worth doing.</h2>
          </div>
        </div>
        <div className="why-grid">
          {[
            { icon: Icon.Mosque, title: "Quietly being there", body: "There are Muslims in Suffolk who haven't set foot in a masjid in years. No judgement. The door is open whenever — for Eid, for janazah, for the school holidays, or just to drop in." },
            { icon: Icon.Users, title: "Getting on with each other", body: "Our community is Bangladeshi, Pakistani, Arab, Somali, Turkish, white British, and more. Getting on takes intention. Most of what we do is just creating reasons to be in the same room." },
            { icon: Icon.Heart, title: "What we hand to the kids", body: "The children at Nawra madrasah will run our masaajid in twenty years. We want them to inherit something worth keeping — proper accounts, sensible governance, no hangers-on." },
            { icon: Icon.Book, title: "Being visible in our town", body: "We work with the council, schools, and other faith communities. Most people in Ipswich don't know much about Islam — that's on us to fix, gently." },
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
            <div className="eyebrow"><Icon.Arrow width="13" height="13"/> Longer-term</div>
            <h2 className="section-title">A few things we're working towards.</h2>
          </div>
        </div>
        <div className="goals-grid">
          {[
            { num: "01", title: "Learning that doesn't stop at 14", body: "A clear path from weekend madrasah through Arabic, tafsir, hadith — all the way to adult circles. Nobody graduating into a vacuum." },
            { num: "02", title: "Real investment in youth", body: "Mentors who actually answer their phones. Sports, halaqas, work experience, pastoral support. Building the next layer of the community." },
            { num: "03", title: "A permanent funeral facility", body: "At the moment we use a partner mortuary out of town. A dedicated facility closer to home would change a hard week for many families." },
            { num: "04", title: "A proper safety net", body: "Quiet welfare help for families having a tough time, marriage services, support for reverts, bereavement check-ins. Woven by the community itself." },
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
      title="Help out, however you can."
      sub="Most of what SMS does runs on volunteers. A few hours a month genuinely matters."
    />
    <section className="volunteer-page">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><Icon.Users width="13" height="13"/> Roles</div>
            <h2 className="section-title">Where we always need a hand.</h2>
            <div className="section-sub">Pick one (or more). No commitment beyond what you can give. Br. Hasan will get back to you within a few days.</div>
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
              <h3>Write something</h3>
              <p>If you've benefited from a khutbah, a book, or a circle you've been to — write it up. A short reflection, a hadith you keep coming back to, a summary of something useful. We'll publish it on the site and the newsletter (after a light edit and a check). Pseudonym fine.</p>
              <button className="btn btn-teal">Submit an article <Icon.Arrow width="14" height="14"/></button>
            </div>
          </div>
          <div className="vol-action-card">
            <div className="vol-action-icon"><Icon.Megaphone width="26" height="26"/></div>
            <div>
              <h3>Suggest something</h3>
              <p>Spotted a gap? Got an idea for something we should be doing? Send it in.</p>
              <div className="vol-action-quote">
                Honestly the best ideas come from people who'd be willing to help run them. Tell us what you'd need and we'll figure it out together.
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
        title="When someone you love passes away"
        sub="What to do, in plain English. The 24-hour line is the first number to call — Br. Mahmood will walk you through everything. Inna lillahi wa inna ilayhi raji'oon."
      />
      <section className="jnz-page">
        <div className="container">
          <div className="jnz-callout">
            <div className="pattern-bg"><StarPattern id="fnr-cal-pat" color="#B8962E" scale={50}/></div>
            <div className="jnz-callout-text">
              <h2>Need to call right now?</h2>
              <p>Br. Mahmood Iqbal — funeral coordinator. He's been doing this for fifteen years. Available any time, day or night. No cost to the family.</p>
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
