import { AnnouncementForm } from '@/components/admin/AnnouncementForm'

export default function NewAnnouncementPage() {
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>New Announcement</h1>
          <p>Write and publish an announcement for the homepage carousel</p>
        </div>
      </div>
      <div className="admin-card">
        <AnnouncementForm />
      </div>
    </>
  )
}
