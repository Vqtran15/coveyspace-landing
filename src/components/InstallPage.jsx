import { Helmet } from 'react-helmet-async'
import { DeviceMobile, Browser, ArrowsOut, Lightning } from '@phosphor-icons/react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

const BENEFITS = [
  {
    Icon: ArrowsOut,
    title: 'Full-screen experience',
    desc: 'No browser bar taking up space — the app fills your whole screen just like a native app.',
  },
  {
    Icon: DeviceMobile,
    title: 'Home screen shortcut',
    desc: 'Tap the Covey Space icon on your home screen and go straight in — no typing a URL.',
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

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-white font-sans animate-page-enter">
      <Helmet>
        <title>Install Covey Space — Add to Your Home Screen</title>
        <meta name="description" content="Add Covey Space to your home screen for a full-screen native app experience on iPhone, iPad, or Android. No app store needed — takes 30 seconds." />
        <link rel="canonical" href="https://www.coveyspace.com/install" />
        <meta property="og:url" content="https://www.coveyspace.com/install" />
        <meta property="og:title" content="Install Covey Space — Add to Your Home Screen" />
        <meta property="og:description" content="Add Covey Space to your home screen for a full-screen native app experience on iPhone, iPad, or Android. No app store needed — takes 30 seconds." />
        <meta property="og:image" content="https://www.coveyspace.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Install Covey Space — Add to Your Home Screen" />
        <meta name="twitter:description" content="Add Covey Space to your home screen for a full-screen native app experience on iPhone, iPad, or Android. No app store needed — takes 30 seconds." />
        <meta name="twitter:image" content="https://www.coveyspace.com/og-image.png" />
      </Helmet>
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-20 pb-10 bg-gradient-to-b from-jade-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-league-gothic text-5xl sm:text-6xl text-stone-900 tracking-wide mb-4">
            Use it like an app.
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed max-w-xl mx-auto">
            Covey Space is a web app — no app store required. Add it to your home screen in seconds for the full native experience.
          </p>
        </div>
      </section>

      {/* Why install */}
      <section className="px-6 pt-10 pb-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-league-gothic text-3xl sm:text-4xl text-stone-800 tracking-wide text-center mb-10">
            Why install it?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-2xl border border-stone-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-jade/10 text-jade flex items-center justify-center shrink-0">
                  <Icon size={20} weight="fill" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1 text-sm">{title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Install instructions */}
      <section className="px-6 py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row lg:items-start gap-12">

          <div className="flex-1 flex flex-col gap-6">
            {/* iOS warning */}
            <div className="relative overflow-hidden flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 shadow-sm">
              <span className="absolute left-0 top-0 h-full w-1.5 bg-red-400 rounded-l-2xl" />
              <div className="pl-3">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">iPhone & iPad: use Safari</p>
                <p className="text-sm text-red-600 leading-relaxed">
                  The "Add to Home Screen" option only appears in Safari. If you're in Chrome, Firefox, or another browser on iOS, switch to Safari first.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* iOS */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-5">iPhone / iPad</p>
                <ol className="flex flex-col gap-4">
                  {[
                    'Open app.coveyspace.com in Safari',
                    'Tap the Share button (box with arrow) at the bottom',
                    'Scroll down and tap "Add to Home Screen"',
                    'Tap "Add" in the top right',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-jade/10 text-jade text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-stone-600 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Android */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-5">Android</p>
                <ol className="flex flex-col gap-4">
                  {[
                    'Open app.coveyspace.com in Chrome',
                    'Tap the three-dot menu in the top right',
                    'Tap "Add to Home Screen" or "Install App"',
                    'Tap "Add" to confirm',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-jade/10 text-jade text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-stone-600 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Phone screenshot */}
          <div className="flex justify-center shrink-0">
            <div className="w-52 lg:w-60 p-2 bg-stone-800 rounded-[1.75rem] shadow-2xl">
              <div className="rounded-[1.25rem] overflow-hidden">
                <img src="/screenshots/add-to-home-2.PNG" alt="Add to Home Screen prompt in Safari" loading="lazy" className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
