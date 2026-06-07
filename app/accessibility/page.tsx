import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility — Suffolk Muslim Society',
  description: 'Our commitment to making this website accessible to everyone.',
}

export default function AccessibilityPage() {
  return (
    <main className="container" style={{ maxWidth: 740, padding: '48px 24px 96px' }}>
      <div style={{ marginBottom: 40 }}>
        <a href="/" style={{ fontSize: 13, color: '#64748b' }}>← Home</a>
      </div>

      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Accessibility
      </span>
      <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', margin: '10px 0 6px', lineHeight: 1.2 }}>
        Accessibility Statement
      </h1>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 48 }}>Last updated: June 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 15.5, lineHeight: 1.75, color: '#1e293b' }}>

        <section>
          <h2 style={h2}>Our commitment</h2>
          <p>Suffolk Muslim Society is committed to making this website accessible to as many people as possible, regardless of disability, device, or internet connection. We aim to meet the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA</strong>.</p>
          <p style={{ marginTop: 12 }}>This website is intended to be usable by people who:</p>
          <ul style={ul}>
            <li>Use a screen reader or other assistive technology</li>
            <li>Navigate using a keyboard rather than a mouse</li>
            <li>Need to increase text size or zoom the page</li>
            <li>Have difficulty distinguishing colours</li>
            <li>Use a mobile device or have a slow internet connection</li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>What we have done</h2>
          <ul style={ul}>
            <li><strong>Keyboard navigation</strong> — all interactive elements (buttons, links, form fields) can be reached and activated using only a keyboard.</li>
            <li><strong>Focus indicators</strong> — visible focus outlines are preserved so keyboard users can always see where they are on the page.</li>
            <li><strong>Semantic HTML</strong> — headings, lists, landmarks and form labels are used correctly so screen readers can interpret the page structure.</li>
            <li><strong>Colour contrast</strong> — text and interactive elements are designed to meet WCAG AA contrast ratios (minimum 4.5:1 for body text).</li>
            <li><strong>Scalable text</strong> — the site uses relative font sizes so text can be enlarged using browser settings without breaking the layout.</li>
            <li><strong>Alternative text</strong> — images used for content (event covers, announcement photos) include descriptive alt text.</li>
            <li><strong>No motion traps</strong> — the hero carousel auto-advances but pauses when hovered or focused, and provides manual controls.</li>
            <li><strong>Forms</strong> — all form fields have visible labels, clear placeholder text, and inline error messages that are associated with their fields.</li>
            <li><strong>Reduced motion</strong> — we aim to respect the <code style={inlineCode}>prefers-reduced-motion</code> media query for users who find animations disorienting.</li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>Known limitations</h2>
          <p>We are continuously working to improve accessibility. Some known areas we are still working on:</p>
          <ul style={ul}>
            <li>Some older uploaded PDF documents (such as timetables) may not be fully screen-reader accessible. We are working to provide text alternatives where possible.</li>
            <li>The interactive prayer timetable is data-heavy and may be less navigable on very small screens.</li>
            <li>The image crop tool in the admin dashboard has limited screen reader support — this affects admin users only.</li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>Technical information</h2>
          <p>This website is built with Next.js and uses standard HTML5, CSS, and JavaScript. It relies on the following technologies for accessibility:</p>
          <ul style={ul}>
            <li>HTML semantic elements (<code style={inlineCode}>main</code>, <code style={inlineCode}>nav</code>, <code style={inlineCode}>section</code>, <code style={inlineCode}>article</code>, <code style={inlineCode}>header</code>, <code style={inlineCode}>footer</code>)</li>
            <li>ARIA labels and roles where native HTML is insufficient</li>
            <li>CSS focus-visible for visible keyboard focus</li>
          </ul>
          <p style={{ marginTop: 12 }}>The site has been tested with:</p>
          <ul style={ul}>
            <li>NVDA screen reader on Windows / Chrome</li>
            <li>VoiceOver on iOS Safari</li>
            <li>Keyboard-only navigation</li>
            <li>Browser zoom up to 200%</li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>Reporting an accessibility problem</h2>
          <p>If you experience any difficulty accessing content on this website, we want to know. Please <a href="/contact" style={link}>contact us</a> with:</p>
          <ul style={ul}>
            <li>A description of the problem you encountered</li>
            <li>The page or feature you were trying to use</li>
            <li>The device and browser or assistive technology you were using</li>
          </ul>
          <p style={{ marginTop: 12 }}>We aim to respond to accessibility queries within 5 working days and will do our best to provide an accessible alternative or fix the issue promptly.</p>
        </section>

        <section>
          <h2 style={h2}>Enforcement</h2>
          <p>If you are not satisfied with how we have responded to your accessibility concern, you can contact the <a href="https://www.equalityadvisoryservice.com" target="_blank" rel="noopener noreferrer" style={link}>Equality Advisory and Support Service (EASS)</a>.</p>
          <p style={{ marginTop: 12 }}>This statement was prepared in June 2026 and is reviewed annually.</p>
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

const inlineCode: React.CSSProperties = {
  fontFamily: 'ui-monospace, "JetBrains Mono", "SF Mono", monospace',
  fontSize: 13,
  background: '#f1f5f9',
  padding: '1px 5px',
  borderRadius: 4,
  color: '#0e3d52',
}
