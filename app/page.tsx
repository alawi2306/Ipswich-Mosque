import { prisma } from '@/lib/prisma'
import { MASJIDS } from '@/lib/data'
import type { DayEntry } from '@/lib/timetable'
import { Hero } from '@/components/home/Hero'
import { SalahSection } from '@/components/home/SalahSection'
import { UpcomingEvents } from '@/components/home/UpcomingEvents'
import { CommunityTimeline } from '@/components/home/CommunityTimeline'
import { Masaajid } from '@/components/home/Masaajid'
import { CombinedCTA } from '@/components/home/CombinedCTA'

export default async function HomePage() {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const [announcements, events, prayerWeeks, timelineEntries] = await Promise.all([
    prisma.$queryRawUnsafe<{ id: string; title: string; excerpt: string; imageUrl: string | null; createdAt: Date; content: unknown }[]>(
      `SELECT id, title, excerpt, "imageUrl", "createdAt", content FROM "Announcement" WHERE published = true ORDER BY "sortOrder" ASC, "createdAt" DESC LIMIT 3`
    ),
    prisma.event.findMany({
      orderBy: { date: 'asc' },
      take: 3,
    }),
    // Fetch the most recent weeks for each masjid (not just the exact current week)
    // so masjids with slightly stale data still show rather than going blank.
    prisma.prayerWeek.findMany({
      where: { masjidId: { in: MASJIDS.map(m => m.id) } },
      orderBy: { weekStart: 'desc' },
      take: MASJIDS.length * 4,
    }),
    prisma.timelineEntry.findMany({ orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }], take: 6 }),
  ])

  const todayTimes: Record<string, DayEntry | null> = {}
  for (const m of MASJIDS) {
    const masjidWeeks = prayerWeeks
      .filter(w => w.masjidId === m.id)
      .sort((a, b) => b.weekStart.localeCompare(a.weekStart))
    let found: DayEntry | null = null
    for (const week of masjidWeeks) {
      const days = week.days as unknown as DayEntry[]
      const entry = days.find(d => d.date === todayStr)
      if (entry) { found = entry; break }
    }
    // Fall back to the most recent day available if today's exact date isn't stored
    if (!found && masjidWeeks.length > 0) {
      const allDays = masjidWeeks.flatMap(w => w.days as unknown as DayEntry[]).sort((a, b) => b.date.localeCompare(a.date))
      found = allDays[0] ?? null
    }
    todayTimes[m.id] = found
  }

  const dateLabel = today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const serializedAnnouncements = announcements.map((a) => ({
    ...a,
    imageUrl: a.imageUrl ?? null,
    createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : a.createdAt,
    content: a.content ?? null,
  }))
  const serializedEvents = events.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
    createdAt: e.createdAt.toISOString(),
  }))

  return (
    <>
      <Hero announcements={serializedAnnouncements} />
      <SalahSection todayTimes={todayTimes} dateLabel={dateLabel} />
      <UpcomingEvents events={serializedEvents} />
      <CommunityTimeline entries={timelineEntries.map(e => ({ ...e, photos: e.photos as string[] }))} />
      <Masaajid />
      <CombinedCTA />
    </>
  )
}
