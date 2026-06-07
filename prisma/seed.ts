import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function tipTapDoc(text: string) {
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text }],
      },
    ],
  }
}

async function main() {
  console.log('Seeding database...')

  // ── Announcements ──────────────────────────────────────────────────────────
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Eid al-Adha arrangements',
        excerpt: 'Three congregations across town on Friday 6 June. Parking will be tight — please walk or car-share if you can.',
        content: tipTapDoc('Three congregations across town on Friday 6 June. Parking will be tight — please walk or car-share if you can.'),
        published: true,
        createdAt: new Date('2026-05-21'),
        updatedAt: new Date('2026-05-21'),
      },
      {
        title: "Summer Jumu'ah times start 30 May",
        excerpt: 'First sitting at 1:30 PM, second at 2:00 PM. Khutbah begins 15 minutes before each.',
        content: tipTapDoc('First sitting at 1:30 PM, second at 2:00 PM. Khutbah begins 15 minutes before each.'),
        published: true,
        createdAt: new Date('2026-05-18'),
        updatedAt: new Date('2026-05-18'),
      },
      {
        title: 'Hajj group briefing — Sat 23 May',
        excerpt: 'For everyone going this year, plus family. After Maghrib in the main hall at Ipswich Mosque.',
        content: tipTapDoc('For everyone going this year, plus family. After Maghrib in the main hall at Ipswich Mosque.'),
        published: true,
        createdAt: new Date('2026-05-12'),
        updatedAt: new Date('2026-05-12'),
      },
    ],
    skipDuplicates: false,
  })
  console.log('✓ Announcements seeded')

  // ── Events ────────────────────────────────────────────────────────────────
  await prisma.event.createMany({
    data: [
      {
        title: 'Eid gathering',
        date: new Date('2026-05-30'),
        time: 'After Asr · ~5:30 PM',
        description: 'Come for the food, stay for the chat. A relaxed evening to mark Eid together — all the family, no need to book.',
        tag: 'Community',
        masjid: 'Nawracy Mosque',
        imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
      },
      {
        title: 'Tafsir — Surah Al-Kahf',
        date: new Date('2026-06-01'),
        time: 'After Isha · ~10:30 PM',
        description: "We're picking up from last week. Bring your Quran — if you missed the last session, don't worry, jump in.",
        tag: 'Education',
        masjid: 'Ipswich Mosque',
        imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
      },
      {
        title: 'Halaqa — anxiety and faith',
        date: new Date('2026-06-04'),
        time: '7:30 – 9:00 PM',
        description: 'An honest conversation about anxiety and where faith fits in. No lecture, no pressure — just people talking. Brothers and sisters both welcome.',
        tag: 'Youth',
        masjid: 'Masjid Taqwa',
        imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
      },
      {
        title: 'Christchurch Park litter pick',
        date: new Date('2026-06-07'),
        time: '10:00 AM – 12:00 PM',
        description: 'Meet at the gates by the museum. Gloves and bags are sorted. Usually done in about 90 minutes — lunch back at the masjid after.',
        tag: 'Outreach',
        masjid: 'Shah Jalal Masjid',
        imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      },
      {
        title: "Sisters' Qur'an circle",
        date: new Date('2026-06-12'),
        time: 'After Maghrib',
        description: "Every week after Maghrib. All levels — whether you're just starting out or working on your tajweed. Tea after, always.",
        tag: 'Education',
        masjid: 'Nawracy Mosque',
        imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
      },
      {
        title: 'New Muslims lunch',
        date: new Date('2026-06-20'),
        time: '1:00 – 3:30 PM',
        description: "For anyone who took their shahada recently, or who's still figuring things out. No agenda, no awkward questions — just food and familiar faces. Let us know you're coming if you can.",
        tag: 'Community',
        masjid: 'Ipswich Mosque',
        imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
      },
    ],
    skipDuplicates: false,
  })
  console.log('✓ Events seeded')

  // ── Classes ───────────────────────────────────────────────────────────────
  await prisma.class.createMany({
    data: [
      { title: 'Weekend Madrasah',         teacher: 'Contact masjid',dayTime: 'Sat & Sun · 10am–1pm',  schedule: 'Education', description: "Qur'an, Arabic and Islamic studies for ages 5–14. Small classes, two qualified teachers. Short waiting list — email to join.",        masjid: 'Nawracy Mosque',    category: 'Children'  },
      { title: "Adult Qur'an Class",       teacher: 'Contact masjid',dayTime: 'Mon · After Isha',       schedule: 'Education', description: 'Tajweed and recitation, all levels. Brothers and sisters in separate sessions.',                                                       masjid: 'Ipswich Mosque',    category: 'Education' },
      { title: 'Riyad as-Salihin Circle',  teacher: 'Contact masjid',dayTime: 'Wed · After Maghrib',    schedule: 'Hadith',    description: 'One chapter a week, discussion after each hadith. Recordings on Mixlr.',                                                              masjid: 'Masjid Taqwa',      category: 'Education' },
      { title: 'Youth Halaqa (16–25)',      teacher: 'Contact masjid',dayTime: 'Thu · 7:30–9:00 PM',     schedule: 'Youth',     description: 'Real talk on faith and everyday life. No slides, no lectures — just conversation. Snacks sorted.',                                    masjid: 'Masjid Taqwa',      category: 'Youth'     },
      { title: 'Brothers Football',         teacher: 'WhatsApp group',     dayTime: 'Fri · 8–10 PM',          schedule: 'Sport',     description: 'Five-a-side at Ipswich Sports Club. £3/session covers pitch hire. All abilities.',                                                    masjid: 'Cross-community',   category: 'Youth'     },
      { title: "Sisters' Qur'an Circle",   teacher: 'Contact masjid',dayTime: 'Fri · After Maghrib',    schedule: 'Sisters',   description: 'Recitation and short tafsir, every week. All ages, all levels. Tea after.',                                                           masjid: 'Nawracy Mosque',    category: 'Sisters'   },
      { title: 'Mother & Baby Group',       teacher: 'Contact masjid',dayTime: 'Tue · 10–11:30 AM',      schedule: 'Sisters',   description: 'Drop-in for mothers with young children. Play space, tea, and light Islamic discussion.',                                             masjid: 'Ipswich Mosque',    category: 'Sisters'   },
      { title: 'After-school Qur\'an Club', teacher: 'Contact masjid',dayTime: 'Mon–Thu · 5–7 PM',       schedule: 'Children',  description: 'Daily recitation and basic Arabic for school-age children.',                                                                         masjid: 'Shah Jalal Masjid', category: 'Children'  },
      { title: 'Friday Charity Collection', teacher: 'Treasurer',          dayTime: "Fri · After Jumu'ah",   schedule: 'Welfare',   description: 'Goes to Suffolk Foodbank and the SMS welfare fund. Collected after Jumu\'ah at all four masaajid.',                                   masjid: 'All four masaajid', category: 'Community' },
    ],
    skipDuplicates: false,
  })
  console.log('✓ Classes seeded')

  // ── Timetable placeholders ────────────────────────────────────────────────
  await prisma.timetable.createMany({
    data: [
      { masjidId: 'nawra',     fileUrl: '', fileType: 'none', weekOf: '2026-W23' },
      { masjidId: 'taqwa',     fileUrl: '', fileType: 'none', weekOf: '2026-W23' },
      { masjidId: 'ipswich',   fileUrl: '', fileType: 'none', weekOf: '2026-W23' },
      { masjidId: 'shahjalal', fileUrl: '', fileType: 'none', weekOf: '2026-W23' },
    ],
    skipDuplicates: false,
  })
  console.log('✓ Timetable placeholders seeded')

  console.log('\nSeeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
