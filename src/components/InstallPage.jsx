import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { DeviceMobile, Browser, ArrowsOut, Lightning } from '@phosphor-icons/react'
import { motion, useInView } from 'framer-motion'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import FadeUp from './FadeUp.jsx'

const EASE = [0.25, 0.46, 0.45, 0.94]

const BENEFITS = [
  {
    Icon: ArrowsOut,
    title: 'Full-screen experience',
    desc: 'No browser bar taking up space — the app fills your whole screen just like a native app.',
  },
  {
    Icon: DeviceMobile,
    title: 'Home screen shortcut',
    desc: 'Tap the Coveyspace icon on your home screen and go straight in — no typing a URL.',
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

// Stagger variants for the benefits grid
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

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

export default function InstallPage() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })

  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.15 })

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Install Coveyspace — Add to Your Home Screen</title>
        <meta name="description" content="Add Coveyspace to your home screen for a full-screen native app experience on iPhone, iPad, or Android. No app store needed — takes 30 seconds." />
        <link rel="canonical" href="https://www.coveyspace.com/install" />
        <meta property="og:url" content="https://www.coveyspace.com/install" />
        <meta property="og:title" content="Install Coveyspace — Add to Your Home Screen" />
        <meta property="og:description" content="Add Coveyspace to your home screen for a full-screen native app experience on iPhone, iPad, or Android. No app store needed — takes 30 seconds." />
        <meta property="og:image" content="https://www.coveyspace.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Install Coveyspace — Add to Your Home Screen" />
        <meta name="twitter:description" content="Add Coveyspace to your home screen for a full-screen native app experience on iPhone, iPad, or Android. No app store needed — takes 30 seconds." />
        <meta name="twitter:image" content="https://www.coveyspace.com/og-image.png" />
      </Helmet>
      <Nav />

      {/* ── Hero — stagger entrance ── */}
      <section className="px-6 pt-20 pb-10 bg-gradient-to-b from-jade-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="font-league-gothic text-5xl sm:text-6xl text-stone-900 tracking-wide mb-4"
          >
            Use it like an app.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            className="text-stone-500 text-lg leading-relaxed max-w-xl mx-auto"
          >
            Coveyspace is a web app — no app store required. Add it to your home screen in seconds for the full native experience.
          </motion.p>
        </div>
      </section>

      {/* ── Why install — stagger grid ── */}
      <section className="px-6 pt-10 pb-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="font-league-gothic text-3xl sm:text-4xl text-stone-800 tracking-wide text-center mb-10">
              Why install it?
            </h2>
          </FadeUp>
          <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {BENEFITS.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                className="flex items-start gap-4 p-5 rounded-2xl border border-stone-100 shadow-sm"
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
        </div>
      </section>

      {/* ── Install instructions ── */}
      <section className="px-6 py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row lg:items-start gap-12">

          <div ref={stepsRef} className="flex-1 flex flex-col gap-6">
            {/* iOS warning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6"
              >
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-5">iPhone / iPad</p>
                <ol className="flex flex-col gap-4">
                  {IOS_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={stepsInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
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
                animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6"
              >
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-5">Android</p>
                <ol className="flex flex-col gap-4">
                  {ANDROID_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={stepsInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
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

          {/* Phone screenshot — floating animation */}
          <div className="flex justify-center shrink-0">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-52 lg:w-60 p-2 bg-stone-800 rounded-[1.75rem] shadow-2xl">
                <div className="rounded-[1.25rem] overflow-hidden">
                  <img src="/screenshots/add-to-home-2.PNG" alt="Add to Home Screen prompt in Safari" loading="lazy" className="w-full h-auto block" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
