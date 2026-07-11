import { Helmet } from 'react-helmet-async'
import { trackEvent } from '../lib/analytics.js'
import { EnvelopeSimple, ChatCircleDots, HandsPraying, ArrowRight } from '@phosphor-icons/react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'

const TOPICS = [
  {
    Icon: ChatCircleDots,
    title: 'General questions',
    description: 'Curious about how Covey Space works or whether it\'s the right fit for your group? I\'m happy to help answer questions!',
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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans animate-page-enter">
      <Helmet>
        <title>Contact Covey Space — Get in Touch</title>
        <meta name="description" content="Questions about Covey Space? Reach out — whether you're a pastor, group leader, or just curious. We'd love to hear from you." />
        <link rel="canonical" href="https://www.coveyspace.com/contact" />
        <meta property="og:url" content="https://www.coveyspace.com/contact" />
        <meta property="og:title" content="Contact Covey Space — Get in Touch" />
        <meta property="og:description" content="Questions about Covey Space? Reach out — whether you're a pastor, group leader, or just curious. We'd love to hear from you." />
      </Helmet>
      <Nav />

      {/* Hero */}
      <section className="bg-gradient-to-b from-jade-50 to-white px-6 pt-20 pb-16 lg:pt-28 lg:pb-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-jade/10 text-jade text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            Get in touch
          </div>
          <h1 className="font-league-gothic text-6xl sm:text-7xl lg:text-8xl tracking-wide text-stone-900 leading-none mb-6">
            We'd love to<br />hear from you.
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            Whether you're a pastor, group leader, or just curious, send a note and I'll get back to you.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
            {TOPICS.map(({ Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-stone-100 p-6 shadow-sm text-center">
                <div className="w-11 h-11 rounded-xl bg-jade/10 text-jade flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} weight="fill" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-1.5 text-sm">{title}</h3>
                <p className="text-stone-400 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* Email card */}
          <div className="bg-jade rounded-2xl p-6 sm:p-10 text-center shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
              <EnvelopeSimple size={28} weight="fill" className="text-white" />
            </div>
            <h2 className="font-league-gothic text-4xl sm:text-5xl text-white tracking-wide mb-3">
              Say hello.
            </h2>
            <p className="text-white/70 text-sm mb-7 max-w-sm mx-auto">
              Drop me a line at the address below.
            </p>
            <a
              href="mailto:hello@coveyspace.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-jade font-semibold rounded-2xl text-sm hover:bg-jade-50 transition-colors shadow-md"
            >
              <EnvelopeSimple size={16} weight="bold" />
              hello@coveyspace.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-stone-50 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-stone-400 text-sm mb-4">Ready to get started?</p>
          <a
            href={SIGNUP_URL}
            onClick={() => trackEvent('cta_click', { page: 'contact', location: 'footer' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-jade text-white font-semibold rounded-2xl text-base hover:bg-jade-700 transition-colors shadow-md"
          >
            Sign up for free <ArrowRight size={18} weight="bold" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
