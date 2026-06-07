import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ClassForm } from '@/components/admin/ClassForm'

export default async function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cls = await prisma.class.findUnique({ where: { id } })
  if (!cls) notFound()
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Edit Class</h1>
          <p>{cls.title}</p>
        </div>
      </div>
      <div className="admin-card">
        <ClassForm
          initial={{
            id: cls.id,
            title: cls.title,
            teacher: cls.teacher,
            dayTime: cls.dayTime,
            schedule: cls.schedule,
            description: cls.description || '',
            masjid: cls.masjid,
            category: cls.category,
          }}
        />
      </div>
    </>
  )
}
