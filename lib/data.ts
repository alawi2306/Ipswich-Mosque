// Static data — all hardcoded content from prototype data.jsx and data2.jsx

export interface Masjid {
  id: string
  name: string
  short: string
  area: string
  address: string
  phone?: string
  email: string
  img: string
  scrapeUrl?: string
  note?: string
}

export interface PrayerTimes {
  fajr: [string, string]
  sunrise: string
  dhuhr: [string, string]
  asr: [string, string]
  maghrib: [string, string]
  isha: [string, string]
}

export interface WeekRow {
  day: string
  date: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  jumuah?: string
}

export interface JanazahStep {
  title: string
  body: string
  list?: string[]
}

export interface CommitteeMember {
  name: string
  role: string
}

export interface HalalPlace {
  id: number
  name: string
  category: string
  rating: number
  addr: string
  hmc: boolean
  prayer: boolean
  family: boolean
  img: string
}

export interface Activity {
  tag: string
  icon: string
  name: string
  when: string
  desc: string
  masjid: string
  contact: string
  category: string
}

export interface VolunteerRole {
  icon: string
  name: string
  desc: string
}

export interface SistersWeekly {
  day: string
  name: string
  time: string
  desc: string
  where: string
}

export interface SistersGalleryItem {
  src: string
  caption: string
  date: string
}

export interface FuneralSection {
  title: string
  body: string
  list?: string[]
}

export interface FuneralTab {
  id: string
  label: string
  sections: FuneralSection[]
}

export interface TimelineItem {
  date: string
  tag: string
  title: string
  desc: string
  meta: string
  photos: string[]
}

// ─── Masjids ────────────────────────────────────────────────────────────────

export const MASJIDS: Masjid[] = [
  {
    id: 'nawra',
    name: 'Nawracy Mosque',
    short: 'Nawracy',
    area: 'Ipswich · IP4',
    address: '5 Woodbridge Road, Ipswich IP4 2EA',
    email: 'info@nawracymosque.org',
    img: '/mosque-nawracy.jpg',
    scrapeUrl: 'https://nawracymosque.org/ipswich-prayer-times/',
    note: 'Timetable data is from 2025 — please re-sync or update manually.',
  },
  {
    id: 'taqwa',
    name: 'Masjid Taqwa',
    short: 'Taqwa',
    area: 'Ipswich · IP1',
    address: '63 Westgate Street, Ipswich IP1 3DZ',
    phone: '01473 218 660',
    email: 'info@masjidtaqwa.org',
    img: '/mosque-taqwa.jpg',
    note: 'Masjid Taqwa has no website. Begin times can be estimated via postcode — congregation (iqamah) times must be filled in manually or from their monthly Facebook timetable.',
  },
  {
    id: 'ipswich',
    name: 'Ipswich Mosque',
    short: 'Ipswich',
    area: 'Bond Street · IP4',
    address: '32-36 Bond Street, Ipswich IP4 1JE',
    phone: '01473 226879',
    email: 'info@ipswichmosque.org',
    img: '/mosque-ipswich.jpg',
    scrapeUrl: 'https://www.ipswichmosque.org/prayer_time.php',
  },
  {
    id: 'shahjalal',
    name: 'Shahjalal Islamic Centre and Masjid',
    short: 'Shah Jalal',
    area: 'Argyle Street · IP4',
    address: '15 Argyle Street, Ipswich IP4 2NE',
    phone: '01473 412983',
    email: 'info@shahjalalmasjidipswich.co.uk',
    img: '/mosque-shahjalal.jpg',
    scrapeUrl: 'https://www.shahjalalmasjidipswich.co.uk/',
    note: 'This site only shows today\'s prayer times — each sync imports today only, not the full month.',
  },
]

// ─── Prayer times ────────────────────────────────────────────────────────────

export const TODAY_TIMES: Record<string, PrayerTimes> = {
  nawra:     { fajr: ['3:18','3:45'], sunrise: '4:55', dhuhr: ['12:55','1:30'], asr: ['5:00','6:30'], maghrib: ['8:55','9:00'], isha: ['10:25','10:45'] },
  taqwa:     { fajr: ['3:20','3:50'], sunrise: '4:55', dhuhr: ['12:55','1:15'], asr: ['5:00','6:15'], maghrib: ['8:55','9:00'], isha: ['10:25','10:30'] },
  ipswich:   { fajr: ['3:18','3:30'], sunrise: '4:55', dhuhr: ['12:55','1:15'], asr: ['5:00','6:45'], maghrib: ['8:55','9:00'], isha: ['10:25','10:40'] },
  shahjalal: { fajr: ['3:20','4:00'], sunrise: '4:55', dhuhr: ['12:55','1:45'], asr: ['5:00','6:30'], maghrib: ['8:55','9:00'], isha: ['10:25','11:00'] },
}

export const WEEK_TIMETABLE: WeekRow[] = [
  { day: 'Mon 25', date: '25 May', fajr: '3:18/3:45', sunrise: '4:55', dhuhr: '12:55/1:30', asr: '5:00/6:30', maghrib: '8:55', isha: '10:25/10:45' },
  { day: 'Tue 26', date: '26 May', fajr: '3:16/3:45', sunrise: '4:54', dhuhr: '12:55/1:30', asr: '5:01/6:30', maghrib: '8:57', isha: '10:27/10:45' },
  { day: 'Wed 27', date: '27 May', fajr: '3:15/3:45', sunrise: '4:53', dhuhr: '12:55/1:30', asr: '5:02/6:30', maghrib: '8:58', isha: '10:29/10:45' },
  { day: 'Thu 28', date: '28 May', fajr: '3:14/3:45', sunrise: '4:53', dhuhr: '12:55/1:30', asr: '5:03/6:30', maghrib: '8:59', isha: '10:31/10:45' },
  { day: 'Fri 29', date: '29 May', fajr: '3:13/3:45', sunrise: '4:52', dhuhr: '1:00/1:45',  asr: '5:04/6:30', maghrib: '9:01', isha: '10:32/10:45', jumuah: '1:30 & 2:00' },
  { day: 'Sat 30', date: '30 May', fajr: '3:12/3:45', sunrise: '4:51', dhuhr: '12:55/1:30', asr: '5:05/6:30', maghrib: '9:02', isha: '10:34/10:45' },
  { day: 'Sun 31', date: '31 May', fajr: '3:11/3:45', sunrise: '4:51', dhuhr: '12:55/1:30', asr: '5:06/6:30', maghrib: '9:03', isha: '10:36/10:45' },
]

// ─── Janazah steps ───────────────────────────────────────────────────────────

export const JANAZAH_STEPS: JanazahStep[] = [
  {
    title: 'Call us, then the GP',
    body: "Our funeral coordinator will walk the family through every step. If the death was at home, the GP needs to attend to issue the medical certificate; if at hospital, the staff there will issue it. Don't worry about getting the order right — call us and we'll guide you.",
    list: ['SMS funeral coordinator (contact us, 24 hrs)', 'GP for a death at home', 'Hospital ward for a death in hospital'],
  },
  {
    title: 'Register the death',
    body: "By law the death must be registered with Suffolk Registry within 5 working days. They issue the certificate that everything else (probate, banks, plot allocation) depends on. We can come with you if you'd rather not go alone.",
    list: ['Suffolk Registry — 0345 607 2050', 'Bring photo ID and the medical certificate', 'Get extra certified copies — banks each need one'],
  },
  {
    title: 'Ghusl and kafan',
    body: 'Performed by trained brothers (for males) or sisters (for females) at our partner mortuary. Close family may be present if they wish. Kafan is provided by SMS.',
  },
  {
    title: 'Salatul Janazah',
    body: "Held at the masjid closest to the family, usually after Dhuhr or Asr. The imam will agree timing with the family. The prayer takes only a few minutes — anyone in the masjid at the time is encouraged to join.",
  },
  {
    title: 'Burial at Old Cemetery',
    body: 'The Muslim section is at Old Cemetery on Cemetery Road, Ipswich (IP4 2TQ). SMS holds the lease and covers the plot fee for Suffolk-resident families. A plot is usually ready within 24–48 hours.',
    list: ['Plot fee: covered by SMS for residents', 'Family may take part in lowering and filling', 'Out-of-area burials by arrangement'],
  },
  {
    title: 'After the burial',
    body: "We'll check in with the family in the days after. The sisters' group organises a meal rota for the first week, and we can put you in touch with someone for help with inheritance (mirath), probate, or just to talk. No time limit on any of this.",
  },
]

// ─── Committee ───────────────────────────────────────────────────────────────

export const COMMITTEE: CommitteeMember[] = [
  { name: 'TBC', role: 'Chair' },
  { name: 'TBC', role: 'Treasurer' },
  { name: 'TBC', role: "Secretary & sisters' lead" },
  { name: 'TBC', role: 'Education' },
  { name: 'TBC', role: 'Welfare' },
  { name: 'TBC', role: 'Youth' },
  { name: 'TBC', role: 'Funeral coordinator' },
  { name: 'TBC', role: 'Operations' },
]

// ─── Halal places ────────────────────────────────────────────────────────────

export const HALAL_PLACES: HalalPlace[] = [
  { id: 1,  name: 'Spice Lounge',          category: 'Restaurants',    rating: 4.7, addr: 'Tavern Street, IP1 3AY',      hmc: true,  prayer: true,  family: true,  img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80' },
  { id: 2,  name: 'Al-Khair Kebab House',  category: 'Takeaways',      rating: 4.5, addr: 'Norwich Road, IP1 2NN',       hmc: true,  prayer: false, family: false, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
  { id: 3,  name: 'Ipswich Halal Butchers',category: 'Butchers',       rating: 4.8, addr: 'Bramford Road, IP1 4AL',      hmc: true,  prayer: false, family: false, img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80' },
  { id: 4,  name: 'Madina Supermarket',    category: 'Grocery shops',  rating: 4.6, addr: "St Helen's Street, IP4 2LH",  hmc: false, prayer: true,  family: true,  img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80' },
  { id: 5,  name: 'Karak House',           category: 'Dessert shops',  rating: 4.9, addr: 'Westgate Street, IP1 3DH',    hmc: false, prayer: false, family: true,  img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80' },
  { id: 6,  name: 'Tandoori Nights',       category: 'Restaurants',    rating: 4.4, addr: 'Cauldwell Hall Rd, IP4 4QF',  hmc: false, prayer: true,  family: true,  img: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&q=80' },
  { id: 7,  name: 'Suffolk Halal Meats',   category: 'Butchers',       rating: 4.6, addr: 'Spring Road, IP4 5NJ',        hmc: true,  prayer: false, family: false, img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80' },
  { id: 8,  name: 'Chai & Chaat',          category: 'Restaurants',    rating: 4.5, addr: 'Carr Street, IP4 1EJ',        hmc: false, prayer: true,  family: true,  img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80' },
  { id: 9,  name: 'Crispy Box Pizza',      category: 'Takeaways',      rating: 4.3, addr: 'Felixstowe Road, IP3 9BL',    hmc: true,  prayer: false, family: true,  img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80' },
  { id: 10, name: 'Sweet Dreams',          category: 'Dessert shops',  rating: 4.7, addr: 'Bond Street, IP4 1JE',        hmc: false, prayer: true,  family: true,  img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80' },
  { id: 11, name: 'East Asia Mart',        category: 'Grocery shops',  rating: 4.5, addr: 'Princes Street, IP1 1RJ',    hmc: false, prayer: false, family: true,  img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80' },
  { id: 12, name: 'BBQ Express',           category: 'Takeaways',      rating: 4.2, addr: 'Bramford Lane, IP1 4EA',      hmc: true,  prayer: true,  family: false, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80' },
]

// ─── Activities ──────────────────────────────────────────────────────────────

export const ACTIVITIES: Activity[] = [
  { tag: 'Education', icon: 'Book',  name: 'Weekend Madrasah',          when: 'Sat & Sun · 10am–1pm',   desc: "Qur'an, Arabic and Islamic studies for ages 5–14. Small classes, two qualified teachers.",                  masjid: 'Nawracy Mosque',    contact: 'Contact masjid',  category: 'Children'  },
  { tag: 'Education', icon: 'Book',  name: "Adult Qur'an Class",        when: 'Mon · After Isha',        desc: 'Tajweed and recitation, all levels. Brothers and sisters in separate sessions.',                            masjid: 'Ipswich Mosque',    contact: 'Contact masjid',  category: 'Education' },
  { tag: 'Hadith',    icon: 'Book',  name: 'Riyad as-Salihin Circle',   when: 'Wed · After Maghrib',     desc: 'One chapter a week, discussion after each hadith. Recordings on Mixlr.',                                   masjid: 'Masjid Taqwa',      contact: 'Contact masjid',  category: 'Education' },
  { tag: 'Youth',     icon: 'Users', name: 'Youth Halaqa (16–25)',      when: 'Thu · 7:30–9:00 PM',      desc: 'Real talk on faith and everyday life. No slides, no lectures — just conversation. Snacks sorted.',          masjid: 'Masjid Taqwa',      contact: 'Contact masjid',  category: 'Youth'     },
  { tag: 'Sport',     icon: 'Users', name: 'Brothers Football',         when: 'Fri · 8–10 PM',           desc: 'Five-a-side at Ipswich Sports Club. £3/session. All abilities.',                                           masjid: 'Cross-community',   contact: 'WhatsApp group',  category: 'Youth'     },
  { tag: 'Sisters',   icon: 'Heart', name: "Sisters' Qur'an Circle",   when: 'Fri · After Maghrib',     desc: 'Recitation and short tafsir, every week. All ages, all levels. Tea after.',                                 masjid: 'Nawracy Mosque',    contact: 'Contact masjid',  category: 'Sisters'   },
  { tag: 'Sisters',   icon: 'Heart', name: 'Mother & Baby Group',      when: 'Tue · 10–11:30 AM',       desc: 'Drop-in for mothers with young children. Play space, tea, and light Islamic discussion.',                   masjid: 'Ipswich Mosque',    contact: 'Contact masjid',  category: 'Sisters'   },
  { tag: 'Children',  icon: 'Users', name: "After-school Qur'an Club", when: 'Mon–Thu · 5–7 PM',        desc: 'Daily recitation and basic Arabic for school-age children.',                                               masjid: 'Shah Jalal Masjid', contact: 'Contact masjid',  category: 'Children'  },
  { tag: 'Welfare',   icon: 'Heart', name: 'Friday Charity Collection', when: "Fri · After Jumu'ah",    desc: "Goes to Suffolk Foodbank and the SMS welfare fund. Collected after Jumu'ah at all four masaajid.",          masjid: 'All four masaajid', contact: 'Treasurer',        category: 'Community' },
]

// ─── Volunteer roles ─────────────────────────────────────────────────────────

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  { icon: 'Calendar',  name: 'Event Support',      desc: 'Help set up, run and pack down community events. Flexible, no commitment.' },
  { icon: 'Book',      name: 'Media / Design',     desc: 'Posters, social media, photography. Bring your skills.' },
  { icon: 'Book',      name: 'Photography',        desc: 'Document community events. Photos used on the website and social.' },
  { icon: 'Book',      name: 'IT / Web Support',   desc: 'Help maintain the website, prayer times sync, and tech for events.' },
  { icon: 'Heart',     name: 'Sisters Support',    desc: "Run sisters circles, welfare visits, mother-and-baby groups." },
  { icon: 'Users',     name: 'Youth Mentoring',    desc: 'Lead halaqas and informal mentoring for ages 16–25.' },
  { icon: 'Book',      name: 'Administration',     desc: 'Coordinating schedules, mailing list, committee minutes.' },
  { icon: 'HandHeart', name: 'Fundraising',        desc: 'Help organise donation drives and Gift Aid claims.' },
]

// ─── Sisters weekly ──────────────────────────────────────────────────────────

export const SISTERS_WEEKLY: SistersWeekly[] = [
  { day: 'Tuesday',  name: 'Mother & Baby Group',      time: '10:00 AM – 11:30 AM', desc: "Drop-in for mothers with young children. Safe play space, informal Islamic discussion, and a chance to meet other mums.",                                    where: 'Ipswich Mosque'    },
  { day: 'Wednesday',name: 'Sisters Halaqa',           time: 'After Maghrib',        desc: 'Weekly study circle covering tafsir, hadith and contemporary topics. Open to all sisters, all levels welcome.',                                             where: 'Masjid Taqwa'      },
  { day: 'Thursday', name: 'Arabic for Beginners',     time: '7:30 PM – 9:00 PM',   desc: '10-week beginner Arabic course for sisters. Currently mid-term — join the waiting list for the next intake.',                                               where: 'Nawracy Mosque'      },
  { day: 'Friday',   name: 'Qur\'an Recitation Circle',time: 'After Maghrib',        desc: 'Weekly recitation and tajweed practice. Refreshments served. All levels welcome.',                                                                          where: 'Nawracy Mosque'      },
  { day: 'Saturday', name: 'Sisters Walking Group',    time: '9:00 AM – 10:00 AM',  desc: 'Brisk walk around Christchurch Park. Coffee after at a local café. Children welcome in buggies.',                                                           where: 'Meet at park gates' },
  { day: 'Monthly',  name: 'Sisters Brunch',           time: 'Last Sunday · 11:00 AM',desc: 'Monthly informal brunch and social. Different host each month — see WhatsApp group for details.',                                                         where: 'Rotating venues'   },
]

export const SISTERS_GALLERY: SistersGalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80', caption: 'Ramadan iftar 2026', date: 'March 2026' },
  { src: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80', caption: 'Eid party', date: 'April 2026' },
  { src: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80', caption: "Qur'an circle", date: 'Weekly' },
  { src: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80', caption: 'Sisters retreat', date: 'Feb 2026' },
  { src: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80', caption: 'Welfare drive', date: 'Jan 2026' },
  { src: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80', caption: 'Mother & baby', date: 'Weekly' },
  { src: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80', caption: 'Arabic class', date: 'Dec 2025' },
]

// ─── Funeral tabs ────────────────────────────────────────────────────────────

export const FUNERAL_TABS: FuneralTab[] = [
  {
    id: 'immediate',
    label: 'Immediate Steps',
    sections: [
      { title: 'Who to contact first', body: 'If the death occurs at home, call the family GP. If at hospital, the medical staff will issue the certificate. In either case, call the SMS funeral coordinator next — we will guide you through every following step.', list: ['GP for home death', 'SMS funeral coordinator (contact us)', 'Suffolk Registry within 5 working days'] },
      { title: 'GP and death certificate', body: 'A doctor must confirm the death and issue the Medical Certificate of Cause of Death (MCCD). The MCCD is then taken to the registrar.' },
      { title: 'Funeral director', body: 'SMS works with two trusted Muslim-owned funeral directors in the region. There is no cost to bereaved Suffolk-resident families — covered by the society.', list: ['Bismillah Funerals (Ipswich)', 'Janaza Care UK (Norwich)', 'We arrange transport, paperwork and burial'] },
      { title: 'Mosque contact', body: 'Salatul Janazah is held at the masjid closest to the family. The imam at the chosen masjid will coordinate timing with the family.' },
    ],
  },
  {
    id: 'process',
    label: 'Janazah Process',
    sections: [
      { title: 'Ghusl', body: 'Performed by trained brothers (for males) or sisters (for females) at our partner mortuary. Family members may attend if they wish, subject to availability. The ghusl is performed with the utmost care and modesty.' },
      { title: 'Kafan (shrouding)', body: 'After ghusl, the deceased is wrapped in white cotton shroud sheets. Three sheets for males, five for females. SMS provides kafan free of charge.' },
      { title: 'Salatul Janazah', body: 'The funeral prayer is performed by the congregation. It is typically held after one of the daily prayers — most often Dhuhr or Asr — at the chosen masjid. Open to all who wish to attend.' },
      { title: 'Burial', body: 'Burial takes place at Ipswich Cemetery, where SMS holds a long lease on the Muslim section. A dedicated plot is allocated within 24–48 hours of death. Family members may take part in lowering and filling the grave.' },
    ],
  },
  {
    id: 'resources',
    label: 'Local Resources',
    sections: [
      { title: 'Funeral services we work with', body: 'Both providers are Muslim-owned, registered with the National Association of Funeral Directors, and familiar with our local processes.', list: ['Bismillah Funerals — 01473 200 100', 'Janaza Care UK — 01603 250 100', 'Available 24 hours, every day'] },
      { title: 'Graveyard information', body: 'The Muslim section of Old Cemetery on Cemetery Road, Ipswich (IP4 2TQ) has been used by the local community for over forty years. SMS holds the lease and maintains the plots.', list: ['Plot fee: £0 for Suffolk residents', 'Out-of-area burials by arrangement', 'Family-only viewings available'] },
      { title: 'Mosque support contacts', body: 'Each masjid has a designated point of contact for funeral matters. Contact the masjid directly or reach us through the SMS contact page.' },
      { title: 'Suffolk Registry Office', body: 'Death must be registered within 5 working days. Bring photo ID and the medical certificate. Request multiple certified copies (£11 each) — these are needed for banks, probate and inheritance.' },
    ],
  },
  {
    id: 'guidance',
    label: 'Islamic Guidance',
    sections: [
      { title: 'Islamic reminders', body: '"Verily we belong to Allah, and verily to Him do we return." The Prophet ﷺ said: "Whoever has died, do not mention them except in good." Patience (sabr) is among the highest stations — and crying is permitted, as the Prophet ﷺ himself wept for his son Ibrahim.' },
      { title: 'Support resources', body: 'An SMS volunteer will check in with the family in the days and weeks following the burial. A meal rota is organised by the local sisters\' group for the first week, and bereavement support is available on request.', list: ['Meal rota — first 7 days', 'Mirath (inheritance) guidance', 'Probate help', 'Bereavement counselling on request'] },
      { title: 'Bereavement support', body: 'Loss is heavy, and grief takes time. We provide a confidential listening ear, can connect families with an Islamically-grounded counsellor, and check in regularly. There is no time limit on this support.' },
      { title: 'For non-Muslim family members', body: 'We welcome questions and attendance from non-Muslim family members. The imam will explain the prayer and burial customs, and family members of all faiths are welcome at the funeral and graveside.' },
    ],
  },
]

// ─── Community timeline ──────────────────────────────────────────────────────

export const TIMELINE: TimelineItem[] = [
  {
    date: 'March 2026',
    tag: 'Outreach',
    title: 'Ramadan iftar deliveries with the foodbank',
    desc: "Volunteers across the four masaajid put together iftar meals for families using Ipswich Foodbank during the last ten nights. The schools at Murrayfield and Springfield helped distribute. Around 1,400 meals went out — JazakAllah Khair to everyone who chipped in.",
    meta: '~1,400 meals · 60+ volunteers',
    photos: ['https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80', 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80'],
  },
  {
    date: 'December 2025',
    tag: 'Youth',
    title: "Brothers' football tournament",
    desc: 'Six teams from across the masaajid played a friendly tournament at Ipswich Sports Club one Saturday. Shah Jalal won (just). Entry fees and a small raffle raised £2,300 — going to the new madrasah library at Nawracy.',
    meta: '6 teams · £2,300 raised',
    photos: ['https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'],
  },
  {
    date: 'September 2025',
    tag: 'Education',
    title: 'Weekend madrasah opens at Nawracy',
    desc: 'Saturday and Sunday morning classes for children 5–14. Two qualified teachers, 80 students enrolled. Spaces are limited and there\'s a small waiting list — please email if you\'d like to add your child.',
    meta: '80 students · Sat & Sun · 10am–1pm',
    photos: ['https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'],
  },
  {
    date: 'June 2025',
    tag: 'Community',
    title: 'Open iftar at the Town Hall',
    desc: "We hosted an open iftar at Ipswich Town Hall with the Mayor's office — open to anyone curious about Ramadan, of any faith or none. Around 500 came. The biryani team are still recovering.",
    meta: '~500 guests · Mayor in attendance',
    photos: ['https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80'],
  },
]
