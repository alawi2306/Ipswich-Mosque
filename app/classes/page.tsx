import { prisma } from '@/lib/prisma'
import { ActivitiesPageClient } from '@/components/activities/ActivitiesPageClient'

export default async function ClassesPage() {
  const classes = await prisma.class.findMany({ orderBy: { createdAt: 'asc' } })
  const serialized = classes.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }))
  return <ActivitiesPageClient classes={serialized} />
}
