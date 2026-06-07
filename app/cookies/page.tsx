import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — Suffolk Muslim Society',
  description: 'Information about the cookies used on the Suffolk Muslim Society website.',
}

export default function CookiesPage() {
  return (
    <main className="container" style={{ maxWidth: 740, padding: '48px 24px 96px' }}>
      <div style={{ marginBottom: 40 }}>
        <a href="/" style={{ fontSize: 13, color: '#64748b' }}>← Home</a>
      </div>

      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Legal
      </span>
      <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', margin: '10px 0 6px', lineHeight: 1.2 }}>
        Cookie Policy
      </h1>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 48 }}>Last updated: June 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 15.5, lineHeight: 1.75, color: '#1e293b' }}>

        <section>
          <h2 style={h2}>What are cookies?</h2>
          <p>Cookies are small text files that a website stores on your device when you visit. They are widely used to make websites work correctly and to remember your preferences between visits.</p>
        </section>

        <section>
          <h2 style={h2}>How we use cookies</h2>
          <p>This website uses only <strong>strictly necessary cookies</strong>. We do not use advertising cookies, analytics cookies, or any third-party tracking cookies.</p>
          <p style={{ marginTop: 12 }}>Strictly necessary cookies are required for the site to function. They cannot be switched off without breaking core features. No consent is required for these cookies under UK law.</p>
        </section>

        <section>
          <h2 style={h2}>Cookies we set</h2>

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={cookieCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <code style={code}>sms_session</code>
                <span style={badge}>Strictly necessary</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: '#475569' }}>
                Keeps you logged in to the admin dashboard. This cookie is set only when an administrator logs in, and is never set for public visitors. It is HTTP-only (cannot be read by JavaScript) and expires after 7 days of inactivity.
              </p>
              <div style={meta}>
                <span><strong>Duration:</strong> 7 days</span>
                <span><strong>Type:</strong> HTTP-only, Secure</span>
                <span><strong>Third party:</strong> No</span>
              </div>
            </div>

            <div style={cookieCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <code style={code}>sms_pw_ok</code>
                <span style={badge}>Strictly necessary</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: '#475569' }}>
                A short-lived intermediate token used during the two-step admin login process (password check → two-factor authentication). Set only during login and automatically expires after 5 minutes.
              </p>
              <div style={meta}>
                <span><strong>Duration:</strong> 5 minutes</span>
                <span><strong>Type:</strong> HTTP-only, Secure</span>
                <span><strong>Third party:</strong> No</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 style={h2}>Cookies we do not use</h2>
          <p>We do not use any of the following:</p>
          <ul style={ul}>
            <li>Google Analytics or similar analytics tools</li>
            <li>Meta Pixel or social media tracking</li>
            <li>Advertising or retargeting cookies</li>
            <li>Performance or A/B testing tools</li>
            <li>Any third-party cookies set without your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>Managing cookies</h2>
          <p>Because we only use strictly necessary cookies, there is no cookie consent banner on this site — none is required by UK law (UK GDPR / PECR) for cookies that are essential to the operation of the service.</p>
          <p style={{ marginTop: 12 }}>You can still control cookies through your browser settings. Most browsers allow you to view, block, or delete cookies at any time. Note that blocking the session cookie will prevent admin login from working.</p>
          <p style={{ marginTop: 12 }}>For guidance on managing cookies in your browser:</p>
          <ul style={ul}>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={link}>Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" style={link}>Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={link}>Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={link}>Microsoft Edge</a></li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>Changes to this policy</h2>
          <p>If we introduce new cookies in the future, this page will be updated and the "Last updated" date will change. We will not introduce non-essential cookies without making consent options available.</p>
        </section>

        <section>
          <h2 style={h2}>Questions</h2>
          <p>If you have any questions about how we use cookies, please <a href="/contact" style={link}>contact us</a>.</p>
        </section>

      </div>
    </main>
  )
}

const h2: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 700,
  letterSpacing: '-0.01em',
  margin: '0 0 14px',
  color: '#0f172a',
}

const ul: React.CSSProperties = {
  paddingLeft: 22,
  margin: '12px 0 0',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const link: React.CSSProperties = {
  color: 'var(--teal-700)',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
}

const cookieCard: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '16px 18px',
  background: '#f8fafc',
}

const code: React.CSSProperties = {
  fontFamily: 'ui-monospace, "JetBrains Mono", "SF Mono", monospace',
  fontSize: 13,
  fontWeight: 600,
  background: '#e2e8f0',
  padding: '2px 8px',
  borderRadius: 4,
  color: '#0e3d52',
}

const badge: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#0e7490',
  background: '#cffafe',
  padding: '2px 8px',
  borderRadius: 999,
}

const meta: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px 20px',
  marginTop: 12,
  fontSize: 13,
  color: '#64748b',
}
