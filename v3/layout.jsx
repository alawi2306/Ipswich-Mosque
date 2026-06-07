// Header, status bar, page header, footer

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
  const [openMenu, setOpenMenu] = React.useState(null);
  const aboutItems = [
    ["objectives", "Objectives of SMS", Icon.Heart],
    ["activities", "Regular Activities", Icon.Calendar],
    ["volunteer", "Be Part of the Project", Icon.Users],
    ["contact", "Contact Us", Icon.Mail],
  ];
  const items = [
    ["home", "Home"],
    ["prayer", "Salah Times"],
    ["events", "Events"],
    ["sisters", "Sisters"],
    ["halal", "Halal Guide"],
    ["funeral", "Funeral Support"],
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
                 onClick={(e) => { e.preventDefault(); setRoute(id); setOpenMenu(null); }}
                 href="#">{label}</a>
            ))}
            <div className={`nav-item-wrap ${openMenu === "about" ? "open" : ""}`}>
              <a className={`nav-item ${aboutItems.some(([r])=>r===route) || route === "objectives" ? "active" : ""}`}
                 onClick={(e) => { e.preventDefault(); setOpenMenu(openMenu === "about" ? null : "about"); }}
                 href="#">About <Icon.ChevronRight className="nav-item-chev" width="12" height="12" style={{transform: "rotate(90deg)"}}/></a>
              <div className="nav-dropdown">
                {aboutItems.map(([id, label, I]) => (
                  <button key={id}
                          className="nav-dropdown-item"
                          onClick={() => { setRoute(id); setOpenMenu(null); }}>
                    <I width="16" height="16"/>{label}
                  </button>
                ))}
              </div>
            </div>
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
        <a href="#" onClick={(e)=>{e.preventDefault(); window.__setRoute("home");}}>Home</a>
        <Icon.ChevronRight width="12" height="12"/>
        <span style={{color: "var(--ink-2)", fontWeight: 500}}>{crumb}</span>
      </div>
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
  </section>
);

const FooterNewsletter = () => (
  <div className="footer-newsletter">
    <div className="footer-newsletter-pattern"><StarPattern id="fn-pat" color="#B8962E" scale={70}/></div>
    <div className="container footer-newsletter-inner">
      <div>
        <h3>Stay in the loop.</h3>
        <p>Subscribe for updates on local news, Islamic events, community projects, and activities happening across Suffolk.</p>
        <a href="#" className="whatsapp-strip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.4 24l1.7-6.2A11.9 11.9 0 0 1 .5 11.9C.5 5.3 5.8 0 12.4 0a11.9 11.9 0 0 1 11.9 11.9c0 6.6-5.3 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.4L.4 24zm6.6-3.8l.4.2a9.9 9.9 0 0 0 5 1.4 9.9 9.9 0 0 0 9.9-9.9c0-5.5-4.4-9.9-9.9-9.9a9.9 9.9 0 0 0-9.9 9.9c0 2 .6 3.8 1.6 5.4l.3.4-1 3.7 3.6-1.2zm10.6-6.9c-.1-.2-.4-.3-.9-.5-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.2.4-1 1.3-1.3 1.5-.2.2-.5.3-.9.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3 0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.7 4.2 1.7.8 2.4.8 3.2.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4l-.5-.3z"/></svg>
          Join our WhatsApp channel
        </a>
      </div>
      <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Your name"/>
        <input type="email" placeholder="Email address"/>
        <button type="submit" className="btn btn-primary">Subscribe <Icon.Arrow width="14" height="14"/></button>
      </form>
    </div>
  </div>
);

const Footer = ({ setRoute }) => (
  <>
    <FooterNewsletter />
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo size={32}/>
            <div className="footer-brand-name">Suffolk Muslim Society</div>
            <p className="footer-blurb">A one-stop community platform for Muslims in Suffolk — bringing the four Ipswich masjids and the wider community together.</p>
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
              <a href="tel:07700900123" style={{color:"var(--gold-500)", fontWeight: 600}}>Funeral · 07700 900 123</a>
              <a href="mailto:info@suffolkmuslim.org">info@suffolkmuslim.org</a>
              <span style={{color: "rgba(255,255,255,0.5)", fontSize: 12.5}}>Reg. Charity 1198XXX</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Suffolk Muslim Society. All rights reserved.</div>
          <div style={{display:"flex", gap: 18}}>
            <a href="#">Privacy policy</a>
            <a href="#">Cookies</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  </>
);

Object.assign(window, { Header, Footer, PageHeader });
