export interface DayEntry {
  date: string        // "2026-05-25"
  day: string         // "Mon"
  fajrBegin: string
  fajrIqamah: string
  sunrise: string
  dhuhrBegin: string
  dhuhrIqamah: string
  asrBegin: string
  asrIqamah: string
  maghrib: string
  ishaBegin: string
  ishaIqamah: string
  jumuah: string | null  // Friday only, e.g. "1:30 & 2:00", null otherwise
}

export function getMondayOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function weekStartString(date: Date): string {
  return getMondayOfWeek(date).toISOString().split('T')[0]
}

export function emptyWeek(weekStart: string): DayEntry[] {
  const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return {
      date: d.toISOString().split('T')[0],
      day: DAY_NAMES[i],
      fajrBegin: '', fajrIqamah: '', sunrise: '',
      dhuhrBegin: '', dhuhrIqamah: '',
      asrBegin: '', asrIqamah: '',
      maghrib: '',
      ishaBegin: '', ishaIqamah: '',
      jumuah: i === 4 ? '' : null,  // Friday = index 4
    }
  })
}

export function formatAladhanTime(t: string): string {
  // "03:18 (BST)" → "3:18"
  return t.split(' ')[0].replace(/^0(?=\d:)/, '')
}
