import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getMondayOfWeek, formatAladhanTime } from '@/lib/timetable'
import type { DayEntry } from '@/lib/timetable'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

async function fetchAladhanDays(postcode: string, weekStart: string): Promise<DayEntry[]> {
  const monthsNeeded = new Set<string>()
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    monthsNeeded.add(`${d.getFullYear()}/${d.getMonth() + 1}`)
  }

  const calendarData: Record<string, Record<string, unknown>[]> = {}
  for (const ym of monthsNeeded) {
    const [year, month] = ym.split('/')
    const url = `https://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${encodeURIComponent(postcode + ',UK')}&method=3`
    console.log('[cron] aladhan fetch:', url)
    const res = await fetch(url)
    console.log('[cron] aladhan response status:', res.status)
    if (!res.ok) throw new Error(`Aladhan API error for ${ym}: ${res.status}`)
    const json = await res.json()
    calendarData[ym] = json?.data ?? []
    console.log('[cron] aladhan entries for', ym, ':', calendarData[ym].length)
  }

  const days: DayEntry[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    const dayNum = d.getDate()
    const ym = `${d.getFullYear()}/${d.getMonth() + 1}`
    const monthEntries = calendarData[ym] ?? []

    const entry = monthEntries.find((e: Record<string, unknown>) => {
      const greg = e.date as Record<string, unknown>
      const gregDay = (greg?.gregorian as Record<string, unknown>)?.day
      return Number(gregDay) === dayNum
    }) as Record<string, unknown> | undefined

    const timings = entry?.timings as Record<string, string> | undefined

    days.push({
      date: d.toISOString().split('T')[0],
      day: DAY_NAMES[i],
      fajrBegin: timings?.Fajr ? formatAladhanTime(timings.Fajr) : '',
      fajrIqamah: '',
      sunrise: timings?.Sunrise ? formatAladhanTime(timings.Sunrise) : '',
      dhuhrBegin: timings?.Dhuhr ? formatAladhanTime(timings.Dhuhr) : '',
      dhuhrIqamah: '',
      asrBegin: timings?.Asr ? formatAladhanTime(timings.Asr) : '',
      asrIqamah: '',
      maghrib: timings?.Maghrib ? formatAladhanTime(timings.Maghrib) : '',
      ishaBegin: timings?.Isha ? formatAladhanTime(timings.Isha) : '',
      ishaIqamah: '',
      jumuah: i === 4 ? '' : null,
    })
  }
  return days
}

async function scrapeDays(url: string): Promise<DayEntry[]> {
  // Delegate to the scrape API route so all DPT/PDF/AI logic stays in one place
  const baseUrl = process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/timetables/scrape`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Scrape failed (${res.status}): ${err.error ?? 'unknown'}`)
  }
  const { days } = await res.json()
  console.log('[cron:scrape] extracted', days?.length ?? 0, 'days')
  return days ?? []
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    console.warn('[cron] unauthorized request — bad or missing CRON_SECRET')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('[cron] sync-times triggered at', new Date().toISOString())

  const allSettings = await prisma.masjidSettings.findMany({
    where: { autoMethod: { not: null } },
  })
  console.log('[cron] masjids with autoMethod configured:', allSettings.length)

  const weekStart = getMondayOfWeek(new Date()).toISOString().split('T')[0]
  console.log('[cron] target weekStart:', weekStart)

const results: { masjidId: string; status: string; error?: string }[] = []
  let synced = 0

  for (const settings of allSettings) {
    console.log(`[cron] processing ${settings.masjidId} | method: ${settings.autoMethod}`)
    try {
      let days: DayEntry[]

      if (settings.autoMethod === 'api' && settings.postcode) {
        console.log(`[cron] ${settings.masjidId}: fetching from Aladhan, postcode: ${settings.postcode}`)
        days = await fetchAladhanDays(settings.postcode, weekStart)
      } else if (settings.autoMethod === 'scrape' && settings.scrapeUrl) {
        console.log(`[cron] ${settings.masjidId}: scraping URL: ${settings.scrapeUrl}`)
        days = await scrapeDays(settings.scrapeUrl)
      } else {
        console.warn(`[cron] ${settings.masjidId}: skipped — missing config for method "${settings.autoMethod}"`)
        results.push({ masjidId: settings.masjidId, status: 'skipped', error: 'Missing config for autoMethod' })
        continue
      }

      // Group by week and upsert each (scrape may return a full month)
      const byWeek = new Map<string, DayEntry[]>()
      for (const day of days) {
        const ws = getMondayOfWeek(new Date(day.date + 'T12:00:00')).toISOString().split('T')[0]
        if (!byWeek.has(ws)) byWeek.set(ws, [])
        byWeek.get(ws)!.push(day)
      }
      for (const [ws, wDays] of byWeek) {
        await prisma.prayerWeek.upsert({
          where: { masjidId_weekStart: { masjidId: settings.masjidId, weekStart: ws } },
          create: { masjidId: settings.masjidId, weekStart: ws, source: settings.autoMethod!, days: wDays as unknown as import('@prisma/client').Prisma.InputJsonValue },
          update: { source: settings.autoMethod!, days: wDays as unknown as import('@prisma/client').Prisma.InputJsonValue },
        })
      }
      console.log(`[cron] ${settings.masjidId}: upserted ${byWeek.size} week(s)`)

      await prisma.masjidSettings.update({
        where: { masjidId: settings.masjidId },
        data: { lastSynced: new Date() },
      })

      synced++
      results.push({ masjidId: settings.masjidId, status: 'ok' })
    } catch (err) {
      console.error(`[cron] ${settings.masjidId}: error —`, err)
      results.push({ masjidId: settings.masjidId, status: 'error', error: String(err) })
    }
  }

  console.log(`[cron] done — synced: ${synced}/${allSettings.length}`, results)
  return NextResponse.json({ synced, results })
}
