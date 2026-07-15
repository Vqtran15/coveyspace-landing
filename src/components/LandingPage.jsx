import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ForkKnife, CalendarCheck, ChatCircleDots, HandsPraying, Cake, BookBookmark, HandCoins, ArrowRight, EnvelopeSimple, Plus, Minus } from '@phosphor-icons/react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'

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
    Icon: ChatCircleDots,
    title: 'Group Chat',
    description: 'A main group chat for everyone, plus direct messages and smaller group threads. No more juggling group texts, GroupMe, or WhatsApp.',
    color: 'bg-sage/20 text-sage-700',
  },
  {
    Icon: HandsPraying,
    title: 'Prayer Requests',
    description: "Prayer requests get their own dedicated space — never buried in a chat thread. Perfect for Bible study groups and home churches who want to pray for one another consistently.",
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

export default function LandingPage() {
  const [leaving, setLeaving] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

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
    description: 'Community group app for meal signups, service schedules, group chat, prayer requests, birthday reminders, and discussion guides.',
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
    <div
      className={`min-h-screen bg-white font-sans animate-page-enter transition-[opacity,transform] duration-300 ease-in-out ${leaving ? 'opacity-0 translate-y-3' : 'opacity-100'}`}
    >
      <Helmet>
        <title>Covey Space — Community Group App for Meals, Prayer & Chat</title>
        <meta name="description" content="The all-in-one app for church small groups, home churches, house churches, Bible study groups, and Christian community groups. Meal signups, group chat, prayer requests, discussion guides, and more." />
        <link rel="canonical" href="https://www.coveyspace.com" />
        <meta property="og:url" content="https://www.coveyspace.com" />
        <meta property="og:title" content="Covey Space — Community Group App for Meals, Prayer & Chat" />
        <meta property="og:description" content="Automated meal signups, service schedules, group chat, prayer requests, birthday reminders, and discussion guides — all in one app for your small group or house church." />
        <meta property="og:image" content="https://www.coveyspace.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Covey Space — Community Group App for Meals, Prayer & Chat" />
        <meta name="twitter:description" content="Automated meal signups, service schedules, group chat, prayer requests, birthday reminders, and discussion guides — all in one app for your small group or house church." />
        <meta name="twitter:image" content="https://www.coveyspace.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Nav />

      {/* Hero */}
      <section className="bg-gradient-to-b from-jade-50 to-white px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              Gathering community made simple
            </div>
            <h1 className="font-league-gothic text-6xl sm:text-7xl lg:text-8xl tracking-wide text-stone-900 leading-none mb-6">
              One place for your<br />whole community.
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Covey Space brings automated meal signups, service schedules, group chat, prayer requests, and discussion guides into one place — built for church small groups, home churches, Bible study groups, and Christian community groups who share life together.
            </p>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <button
                onClick={() => goToSignup()}
                disabled={leaving}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-jade text-white font-semibold rounded-2xl text-base hover:bg-jade-700 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Sign up for free <ArrowRight size={18} weight="bold" />
              </button>
              <p className="text-xs text-stone-400">Free forever — no credit card, no subscription</p>
            </div>
          </div>

          {/* Phone mockup — desktop only */}
          <div className="hidden lg:flex shrink-0">
            <div className="w-64 p-2.5 bg-stone-800 rounded-[2rem] shadow-2xl">
              <div className="rounded-[1.5rem] overflow-hidden">
                <img src="/screenshots/home-screen.PNG" alt="Covey Space home screen" fetchpriority="high" className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-3">
            Everything your group needs.
          </h2>
          <p className="text-stone-400 text-center text-sm mb-12">
            Don't need every feature? Admins can turn any of these on or off anytime.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ Icon, title, description, color }) => (
              <div key={title} className="rounded-2xl border border-stone-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={22} weight="fill" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-1.5">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-3">
            Up and running in minutes.
          </h2>
          <p className="text-stone-400 text-center text-sm mb-14">No app store. No IT setup. Perfect for any church group, home church, or Bible study.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
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
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-10 h-10 rounded-full bg-jade text-white font-bold text-lg flex items-center justify-center mb-4 shrink-0">
                  {step}
                </div>
                <h3 className="font-semibold text-stone-800 text-lg mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-16 bg-white overflow-hidden">
        <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-10">See it in action.</h2>
        <div className="relative">
          <div className="flex gap-5 px-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide justify-start lg:justify-center">
            {[
              { src: '/screenshots/home-screen.PNG',    label: 'Home',             caption: 'Your group at a glance' },
              { src: '/screenshots/meal-signup.PNG',    label: 'Meal Signup',      caption: 'Claim your ingredient for the week' },
              { src: '/screenshots/service-signup.PNG', label: 'Service Schedule', caption: 'Sign up to serve' },
              { src: '/screenshots/chat-list.PNG',      label: 'Conversations',    caption: 'Group and direct messages' },
              { src: '/screenshots/group-chat.PNG',     label: 'Group Chat',       caption: 'Stay connected between meetups' },
              { src: '/screenshots/prayer-request.PNG', label: 'Prayer Requests',  caption: 'Never lose track of what matters' },
              { src: '/screenshots/guide.PNG',          label: 'Discussion Guide', caption: 'Open your weekly guide in one tap' },
            ].map(({ src, label, caption }) => (
              <div key={label} className="shrink-0 snap-center flex flex-col items-center gap-3">
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
          {/* Scroll hint — mobile only */}
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden" />
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-jade text-white font-semibold rounded-2xl text-sm hover:bg-jade-700 transition-colors shadow-sm"
          >
            Take a Tour <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

      {/* Differentiation */}
      <section className="px-6 py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-3">
            What makes Covey Space different.
          </h2>
          <p className="text-stone-400 text-center text-sm mb-12">
            Designed specifically for small groups who share life together week after week.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Small group focus</p>
              <h3 className="font-semibold text-stone-800 text-base mb-2 leading-snug">Built for your group, not your whole church</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Covey Space is sized and priced for the group itself. Any group leader can get started in minutes — for free — without church admin approval or a software subscription.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Two-way community</p>
              <h3 className="font-semibold text-stone-800 text-base mb-2 leading-snug">Members connect with each other, not just receive messages</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Every member can post prayer requests, claim meal spots, sign up to serve, and message each other directly. A shared home for your group — not a one-way announcement tool.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Built for coordination</p>
              <h3 className="font-semibold text-stone-800 text-base mb-2 leading-snug">More than a group chat — organized for how small groups run</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Covey Space adds structured meal signups, service schedules, prayer tracking, birthday reminders, and a giving link — all organized the way a small group actually functions week to week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-10">
            Common questions.
          </h2>
          <div className="flex flex-col divide-y divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-stone-50 transition-colors"
                >
                  <span className="font-semibold text-stone-800 text-sm leading-snug">{q}</span>
                  {openFaq === i
                    ? <Minus size={16} weight="bold" className="text-jade shrink-0" />
                    : <Plus size={16} weight="bold" className="text-stone-400 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-5 text-sm text-stone-500 leading-relaxed">{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 lg:py-28 bg-jade text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-league-gothic text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-6">
            Bring your whole group together.
          </h2>
          <button
            onClick={() => goToSignup()}
            disabled={leaving}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-jade font-semibold rounded-2xl text-base hover:bg-jade-50 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Sign up for free <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-20 bg-stone-50 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-jade/10 flex items-center justify-center mx-auto mb-5">
            <EnvelopeSimple size={24} weight="fill" className="text-jade" />
          </div>
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-3">
            Have questions?
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            Whether you're a pastor, group leader, or just curious — reach out and I'll get back to you.
          </p>
          <a
            href="mailto:hello@coveyspace.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-jade hover:bg-jade-700 text-white font-semibold rounded-2xl text-sm transition-colors"
          >
            <EnvelopeSimple size={16} weight="bold" />
            hello@coveyspace.com
          </a>
        </div>
      </section>

      <Footer />

    </div>
  )
}
