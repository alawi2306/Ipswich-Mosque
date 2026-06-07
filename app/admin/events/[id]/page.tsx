import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { EventForm } from '@/components/admin/EventForm'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) notFound()
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Edit Event</h1>
          <p>{event.title}</p>
        </div>
      </div>
      <div className="admin-card">
        <EventForm
          initial={{
            id: event.id,
            title: event.title,
            date: event.date.toISOString(),
            time: event.time,
            description: event.description,
            tag: event.tag,
            masjid: event.masjid,
            imageUrl: event.imageUrl || '',
          }}
        />
      </div>
    </>
  )
}
