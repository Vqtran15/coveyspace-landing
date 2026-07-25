import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ForkKnife, CalendarCheck, CalendarStar, ChatCircleDots, HandsPraying,
  Cake, BookBookmark, HandCoins, ArrowRight, EnvelopeSimple, Plus,
} from '@phosphor-icons/react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import FadeUp from './FadeUp.jsx'

const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'
const EASE = [0.25, 0.46, 0.45, 0.94]

const FAQS = [
  {
    q: 'Do I need to download an app?',
    a: 'No app store required. Covey Space runs in your browser and can be added to your home screen in seconds for a full native app experience on iPhone, iPad, and Android.',
  },
  {
    q: 'Is my group\'s data private?',
    a: 'Yes. Your messages, prayer requests, birthdays, and all other content are visible only to members of your group. We never sell your data or share it with advertisers.',
  },
  {
    q: 'How many people can be in a group?',
    a: 'There is no hard limit. Covey Space works well for small groups of 5–6 people and scales comfortably to larger groups of 30 or more.',
  },
  {
    q: 'Can we turn off features we don\'t use?',
    a: 'Yes — admins can toggle any feature on or off from the Admin Settings panel. Don\'t need prayer requests or service schedules? Turn them off and keep your group\'s space simple.',
  },
  {
    q: 'What devices does it work on?',
    a: 'Covey Space works on any device with a modern browser — iPhone, Android, iPad, Mac, and PC. Install it to your home screen for the best mobile experience.',
  },
  {
    q: 'How is Covey Space different from Church Center or Planning Center?',
    a: 'Church Center is a church management platform built for entire congregations — it requires a Planning Center subscription (starting at $14/month) and is designed for church staff managing child check-ins, volunteer scheduling, and giving for hundreds of people. Covey Space is built for the small group itself: 8–20 people who meet regularly, share meals, and pray together. No subscription, no church admin approval, no setup overhead — any group leader can get started in minutes.',
  },
  {
    q: 'How is this different from Flocknote or a group text?',
    a: 'Flocknote is an outbound communication tool — great for email and text blasts to people who may not open an app. A group text works for quick messages. Covey Space is a two-way community space where members post prayer requests, claim meal spots, sign up to serve, track birthdays, and message one another. It replaces the group text, the Google Sheet signup, and the prayer request chain — organized specifically for how a small group functions week to week.',
  },
]

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
    description: "Organize who's serving and when. Members sign up directly in the app — no spreadsheets required.",
    color: 'bg-lagoon/10 text-lagoon-600',
  },
  {
    Icon: CalendarStar,
    title: 'Events',
    description: "Create one-off gatherings and let members RSVP in one tap — going, maybe, or can't go. See who's coming at a glance from the home screen.",
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
    description: "Prayer requests get their own dedicated space — never buried in a chat thread. Perfect for Bible study groups and house churches who want to pray for one another consistently.",
    color: 'bg-sunrise/10 text-sunrise',
  },
  {
    Icon: Cake,
    title: 'Birthdays',
    description: "Add birthdays for your group members and get reminded 30 days before — so no one slips through the cracks.",
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
    description: "Link your church's giving or tithing page so members can donate in one tap — right from the home screen.",
    color: 'bg-lagoon/10 text-lagoon-700',
  },
]

const SCREENSHOTS = [
  { src: '/screenshots/home-screen.PNG',    label: 'Home',             caption: 'Your group at a glance' },
  { src: '/screenshots/meal-signup.PNG',    label: 'Meal Signup',      caption: 'Claim your ingredient for the week' },
  { src: '/screenshots/service-signup.PNG', label: 'Service Schedule', caption: 'Sign up to serve' },
  { src: '/screenshots/chat-list.PNG',      label: 'Conversations',    caption: 'Group and direct messages' },
  { src: '/screenshots/group-chat.PNG',     label: 'Group Chat',       caption: 'Stay connected between meetups' },
  { src: '/screenshots/prayer-request.PNG', label: 'Prayer Requests',  caption: 'Never lose track of what matters' },
  { src: '/screenshots/guide.PNG',          label: 'Discussion Guide', caption: 'Open your weekly guide in one tap' },
]

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
    desc: 'Meals, schedules, chat, prayer, birthdays — everything is ready the moment your group joins.',
  },
]

const DIFF_CARDS = [
  {
    label: 'Small group focus',
    title: 'Built for your group, not your whole church',
    desc: 'Covey Space is sized and priced for the group itself. Any group leader can get started in minutes — for free — without church admin approval or a software subscription.',
  },
  {
    label: 'Two-way community',
    title: 'Members connect with each other, not just receive messages',
    desc: 'Every member can post prayer requests, claim meal spots, sign up to serve, and message each other directly. A shared home for your group — not a one-way announcement tool.',
  },
  {
    label: 'Built for coordination',
    title: 'More than a group chat — organized for how small groups run',
    desc: 'Covey Space adds structured meal signups, service schedules, prayer tracking, birthday reminders, and a giving link — all organized the way a small group actually functions week to week.',
  },
]

// Animation 3: stagger variants for feature grid
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const CTA_WORDS = 'Bring your whole group together.'.split(' ')

export default function LandingPage() {
  const [leaving, setLeaving] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  // Refs for complex scroll-triggered animations
  const gridRef = useRef(null)
  const stepsRef = useRef(null)
  const ctaHeadingRef = useRef(null)

  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.15 })
  const ctaInView = useInView(ctaHeadingRef, { once: true, amount: 0.4 })

  function goToSignup() {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => { window.location.href = SIGNUP_URL }, 350)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Covey Space',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    url: 'https://www.coveyspace.com',
    description: 'Community group app for meal signups, events with RSVP, service schedules, group chat, prayer requests, birthday reminders, and discussion guides.',
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
        <title>Covey Space — Community Group App for Meals, Prayer & Chat</title>
        <meta name="description" content="The all-in-one app for church small groups, house churches, house churches, Bible study groups, and Christian community groups. Meal signups, group chat, prayer requests, discussion guides, and more." />
        <link rel="canonical" href="https://www.coveyspace.com" />
        <meta property="og:url" content="https://www.coveyspace.com" />
        <meta property="og:title" content="Covey Space — Community Group App for Meals, Prayer & Chat" />
        <meta property="og:description" content="Automated meal signups, events with RSVP, service schedules, group chat, prayer requests, birthday reminders, and discussion guides — all in one app for your small group or house church." />
        <meta property="og:image" content="https://www.coveyspace.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Covey Space — Community Group App for Meals, Prayer & Chat" />
        <meta name="twitter:description" content="Automated meal signups, events with RSVP, service schedules, group chat, prayer requests, birthday reminders, and discussion guides — all in one app for your small group or house church." />
        <meta name="twitter:image" content="https://www.coveyspace.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Nav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-jade-50 to-white px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-10">

          {/* Text — Animation 1: staggered entrance */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
            >
              Gathering community made simple
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
              className="font-league-gothic text-6xl sm:text-7xl lg:text-8xl tracking-wide text-stone-900 leading-none mb-6"
            >
              One place for your<br />whole group.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
              className="text-stone-500 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Covey Space brings automated meal signups, service schedules, group chat, prayer requests, and discussion guides into one place — built for church small groups, house churches, Bible study groups, and Christian community groups who share life together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
              className="flex flex-col items-center lg:items-start gap-2"
            >
              {/* Animation 9: micro-interaction + one-time pulse */}
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
              <p className="text-xs text-stone-400">Free forever — no credit card, no subscription</p>
            </motion.div>
          </div>

          {/* Phone mockup — Animation 4: infinite float */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex shrink-0"
          >
            <div className="w-64 p-2.5 bg-stone-800 rounded-[2rem] shadow-2xl">
              <div className="rounded-[1.5rem] overflow-hidden">
                <img src="/screenshots/home-screen.PNG" alt="Covey Space home screen" fetchpriority="high" className="w-full h-auto block" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features — Animation 2 (FadeUp heading) + Animation 3 (stagger grid) ── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center">
            <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
              Everything your group needs.
            </h2>
            <p className="text-stone-400 text-sm mb-12">
              Don't need every feature? Admins can turn any of these on or off anytime.
            </p>
          </FadeUp>

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
                className="rounded-2xl border border-stone-100 p-6 shadow-sm hover:shadow-md transition-shadow"
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

      {/* ── How it works — Animation 2 (FadeUp) + Animation 7 (step pop) ── */}
      <section className="px-6 py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-14">
            <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
              Up and running in minutes.
            </h2>
            <p className="text-stone-400 text-sm">No app store. No IT setup. Perfect for any church group, house church, or Bible study.</p>
          </FadeUp>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map(({ step, title, desc }, i) => (
              <div key={step} className="flex flex-col items-center text-center md:items-start md:text-left">
                {/* Animation 7: spring scale pop-in */}
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

      {/* ── Screenshots — Animation 6: infinite marquee ── */}
      <section className="py-16 bg-white overflow-hidden">
        <FadeUp>
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-10">
            See it in action.
          </h2>
        </FadeUp>

        <div className="marquee-wrapper">
          <div className="marquee-track flex gap-5 px-5">
            {[...SCREENSHOTS, ...SCREENSHOTS].map(({ src, label, caption }, i) => (
              <div key={i} className="shrink-0 flex flex-col items-center gap-3">
                <div className="w-44 lg:w-48 p-2 bg-stone-800 rounded-[1.75rem] shadow-2xl">
                  <div className="rounded-[1.25rem] overflow-hidden">
                    <img src={src} alt={label} loading="lazy" className="w-full h-auto block" />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-stone-700 block">{label}</span>
                  <span className="text-xs text-stone-400">{caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FadeUp className="flex justify-center mt-8">
          <motion.div
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-jade text-white font-semibold rounded-2xl text-sm hover:bg-jade-700 transition-colors shadow-sm"
            >
              Take a Tour <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>
        </FadeUp>
      </section>

      {/* ── Differentiation — Animation 2 (FadeUp) + Animation 10 (3D tilt) ── */}
      <section className="px-6 py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
              What makes Covey Space different.
            </h2>
            <p className="text-stone-400 text-sm">
              Designed specifically for small groups who share life together week after week.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFF_CARDS.map(({ label, title, desc }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                {/* Animation 10: 3D card tilt on hover */}
                <motion.div
                  whileHover={{ rotateX: -2, rotateY: 3, y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformPerspective: 800 }}
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

      {/* ── FAQ — Animation 2 (FadeUp) + Animation 5 (smooth accordion) ── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <FadeUp>
            <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-10">
              Common questions.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex flex-col divide-y divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-semibold text-stone-800 text-sm leading-snug">{q}</span>
                    {/* Animation 5: rotate Plus 45° = × on open */}
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

                  {/* Animation 5: smooth height expand/collapse */}
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

      {/* ── Final CTA — Animation 8: word-by-word reveal ── */}
      <section className="px-6 py-20 lg:py-28 bg-jade text-center">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={ctaHeadingRef}
            className="font-league-gothic text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-6"
          >
            {CTA_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 22 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ delay: i * 0.09, duration: 0.5, ease: EASE }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Button fades in after last word */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: CTA_WORDS.length * 0.09 + 0.1, duration: 0.45, ease: EASE }}
          >
            {/* Animation 9: micro-interaction on CTA button */}
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
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="px-6 py-20 bg-stone-50 text-center">
        <FadeUp className="max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-jade/10 flex items-center justify-center mx-auto mb-5">
            <EnvelopeSimple size={24} weight="fill" className="text-jade" />
          </div>
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
            Have questions?
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            Whether you're a pastor, group leader, or just curious — reach out and I'll get back to you.
          </p>
          {/* Animation 9: micro-interaction on email link */}
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
      </section>

      <Footer />
    </div>
  )
}
