'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/StarPattern'

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Logo size={32} />
              <div className="footer-brand-name">Suffolk Muslim Society</div>
              <p className="footer-blurb">
                Run by volunteers. Working alongside the four Ipswich masaajid. Email or message us — we read everything.
              </p>
            </div>
            <div>
              <h4>Navigate</h4>
              <div className="footer-links">
                <Link href="/prayer-times">Salah times</Link>
                <Link href="/events">Events</Link>
                <Link href="/classes">Classes</Link>
                <Link href="/timeline">Our History</Link>
                {/* <Link href="/sisters">Sisters section</Link> */}
                {/* <Link href="/halal">Halal guide</Link> */}
                {/* <Link href="/funeral">Funeral support</Link> */}
                {/* <Link href="/volunteer">Volunteer</Link> */}
              </div>
            </div>
            <div>
              <h4>Get in touch</h4>
              <div className="footer-links">
                <Link href="/contact">Addresses &amp; contacts</Link>
                <a href="mailto:info@suffolkmuslim.org">info@suffolkmuslim.org</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2026 Suffolk Muslim Society. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 18 }}>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
