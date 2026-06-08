import { MASJIDS } from '@/lib/data'
import { TimetablesClient } from './TimetablesClient'

export default function TimetablesPage() {
  const masjids = MASJIDS.map(m => ({ id: m.id, name: m.name, short: m.short, area: m.area, scrapeUrl: m.scrapeUrl ?? null, note: m.note ?? null }))
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Prayer Timetables</h1>
          <p>Manage prayer times for all four masaajid</p>
        </div>
      </div>
      <TimetablesClient masjids={masjids} />
    </>
  )
}
