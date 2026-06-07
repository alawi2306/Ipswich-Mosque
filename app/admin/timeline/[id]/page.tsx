import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { TimelineForm } from '@/components/admin/TimelineForm'

export default async function EditTimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const entry = await prisma.timelineEntry.findUnique({ where: { id } })
  if (!entry) notFound()
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Edit Timeline Entry</h1>
          <p>{entry.title}</p>
        </div>
      </div>
      <div className="admin-card">
        <TimelineForm
          initial={{
            id: entry.id,
            date: entry.date,
            tag: entry.tag,
            title: entry.title,
            desc: entry.desc,
            meta: entry.meta ?? '',
            photos: entry.photos as string[],
            sortOrder: entry.sortOrder,
          }}
        />
      </div>
    </>
  )
}
