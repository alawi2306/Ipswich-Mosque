// SMS v2 — Header, status bar, page header, footer

const StatusBar = () => (
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
        <a href="#">EN</a>
      </div>
    </div>
  </div>
);

const Header = ({ route, setRoute }) => {
  const items = [
    ["home", "Home"],
    ["prayer", "Prayer Times"],
    ["events", "Events"],
    ["janazah", "Janazah"],
    ["about", "About"],
    ["contact", "Contact"],
  ];
  return (
    <>
      <StatusBar />
      <header className="header">
        <div className="container header-inner">
          <div className="brand" onClick={() => setRoute("home")}>
            <div className="brand-mark"><Logo size={26}/></div>
            <div className="brand-text">
              <div className="brand-name">Suffolk Muslim Society</div>
              <div className="brand-sub">Serving Ipswich & Suffolk</div>
            </div>
          </div>
          <nav className="nav">
            {items.map(([id, label]) => (
              <a key={id}
                 className={`nav-item ${route === id ? "active" : ""}`}
                 onClick={(e) => { e.preventDefault(); setRoute(id); }}
                 href="#">{label}</a>
            ))}
          </nav>
          <div className="nav-end">
            <button className="btn btn-outline btn-sm"><Icon.Live width="14" height="14"/> Listen Live</button>
            <button className="btn btn-primary btn-sm"><Icon.HandHeart width="14" height="14"/> Donate</button>
          </div>
        </div>
      </header>
    </>
  );
};

const PageHeader = ({ crumb, title, sub }) => (
  <section className="page-header">
    <div className="page-header-pattern"><StarPattern id="ph-pat" color="#1B6B8A" scale={56}/></div>
    <div className="container page-header-inner">
      <div className="crumb">
        <a href="#">Home</a>
        <Icon.ChevronRight width="12" height="12"/>
        <span style={{color: "var(--ink-2)", fontWeight: 500}}>{crumb}</span>
      </div>
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
  </section>
);

const Footer = ({ setRoute }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <Logo size={32}/>
          <div className="footer-brand-name">Suffolk Muslim Society</div>
          <p className="footer-blurb">A one-stop community platform for Muslims in Suffolk — bringing four masjids and the wider community together since 2019.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><Icon.Facebook width="16" height="16"/></a>
            <a href="#" aria-label="Instagram"><Icon.Instagram width="16" height="16"/></a>
            <a href="#" aria-label="YouTube"><Icon.Youtube width="16" height="16"/></a>
            <a href="#" aria-label="Twitter"><Icon.Twitter width="16" height="16"/></a>
          </div>
        </div>
        <div>
          <h4>The Society</h4>
          <div className="footer-links">
            <a onClick={() => setRoute("about")} href="#">About SMS</a>
            <a href="#">Committee & trustees</a>
            <a href="#">Annual reports</a>
            <a href="#">Volunteer</a>
            <a href="#">Vacancies</a>
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <div className="footer-links">
            <a onClick={() => setRoute("prayer")} href="#">Prayer times</a>
            <a onClick={() => setRoute("events")} href="#">Events & classes</a>
            <a onClick={() => setRoute("janazah")} href="#">Janazah</a>
            <a href="#">Marriage (Nikah)</a>
            <a href="#">Welfare & food bank</a>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div className="footer-links">
            <a onClick={() => setRoute("contact")} href="#">Get in touch</a>
            <a href="tel:07700900123" style={{color:"var(--gold-500)", fontWeight: 600}}>Janazah · 07700 900 123</a>
            <a href="mailto:info@suffolkmuslim.org">info@suffolkmuslim.org</a>
            <span style={{color: "rgba(255,255,255,0.5)", fontSize: 12.5}}>Registered Charity 1198XXX</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Suffolk Muslim Society. All rights reserved.</div>
        <div style={{display:"flex", gap: 18}}>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Header, Footer, PageHeader });
