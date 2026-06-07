import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AnnouncementForm } from '@/components/admin/AnnouncementForm'

export default async function EditAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await prisma.$queryRawUnsafe<{ id: string; title: string; excerpt: string; content: object; imageUrl: string | null; published: boolean }[]>(
    `SELECT id, title, excerpt, content, "imageUrl", published FROM "Announcement" WHERE id = $1`,
    id
  )
  if (!rows.length) notFound()
  const ann = rows[0]
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Edit Announcement</h1>
          <p>{ann.title}</p>
        </div>
      </div>
      <div className="admin-card">
        <AnnouncementForm
          initial={{
            id: ann.id,
            title: ann.title,
            excerpt: ann.excerpt,
            content: ann.content,
            imageUrl: ann.imageUrl ?? '',
            published: ann.published,
          }}
        />
      </div>
    </>
  )
}
