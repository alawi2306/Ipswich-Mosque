// Header, status bar, page header, footer

const StatusBar = () =>
<div className="statusbar">
    <div className="container statusbar-inner">
      <div className="sb-left">
        <span className="sb-pill"><span className="dot"></span> Live · Mixlr</span>
        <span className="sb-next">
          Next prayer <b>Asr</b> · begins in <span className="mono tabnum">2h 14m</span>
        </span>
      </div>
      <div className="sb-right">
        <span className="tabnum">Sat 25 May 2026 · 8 Dhū al-Qaʿdah 1447</span>
        <div className="sb-socials">
          <a href="#" aria-label="Facebook"><Icon.Facebook width="13" height="13" /></a>
          <a href="#" aria-label="Instagram"><Icon.Instagram width="13" height="13" /></a>
          <a href="#" aria-label="YouTube"><Icon.Youtube width="13" height="13" /></a>
          <a href="#" aria-label="Twitter"><Icon.Twitter width="13" height="13" /></a>
        </div>
        <a href="#">EN</a>
      </div>
    </div>
  </div>;


const SalahStrip = ({ activeMasjid, setActiveMasjid }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onClick = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const PRAYER_DISPLAY = [
  { key: "Fajr", label: "Fajr" },
  { key: "Zuhr", label: "Zuhr" },
  { key: "Asr", label: "ʻAsr" },
  { key: "Maghrib", label: "Maghrib" },
  { key: "Isha", label: "ʻIshā" }];

  const nextPrayer = "Asr";
  const passedSet = new Set(["Fajr", "Zuhr"]);
  const masjid = MASJIDS.find((m) => m.id === activeMasjid);
  const t = TODAY_TIMES[activeMasjid];
  const beginsMap = { Fajr: t.fajr[0], Zuhr: t.dhuhr[0], Asr: t.asr[0], Maghrib: t.maghrib[0], Isha: t.isha[0] };
  const jamMap = { Fajr: t.fajr[1], Zuhr: t.dhuhr[1], Asr: t.asr[1], Maghrib: t.maghrib[1], Isha: t.isha[1] };

  return (
    <div className="salah-strip">
      <div className="container salah-strip-inner" style={{ padding: "14px 28px", gap: "24px" }}>
        <div className="salah-strip-grid">
          <span></span>
          {PRAYER_DISPLAY.map((p) =>
          <div key={`name-${p.key}`} className={`salah-strip-pname ${p.key === nextPrayer ? "is-next" : ""}`}>{p.label}</div>
          )}

          <span className="salah-strip-label" style={{ fontWeight: "300" }}>Begins</span>
          {PRAYER_DISPLAY.map((p) => {
            const isNext = p.key === nextPrayer;
            const isPassed = passedSet.has(p.key);
            return (
              <div key={`b-${p.key}`}
              className={`salah-strip-cell tabnum ${isNext ? "next" : ""} ${isPassed ? "passed" : ""}`}>
                {beginsMap[p.key]}
              </div>);

          })}

          <span className="salah-strip-label" style={{ fontWeight: "400" }}>Jamāʿah</span>
          {PRAYER_DISPLAY.map((p) => {
            const isNext = p.key === nextPrayer;
            const isPassed = passedSet.has(p.key);
            return (
              <div key={`j-${p.key}`}
              className={`salah-strip-cell jamaah tabnum ${isNext ? "next" : ""} ${isPassed ? "passed" : ""}`}>
                {jamMap[p.key]}
              </div>);

          })}
        </div>

        <div className="salah-strip-right-block" style={{ alignItems: "flex-start", borderStyle: "solid", borderWidth: "0px 0px 0px 1px", padding: "0px 0px 0px 20px", margin: "0px", width: "225px", borderColor: "rgb(131, 140, 148)" }}>
          <div className={`masjid-picker ${open ? "open" : ""}`} ref={ref}>
            <button className="masjid-picker-trigger" onClick={() => setOpen(!open)} style={{ width: "200px" }}>
              <Icon.Pin width="13" height="13" style={{ color: "var(--gold-600)", flexShrink: 0 }} />
              {masjid.name}
              <svg className="masjid-picker-trigger-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div className="masjid-picker-menu">
              {MASJIDS.map((m) =>
              <button key={m.id}
              className={`masjid-picker-item ${activeMasjid === m.id ? "active" : ""}`}
              onClick={() => {setActiveMasjid(m.id);setOpen(false);}}>
                  <span>
                    {m.name}
                    <br />
                    <small>{m.area}</small>
                  </span>
                  {activeMasjid === m.id &&
                <span className="masjid-picker-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </span>
                }
                </button>
              )}
            </div>
          </div>
          <div className="salah-strip-meta">
            <span className="salah-strip-date" style={{ margin: "0px 0px 0px 1000px", padding: "0px 0px 0px 100px", borderWidth: "0px" }}>7 Dhū al-Hijjah 1447</span>
            <a className="salah-strip-link"
            onClick={(e) => {e.preventDefault();window.__setRoute("prayer");}}
            href="#">Full timetable→</a>
          </div>
        </div>
      </div>
    </div>);

};

const Header = ({ route, setRoute, activeMasjid, setActiveMasjid }) => {
  const [openMenu, setOpenMenu] = React.useState(null);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const mobileRef = React.useRef(null);
  React.useEffect(() => {
    const onClick = (e) => {if (mobileRef.current && !mobileRef.current.contains(e.target)) setOpenMobile(false);};
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const activeMasjidObj = MASJIDS.find((m) => m.id === activeMasjid);
  const aboutItems = [
  ["objectives", "Objectives of SMS", Icon.Heart],
  ["activities", "Regular Activities", Icon.Calendar],
  ["volunteer", "Be Part of the Project", Icon.Users],
  ["contact", "Contact Us", Icon.Mail]];

  const items = [
  ["home", "Home"],
  ["prayer", "Salah Times"],
  ["events", "Events"],
  ["sisters", "Sisters"],
  ["halal", "Halal Guide"],
  ["funeral", "Funeral Support"]];

  return (
    <>
      <StatusBar />
      <header className="header">
        <div className="container header-inner">
          <div className="brand" onClick={() => setRoute("home")}>
            <img src="assets/logo-tight.png" alt="Suffolk Muslim Society" className="brand-logo" />
          </div>

          <nav className="nav">
            {items.map(([id, label]) =>
            <a key={id}
            className={`nav-item ${route === id ? "active" : ""}`}
            onClick={(e) => {e.preventDefault();setRoute(id);setOpenMenu(null);}}
            href="#">{label}</a>
            )}
            <div className={`nav-item-wrap ${openMenu === "about" ? "open" : ""}`}>
              <a className={`nav-item ${aboutItems.some(([r]) => r === route) ? "active" : ""}`}
              onClick={(e) => {e.preventDefault();setOpenMenu(openMenu === "about" ? null : "about");}}
              href="#">
                About
                <svg className="nav-item-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </a>
              <div className="nav-dropdown">
                {aboutItems.map(([id, label, I]) =>
                <button key={id}
                className="nav-dropdown-item"
                onClick={() => {setRoute(id);setOpenMenu(null);}}>
                    <I width="16" height="16" />{label}
                  </button>
                )}
              </div>
            </div>
          </nav>

          <div className="nav-end">
            <button className="btn btn-outline btn-sm"><Icon.Live width="14" height="14" /> Listen Live</button>
            <button className="btn btn-primary btn-sm"><Icon.HandHeart width="14" height="14" /> Donate</button>
            <button
              className={`hamburger-btn ${mobileNavOpen ? "open" : ""}`}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav ${mobileNavOpen ? "open" : ""}`}>
        <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>×</button>
        {[...items, ["objectives","Objectives"], ["activities","Activities"], ["volunteer","Volunteer"], ["contact","Contact"]].map(([id, label]) =>
          <button key={id}
            className={`mobile-nav-item ${route === id ? "active" : ""}`}
            onClick={() => { setRoute(id); setMobileNavOpen(false); }}>
            <Icon.ChevronRight width="16" height="16" />
            {label}
          </button>
        )}
        <div className="mobile-nav-divider" />
        <div className="mobile-nav-footer">
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
            <Icon.HandHeart width="14" height="14" /> Donate
          </button>
          <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
            <Icon.Live width="14" height="14" /> Listen Live
          </button>
        </div>
      </div>
    </>);

};

const PageHeader = ({ crumb, title, sub }) =>
<section className="page-header">
    <div className="page-header-pattern"><StarPattern id="ph-pat" color="#1B6B8A" scale={56} /></div>
    <div className="container page-header-inner">
      <div className="crumb">
        <a href="#" onClick={(e) => {e.preventDefault();window.__setRoute("home");}}>Home</a>
        <Icon.ChevronRight width="12" height="12" />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{crumb}</span>
      </div>
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
  </section>;


const FooterNewsletter = () =>
<div className="footer-newsletter">
    <div className="footer-newsletter-pattern"><StarPattern id="fn-pat" color="#B8962E" scale={70} /></div>
    <div className="container footer-newsletter-inner">
      <div>
        <h3>Stay in the loop.</h3>
        <p>A short email  regarding weekly updates every 2 weeks to our community. Stay in touch</p>
        <a href="#" className="whatsapp-strip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.4 24l1.7-6.2A11.9 11.9 0 0 1 .5 11.9C.5 5.3 5.8 0 12.4 0a11.9 11.9 0 0 1 11.9 11.9c0 6.6-5.3 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.4L.4 24zm6.6-3.8l.4.2a9.9 9.9 0 0 0 5 1.4 9.9 9.9 0 0 0 9.9-9.9c0-5.5-4.4-9.9-9.9-9.9a9.9 9.9 0 0 0-9.9 9.9c0 2 .6 3.8 1.6 5.4l.3.4-1 3.7 3.6-1.2zm10.6-6.9c-.1-.2-.4-.3-.9-.5-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.2.4-1 1.3-1.3 1.5-.2.2-.5.3-.9.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3 0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.7 4.2 1.7.8 2.4.8 3.2.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4l-.5-.3z" /></svg>
          Join our WhatsApp channel
        </a>
      </div>
      <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Email address" />
        <button type="submit" className="btn btn-primary">Subscribe <Icon.Arrow width="14" height="14" /></button>
      </form>
    </div>
  </div>;


const Footer = ({ setRoute }) =>
<>
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo size={32} />
            <div className="footer-brand-name">Suffolk Muslim Society</div>
            <p className="footer-blurb">Run by volunteers. Working alongside the four Ipswich masaajid since 2019. Email or message us — we read everything.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><Icon.Facebook width="16" height="16" /></a>
              <a href="#" aria-label="Instagram"><Icon.Instagram width="16" height="16" /></a>
              <a href="#" aria-label="YouTube"><Icon.Youtube width="16" height="16" /></a>
              <a href="#" aria-label="Twitter"><Icon.Twitter width="16" height="16" /></a>
            </div>
          </div>
          <div>
            <h4>The Society</h4>
            <div className="footer-links">
              <a onClick={() => setRoute("objectives")} href="#">Objectives of SMS</a>
              <a onClick={() => setRoute("volunteer")} href="#">Be part of the project</a>
              <a onClick={() => setRoute("activities")} href="#">Regular activities</a>
              <a href="#">Annual reports</a>
              <a href="#">Vacancies</a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <div className="footer-links">
              <a onClick={() => setRoute("prayer")} href="#">Salah times</a>
              <a onClick={() => setRoute("events")} href="#">Events</a>
              <a onClick={() => setRoute("sisters")} href="#">Sisters section</a>
              <a onClick={() => setRoute("halal")} href="#">Halal guide</a>
              <a onClick={() => setRoute("funeral")} href="#">Funeral support</a>
            </div>
          </div>
          <div>
            <h4>Get in touch</h4>
            <div className="footer-links">
              <a onClick={() => setRoute("contact")} href="#">Contact us</a>
              <a href="tel:07700900123" style={{ color: "var(--gold-500)", fontWeight: 600 }}>Funeral · 07700 900 123</a>
              <a href="mailto:info@suffolkmuslim.org">info@suffolkmuslim.org</a>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12.5 }}>Reg. Charity 1198XXX</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Suffolk Muslim Society. All rights reserved.</div>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="#">Privacy policy</a>
            <a href="#">Cookies</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  </>;


Object.assign(window, { Header, Footer, PageHeader });