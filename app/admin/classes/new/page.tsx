import { ClassForm } from '@/components/admin/ClassForm'

export default function NewClassPage() {
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>New Class</h1>
          <p>Add a recurring class or activity</p>
        </div>
      </div>
      <div className="admin-card">
        <ClassForm />
      </div>
    </>
  )
}
