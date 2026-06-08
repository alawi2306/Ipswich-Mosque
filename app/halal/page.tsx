import { HalalPageClient } from '@/components/halal/HalalPageClient'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function HalalPage() {
  const dbPlaces = await prisma.halalSubmission.findMany({
    where: { status: 'approved' },
    select: { id: true, name: true, category: true, address: true, rating: true, hmc: true, prayer: true, family: true },
    orderBy: { submittedAt: 'desc' },
  })
  return <HalalPageClient dbPlaces={dbPlaces} />
}
