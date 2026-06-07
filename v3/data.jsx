// Static data for SMS site

const MASJIDS = [
  {
    id: "nawra",
    name: "Nawra Mosque",
    short: "Nawra",
    area: "Ipswich · IP3",
    address: "Cauldwell Hall Road, Ipswich IP4 4QF",
    phone: "01473 412 904",
    email: "info@nawracymosque.org",
    img: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
  },
  {
    id: "taqwa",
    name: "Masjid Taqwa",
    short: "Taqwa",
    area: "Ipswich · IP1",
    address: "Norwich Road, Ipswich IP1 2NN",
    phone: "01473 218 660",
    email: "info@masjidtaqwa.org",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
  {
    id: "ipswich",
    name: "Ipswich Mosque",
    short: "Ipswich",
    area: "Bond Street · IP4",
    address: "8 Bond Street, Ipswich IP4 1JE",
    phone: "01473 251 578",
    email: "info@ipswichmosque.org",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
  {
    id: "shahjalal",
    name: "Shah Jalal Masjid",
    short: "Shah Jalal",
    area: "Ipswich · IP3",
    address: "Bramford Lane, Ipswich IP1 4EA",
    phone: "01473 414 100",
    email: "info@shahjalalmasjidipswich.co.uk",
    img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
  },
];

// Today's begin + iqamah times per masjid (slightly varied per masjid).
// Format: { fajr: ["3:18", "3:35"], sunrise: "4:55", dhuhr: ["12:55", "1:30"], ... }
const TODAY_TIMES = {
  nawra:     { fajr: ["3:18","3:45"], sunrise: "4:55", dhuhr: ["12:55","1:30"], asr: ["5:00","6:30"], maghrib: ["8:55","9:00"], isha: ["10:25","10:45"] },
  taqwa:     { fajr: ["3:20","3:50"], sunrise: "4:55", dhuhr: ["12:55","1:15"], asr: ["5:00","6:15"], maghrib: ["8:55","9:00"], isha: ["10:25","10:30"] },
  ipswich:   { fajr: ["3:18","3:30"], sunrise: "4:55", dhuhr: ["12:55","1:15"], asr: ["5:00","6:45"], maghrib: ["8:55","9:00"], isha: ["10:25","10:40"] },
  shahjalal: { fajr: ["3:20","4:00"], sunrise: "4:55", dhuhr: ["12:55","1:45"], asr: ["5:00","6:30"], maghrib: ["8:55","9:00"], isha: ["10:25","11:00"] },
};

// Week timetable for current masjid (Mon-Sun)
const WEEK_TIMETABLE = [
  { day: "Mon 25",  date: "25 May", fajr: "3:18/3:45", sunrise: "4:55", dhuhr: "12:55/1:30", asr: "5:00/6:30", maghrib: "8:55", isha: "10:25/10:45" },
  { day: "Tue 26",  date: "26 May", fajr: "3:16/3:45", sunrise: "4:54", dhuhr: "12:55/1:30", asr: "5:01/6:30", maghrib: "8:57", isha: "10:27/10:45" },
  { day: "Wed 27",  date: "27 May", fajr: "3:15/3:45", sunrise: "4:53", dhuhr: "12:55/1:30", asr: "5:02/6:30", maghrib: "8:58", isha: "10:29/10:45" },
  { day: "Thu 28",  date: "28 May", fajr: "3:14/3:45", sunrise: "4:53", dhuhr: "12:55/1:30", asr: "5:03/6:30", maghrib: "8:59", isha: "10:31/10:45" },
  { day: "Fri 29",  date: "29 May", fajr: "3:13/3:45", sunrise: "4:52", dhuhr: "1:00/1:45",  asr: "5:04/6:30", maghrib: "9:01", isha: "10:32/10:45", jumuah: "1:30 & 2:00" },
  { day: "Sat 30",  date: "30 May", fajr: "3:12/3:45", sunrise: "4:51", dhuhr: "12:55/1:30", asr: "5:05/6:30", maghrib: "9:02", isha: "10:34/10:45" },
  { day: "Sun 31",  date: "31 May", fajr: "3:11/3:45", sunrise: "4:51", dhuhr: "12:55/1:30", asr: "5:06/6:30", maghrib: "9:03", isha: "10:36/10:45" },
];

const EVENTS = [
  {
    id: "1",
    day: "30", mon: "MAY", date: "Saturday, 30 May 2026",
    title: "Family Iftar & Community Gathering",
    tag: "Community", masjid: "Nawra Mosque",
    time: "8:30 PM – 10:30 PM",
    desc: "Open to all families. Light dinner provided after Maghrib. Children's activities in the side hall.",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
  {
    id: "2",
    day: "01", mon: "JUN", date: "Monday, 1 June 2026",
    title: "Tafsir Class — Surah Al-Kahf",
    tag: "Education", masjid: "Ipswich Mosque",
    time: "After Isha · 9:00 PM",
    desc: "Weekly tafsir series led by Imam Yusuf. Open to brothers and sisters. Notes provided.",
    img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
  },
  {
    id: "3",
    day: "04", mon: "JUN", date: "Thursday, 4 June 2026",
    title: "Youth Halaqa: Faith & Mental Health",
    tag: "Youth", masjid: "Masjid Taqwa",
    time: "7:30 PM – 9:00 PM",
    desc: "An open discussion for 16–25s on navigating mental wellbeing through an Islamic lens.",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
  {
    id: "4",
    day: "07", mon: "JUN", date: "Sunday, 7 June 2026",
    title: "Suffolk Community Cleanup",
    tag: "Outreach", masjid: "Shah Jalal Masjid",
    time: "10:00 AM – 1:00 PM",
    desc: "Meeting at Christchurch Park. Bring gloves and water. Lunch provided after.",
    img: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
  },
  {
    id: "5",
    day: "12", mon: "JUN", date: "Friday, 12 June 2026",
    title: "Sisters' Quran Recitation Circle",
    tag: "Education", masjid: "Nawra Mosque",
    time: "After Maghrib · 9:15 PM",
    desc: "Weekly circle for sisters. All levels welcome. Tea and refreshments provided.",
    img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
  },
  {
    id: "6",
    day: "20", mon: "JUN", date: "Saturday, 20 June 2026",
    title: "New Muslim Welcome Day",
    tag: "Community", masjid: "Ipswich Mosque",
    time: "1:00 PM – 5:00 PM",
    desc: "A day for new and returning Muslims. Q&A with imams, mentor matching, and shared meal.",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
];

const ANNOUNCEMENTS = [
  { title: "Eid al-Adha prayer arrangements confirmed", date: "21 May 2026", excerpt: "Three congregations across Suffolk on Friday 6 June — see full schedule and parking guidance." },
  { title: "Updated Jumu'ah times from 30 May", date: "18 May 2026", excerpt: "Summer schedule moves first congregation to 1:30 PM across Ipswich masjids." },
  { title: "Hajj 2026 — committee briefing", date: "12 May 2026", excerpt: "Pre-departure session for pilgrims and family — Saturday 23 May after Maghrib." },
];

const JANAZAH_STEPS = [
  {
    title: "Notify the family doctor and registrar",
    body: "Contact the deceased's GP to confirm the death. If the death occurs in hospital, the medical certificate is issued there. The death must be registered with Suffolk Registry within 5 working days.",
    list: ["Suffolk Registry Office — 0345 607 2050", "Bring photo ID and the medical certificate", "Request multiple certified copies (£11 each)"],
  },
  {
    title: "Contact the SMS Janazah coordinator",
    body: "Call the dedicated 24-hour line. The coordinator will guide the family through next steps and arrange ghusl and shrouding at the partner facility.",
    list: ["24-hour line: 07700 900 123", "We will liaise with the funeral director", "No cost to the bereaved family"],
  },
  {
    title: "Ghusl and kafan",
    body: "Performed by trained brothers or sisters at our partner mortuary. Family members may attend the ghusl if they wish, subject to availability.",
  },
  {
    title: "Salatul Janazah",
    body: "Held at the masjid closest to the family home or the location of burial. The congregation gathers after one of the daily prayers — usually Dhuhr or Asr.",
  },
  {
    title: "Burial at Ipswich Cemetery",
    body: "SMS holds a long lease on the Muslim section at Old Cemetery, Cemetery Road, Ipswich IP4 2TQ. A dedicated plot is allocated within 24–48 hours of death where possible.",
    list: ["Plot fee: covered by SMS for Suffolk residents", "Out-of-area burials by arrangement", "Family may take part in lowering and filling the grave"],
  },
  {
    title: "Condolences and follow-up",
    body: "An SMS volunteer will check in with the family in the days following the burial. Bereavement support, meal rotas, and guidance on inheritance (Mirath) are available on request.",
  },
];

const COMMITTEE = [
  { name: "Br. Raydwan Hussain", role: "Chair & Community Liaison" },
  { name: "Br. Imran Khan", role: "Treasurer" },
  { name: "Sr. Aisha Begum", role: "Secretary" },
  { name: "Br. Yusuf Ali", role: "Education Lead" },
  { name: "Sr. Fatima Rahman", role: "Sisters' Outreach" },
  { name: "Br. Omar Patel", role: "Youth Coordinator" },
  { name: "Br. Mahmood Iqbal", role: "Janazah Coordinator" },
  { name: "Br. Hasan Choudhury", role: "Operations" },
];

Object.assign(window, { MASJIDS, TODAY_TIMES, WEEK_TIMETABLE, EVENTS, ANNOUNCEMENTS, JANAZAH_STEPS, COMMITTEE });
