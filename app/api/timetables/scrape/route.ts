import { NextRequest, NextResponse } from 'next/server'
import type { DayEntry } from '@/lib/timetable'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatTime(t: string): string {
  if (!t) return ''
  return t.slice(0, 5).replace(/^0(?=\d:)/, '')
}

async function tryDptApi(origin: string): Promise<DayEntry[] | null> {
  try {
    const res = await fetch(`${origin}/wp-json/dpt/v1/prayertime?filter=month`, {
      headers: { 'User-Agent': UA },
    })
    if (!res.ok) return null
    const raw = await res.json()
    if (!Array.isArray(raw)) return null
    // Some versions wrap in a nested array: [[{d_date,...},...]]
    const rows: Record<string, string>[] = raw.length === 1 && Array.isArray(raw[0]) ? raw[0] : raw
    const valid = rows.filter(r => r.d_date?.includes('-'))
    if (valid.length === 0) return null
    console.log('[scrape] DPT API: got', valid.length, 'days')
    return valid.map(row => {
      const [y, m, d] = row.d_date.split('-').map(Number)
      const dow = new Date(y, m - 1, d).getDay()
      return {
        date: row.d_date, day: DAY_NAMES[dow],
        fajrBegin: formatTime(row.fajr_begins), fajrIqamah: formatTime(row.fajr_jamah),
        sunrise: formatTime(row.sunrise),
        dhuhrBegin: formatTime(row.zuhr_begins), dhuhrIqamah: formatTime(row.zuhr_jamah),
        asrBegin: formatTime(row.asr_mithl_1), asrIqamah: formatTime(row.asr_jamah),
        maghrib: formatTime(row.maghrib_begins),
        ishaBegin: formatTime(row.isha_begins), ishaIqamah: formatTime(row.isha_jamah),
        jumuah: dow === 5 ? formatTime(row.zuhr_jamah) : null,
      } satisfies DayEntry
    })
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  const { url } = await request.json()
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'url is required' }, { status: 400 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 })
  }

  // Fetch the page HTML
  let html: string
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) return NextResponse.json({ error: `Failed to fetch URL (${res.status})` }, { status: 400 })
    html = await res.text()
    console.log('[scrape] fetched', url, '— html length:', html.length)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch URL', detail: String(err) }, { status: 400 })
  }

  // DPT WordPress plugin — times are JS-rendered, use REST API instead
  if (html.includes('daily-prayer-time-for-mosques')) {
    console.log('[scrape] DPT site detected, using REST API')
    const days = await tryDptApi(new URL(url).origin)
    if (days && days.length > 0) return NextResponse.json({ days })
    return NextResponse.json(
      { error: 'DPT REST API returned no data. The mosque may not have entered this month\'s times yet.' },
      { status: 422 }
    )
  }

  // Plain HTML — strip tags and send to AI
  const text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 20000)

  console.log('[scrape] stripped text length:', text.length)

  const prompt = 'This is text from a mosque prayer timetable page. Extract prayer times for ALL days shown. Return ONLY a JSON array, one object per day: { date: "YYYY-MM-DD", day: "Mon", fajrBegin, fajrIqamah, sunrise, dhuhrBegin, dhuhrIqamah, asrBegin, asrIqamah, maghrib, ishaBegin, ishaIqamah, jumuah }. Set jumuah to the Jumu\'ah time string on Fridays, null on all other days. Use "" for missing values. Infer full dates from any month/year shown; use current month if unclear.'

  const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'google/gemini-3-flash-preview',
      max_tokens: 60000,
      messages: [{ role: 'user', content: `${prompt}\n\nPage text:\n${text}` }],
    }),
  })

  if (!aiRes.ok) {
    const err = await aiRes.text()
    return NextResponse.json({ error: 'AI API error', detail: err }, { status: 502 })
  }

  const responseText: string = (await aiRes.json())?.choices?.[0]?.message?.content ?? ''
  console.log('[scrape] AI response preview:', responseText.slice(0, 200))

  let days: DayEntry[]
  try {
    days = JSON.parse(responseText)
  } catch {
    const match = responseText.match(/\[[\s\S]*\]/)
    if (!match) return NextResponse.json({ error: 'Could not parse AI response', raw: responseText }, { status: 502 })
    days = JSON.parse(match[0])
  }

  console.log('[scrape] returning', days.length, 'days')
  return NextResponse.json({ days })
}
