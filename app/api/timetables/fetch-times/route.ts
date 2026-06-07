import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import { getMondayOfWeek, formatAladhanTime } from '@/lib/timetable'
import type { DayEntry } from '@/lib/timetable'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export async function GET(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }

  const { searchParams } = new URL(request.url)
  const postcode = searchParams.get('postcode')
  const weekStartParam = searchParams.get('weekStart')

  if (!postcode) {
    return NextResponse.json({ error: 'postcode is required' }, { status: 400 })
  }

  const weekStart = weekStartParam ?? getMondayOfWeek(new Date()).toISOString().split('T')[0]
  const mondayDate = new Date(weekStart)

  // Collect all year/month combos needed for the 7 days
  const monthsNeeded = new Set<string>()
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    monthsNeeded.add(`${d.getFullYear()}/${d.getMonth() + 1}`)
  }

  // Fetch calendar data for each required month
  const calendarData: Record<string, Record<string, unknown>[]> = {}
  for (const ym of monthsNeeded) {
    const [year, month] = ym.split('/')
    const url = `https://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${encodeURIComponent(postcode + ',UK')}&method=3`
    const res = await fetch(url)
    if (!res.ok) {
      return NextResponse.json({ error: `Aladhan API error for ${ym}` }, { status: 502 })
    }
    const json = await res.json()
    calendarData[ym] = json?.data ?? []
  }

  const days: DayEntry[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    const dayNum = d.getDate()
    const ym = `${d.getFullYear()}/${d.getMonth() + 1}`
    const monthEntries = calendarData[ym] ?? []

    // Find matching day by gregorian day number
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

  // Suppress unused variable warning
  void mondayDate

  return NextResponse.json({ days })
}
