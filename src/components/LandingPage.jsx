import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  ForkKnife, CalendarCheck, CalendarStar, ChatCircleDots, HandsPraying,
  Cake, BookBookmark, HandCoins, ArrowRight, EnvelopeSimple, Plus, Megaphone, UsersThree,
  ShieldCheck, DeviceMobile, Browser, ArrowsOut, Lightning,
} from '@phosphor-icons/react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import FadeUp from './FadeUp.jsx'

const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'
const EASE = [0.25, 0.46, 0.45, 0.94]
const REVEAL_EASE = [0.22, 1, 0.36, 1]

// ── Feature overview grid ─────────────────────────────
const FEATURES = [
  {
    Icon: ForkKnife,
    title: 'Meal Signups',
    description: 'Automatically rotate dinner ideas, week after week. No more figuring out what to eat or managing a Google Sheet signup.',
    color: 'bg-jade/10 text-jade',
  },
  {
    Icon: CalendarCheck,
    title: 'Service Schedules',
    description: "Organize who's serving and when. Members sign up directly in the app with no spreadsheets required.",
    color: 'bg-lagoon/10 text-lagoon-600',
  },
  {
    Icon: CalendarStar,
    title: 'Events',
    description: "Create one-off gatherings and let members RSVP in one tap: going, maybe, or can't go. See who's coming at a glance from the home screen.",
    color: 'bg-sunrise/10 text-sunrise',
  },
  {
    Icon: ChatCircleDots,
    title: 'Group Chat',
    description: 'A main group chat for everyone, plus direct messages and smaller group threads. No more juggling group texts, GroupMe, or WhatsApp.',
    color: 'bg-sage/20 text-sage-700',
  },
  {
    Icon: HandsPraying,
    title: 'Prayer Requests',
    description: "Prayer requests get their own dedicated space, never buried in a chat thread. Perfect for Bible study groups and house churches who want to pray for one another consistently.",
    color: 'bg-sunrise/10 text-sunrise',
  },
  {
    Icon: Cake,
    title: 'Birthdays',
    description: "Add birthdays for your group members and get reminded 30 days before, so no one slips through the cracks.",
    color: 'bg-coral/10 text-coral',
  },
  {
    Icon: BookBookmark,
    title: 'Discussion Guide',
    description: "Link your church's weekly guide so every member can open it in one tap from the home screen. Perfect for Bible study groups.",
    color: 'bg-sunrise/10 text-sunrise',
  },
  {
    Icon: HandCoins,
    title: 'Monthly Giving',
    description: "Link your church's giving or tithing page so members can donate in one tap, right from the home screen.",
    color: 'bg-lagoon/10 text-lagoon-700',
  },
  {
    Icon: Megaphone,
    title: 'Church Broadcasts',
    description: "Church admins can send rich-text announcements to all groups at once, or just to group leaders. Members see an unread dot so nothing gets missed.",
    color: 'bg-ember/10 text-ember',
  },
  {
    Icon: UsersThree,
    title: 'Multi-Group',
    description: "Belong to more than one group, like a men's group and a couples group. Switch your active group in Settings and the whole app follows.",
    color: 'bg-stone-100 text-stone-500',
  },
]

// ── Feature deep-dive tour (with screenshots) ──────────
const FEATURE_TOUR = [
  {
    Icon: ForkKnife,
    title: 'Meal Signups',
    color: 'bg-jade/10 text-jade',
    screenshot: '/screenshots/meal-signup.PNG',
    alt: 'Meal signup screen',
    shortDesc: 'Members sign up for an ingredient each week. The app auto-advances to the next meal and cycles back to older ones when the list runs out.',
    description: "Load up your weekly meal rotation once, and the app handles the rest. Members sign in and claim an ingredient. Pasta week? Someone brings noodles, someone else brings sauce, another brings dessert. The night after your group meets, it automatically advances to the next meal. When the list runs out, it cycles back to meals you haven't had in a while. Tap the menu to edit ingredients, reorder your meal list, or pause signups for weeks you're skipping.",
  },
  {
    Icon: CalendarCheck,
    title: 'Service Schedules',
    color: 'bg-lagoon/10 text-lagoon-600',
    screenshot: '/screenshots/service-signup.PNG',
    alt: 'Service signup screen',
    shortDesc: 'Monthly service sign-ups that rotate automatically. Or turn off automation and add events manually as you go.',
    description: "Service sign-ups work just like meals, but on a monthly cadence. Members browse the list and claim what they'd like to help with. If your group doesn't follow a monthly rhythm, just disable the automation and add service events manually as you go.",
  },
  {
    Icon: ChatCircleDots,
    title: 'Group Chat',
    color: 'bg-sage/20 text-sage-700',
    screenshot: '/screenshots/group-chat.PNG',
    alt: 'Group chat screen',
    shortDesc: 'A main group chat for everyone, plus DMs and smaller group threads. React, reply, and edit messages. Enable push notifications in Settings.',
    description: "A Main Group Chat is set up by default with every member included. You can also direct message any member or start a smaller group chat for specific people. Double-tap someone's message to react, copy, or reply. Double-tap your own to edit it. Turn on push notifications in Settings so you never miss a message.",
  },
  {
    Icon: HandsPraying,
    title: 'Prayer Requests',
    color: 'bg-sunrise/10 text-sunrise',
    screenshot: '/screenshots/prayer-request.PNG',
    alt: 'Prayer requests screen',
    shortDesc: 'Every member has a prayer profile. Log requests under their name and look back months later to see what God has done.',
    description: "Every member has a profile in the Prayer Requests tab. No need to type out names each time. Just find the person and write their request. Requests are saved to their profile so you can look back months later and see what God has done. There's something powerful about revisiting old prayers and seeing them answered.",
  },
  {
    Icon: Cake,
    title: 'Birthday Reminders',
    color: 'bg-coral/10 text-coral',
    screenshot: '/screenshots/home-screen.PNG',
    alt: 'Home screen with birthday banner',
    shortDesc: 'Upcoming birthdays show on the home screen with animations and a banner notification within 14 days. No one gets forgotten.',
    description: "The home screen shows your group's upcoming birthdays so no one gets forgotten. Birthdays within 30 days show a special animation, and a banner notification appears at the top for anyone turning a year older within 14 days. Let's make sure every member feels seen and celebrated.",
  },
  {
    Icon: BookBookmark,
    title: 'Discussion Guide',
    color: 'bg-sunrise/10 text-sunrise',
    screenshot: '/screenshots/guide.PNG',
    alt: 'Discussion guide screen',
    shortDesc: "Link your church's weekly guide so every member can open it in one tap from the home screen.",
    description: "A discussion guide section lives right on the home screen. If your church provides a weekly guide or your group creates its own, your admin can link it so every member can open it in one tap.",
  },
  {
    Icon: HandCoins,
    title: 'Monthly Giving',
    color: 'bg-lagoon/10 text-lagoon-700',
    screenshot: '/screenshots/monthly-giving.PNG',
    alt: 'Monthly giving card on home screen',
    shortDesc: "Link your church's giving page so members can donate in one tap from the home screen.",
    description: "Add a giving link so every member can support your church in one tap. Admins can paste any giving or tithing page URL and it shows up as a card on the home screen. No more hunting for links in a group chat.",
  },
  {
    Icon: ShieldCheck,
    title: 'Admin Controls',
    color: 'bg-lagoon/10 text-lagoon-600',
    screenshot: '/screenshots/admin.PNG',
    alt: 'Admin settings screen',
    shortDesc: 'Manage members, invite codes, and feature toggles. All from one dedicated admin panel.',
    description: "Your group's invite code lives in Admin Settings. That's how new members join securely. Remove users, promote members to admin, and toggle features on or off from one panel.",
  },
  {
    Icon: DeviceMobile,
    title: 'Works like a native app',
    color: 'bg-stone-100 text-stone-600',
    screenshot: '/screenshots/add-to-home-2.PNG',
    alt: 'Add to home screen prompt',
    shortDesc: 'Add Coveyspace to your home screen and it behaves just like a downloaded app, with no App Store required.',
    description: "No app store required. Coveyspace works in any browser, and when you add it to your home screen it looks and feels just like a native app, complete with push notifications. It works great on desktop too. A dedicated iOS and Android app is on the roadmap.",
  },
]

// ── How it works ──────────────────────────────────────
const STEPS = [
  {
    step: '1',
    title: 'Create your group',
    desc: "Sign up at coveyspace.com and name your group. You'll instantly get a 6-character invite code.",
  },
  {
    step: '2',
    title: 'Invite your members',
    desc: 'Share the invite code with your group. Members sign up and enter the code to join.',
  },
  {
    step: '3',
    title: 'Start coordinating',
    desc: 'Meals, schedules, chat, prayer, birthdays. Everything is ready the moment your group joins.',
  },
]

// ── What makes Coveyspace different ───────────────────
const DIFF_CARDS = [
  {
    label: 'Small group focus',
    title: 'Built for your group, not your whole church',
    desc: 'Coveyspace is sized and priced for the group itself. Any group leader can get started for free in minutes, without church admin approval or a software subscription.',
  },
  {
    label: 'Two-way community',
    title: 'Members connect with each other, not just receive messages',
    desc: 'Every member can post prayer requests, claim meal spots, sign up to serve, and message each other directly. A shared home for your group, not a one-way announcement tool.',
  },
  {
    label: 'Built for coordination',
    title: 'More than a group chat, organized for how small groups run',
    desc: 'Coveyspace adds structured meal signups, service schedules, prayer tracking, birthday reminders, and a giving link. All organized the way a small group actually functions week to week.',
  },
]

// ── Install ───────────────────────────────────────────
const BENEFITS = [
  {
    Icon: ArrowsOut,
    title: 'Full-screen experience',
    desc: 'No browser bar taking up space. The app fills your whole screen just like a native app.',
  },
  {
    Icon: DeviceMobile,
    title: 'Home screen shortcut',
    desc: 'Tap the Coveyspace icon on your home screen and go straight in, no typing a URL.',
  },
  {
    Icon: Lightning,
    title: 'Faster loads',
    desc: 'Installed web apps cache resources locally so the app opens instantly, even on slow connections.',
  },
  {
    Icon: Browser,
    title: 'No app store needed',
    desc: "There's nothing to download or update. Improvements roll out automatically in the background.",
  },
]

const IOS_STEPS = [
  'Open app.coveyspace.com in Safari',
  'Tap the Share button (box with arrow) at the bottom',
  'Scroll down and tap "Add to Home Screen"',
  'Tap "Add" in the top right',
]

const ANDROID_STEPS = [
  'Open app.coveyspace.com in Chrome',
  'Tap the three-dot menu in the top right',
  'Tap "Add to Home Screen" or "Install App"',
  'Tap "Add" to confirm',
]

// ── FAQ ───────────────────────────────────────────────
const FAQS = [
  {
    q: 'Do I need to download an app?',
    a: 'No app store required. Coveyspace runs in your browser and can be added to your home screen in seconds for a full native app experience on iPhone, iPad, and Android.',
  },
  {
    q: 'Is my group\'s data private?',
    a: 'Yes. Your messages, prayer requests, birthdays, and all other content are visible only to members of your group. We never sell your data or share it with advertisers.',
  },
  {
    q: 'How many people can be in a group?',
    a: 'There is no hard limit. Coveyspace works well for small groups of 5–6 people and scales comfortably to larger groups of 30 or more.',
  },
  {
    q: 'Can we turn off features we don\'t use?',
    a: "Yes. Admins can toggle any feature on or off from the Admin Settings panel. Don't need prayer requests or service schedules? Turn them off and keep your group's space simple.",
  },
  {
    q: 'What devices does it work on?',
    a: 'Coveyspace works on any device with a modern browser: iPhone, Android, iPad, Mac, and PC. Install it to your home screen for the best mobile experience.',
  },
  {
    q: 'Can a church manage multiple small groups in Coveyspace?',
    a: "Yes. Church admins can link multiple community groups under one church account and send rich-text broadcasts, either to all members across every group or to group leaders only. Each group still keeps its own private chat, meals, and prayer space. Members can also belong to more than one group (a men's group and a couples group, for example) and switch their active group in Settings at any time.",
  },
  {
    q: 'How is Coveyspace different from Church Center or Planning Center?',
    a: "Church Center is a church management platform built for entire congregations, designed for staff managing child check-ins, volunteer scheduling, and giving for hundreds of people, starting at $14/month. Coveyspace is built for the small group itself: 8–20 people who meet regularly, share meals, and pray together. Any group leader can start for free in minutes. Church staff can also link their groups under one account for coordinated broadcasts, without the overhead of a full church management system.",
  },
  {
    q: 'How is this different from Flocknote or a group text?',
    a: "Flocknote is an outbound communication tool, great for email and text blasts to people who may not open an app. A group text works for quick messages. Coveyspace is a two-way community space where members post prayer requests, claim meal spots, sign up to serve, track birthdays, and message one another. It replaces the group text, the Google Sheet signup, and the prayer request chain, organized specifically for how a small group functions week to week.",
  },
]

// ── Animation variants ────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 52, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: REVEAL_EASE } },
}
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.05 } },
}

const CTA_WORDS = 'Bring your whole group together.'.split(' ')

// ── Split heading: word-by-word clip-mask reveal ──────
function SplitHeading({ children, className = '', delay = 0, as: Tag = 'h2' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.35 })
  return (
    <Tag ref={ref} className={className}>
      {String(children).trim().split(/\s+/).filter(Boolean).map((word, i, arr) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
          <motion.span
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : { y: '105%' }}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: REVEAL_EASE }}
            style={{ display: 'inline-block' }}
          >
            {word}{i < arr.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export default function LandingPage() {
  const [leaving, setLeaving] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  // Feature tour — sticky scroll (desktop)
  const [activeIndex, setActiveIndex] = useState(0)
  const [phoneVisible, setPhoneVisible] = useState(false)
  const featureRefs = useRef([])

  // Feature tour — swipeable carousel (mobile)
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStartX = useRef(null)

  // Scroll-triggered refs
  const gridRef        = useRef(null)
  const stepsRef       = useRef(null)
  const ctaHeadingRef  = useRef(null)
  const benefitsRef    = useRef(null)
  const installRef     = useRef(null)

  const gridInView     = useInView(gridRef,       { once: false, amount: 0.1 })
  const stepsInView    = useInView(stepsRef,      { once: false, amount: 0.15 })
  const ctaInView      = useInView(ctaHeadingRef, { once: false, amount: 0.4 })
  const benefitsInView = useInView(benefitsRef,   { once: false, amount: 0.1 })
  const installInView  = useInView(installRef,    { once: false, amount: 0.15 })

  // Parallax refs
  const heroSectionRef = useRef(null)
  const storyRef       = useRef(null)
  const ctaSectionRef  = useRef(null)
  const diffSectionRef = useRef(null)

  // Parallax scroll trackers
  const { scrollYProgress: heroScroll } = useScroll({ target: heroSectionRef, offset: ['start start', 'end start'] })
  const { scrollYProgress: storyScroll } = useScroll({ target: storyRef, offset: ['start end', 'end start'] })
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaSectionRef, offset: ['start end', 'end start'] })
  const { scrollYProgress: diffScroll } = useScroll({ target: diffSectionRef, offset: ['start end', 'end start'] })

  // Parallax transforms
  const heroPhoneY  = useTransform(heroScroll,  [0, 1], ['0px', '-80px'])
  const storyP1Y    = useTransform(storyScroll, [0, 1], ['12px', '-18px'])
  const storyP2Y    = useTransform(storyScroll, [0, 1], ['22px', '-30px'])
  const storyP3Y    = useTransform(storyScroll, [0, 1], ['30px', '-24px'])
  const storyP4Y    = useTransform(storyScroll, [0, 1], ['8px',  '-12px'])
  const ctaContentY = useTransform(ctaScroll,   [0, 1], ['28px', '-28px'])
  const diffBlobY   = useTransform(diffScroll,  [0, 1], ['0px',   '-160px'])
  const ctaBlobY    = useTransform(ctaScroll,   [0, 1], ['-20px', '120px'])

  // Track which feature is centred in the viewport (for sticky phone)
  useEffect(() => {
    function onScroll() {
      const mid = window.innerHeight / 2
      let closest = 0
      let closestDist = Infinity
      featureRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < closestDist) { closestDist = dist; closest = i }
      })
      setActiveIndex(closest)

      const firstEl = featureRefs.current[0]
      const lastEl  = featureRefs.current[featureRefs.current.length - 1]
      if (firstEl && lastEl) {
        const firstRect = firstEl.getBoundingClientRect()
        const lastRect  = lastEl.getBoundingClientRect()
        setPhoneVisible(firstRect.top < mid + 50 && lastRect.bottom > 0)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) {
      if (delta > 0) setActiveSlide(s => Math.min(s + 1, FEATURE_TOUR.length - 1))
      else           setActiveSlide(s => Math.max(s - 1, 0))
    }
    touchStartX.current = null
  }

  function goToSignup() {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => { window.location.href = SIGNUP_URL }, 350)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Coveyspace',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    url: 'https://www.coveyspace.com',
    description: 'Community group app for meal signups, events with RSVP, service schedules, group chat, prayer requests, birthday reminders, discussion guides, and church-wide broadcasts across multiple groups.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <div className={`min-h-screen bg-white font-sans transition-[opacity,transform] duration-300 ease-in-out ${leaving ? 'opacity-0 translate-y-3' : 'opacity-100'}`}>
      <Helmet>
        <title>Coveyspace — Community Group App for Meals, Prayer & Chat</title>
        <meta name="description" content="The all-in-one app for church small groups, house churches, Bible study groups, and Christian community groups. Meal signups, group chat, prayer requests, discussion guides, and more." />
        <link rel="canonical" href="https://www.coveyspace.com" />
        <meta property="og:url" content="https://www.coveyspace.com" />
        <meta property="og:title" content="Coveyspace — Community Group App for Meals, Prayer & Chat" />
        <meta property="og:description" content="Automated meal signups, events with RSVP, service schedules, group chat, prayer requests, birthday reminders, and discussion guides, all in one app for your small group or house church." />
        <meta property="og:image" content="https://www.coveyspace.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Coveyspace — Community Group App for Meals, Prayer & Chat" />
        <meta name="twitter:description" content="Automated meal signups, events with RSVP, service schedules, group chat, prayer requests, birthday reminders, and discussion guides, all in one app for your small group or house church." />
        <meta name="twitter:image" content="https://www.coveyspace.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Nav />

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroSectionRef} className="bg-gradient-to-b from-jade-50 to-white px-6 pt-20 pb-10 lg:pt-28 lg:pb-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-10">

          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
            >
              Gathering community made simple
            </motion.div>

            <h1 className="font-league-gothic text-6xl sm:text-7xl lg:text-8xl tracking-wide text-stone-900 leading-[1.05] mb-6">
              {['One place for your', 'whole group.'].map((line, li) => (
                <div key={li} style={{ overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.08 + li * 0.18, ease: REVEAL_EASE }}
                    style={{ display: 'block' }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
              className="text-stone-500 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Coveyspace brings automated meal signups, service schedules, group chat, prayer requests, and discussion guides all into one single platform. It's built for church small groups, house churches, and Bible study groups. Church admins can link multiple groups under one account and broadcast announcements across all of them at once.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
              className="flex flex-col items-center lg:items-start gap-2"
            >
              <motion.button
                onClick={goToSignup}
                disabled={leaving}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.97 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ delay: 2.5, duration: 0.55, ease: 'easeInOut', times: [0, 0.5, 1] }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-jade text-white font-semibold rounded-2xl text-base hover:bg-jade-700 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Sign up for free <ArrowRight size={18} weight="bold" />
              </motion.button>
            </motion.div>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <motion.div style={{ y: heroPhoneY }}>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-64 p-2.5 bg-stone-800 rounded-[2rem] shadow-2xl">
                <div className="rounded-[1.5rem] overflow-hidden">
                  <video
                    src="/videos/home-screen.mov"
                    poster="/screenshots/home-screen.PNG"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

{/* ── Features overview grid ────────────────────── */}
      <section id="features" className="px-6 pt-14 pb-20 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-12">
              Everything your group needs.
            </SplitHeading>
          </div>

          <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURES.map(({ Icon, title, description, color }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{ rotateX: -4, rotateY: 6, y: -10, scale: 1.04, boxShadow: '0 24px 48px -8px rgba(0,0,0,0.14)', transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                style={{ transformPerspective: 900 }}
                className="rounded-2xl border border-stone-100 p-6 shadow-sm"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={22} weight="fill" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-1.5">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────── */}
      <section className="px-6 py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
              Up and running in minutes.
            </SplitHeading>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map(({ step, title, desc }, i) => (
              <div key={step} className="flex flex-col items-center text-center md:items-start md:text-left">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={stepsInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.15 }}
                  className="w-10 h-10 rounded-full bg-jade text-white font-bold text-lg flex items-center justify-center mb-4 shrink-0"
                >
                  {step}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.45, delay: i * 0.15 + 0.1, ease: EASE }}
                >
                  <h3 className="font-semibold text-stone-800 text-lg mb-2">{title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Tour — feature deep-dive ─────────────── */}
      <section id="tour" className="bg-white">
        <div className="border-t border-stone-100 px-6 pt-14 pb-8 text-center">
          <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-2">
            Everything inside Coveyspace.
          </SplitHeading>
          <FadeUp delay={0.5} className="lg:hidden">
            <p className="text-stone-400 text-base">One platform for every part of your community group.</p>
          </FadeUp>
        </div>

        {/* Mobile: swipeable carousel */}
        <FadeUp className="lg:hidden px-6 pt-10 pb-6">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {FEATURE_TOUR.map((feature) => (
                <div key={feature.title} className="w-full shrink-0 flex flex-col items-center text-center px-2">
                  <div className="w-36 p-1.5 bg-stone-800 rounded-[1.75rem] shadow-2xl mb-5">
                    <div className="rounded-[1.25rem] overflow-hidden">
                      <img src={feature.screenshot} alt={feature.alt} loading="lazy" className="w-full h-auto block" />
                    </div>
                  </div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${feature.color}`}>
                    <feature.Icon size={18} weight="fill" />
                  </div>
                  <h3 className="font-league-gothic text-2xl tracking-wide text-stone-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {feature.shortDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-5">
            {FEATURE_TOUR.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-6 bg-jade' : 'w-2 bg-stone-300'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 text-sm font-semibold">
            <button
              onClick={() => setActiveSlide(s => Math.max(s - 1, 0))}
              disabled={activeSlide === 0}
              className="px-4 py-2 rounded-xl text-stone-400 disabled:opacity-0 transition-opacity"
            >
              ← Prev
            </button>
            <span className="text-stone-300 text-xs">{activeSlide + 1} / {FEATURE_TOUR.length}</span>
            <button
              onClick={() => setActiveSlide(s => Math.min(s + 1, FEATURE_TOUR.length - 1))}
              disabled={activeSlide === FEATURE_TOUR.length - 1}
              className="px-4 py-2 rounded-xl text-stone-400 disabled:opacity-0 transition-opacity"
            >
              Next →
            </button>
          </div>
        </FadeUp>

        {/* Desktop: sticky scroll */}
        <div className="hidden lg:block px-6 pb-0">
          <div className="max-w-5xl mx-auto flex gap-20 items-start">
            <div className="flex-1 pb-[50vh]">
              {FEATURE_TOUR.map((feature, i) => (
                <div
                  key={feature.title}
                  ref={el => { featureRefs.current[i] = el }}
                  className={`py-10 border-b border-stone-100 last:border-0 transition-opacity duration-300 ${
                    i === activeIndex ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.Icon size={20} weight="fill" />
                  </div>
                  <h3 className="font-league-gothic text-3xl sm:text-4xl tracking-wide text-stone-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className={`w-52 shrink-0 sticky top-1/2 -translate-y-1/2 self-start transition-opacity duration-700 ${phoneVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-2 bg-stone-800 rounded-[1.75rem] shadow-2xl">
                <div className="rounded-[1.25rem] overflow-hidden relative" style={{ paddingBottom: '216%' }}>
                  {FEATURE_TOUR.map((f, i) => (
                    <img
                      key={f.title}
                      src={f.screenshot}
                      alt={f.alt}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
                        i === activeIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What makes Coveyspace different ──────────── */}
      <section ref={diffSectionRef} className="px-6 py-20 bg-stone-50 relative overflow-hidden">
        <motion.div
          style={{ y: diffBlobY }}
          className="absolute -right-40 -top-40 w-[560px] h-[560px] rounded-full bg-jade/[0.06] pointer-events-none"
        />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12">
            <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
              What makes Coveyspace different.
            </SplitHeading>
            <FadeUp delay={0.55}>
              <p className="text-stone-400 text-sm">
                Designed specifically for small groups who share life together week after week.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFF_CARDS.map(({ label, title, desc }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ rotateX: -4, rotateY: 6, y: -10, scale: 1.04, boxShadow: '0 24px 48px -8px rgba(0,0,0,0.14)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  style={{ transformPerspective: 900 }}
                  className="rounded-2xl border border-stone-200 bg-white p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">{label}</p>
                  <h3 className="font-semibold text-stone-800 text-base mb-2 leading-snug">{title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────── */}
      <section ref={storyRef} id="about" className="px-6 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <FadeUp className="mb-6">
              <div className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Our Story
              </div>
            </FadeUp>
            <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide">
              Built for groups who break bread around a table.
            </SplitHeading>
          </div>

          <div className="flex flex-col gap-5 text-stone-600 text-[1.0625rem] leading-relaxed">
            <motion.div style={{ y: storyP1Y }}>
              <FadeUp delay={0.08}>
                <p>
                  Hello, my name is Vuong, founder of Coveyspace. My wife and I serve as the meal coordinators for our Community Group at Bridgetown Church, where we share weekly meals, dive into discussion guides, and practice a monthly service rhythm. We love serving our community, but the weekly coordination was getting tough. Every Sunday after church, we'd scramble to set up a Google Sheets meal signup and post it in GroupMe. It worked, but it was just one more chore at the end of a long week.
                </p>
              </FadeUp>
            </motion.div>
            <motion.div style={{ y: storyP2Y }}>
              <FadeUp delay={0.18}>
                <p>
                  Having built web apps before, I realized I could use my skills to solve this problem for our group. I started by building out a meals section, but quickly realized I could bring everything into one place. I expanded it to include chat, birthday reminders, prayer requests, service schedules, and discussion guides, creating a true all-in-one app tailored for community groups.
                </p>
              </FadeUp>
            </motion.div>
            <motion.div style={{ y: storyP3Y }}>
              <FadeUp delay={0.28}>
                <p>
                  Within a couple of weeks, Coveyspace was live, completely eliminating the need for Google Sheets and chat apps. My hope is that Coveyspace helps your community group, church small group, house church, or Bible study group stay organized, so you can spend less time coordinating and more time focusing on spiritual formation.
                </p>
              </FadeUp>
            </motion.div>
            <motion.div style={{ y: storyP4Y }}>
              <FadeUp delay={0.38}>
                <p className="font-semibold text-stone-800">Vuong Tran, Founder</p>
              </FadeUp>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Install App ───────────────────────────────── */}
      <section id="install" className="px-6 py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FadeUp className="mb-6">
              <div className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Install App
              </div>
            </FadeUp>
            <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
              Use it like an app.
            </SplitHeading>
            <FadeUp delay={0.45}>
              <p className="text-stone-500 text-base max-w-xl mx-auto">
                Coveyspace is a web app with no app store required. Add it to your home screen in seconds for the full native experience.
              </p>
            </FadeUp>
          </div>

          {/* Why install benefits */}
          <motion.div
            ref={benefitsRef}
            variants={containerVariants}
            initial="hidden"
            animate={benefitsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14"
          >
            {BENEFITS.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{ rotateX: -4, rotateY: 6, y: -10, scale: 1.04, boxShadow: '0 24px 48px -8px rgba(0,0,0,0.14)', transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                style={{ transformPerspective: 900 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-stone-200 bg-white shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-jade/10 text-jade flex items-center justify-center shrink-0">
                  <Icon size={20} weight="fill" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1 text-sm">{title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Install steps */}
          <div ref={installRef} className="flex flex-col lg:flex-row lg:items-start gap-12">
            <div className="flex-1 flex flex-col gap-6">
              {/* iOS warning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={installInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative overflow-hidden flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 shadow-sm"
              >
                <span className="absolute left-0 top-0 h-full w-1.5 bg-red-400 rounded-l-2xl" />
                <div className="pl-3">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">iPhone & iPad: use Safari</p>
                  <p className="text-sm text-red-600 leading-relaxed">
                    The "Add to Home Screen" option only appears in Safari. If you're in Chrome, Firefox, or another browser on iOS, switch to Safari first.
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* iOS */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={installInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6"
                >
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-5">iPhone / iPad</p>
                  <ol className="flex flex-col gap-4">
                    {IOS_STEPS.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={installInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 + i * 0.08 }}
                          className="w-6 h-6 rounded-full bg-jade/10 text-jade text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                        >
                          {i + 1}
                        </motion.span>
                        <p className="text-stone-600 text-sm leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </motion.div>

                {/* Android */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={installInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6"
                >
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-5">Android</p>
                  <ol className="flex flex-col gap-4">
                    {ANDROID_STEPS.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={installInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.3 + i * 0.08 }}
                          className="w-6 h-6 rounded-full bg-jade/10 text-jade text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                        >
                          {i + 1}
                        </motion.span>
                        <p className="text-stone-600 text-sm leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            </div>

            {/* Floating phone */}
            <div className="flex justify-center shrink-0">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-52 lg:w-56 p-2 bg-stone-800 rounded-[1.75rem] shadow-2xl">
                  <div className="rounded-[1.25rem] overflow-hidden">
                    <img src="/screenshots/add-to-home-2.PNG" alt="Add to Home Screen prompt in Safari" loading="lazy" className="w-full h-auto block" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-10">
            Common questions.
          </SplitHeading>

          <FadeUp delay={0.1}>
            <div className="flex flex-col divide-y divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-semibold text-stone-800 text-sm leading-snug">{q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="shrink-0"
                    >
                      <Plus
                        size={16}
                        weight="bold"
                        className={openFaq === i ? 'text-jade' : 'text-stone-400'}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="px-6 pb-5 text-sm text-stone-500 leading-relaxed">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────── */}
      <section ref={ctaSectionRef} className="px-6 py-20 lg:py-28 bg-jade text-center relative overflow-hidden">
        <motion.div
          style={{ y: ctaBlobY }}
          className="absolute -left-32 -bottom-32 w-[480px] h-[480px] rounded-full bg-white/[0.05] pointer-events-none"
        />
        <motion.div style={{ y: ctaContentY }} className="max-w-4xl mx-auto relative">
          <h2
            ref={ctaHeadingRef}
            className="font-league-gothic text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-6"
          >
            {CTA_WORDS.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.22em', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                <motion.span
                  initial={{ y: '110%' }}
                  animate={ctaInView ? { y: 0 } : { y: '110%' }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: REVEAL_EASE }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: CTA_WORDS.length * 0.09 + 0.1, duration: 0.45, ease: EASE }}
          >
            <motion.button
              onClick={goToSignup}
              disabled={leaving}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-jade font-semibold rounded-2xl text-base hover:bg-jade-50 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Sign up for free <ArrowRight size={18} weight="bold" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Contact ───────────────────────────────────── */}
      <section id="contact" className="px-6 py-20 bg-stone-50 text-center">
        <div className="max-w-lg mx-auto">
          <FadeUp>
            <div className="w-12 h-12 rounded-2xl bg-jade/10 flex items-center justify-center mx-auto mb-5">
              <EnvelopeSimple size={24} weight="fill" className="text-jade" />
            </div>
          </FadeUp>
          <SplitHeading className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
            Have questions?
          </SplitHeading>
          <FadeUp delay={0.35}>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Whether you're a pastor, group leader, or just curious. Reach out and I'll get back to you.
            </p>
            <motion.a
              href="mailto:hello@coveyspace.com"
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-jade hover:bg-jade-700 text-white font-semibold rounded-2xl text-sm transition-colors"
            >
              <EnvelopeSimple size={16} weight="bold" />
              hello@coveyspace.com
            </motion.a>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  )
}
