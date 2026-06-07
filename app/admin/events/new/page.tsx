import { EventForm } from '@/components/admin/EventForm'

export default function NewEventPage() {
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>New Event</h1>
          <p>Create a new community event</p>
        </div>
      </div>
      <div className="admin-card">
        <EventForm />
      </div>
    </>
  )
}
