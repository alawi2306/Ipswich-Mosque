import { prisma } from '@/lib/prisma'
import { MASJIDS } from '@/lib/data'
import type { DayEntry } from '@/lib/timetable'
import { PrayerTimesClient } from '@/components/prayer/PrayerTimesClient'

export default async function PrayerTimesPage() {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const weeks = await prisma.prayerWeek.findMany({
    where: { masjidId: { in: MASJIDS.map(m => m.id) } },
    orderBy: { weekStart: 'asc' },
  })

  // Flatten, dedupe by (masjidId, date), sort
  const daysByMasjid: Record<string, DayEntry[]> = {}
  for (const m of MASJIDS) {
    const seen = new Set<string>()
    daysByMasjid[m.id] = weeks
      .filter(w => w.masjidId === m.id)
      .flatMap(w => w.days as DayEntry[])
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter(d => !seen.has(d.date) && seen.add(d.date))
  }

  return <PrayerTimesClient daysByMasjid={daysByMasjid} todayStr={todayStr} />
}
