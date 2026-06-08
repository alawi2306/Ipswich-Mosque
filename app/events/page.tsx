import { prisma } from '@/lib/prisma'
import { EventsPageClient } from '@/components/events/EventsPageClient'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } })
  const serialized = events.map(e => ({
    ...e,
    date: e.date.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }))
  return <EventsPageClient events={serialized} />
}
