import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const STOCK = [
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1400&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1400&q=80',
  'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1400&q=80',
]

const SEEDS = [
  {
    title: 'Eid ul-Adha 2026 — Salah Times & Arrangements',
    excerpt: 'Eid Salah will be held at Portman Road and all four masaajid. Gates open from 7:30 AM — come early and bring family.',
    imageUrl: STOCK[0],
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Eid Mubarak from Suffolk Muslim Society' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'We wish the entire community a blessed Eid ul-Adha. May Allah accept our worship, unite our hearts, and grant ease to those sacrificing across the world.' }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Salah Times' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Portman Road (main congregation) — 8:00 AM & 9:30 AM' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ipswich Mosque — 8:30 AM' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Taqwa Mosque — 8:00 AM' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Shah Jalal Mosque — 9:00 AM' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Nawracy Mosque — 8:30 AM' }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: 'Gates open 30 minutes before each Salah. Please bring your own prayer mat and arrive early to allow time for parking. Wudhu facilities will be available on site.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'A community gathering with refreshments will follow the main congregation at Portman Road. All are welcome.' }] },
      ],
    },
    sortOrder: 1,
    published: true,
  },
  {
    title: 'New Qur\'an Hifz Circle — Enrolling Now',
    excerpt: 'Weekly Hifz circle for adults and young people starting this term. Places are limited — apply through the activities page.',
    imageUrl: STOCK[1],
    content: {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'We are launching a new weekly Qur\'an memorisation circle for adults and young people aged 14+, starting this term at Ipswich Mosque.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Sessions run every Saturday morning from 9:00 AM to 11:00 AM under the guidance of a qualified Hafidh. The circle follows a structured programme suitable for all levels, from those starting their first juz to those revising previously memorised portions.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Places are limited to 15 students per session. To apply, visit the Activities page and click "Apply / Enquire" on the Hifz Circle listing.' }] },
      ],
    },
    sortOrder: 2,
    published: true,
  },
  {
    title: 'Community Hall Renovation Complete',
    excerpt: 'The main community hall at Ipswich Mosque has been fully refurbished — ready for events, classes, and community use.',
    imageUrl: STOCK[2],
    content: {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'We are delighted to announce that the main community hall at Ipswich Mosque has been fully refurbished, thanks to the generous donations of our community.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'The hall now features new flooring, improved lighting, a modernised kitchen and serving area, and expanded capacity for up to 200 guests.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'The space is available for community events, Islamic classes, and private hire. To enquire about bookings, please use the contact form and select "General enquiry".' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'JazakAllahu khairan to everyone who contributed — may Allah accept your sadaqah.' }] },
      ],
    },
    sortOrder: 3,
    published: true,
  },
]

async function main() {
  await prisma.announcement.deleteMany()
  console.log('Deleted all announcements.')

  for (const seed of SEEDS) {
    const a = await prisma.announcement.create({ data: seed })
    console.log(`Created: "${a.title}"`)
  }

  console.log('Done.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
