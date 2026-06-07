// SMS v2 — App shell

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showLiveBar": true
}/*EDITMODE-END*/;

const App = () => {
  const [route, setRoute] = React.useState("home");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    window.__setRoute = setRoute;
  }, []);

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
      case "donate": return <HomePage />;
      default: return <HomePage />;
    }
  })();

  return (
    <div className="app" data-screen-label={`SMS · ${route}`}>
      <Header route={route} setRoute={setRoute} />
      <main style={{flex: 1}}>{page}</main>
      <Footer setRoute={setRoute} />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Navigation">
          <div style={{display: "grid", gap: 4}}>
            {["home","prayer","events","janazah","about","contact"].map(r => (
              <button key={r}
                      onClick={() => setRoute(r)}
                      style={{
                        textAlign: "left",
                        padding: "7px 10px",
                        background: route === r ? "var(--teal-50)" : "transparent",
                        border: "1px solid " + (route === r ? "var(--teal-500)" : "var(--line)"),
                        color: route === r ? "var(--teal-700)" : "var(--ink-2)",
                        borderRadius: 6,
                        fontSize: 13,
                        fontFamily: "inherit",
                        fontWeight: 500,
                      }}>
                {r === "home" ? "Home" : r === "prayer" ? "Prayer Times" : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </TweakSection>
        <TweakSection title="Versions">
          <div style={{display:"grid", gap: 4, fontSize: 13}}>
            <a href="v1/index.html" style={{padding: "7px 10px", border: "1px solid var(--line)", borderRadius: 6, color: "var(--ink-2)", fontWeight: 500}}>← v1 (editorial teal)</a>
            <div style={{padding: "7px 10px", background: "var(--teal-50)", border: "1px solid var(--teal-500)", color: "var(--teal-700)", borderRadius: 6, fontWeight: 600}}>v2 (utilitarian) — current</div>
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
