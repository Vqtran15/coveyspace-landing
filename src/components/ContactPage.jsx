import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { EnvelopeSimple, ChatCircleDots, HandsPraying, ArrowRight } from '@phosphor-icons/react'
import { motion, useInView } from 'framer-motion'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import FadeUp from './FadeUp.jsx'

const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'
const EASE = [0.25, 0.46, 0.45, 0.94]

const TOPICS = [
  {
    Icon: ChatCircleDots,
    title: 'General questions',
    description: 'Curious about how Coveyspace works or whether it\'s the right fit for your group? I\'m happy to help answer questions!',
  },
  {
    Icon: HandsPraying,
    title: 'Feedback & ideas',
    description: 'Using the app and have a suggestion? I\'d love to hear what would make it better for your group.',
  },
  {
    Icon: EnvelopeSimple,
    title: 'Pastors & group leaders',
    description: 'Leading a church, small group, or house church? Reach out and I\'ll help you get set up.',
  },
]

// Stagger variants for topic cards
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export default function ContactPage() {
  const topicsRef = useRef(null)
  const topicsInView = useInView(topicsRef, { once: true, amount: 0.1 })

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Contact Coveyspace — Get in Touch</title>
        <meta name="description" content="Questions about Coveyspace? Reach out — whether you're a pastor, group leader, or just curious. We'd love to hear from you." />
        <link rel="canonical" href="https://www.coveyspace.com/contact" />
        <meta property="og:url" content="https://www.coveyspace.com/contact" />
        <meta property="og:title" content="Contact Coveyspace — Get in Touch" />
        <meta property="og:description" content="Questions about Coveyspace? Reach out — whether you're a pastor, group leader, or just curious. We'd love to hear from you." />
        <meta property="og:image" content="https://www.coveyspace.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Coveyspace — Get in Touch" />
        <meta name="twitter:description" content="Questions about Coveyspace? Reach out — whether you're a pastor, group leader, or just curious. We'd love to hear from you." />
        <meta name="twitter:image" content="https://www.coveyspace.com/og-image.png" />
      </Helmet>
      <Nav />

      {/* ── Hero — stagger entrance ── */}
      <section className="bg-gradient-to-b from-jade-50 to-white px-6 pt-20 pb-16 lg:pt-28 lg:pb-20 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
          >
            Get in touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            className="font-league-gothic text-6xl sm:text-7xl lg:text-8xl tracking-wide text-stone-900 leading-none mb-6"
          >
            We'd love to<br />hear from you.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
            className="text-stone-500 text-lg leading-relaxed"
          >
            Whether you're a pastor, group leader, or just curious, send a note and I'll get back to you.
          </motion.p>
        </div>
      </section>

      {/* ── Topics — stagger cards + email card ── */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Topic cards with stagger */}
          <motion.div
            ref={topicsRef}
            variants={containerVariants}
            initial="hidden"
            animate={topicsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14"
          >
            {TOPICS.map(({ Icon, title, description }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                className="rounded-2xl border border-stone-100 p-6 shadow-sm text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-jade/10 text-jade flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} weight="fill" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-1.5 text-sm">{title}</h3>
                <p className="text-stone-400 text-xs leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Email card — FadeUp + button micro-interaction */}
          <FadeUp delay={0.15}>
            <div className="bg-jade rounded-2xl p-6 sm:p-10 text-center shadow-lg">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.25 }}
                className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5"
              >
                <EnvelopeSimple size={28} weight="fill" className="text-white" />
              </motion.div>
              <h2 className="font-league-gothic text-4xl sm:text-5xl text-white tracking-wide mb-3">
                Say hello.
              </h2>
              <p className="text-white/70 text-sm mb-7 max-w-sm mx-auto">
                Drop me a line at the address below.
              </p>
              <motion.a
                href="mailto:hello@coveyspace.com"
                whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-jade font-semibold rounded-2xl text-sm hover:bg-jade-50 transition-colors shadow-md"
              >
                <EnvelopeSimple size={16} weight="bold" />
                hello@coveyspace.com
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16 bg-stone-50 text-center">
        <FadeUp className="max-w-2xl mx-auto">
          <p className="text-stone-400 text-sm mb-4">Ready to get started?</p>
          <motion.a
            href={SIGNUP_URL}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-jade text-white font-semibold rounded-2xl text-base hover:bg-jade-700 transition-colors shadow-md"
          >
            Sign up for free <ArrowRight size={18} weight="bold" />
          </motion.a>
        </FadeUp>
      </section>

      <Footer />
    </div>
  )
}
