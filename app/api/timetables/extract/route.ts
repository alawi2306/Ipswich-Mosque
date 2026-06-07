import { NextRequest, NextResponse } from 'next/server'
import type { DayEntry } from '@/lib/timetable'

export async function POST(request: NextRequest) {
  const { imageBase64, mimeType } = await request.json()

  if (!imageBase64 || typeof imageBase64 !== 'string') {
    return NextResponse.json({ error: 'imageBase64 is required' }, { status: 400 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 })
  }

  const dataUrl = `data:${mimeType ?? 'image/jpeg'};base64,${imageBase64}`

  const prompt =
    'This is a mosque prayer timetable image. Extract the prayer times for each day shown. Return ONLY a JSON array (no other text) with this exact structure per day: { date: "YYYY-MM-DD", day: "Mon", fajrBegin, fajrIqamah, sunrise, dhuhrBegin, dhuhrIqamah, asrBegin, asrIqamah, maghrib, ishaBegin, ishaIqamah, jumuah }. For Friday set jumuah to the time string. For other days set jumuah to null. Use empty string for any unclear times. Infer dates from context or use current week if unknown.'

  const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-3-flash-preview',
      max_tokens: 60000,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: dataUrl } },
            { type: 'text', text: prompt },
          ],
        },
      ],
    }),
  })

  if (!aiRes.ok) {
    const err = await aiRes.text()
    return NextResponse.json({ error: 'AI API error', detail: err }, { status: 502 })
  }

  const aiData = await aiRes.json()
  const text: string = aiData?.choices?.[0]?.message?.content ?? ''

  let days: DayEntry[]
  try {
    days = JSON.parse(text)
  } catch {
    const match = text.match(/\[[\s\S]*\]/)
    if (!match) {
      return NextResponse.json({ error: 'Could not parse response from AI', raw: text }, { status: 502 })
    }
    try {
      days = JSON.parse(match[0])
    } catch {
      return NextResponse.json({ error: 'Could not parse JSON array from AI response', raw: text }, { status: 502 })
    }
  }

  return NextResponse.json({ days })
}
