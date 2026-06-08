import { prisma } from '@/lib/prisma'
import { MASJIDS } from '@/lib/data'
import { MosqueImagesManager } from '@/components/admin/MosqueImagesManager'

export const dynamic = 'force-dynamic'

export default async function AdminGalleryPage() {
  const images = await prisma.mosqueImage.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, masjidId: true, url: true, caption: true, kind: true },
  })

  const masjids = MASJIDS.map((m) => ({ id: m.id, name: m.name, stockImg: m.img }))

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Mosque Photos</h1>
          <p>Set the homepage cover image for each masjid and manage gallery photos.</p>
        </div>
      </div>
      <MosqueImagesManager images={images} masjids={masjids} />
    </>
  )
}
