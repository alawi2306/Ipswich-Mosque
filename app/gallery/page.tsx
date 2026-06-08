import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { MASJIDS } from '@/lib/data'
import { GalleryClient } from '@/components/gallery/GalleryClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Gallery — Suffolk Muslim Society',
  description: 'Photos from across our four masaajid in Ipswich.',
}

export default async function GalleryPage() {
  const images = await prisma.mosqueImage.findMany({
    where: { kind: 'gallery' },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, masjidId: true, url: true, caption: true },
  })

  const masjids = MASJIDS.map((m) => ({ id: m.id, name: m.name }))

  return (
    <main>
      <section className="container" style={{ padding: '48px 0 24px' }}>
        <div className="eyebrow">Gallery</div>
        <h1 className="section-title">Moments from our masaajid.</h1>
        <div className="section-sub">
          Photos shared with permission from across our four masaajid. If you&apos;d rather
          not appear, just let us know and we&apos;ll take them down.
        </div>
      </section>
      <section className="container" style={{ paddingBottom: 64 }}>
        <GalleryClient images={images} masjids={masjids} />
      </section>
    </main>
  )
}
