// SMS — App shell

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{}/*EDITMODE-END*/;

const ROUTES = {
  home: { label: "Home", component: () => <HomePage /> },
  prayer: { label: "Salah Times", component: () => <PrayerPage /> },
  events: { label: "Events", component: () => <EventsPage /> },
  sisters: { label: "Sisters", component: () => <SistersPage /> },
  halal: { label: "Halal Guide", component: () => <HalalPage /> },
  activities: { label: "Activities", component: () => <ActivitiesPage /> },
  funeral: { label: "Funeral Support", component: () => <FuneralPage /> },
  objectives: { label: "Objectives", component: () => <ObjectivesPage /> },
  volunteer: { label: "Volunteer", component: () => <VolunteerPage /> },
  contact: { label: "Contact", component: () => <ContactPage /> },
};

const App = () => {
  const [route, setRoute] = React.useState("home");
  const [activeMasjid, setActiveMasjid] = React.useState("ipswich");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    window.__setRoute = setRoute;
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  const PageComponent = (ROUTES[route] || ROUTES.home).component;

  return (
    <div className="app" data-screen-label={`SMS · ${route}`}>
      <Header route={route} setRoute={setRoute} activeMasjid={activeMasjid} setActiveMasjid={setActiveMasjid} />
      <main style={{flex: 1}}><PageComponent /></main>
      <Footer setRoute={setRoute} />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Navigation">
          <div style={{display: "grid", gap: 4}}>
            {Object.keys(ROUTES).map(r => (
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
                {ROUTES[r].label}
              </button>
            ))}
          </div>
        </TweakSection>
        <TweakSection title="Previous versions">
          <div style={{display:"grid", gap: 4, fontSize: 13}}>
            <a href="v1/index.html" style={{padding: "7px 10px", border: "1px solid var(--line)", borderRadius: 6, color: "var(--ink-2)", fontWeight: 500}}>← v1 (editorial teal)</a>
            <a href="v2/index.html" style={{padding: "7px 10px", border: "1px solid var(--line)", borderRadius: 6, color: "var(--ink-2)", fontWeight: 500}}>← v2 (utilitarian)</a>
            <div style={{padding: "7px 10px", background: "var(--teal-50)", border: "1px solid var(--teal-500)", color: "var(--teal-700)", borderRadius: 6, fontWeight: 600}}>v3 (full structure) — current</div>
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
