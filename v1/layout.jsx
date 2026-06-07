// Layout: Header, Footer, common bits

const UtilityBar = () => (
  <div className="utility">
    <div className="container utility-inner">
      <div className="utility-left">
        <span><span className="utility-dot"></span>Today · Sat 25 May 2026 · 8 Dhū al-Qaʿdah 1447</span>
      </div>
      <div className="utility-right">
        <a href="#">Janazah Line · 07700 900 123</a>
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
      <UtilityBar />
      <header className="header">
        <div className="container header-inner">
          <div className="brand" onClick={() => setRoute("home")}>
            <div className="brand-mark"><Logo size={48} /></div>
            <div className="brand-text">
              <div className="brand-name">Suffolk Muslim Society</div>
              <div className="brand-sub">A community in Ipswich</div>
            </div>
          </div>
          <nav className="nav">
            {items.map(([id, label]) => (
              <a key={id}
                 className={`nav-item ${route === id ? "active" : ""}`}
                 onClick={(e) => { e.preventDefault(); setRoute(id); }}
                 href="#">{label}</a>
            ))}
            <button className="nav-cta" onClick={() => setRoute("donate")}>Donate</button>
          </nav>
        </div>
      </header>
    </>
  );
};

const PageHeader = ({ crumb, title, sub }) => (
  <section className="page-header">
    <div className="page-header-pattern"><StarPattern id="ph-pat" color="#B8962E" scale={70}/></div>
    <div className="container page-header-inner">
      <div className="crumb">
        <a href="#">Home</a>
        <span>›</span>
        <span style={{color:"rgba(255,255,255,0.8)"}}>{crumb}</span>
      </div>
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
  </section>
);

const Footer = ({ setRoute }) => (
  <footer className="footer">
    <div className="footer-pattern"><StarPattern id="footer-pat" color="#B8962E" scale={90}/></div>
    <div className="container">
      <div className="footer-grid">
        <div>
          <Logo size={56} color="#fff" accent="#d4b454" />
          <div className="footer-brand-name">Suffolk Muslim Society</div>
          <p className="footer-blurb">A one-stop platform for the Muslim community in Suffolk — bringing four masjids and the wider community together.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <div className="footer-links">
            <a onClick={() => setRoute("prayer")} href="#">Prayer Times</a>
            <a onClick={() => setRoute("events")} href="#">Events</a>
            <a href="#">Classes</a>
            <a href="#">Announcements</a>
            <a onClick={() => setRoute("janazah")} href="#">Janazah</a>
          </div>
        </div>
        <div>
          <h4>Society</h4>
          <div className="footer-links">
            <a onClick={() => setRoute("about")} href="#">About SMS</a>
            <a href="#">Committee</a>
            <a href="#">Volunteer</a>
            <a onClick={() => setRoute("donate")} href="#">Donate / Sadaqah</a>
            <a onClick={() => setRoute("contact")} href="#">Contact</a>
          </div>
        </div>
        <div>
          <h4>24-Hour Janazah</h4>
          <div className="footer-links">
            <a href="tel:07700900123" style={{color:"#d4b454", fontFamily: "var(--display)", fontSize: 22}}>07700 900 123</a>
            <span style={{fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4}}>Coordinator on call, day or night</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Suffolk Muslim Society · Registered Charity 1198XXX</div>
        <div>Made with care in Ipswich</div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Header, Footer, PageHeader });
