import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Suffolk Muslim Society',
  description: 'How Suffolk Muslim Society collects, uses and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <main className="container" style={{ maxWidth: 740, padding: '48px 24px 96px' }}>
      <div style={{ marginBottom: 40 }}>
        <a href="/" style={{ fontSize: 13, color: '#64748b' }}>← Home</a>
      </div>

      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Legal
      </span>
      <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', margin: '10px 0 6px', lineHeight: 1.2 }}>
        Privacy Policy
      </h1>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 48 }}>Last updated: June 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 15.5, lineHeight: 1.75, color: '#1e293b' }}>

        <section>
          <h2 style={h2}>Who we are</h2>
          <p>Suffolk Muslim Society (SMS) is the organisation responsible for this website, operating across four masaajid in Ipswich, Suffolk. We are the data controller for all personal information collected through this site.</p>
          <p style={{ marginTop: 12 }}>If you have any questions about how we handle your data, please <a href="/contact" style={link}>contact us</a>.</p>
        </section>

        <section>
          <h2 style={h2}>What information we collect</h2>
          <p>We only collect information you voluntarily provide to us. This includes:</p>
          <ul style={ul}>
            <li><strong>Contact enquiries</strong> — your name, email address, and message when you use the contact form.</li>
            <li><strong>Event registrations</strong> — your name and email address when you register for an event.</li>
            <li><strong>Class applications</strong> — your name, email address, and any message you include when applying for a class or activity.</li>
            <li><strong>Newsletter subscriptions</strong> — your name and email address when you subscribe to our mailing list.</li>
            <li><strong>Halal business submissions</strong> — business name, category, and any details you provide when recommending a halal business.</li>
          </ul>
          <p style={{ marginTop: 12 }}>We do not collect any special category data (such as health information, ethnicity, or biometric data) through this website.</p>
        </section>

        <section>
          <h2 style={h2}>How we use your information</h2>
          <p>We use the information you provide solely to:</p>
          <ul style={ul}>
            <li>Respond to your enquiries and messages</li>
            <li>Administer event registrations and class applications</li>
            <li>Send our community newsletter (only if you subscribed)</li>
            <li>Review and publish halal business recommendations</li>
          </ul>
          <p style={{ marginTop: 12 }}>We will never sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 style={h2}>Legal basis for processing</h2>
          <p>We process your data on the following legal grounds under UK GDPR:</p>
          <ul style={ul}>
            <li><strong>Legitimate interests</strong> — responding to contact enquiries and managing registrations for events and classes you have chosen to attend.</li>
            <li><strong>Consent</strong> — sending our newsletter. You can withdraw consent and unsubscribe at any time by contacting us.</li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>How long we keep your data</h2>
          <p>We retain your information only for as long as necessary:</p>
          <ul style={ul}>
            <li>Contact enquiries — up to 12 months after the enquiry is resolved</li>
            <li>Event registrations — up to 6 months after the event date</li>
            <li>Class applications — up to 12 months from the date of application</li>
            <li>Newsletter subscriptions — until you unsubscribe</li>
          </ul>
        </section>

        <section>
          <h2 style={h2}>Third-party services</h2>
          <p>This website uses the following third-party infrastructure to operate. None of these providers use your data for their own marketing:</p>
          <ul style={ul}>
            <li><strong>Neon</strong> — our database host, storing form submissions and registrations (servers in EU/US).</li>
            <li><strong>Cloudflare R2</strong> — storage for uploaded images (event photos, announcement covers).</li>
            <li><strong>Vercel</strong> — our hosting provider, which serves the website.</li>
          </ul>
          <p style={{ marginTop: 12 }}>We do not use Google Analytics, Meta Pixel, or any other behavioural tracking or advertising technology.</p>
        </section>

        <section>
          <h2 style={h2}>Your rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul style={ul}>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Rectification</strong> — ask us to correct inaccurate information</li>
            <li><strong>Erasure</strong> — ask us to delete your data (subject to any legal obligations)</li>
            <li><strong>Restriction</strong> — ask us to limit how we use your data</li>
            <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
            <li><strong>Portability</strong> — receive your data in a portable format</li>
          </ul>
          <p style={{ marginTop: 12 }}>To exercise any of these rights, please <a href="/contact" style={link}>contact us</a>. We will respond within 30 days.</p>
          <p style={{ marginTop: 12 }}>You also have the right to lodge a complaint with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={link}>Information Commissioner's Office (ICO)</a> if you believe your data is being handled unlawfully.</p>
        </section>

        <section>
          <h2 style={h2}>Cookies</h2>
          <p>This website uses a small number of strictly necessary cookies to function. We do not use advertising or tracking cookies. See our <a href="/cookies" style={link}>Cookie Policy</a> for full details.</p>
        </section>

        <section>
          <h2 style={h2}>Changes to this policy</h2>
          <p>We may update this policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of the site after changes are published constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 style={h2}>Contact</h2>
          <p>For any privacy-related questions or requests, please use our <a href="/contact" style={link}>contact form</a> and select "General enquiry".</p>
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
