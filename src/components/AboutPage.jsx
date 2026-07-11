import { useState, useEffect, useRef } from 'react'
import { trackEvent } from '../lib/analytics.js'
import { Helmet } from 'react-helmet-async'
import { ForkKnife, CalendarCheck, ChatCircleDots, HandsPraying, Cake, BookBookmark, DeviceMobile, ShieldCheck, ArrowRight } from '@phosphor-icons/react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'

const FEATURES = [
  {
    Icon: ForkKnife,
    title: 'Meal Signups',
    color: 'bg-jade/10 text-jade',
    screenshot: '/screenshots/meal-signup.PNG',
    alt: 'Meal signup screen',
    shortDesc: 'Members sign up for an ingredient each week. The app auto-advances to the next meal and cycles back to older ones when the list runs out.',
    description:
      'Load up your weekly meal rotation once, and the app handles the rest. Members sign in and claim an ingredient — pasta week? Someone brings noodles, someone else brings sauce, another brings dessert. The night after your group meets, it automatically advances to the next meal. When the list runs out, it cycles back to meals you haven\'t had in a while. Tap the menu to edit ingredients, reorder your meal list, or pause signups for weeks you\'re skipping.',
  },
  {
    Icon: CalendarCheck,
    title: 'Service Schedules',
    color: 'bg-lagoon/10 text-lagoon-600',
    screenshot: '/screenshots/service-signup.PNG',
    alt: 'Service signup screen',
    shortDesc: 'Monthly service sign-ups that rotate automatically. Or turn off automation and add events manually as you go.',
    description:
      'Service sign-ups work just like meals, but on a monthly cadence. Members browse the list and claim what they\'d like to help with. If your group doesn\'t follow a monthly rhythm, just disable the automation and add service events manually as you go.',
  },
  {
    Icon: ChatCircleDots,
    title: 'Group Chat',
    color: 'bg-sage/20 text-sage-700',
    screenshot: '/screenshots/group-chat.PNG',
    alt: 'Group chat screen',
    shortDesc: 'A main group chat for everyone, plus DMs and smaller group threads. React, reply, and edit messages. Enable push notifications in Settings.',
    description:
      'A Main Group Chat is set up by default with every member included. You can also direct message any member or start a smaller group chat for specific people. Double-tap someone\'s message to react, copy, or reply. Double-tap your own to edit it. Turn on push notifications in Settings so you never miss a message.',
  },
  {
    Icon: HandsPraying,
    title: 'Prayer Requests',
    color: 'bg-sunrise/10 text-sunrise',
    screenshot: '/screenshots/prayer-request.PNG',
    alt: 'Prayer requests screen',
    shortDesc: 'Every member has a prayer profile. Log requests under their name and look back months later to see what God has done.',
    description:
      'Every member has a profile in the Prayer Requests tab — no need to type out names each time. Just find the person and write their request. Requests are saved to their profile so you can look back months later and see what God has done. There\'s something powerful about revisiting old prayers and seeing them answered.',
  },
  {
    Icon: Cake,
    title: 'Birthday Reminders',
    color: 'bg-coral/10 text-coral',
    screenshot: '/screenshots/home-screen.PNG',
    alt: 'Home screen with birthday banner',
    shortDesc: 'Upcoming birthdays show on the home screen with animations and a banner notification within 14 days. No one gets forgotten.',
    description:
      'The home screen shows your group\'s upcoming birthdays so no one gets forgotten. Birthdays within 30 days show a special animation, and a banner notification appears at the top for anyone turning a year older within 14 days. Let\'s make sure every member feels seen and celebrated.',
  },
  {
    Icon: BookBookmark,
    title: 'Discussion Guide',
    color: 'bg-jade/10 text-jade',
    screenshot: '/screenshots/guide.PNG',
    alt: 'Discussion guide screen',
    shortDesc: 'Link your church\'s weekly guide so every member can open it in one tap from the home screen.',
    description:
      'A discussion guide section lives right on the home screen. If your church provides a weekly guide or your group creates its own, your admin can link it so every member can open it in one tap.',
  },
  {
    Icon: ShieldCheck,
    title: 'Admin Controls',
    color: 'bg-lagoon/10 text-lagoon-600',
    screenshot: '/screenshots/admin.PNG',
    alt: 'Admin settings screen',
    shortDesc: 'Manage members, invite codes, and feature toggles — all from one dedicated admin panel.',
    description:
      'Your group\'s invite code lives in Admin Settings — it\'s how new members join securely. Remove users, promote members to admin, and toggle features on or off. All from one panel.',
  },
  {
    Icon: DeviceMobile,
    title: 'Works like a native app',
    color: 'bg-stone-100 text-stone-600',
    screenshot: '/screenshots/add-to-home-2.PNG',
    alt: 'Add to home screen prompt',
    shortDesc: 'Add Covey Space to your home screen and it behaves just like a downloaded app — no App Store required.',
    description:
      'No app store required. Covey Space works in any browser, and when you add it to your home screen it looks and feels just like a native app — complete with push notifications. It works great on desktop too. A dedicated iOS and Android app is on the roadmap.',
  },
]

export default function AboutPage() {
  // Desktop sticky scroll
  const [activeIndex, setActiveIndex] = useState(0)
  const [phoneVisible, setPhoneVisible] = useState(false)
  const featureRefs = useRef([])

  // Mobile carousel
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStartX = useRef(null)

  useEffect(() => {
    function onScroll() {
      const mid = window.innerHeight / 2
      let closest = 0
      let closestDist = Infinity
      featureRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActiveIndex(closest)

      const firstEl = featureRefs.current[0]
      const lastEl = featureRefs.current[featureRefs.current.length - 1]
      if (firstEl && lastEl) {
        const firstRect = firstEl.getBoundingClientRect()
        const lastRect = lastEl.getBoundingClientRect()
        setPhoneVisible(firstRect.top < mid + 50 && lastRect.bottom > 0)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) {
      if (delta > 0) setActiveSlide(s => Math.min(s + 1, FEATURES.length - 1))
      else setActiveSlide(s => Math.max(s - 1, 0))
    }
    touchStartX.current = null
  }

  return (
    <div className="min-h-screen bg-white font-sans animate-page-enter">
      <Helmet>
        <title>About Covey Space — Built for Small Groups & House Churches</title>
        <meta name="description" content="Learn how Covey Space was built for church small groups, home churches, house churches, and Christian community groups — one app for meals, chat, prayer, and more." />
        <link rel="canonical" href="https://www.coveyspace.com/about" />
        <meta property="og:url" content="https://www.coveyspace.com/about" />
        <meta property="og:title" content="About Covey Space — Built for Small Groups & House Churches" />
        <meta property="og:description" content="Learn how Covey Space was built to eliminate weekly coordination chaos for community groups. One app for meals, chat, prayer, and more." />
      </Helmet>
      <Nav />

      {/* Hero */}
      <section className="bg-gradient-to-b from-jade-50 to-white px-6 pt-20 pb-8 lg:pt-28 lg:pb-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            Our Story
          </div>
          <h1 className="font-league-gothic text-6xl sm:text-7xl lg:text-8xl tracking-wide text-stone-900 leading-none mb-6">
            Built for groups who break bread around a table.
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            Covey Space started as a solution to a Sunday night ritual and grew into a platform for church small groups, home churches, house churches, and Christian community groups everywhere.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pt-8 pb-16 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-5 text-stone-600 text-[1.0625rem] leading-relaxed">
            <p>
              Hello, my name is Vuong, founder of Covey Space. My wife and I serve as the meal coordinators for our Community Group at Bridgetown Church, where we share weekly meals, dive into discussion guides, and practice a monthly service rhythm. We love serving our community, but the weekly coordination was getting tough. Every Sunday after church, we'd scramble to set up a Google Sheets meal signup and post it in GroupMe—it worked, but it was just one more chore at the end of a long week.
            </p>
            <p>
              Having built web apps before, I realized I could use my skills to solve this problem for our group. I started by building out a meals section, but quickly realized I could bring everything into one place. I expanded it to include chat, birthday reminders, prayer requests, service schedules, and discussion guides, creating a true all-in-one app tailored for community groups.
            </p>
            <p>
              Within a couple of weeks, Covey Space was live, completely eliminating the need for Google Sheets and chat apps. My hope is that Covey Space helps your community group, church small group, home church, house church, or Bible study group stay organized — so you can spend less time coordinating and more time focusing on spiritual formation.
            </p>
            <p className="font-semibold text-stone-800">Vuong Tran, Founder</p>
          </div>
        </div>
      </section>

      {/* Section heading */}
      <div className="border-t border-stone-100 px-6 pt-14 pb-8 text-center">
        <h2 className="font-league-gothic text-4xl sm:text-5xl text-stone-800 tracking-wide mb-2">
          Everything inside Covey Space.
        </h2>
        <p className="lg:hidden text-stone-400 text-base">One platform for every part of your community group.</p>
      </div>

      {/* ── Mobile: swipeable carousel ── */}
      <div className="lg:hidden px-6 pt-10 pb-6">
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
            {FEATURES.map((feature) => (
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

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-5">
          {FEATURES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-6 bg-jade' : 'w-2 bg-stone-300'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between items-center mt-4 text-sm font-semibold">
          <button
            onClick={() => setActiveSlide(s => Math.max(s - 1, 0))}
            disabled={activeSlide === 0}
            className="px-4 py-2 rounded-xl text-stone-400 disabled:opacity-0 transition-opacity"
          >
            ← Prev
          </button>
          <span className="text-stone-300 text-xs">{activeSlide + 1} / {FEATURES.length}</span>
          <button
            onClick={() => setActiveSlide(s => Math.min(s + 1, FEATURES.length - 1))}
            disabled={activeSlide === FEATURES.length - 1}
            className="px-4 py-2 rounded-xl text-stone-400 disabled:opacity-0 transition-opacity"
          >
            Next →
          </button>
        </div>
      </div>

      {/* ── Desktop: sticky scroll ── */}
      <div className="hidden lg:block px-6 pb-0">
        <div className="max-w-5xl mx-auto flex gap-20 items-start">

          {/* Left: scrollable feature list */}
          <div className="flex-1 pb-[50vh]">
            {FEATURES.map((feature, i) => (
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

          {/* Right: sticky phone */}
          <div className={`w-52 shrink-0 sticky top-1/2 -translate-y-1/2 self-start transition-opacity duration-700 ${phoneVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="p-2 bg-stone-800 rounded-[1.75rem] shadow-2xl">
              <div className="rounded-[1.25rem] overflow-hidden relative" style={{ paddingBottom: '216%' }}>
                {FEATURES.map((f, i) => (
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

      {/* CTA */}
      <section className="px-6 py-20 lg:py-28 bg-jade text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-league-gothic text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-6">
            Ready to bring your group together?
          </h2>
          <a
            href={SIGNUP_URL}
            onClick={() => trackEvent('cta_click', { page: 'about', location: 'footer' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-jade font-semibold rounded-2xl text-base hover:bg-jade-50 transition-colors shadow-lg"
          >
            Sign up for free <ArrowRight size={18} weight="bold" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
