import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ForkKnife, CalendarCheck, ChatCircleDots, HandsPraying, Cake, ArrowRight, EnvelopeSimple } from '@phosphor-icons/react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'

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
    description: 'One place for all your group conversations — no more juggling group texts, GroupMe, or WhatsApp.',
    color: 'bg-sage/20 text-sage-700',
  },
  {
    Icon: HandsPraying,
    title: 'Prayer Requests',
    description: "Prayer requests get their own dedicated space — never buried in a chat thread, always easy to find and revisit.",
    color: 'bg-sunrise/10 text-sunrise',
  },
  {
    Icon: Cake,
    title: 'Birthdays',
    description: "Add birthdays for your group members and get reminded 30 days before — so no one slips through the cracks.",
    color: 'bg-coral/10 text-coral',
  },
]

export default function LandingPage() {
  const [leaving, setLeaving] = useState(false)

  function goToSignup() {
    if (leaving) return
    setLeaving(true)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'signup_intent' })
    setTimeout(() => { window.location.href = SIGNUP_URL }, 350)
  }

  return (
    <div
      className={`min-h-screen bg-white font-sans animate-page-enter transition-[opacity,transform] duration-300 ease-in-out ${leaving ? 'opacity-0 translate-y-3' : 'opacity-100'}`}
    >

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
              Covey Space brings automated meal signups, service schedules, group chats, and prayer requests into one place — built for those who share life together around a table and out in the community.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={goToSignup}
                disabled={leaving}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-jade text-white font-semibold rounded-2xl text-base hover:bg-jade-700 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Sign up for free <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* Phone mockup — desktop only */}
          <div className="hidden lg:flex shrink-0">
            <div className="w-64 p-2.5 bg-stone-800 rounded-[2rem] shadow-2xl">
              <div className="rounded-[1.5rem] overflow-hidden">
                <img src="/screenshots/home-screen.PNG" alt="Covey Space home screen" className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide text-center mb-12">
            Everything your group needs.
          </h2>
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
          <p className="text-stone-400 text-center text-sm mb-14">No app store. No IT setup. Just share a code.</p>
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
            ].map(({ src, label, caption }) => (
              <div key={label} className="shrink-0 snap-center flex flex-col items-center gap-3">
                <div className="w-44 lg:w-48 p-2 bg-stone-800 rounded-[1.75rem] shadow-2xl">
                  <div className="rounded-[1.25rem] overflow-hidden">
                    <img src={src} alt={label} className="w-full h-auto block" />
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

      {/* Final CTA */}
      <section className="px-6 py-20 lg:py-28 bg-jade text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-league-gothic text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-6">
            Bring your whole group together.
          </h2>
          <button
            onClick={goToSignup}
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
