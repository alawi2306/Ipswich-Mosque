import { StarPattern } from '@/components/ui/StarPattern'
import { Icon } from '@/components/ui/icons'

export function CommunitySubmit() {
  return (
    <section className="submit-section">
      <div className="submit-pattern">
        <StarPattern id="submit-pat" color="#1B6B8A" scale={60} />
      </div>
      <div className="container submit-inner">
        <div className="submit-text">
          <div className="eyebrow"><Icon.Megaphone width={13} height={13} /> Get involved</div>
          <h2>Got something to share?</h2>
          <p>Running an event, starting a class, want to recommend a halal place we&apos;ve missed, or have a short reminder to share — please send it our way. Everything is read by one of the committee before going up.</p>
          <div className="submit-categories">
            <span className="submit-chip">Event submissions</span>
            <span className="submit-chip">Community announcements</span>
            <span className="submit-chip">Volunteer opportunities</span>
            <span className="submit-chip">Business recommendations</span>
            <span className="submit-chip">Islamic reminders</span>
          </div>
        </div>
        <div className="submit-cta-card">
          <div className="submit-cta-icon"><Icon.Arrow width={22} height={22} /></div>
          <h3>Share with us</h3>
          <p>A short form, takes 2 minutes.</p>
          <button className="btn btn-teal" style={{ width: '100%', justifyContent: 'center' }}>
            Click here <Icon.Arrow width={14} height={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
