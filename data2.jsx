// SMS — additional data for new pages

const HALAL_PLACES = [
  { id: 1, name: "Spice Lounge", category: "Restaurants", rating: 4.7, addr: "Tavern Street, IP1 3AY", hmc: true, prayer: true, family: true, img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80" },
  { id: 2, name: "Al-Khair Kebab House", category: "Takeaways", rating: 4.5, addr: "Norwich Road, IP1 2NN", hmc: true, prayer: false, family: false, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" },
  { id: 3, name: "Ipswich Halal Butchers", category: "Butchers", rating: 4.8, addr: "Bramford Road, IP1 4AL", hmc: true, prayer: false, family: false, img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80" },
  { id: 4, name: "Madina Supermarket", category: "Grocery shops", rating: 4.6, addr: "St Helen's Street, IP4 2LH", hmc: false, prayer: true, family: true, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80" },
  { id: 5, name: "Karak House", category: "Dessert shops", rating: 4.9, addr: "Westgate Street, IP1 3DH", hmc: false, prayer: false, family: true, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80" },
  { id: 6, name: "Tandoori Nights", category: "Restaurants", rating: 4.4, addr: "Cauldwell Hall Rd, IP4 4QF", hmc: false, prayer: true, family: true, img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&q=80" },
  { id: 7, name: "Suffolk Halal Meats", category: "Butchers", rating: 4.6, addr: "Spring Road, IP4 5NJ", hmc: true, prayer: false, family: false, img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80" },
  { id: 8, name: "Chai & Chaat", category: "Restaurants", rating: 4.5, addr: "Carr Street, IP4 1EJ", hmc: false, prayer: true, family: true, img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80" },
  { id: 9, name: "Crispy Box Pizza", category: "Takeaways", rating: 4.3, addr: "Felixstowe Road, IP3 9BL", hmc: true, prayer: false, family: true, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80" },
  { id: 10, name: "Sweet Dreams", category: "Dessert shops", rating: 4.7, addr: "Bond Street, IP4 1JE", hmc: false, prayer: true, family: true, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80" },
  { id: 11, name: "East Asia Mart", category: "Grocery shops", rating: 4.5, addr: "Princes Street, IP1 1RJ", hmc: false, prayer: false, family: true, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80" },
  { id: 12, name: "BBQ Express", category: "Takeaways", rating: 4.2, addr: "Bramford Lane, IP1 4EA", hmc: true, prayer: true, family: false, img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80" },
];

const ACTIVITIES = [
  { tag: "Education", icon: "Book", name: "Weekend Madrasah", when: "Sat & Sun · 10am–1pm", desc: "Qur'an, Arabic and Islamic studies for children aged 5–14. Two qualified teachers, small class sizes.", masjid: "Nawra Mosque", contact: "madrasah@nawra.org", category: "Children" },
  { tag: "Education", icon: "Book", name: "Adult Qur'an Class", when: "Mon · After Isha", desc: "Tajweed-focused recitation circle. All levels welcome. Brothers and sisters separate sessions.", masjid: "Ipswich Mosque", contact: "Imam Yusuf", category: "Education" },
  { tag: "Hadith", icon: "Book", name: "Riyad as-Salihin Circle", when: "Wed · After Maghrib", desc: "Weekly hadith circle covering one chapter per week. Recordings published on Mixlr.", masjid: "Masjid Taqwa", contact: "Br. Imran", category: "Education" },
  { tag: "Youth", icon: "Users", name: "Youth Halaqa (16–25)", when: "Thu · 7:30–9:00 PM", desc: "Open discussion on faith, life and contemporary issues. Snacks and tea provided.", masjid: "Masjid Taqwa", contact: "Br. Omar", category: "Youth" },
  { tag: "Sport", icon: "Users", name: "Brothers Football", when: "Fri · 8–10 PM", desc: "Five-a-side at Ipswich Sports Club. £3 per session covers pitch hire. All abilities welcome.", masjid: "Cross-community", contact: "WhatsApp group", category: "Youth" },
  { tag: "Sisters", icon: "Heart", name: "Sisters Qur'an Circle", when: "Fri · After Maghrib", desc: "Weekly recitation and tafsir for sisters of all ages. Refreshments served.", masjid: "Nawra Mosque", contact: "Sr. Aisha", category: "Sisters" },
  { tag: "Sisters", icon: "Heart", name: "Mother & Baby Group", when: "Tue · 10–11:30 AM", desc: "Drop-in group for mothers with young children. Safe play space and informal Islamic discussion.", masjid: "Ipswich Mosque", contact: "Sr. Fatima", category: "Sisters" },
  { tag: "Children", icon: "Users", name: "After-school Quran Club", when: "Mon–Thu · 5–7 PM", desc: "Daily recitation practice and basic Arabic for children, after school hours.", masjid: "Shah Jalal Masjid", contact: "01473 414 100", category: "Children" },
  { tag: "Welfare", icon: "Heart", name: "Friday Charity Collection", when: "Fri · After Jumu'ah", desc: "Weekly collection for the Suffolk foodbank and SMS welfare fund. Distributed locally.", masjid: "All four masaajid", contact: "Treasurer", category: "Community" },
];

const VOLUNTEER_ROLES = [
  { icon: "Calendar", name: "Event Support", desc: "Help set up, run and pack down community events. Flexible, no commitment." },
  { icon: "Book", name: "Media / Design", desc: "Posters, social media, photography. Bring your skills." },
  { icon: "Book", name: "Photography", desc: "Document community events. Photos used on the website and social." },
  { icon: "Book", name: "IT / Web Support", desc: "Help maintain the website, prayer times sync, and tech for events." },
  { icon: "Heart", name: "Sisters Support", desc: "Run sisters circles, welfare visits, mother-and-baby groups." },
  { icon: "Users", name: "Youth Mentoring", desc: "Lead halaqas and informal mentoring for ages 16–25." },
  { icon: "Book", name: "Administration", desc: "Coordinating schedules, mailing list, committee minutes." },
  { icon: "HandHeart", name: "Fundraising", desc: "Help organise donation drives and Gift Aid claims." },
];

const SISTERS_WEEKLY = [
  { day: "Tuesday", name: "Mother & Baby Group", time: "10:00 AM – 11:30 AM", desc: "Drop-in for mothers with young children. Safe play space, informal Islamic discussion, and a chance to meet other mums.", where: "Ipswich Mosque" },
  { day: "Wednesday", name: "Sisters Halaqa", time: "After Maghrib", desc: "Weekly study circle covering tafsir, hadith and contemporary topics. Open to all sisters, all levels welcome.", where: "Masjid Taqwa" },
  { day: "Thursday", name: "Arabic for Beginners", time: "7:30 PM – 9:00 PM", desc: "10-week beginner Arabic course for sisters. Currently mid-term — join the waiting list for the next intake.", where: "Nawra Mosque" },
  { day: "Friday", name: "Qur'an Recitation Circle", time: "After Maghrib", desc: "Weekly recitation and tajweed practice. Refreshments served. All levels welcome.", where: "Nawra Mosque" },
  { day: "Saturday", name: "Sisters Walking Group", time: "9:00 AM – 10:00 AM", desc: "Brisk walk around Christchurch Park. Coffee after at a local café. Children welcome in buggies.", where: "Meet at park gates" },
  { day: "Monthly", name: "Sisters Brunch", time: "Last Sunday · 11:00 AM", desc: "Monthly informal brunch and social. Different host each month — see WhatsApp group for details.", where: "Rotating venues" },
];

const SISTERS_GALLERY = [
  { src: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80", caption: "Ramadan iftar 2026", date: "March 2026" },
  { src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80", caption: "Eid party", date: "April 2026" },
  { src: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80", caption: "Qur'an circle", date: "Weekly" },
  { src: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80", caption: "Sisters retreat", date: "Feb 2026" },
  { src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80", caption: "Welfare drive", date: "Jan 2026" },
  { src: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80", caption: "Mother & baby", date: "Weekly" },
  { src: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80", caption: "Arabic class", date: "Dec 2025" },
];

const FUNERAL_TABS = [
  {
    id: "immediate",
    label: "Immediate Steps",
    sections: [
      {
        title: "Who to contact first",
        body: "If the death occurs at home, call the family GP. If at hospital, the medical staff will issue the certificate. In either case, call the SMS funeral coordinator next — we will guide you through every following step.",
        list: ["GP for home death", "SMS coordinator: 07700 900 123", "Suffolk Registry within 5 working days"]
      },
      {
        title: "GP and death certificate",
        body: "A doctor must confirm the death and issue the Medical Certificate of Cause of Death (MCCD). The MCCD is then taken to the registrar.",
      },
      {
        title: "Funeral director",
        body: "SMS works with two trusted Muslim-owned funeral directors in the region. There is no cost to bereaved Suffolk-resident families — covered by the society.",
        list: ["Bismillah Funerals (Ipswich)", "Janaza Care UK (Norwich)", "We arrange transport, paperwork and burial"]
      },
      {
        title: "Mosque contact",
        body: "Salatul Janazah is held at the masjid closest to the family. The imam at the chosen masjid will coordinate timing with the family.",
      },
    ]
  },
  {
    id: "process",
    label: "Janazah Process",
    sections: [
      {
        title: "Ghusl",
        body: "Performed by trained brothers (for males) or sisters (for females) at our partner mortuary. Family members may attend if they wish, subject to availability. The ghusl is performed with the utmost care and modesty.",
      },
      {
        title: "Kafan (shrouding)",
        body: "After ghusl, the deceased is wrapped in white cotton shroud sheets. Three sheets for males, five for females. SMS provides kafan free of charge.",
      },
      {
        title: "Salatul Janazah",
        body: "The funeral prayer is performed by the congregation. It is typically held after one of the daily prayers — most often Dhuhr or Asr — at the chosen masjid. Open to all who wish to attend.",
      },
      {
        title: "Burial",
        body: "Burial takes place at Ipswich Cemetery, where SMS holds a long lease on the Muslim section. A dedicated plot is allocated within 24–48 hours of death. Family members may take part in lowering and filling the grave.",
      },
    ]
  },
  {
    id: "resources",
    label: "Local Resources",
    sections: [
      {
        title: "Funeral services we work with",
        body: "Both providers are Muslim-owned, registered with the National Association of Funeral Directors, and familiar with our local processes.",
        list: ["Bismillah Funerals — 01473 200 100", "Janaza Care UK — 01603 250 100", "Available 24 hours, every day"]
      },
      {
        title: "Graveyard information",
        body: "The Muslim section of Old Cemetery on Cemetery Road, Ipswich (IP4 2TQ) has been used by the local community for over forty years. SMS holds the lease and maintains the plots.",
        list: ["Plot fee: £0 for Suffolk residents", "Out-of-area burials by arrangement", "Family-only viewings available"]
      },
      {
        title: "Mosque support contacts",
        body: "Each masjid has a designated point of contact for funeral matters.",
        list: ["Ipswich Mosque · Imam Yusuf", "Nawra Mosque · Br. Hasan", "Masjid Taqwa · Br. Imran", "Shah Jalal Masjid · Br. Salim"]
      },
      {
        title: "Suffolk Registry Office",
        body: "Death must be registered within 5 working days. Bring photo ID and the medical certificate. Request multiple certified copies (£11 each) — these are needed for banks, probate and inheritance.",
      },
    ]
  },
  {
    id: "guidance",
    label: "Islamic Guidance",
    sections: [
      {
        title: "Islamic reminders",
        body: "“Verily we belong to Allah, and verily to Him do we return.” The Prophet ﷺ said: \"Whoever has died, do not mention them except in good.\" Patience (sabr) is among the highest stations — and crying is permitted, as the Prophet ﷺ himself wept for his son Ibrahim.",
      },
      {
        title: "Support resources",
        body: "An SMS volunteer will check in with the family in the days and weeks following the burial. A meal rota is organised by the local sisters' group for the first week, and bereavement support is available on request.",
        list: ["Meal rota — first 7 days", "Mirath (inheritance) guidance", "Probate help", "Bereavement counselling on request"]
      },
      {
        title: "Bereavement support",
        body: "Loss is heavy, and grief takes time. We provide a confidential listening ear, can connect families with an Islamically-grounded counsellor, and check in regularly. There is no time limit on this support.",
      },
      {
        title: "For non-Muslim family members",
        body: "We welcome questions and attendance from non-Muslim family members. The imam will explain the prayer and burial customs, and family members of all faiths are welcome at the funeral and graveside.",
      },
    ]
  },
];

Object.assign(window, { HALAL_PLACES, ACTIVITIES, VOLUNTEER_ROLES, SISTERS_WEEKLY, SISTERS_GALLERY, FUNERAL_TABS });
