import { TimelineForm } from '@/components/admin/TimelineForm'

export default function NewTimelinePage() {
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>New Timeline Entry</h1>
          <p>Add a community milestone or highlight</p>
        </div>
      </div>
      <div className="admin-card">
        <TimelineForm />
      </div>
    </>
  )
}
