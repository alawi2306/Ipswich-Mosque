// Main App + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "displayFont": "Newsreader",
  "showJumuahBanner": true
}/*EDITMODE-END*/;

const App = () => {
  const [route, setRoute] = React.useState("home");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    window.__setRoute = setRoute;
  }, []);

  // Apply display font tweak
  React.useEffect(() => {
    document.documentElement.style.setProperty("--display",
      `"${t.displayFont}", "Source Serif 4", Georgia, serif`);
  }, [t.displayFont]);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  const page = (() => {
    switch (route) {
      case "prayer": return <PrayerPage />;
      case "events": return <EventsPage />;
      case "janazah": return <JanazahPage />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "donate": return <HomePage />; // donate scrolls; for prototype just go home
      default: return <HomePage />;
    }
  })();

  return (
    <div className="app" data-screen-label={`SMS · ${route}`}>
      <Header route={route} setRoute={setRoute} />
      <main style={{flex: 1}}>{page}</main>
      <Footer setRoute={setRoute} />
      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection title="Typography">
          <TweakSelect
            label="Display font"
            value={t.displayFont}
            options={[
              { value: "Newsreader", label: "Newsreader (editorial)" },
              { value: "Cormorant Garamond", label: "Cormorant (classical)" },
              { value: "Source Serif 4", label: "Source Serif (modern)" },
              { value: "Lora", label: "Lora (warm)" },
            ]}
            onChange={(v) => setTweak("displayFont", v)}
          />
        </TweakSection>
        <TweakSection title="Navigation">
          <div style={{display: "grid", gap: 6}}>
            {["home","prayer","events","janazah","about","contact"].map(r => (
              <button key={r}
                      onClick={() => setRoute(r)}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        background: route === r ? "var(--teal-50)" : "transparent",
                        border: "1px solid " + (route === r ? "var(--teal)" : "var(--line)"),
                        color: route === r ? "var(--teal-dark)" : "var(--ink-2)",
                        borderRadius: 4,
                        fontSize: 13,
                        textTransform: "capitalize",
                        fontFamily: "inherit",
                        fontWeight: 500,
                      }}>
                {r === "home" ? "Home" : r === "prayer" ? "Prayer Times" : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
