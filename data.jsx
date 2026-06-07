// Static data for SMS site

const MASJIDS = [
  {
    id: "nawra",
    name: "Nawra Mosque",
    short: "Nawra",
    area: "Ipswich · IP3",
    address: "Cauldwell Hall Road, Ipswich IP4 4QF",
    phone: "01473 412 904",
    email: "info@nawramosque.org",
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
    title: "Eid Celebration",
    tag: "Community", masjid: "Nawra Mosque",
    time: "After Asr · around 5:30 PM",
    desc: "Celebrate Eid with us on the 30th May",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
  {
    id: "2",
    day: "01", mon: "JUN", date: "Monday, 1 June 2026",
    title: "Tafsir Surah Al-Kahf",
    tag: "Education", masjid: "Ipswich Mosque",
    time: "After Isha · around 10:30 PM",
    desc: "Weekly tafsir, continuing from Al Kahf",
    img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
  },
  {
    id: "3",
    day: "04", mon: "JUN", date: "Thursday, 4 June 2026",
    title: "Halaqa — dealing with anxiety",
    tag: "Youth", masjid: "Masjid Taqwa",
    time: "7:30 PM – 9:00 PM",
    desc: "Learn how to deal with anxiety with us.",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
  {
    id: "4",
    day: "07", mon: "JUN", date: "Sunday, 7 June 2026",
    title: "Christchurch Park litter pick",
    tag: "Outreach", masjid: "Shah Jalal Masjid",
    time: "10:00 AM – 12:00 PM",
    desc: "Meet at the park gates near the museum. Gloves and pickers provided by the council. Light lunch back at the masjid after.",
    img: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
  },
  {
    id: "5",
    day: "12", mon: "JUN", date: "Friday, 12 June 2026",
    title: "Sisters' Qur'an circle (weekly)",
    tag: "Education", masjid: "Nawra Mosque",
    time: "After Maghrib",
    desc: "Recitation and tajweed practice with Sr. Aisha. New sisters very welcome — no need to book, just come along. Tea after.",
    img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
  },
  {
    id: "6",
    day: "20", mon: "JUN", date: "Saturday, 20 June 2026",
    title: "New Muslims lunch",
    tag: "Community", masjid: "Ipswich Mosque",
    time: "1:00 PM – 3:30 PM",
    desc: "Lunch and Q&A for anyone who has recently taken their shahadah, or who is exploring Islam. Quiet, informal. Please email Sr. Fatima beforehand if you can.",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
  },
];

const ANNOUNCEMENTS = [
  { title: "Eid al-Adha arrangements", date: "21 May 2026", excerpt: "Three congregations across town on Friday 6 June. Parking will be tight — please walk or car-share if you can." },
  { title: "Summer Jumu'ah times start 30 May", date: "18 May 2026", excerpt: "First sitting at 1:30 PM, second at 2:00 PM. Khutbah begins 15 minutes before each." },
  { title: "Hajj group briefing — Sat 23 May", date: "12 May 2026", excerpt: "For everyone going this year, plus family. After Maghrib in the main hall at Ipswich Mosque." },
];

const JANAZAH_STEPS = [
  {
    title: "Call us, then the GP",
    body: "Our funeral coordinator will walk the family through every step. If the death was at home, the GP needs to attend to issue the medical certificate; if at hospital, the staff there will issue it. Don't worry about getting the order right — call us and we'll guide you.",
    list: ["Funeral coordinator: 07700 900 123 (24 hrs)", "GP for a death at home", "Hospital ward for a death in hospital"],
  },
  {
    title: "Register the death",
    body: "By law the death must be registered with Suffolk Registry within 5 working days. They issue the certificate that everything else (probate, banks, plot allocation) depends on. We can come with you if you'd rather not go alone.",
    list: ["Suffolk Registry — 0345 607 2050", "Bring photo ID and the medical certificate", "Get extra certified copies — banks each need one"],
  },
  {
    title: "Ghusl and kafan",
    body: "Performed by trained brothers (for males) or sisters (for females) at our partner mortuary. Close family may be present if they wish. Kafan is provided by SMS.",
  },
  {
    title: "Salatul Janazah",
    body: "Held at the masjid closest to the family, usually after Dhuhr or Asr. The imam will agree timing with the family. The prayer takes only a few minutes — anyone in the masjid at the time is encouraged to join.",
  },
  {
    title: "Burial at Old Cemetery",
    body: "The Muslim section is at Old Cemetery on Cemetery Road, Ipswich (IP4 2TQ). SMS holds the lease and covers the plot fee for Suffolk-resident families. A plot is usually ready within 24–48 hours.",
    list: ["Plot fee: covered by SMS for residents", "Family may take part in lowering and filling", "Out-of-area burials by arrangement"],
  },
  {
    title: "After the burial",
    body: "We'll check in with the family in the days after. The sisters' group organises a meal rota for the first week, and we can put you in touch with someone for help with inheritance (mirath), probate, or just to talk. No time limit on any of this.",
  },
];

const COMMITTEE = [
  { name: "Br. Raydwan Hussain", role: "Chair" },
  { name: "Br. Imran Khan", role: "Treasurer" },
  { name: "Sr. Aisha Begum", role: "Secretary & sisters' lead" },
  { name: "Ustadh Abdul-Karim", role: "Education" },
  { name: "Sr. Fatima Rahman", role: "Welfare" },
  { name: "Br. Omar Patel", role: "Youth" },
  { name: "Br. Mahmood Iqbal", role: "Funeral coordinator" },
  { name: "Br. Hasan Choudhury", role: "Operations" },
];

Object.assign(window, { MASJIDS, TODAY_TIMES, WEEK_TIMETABLE, EVENTS, ANNOUNCEMENTS, JANAZAH_STEPS, COMMITTEE });
