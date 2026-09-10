import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

const LOGIN_URL  = 'https://app.coveyspace.com/login'
const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'

const NAV_LINKS = [
  { label: 'About',       href: '/#about',   sectionId: 'about'   },
  { label: 'Install App', href: '/#install', sectionId: 'install' },
  { label: 'Contact',     href: '/#contact', sectionId: 'contact' },
]

const SECTION_IDS = NAV_LINKS.map(l => l.sectionId)

export default function Nav() {
  const [menuOpen, setMenuOpen]         = useState(false)
  const [scrolled, setScrolled]         = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  const { scrollY, scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Transparent→frosted + active section — one listener
  useEffect(() => {
    const unsub = scrollY.on('change', v => {
      setScrolled(v > 40)

      const mid = v + window.innerHeight * 0.4
      let active = null
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) active = id
      }
      setActiveSection(active)
    })
    return unsub
  }, [scrollY])

  return (
    <>
      <nav className={`sticky top-0 z-50 px-6 transition-all duration-300 relative ${
        scrolled
          ? 'bg-white/80 backdrop-blur border-b border-stone-100 shadow-sm py-2.5'
          : 'bg-transparent border-b border-transparent py-4'
      }`}>
        {/* Scroll progress line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-jade origin-left pointer-events-none"
          style={{ scaleX: progressScaleX }}
        />

        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            {/* Logo icon with hover spring */}
            <motion.div
              whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="w-8 h-8 rounded-full bg-jade flex items-center justify-center"
            >
              <svg viewBox="0 0 256 256" className="w-4 h-4 fill-white">
                <path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z" />
              </svg>
            </motion.div>
            <span className="text-2xl font-bold text-stone-800 tracking-tight">Coveyspace</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, sectionId }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ y: -1, transition: { type: 'spring', stiffness: 500, damping: 28 } }}
                className={`relative px-3 py-2 text-sm font-semibold rounded-xl transition-colors ${
                  activeSection === sectionId
                    ? 'text-stone-800'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                {label}
                {activeSection === sectionId && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-jade rounded-full"
                  />
                )}
              </motion.a>
            ))}
            <motion.button
              onClick={() => { window.location.href = LOGIN_URL }}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 px-4 py-2 border border-stone-200 text-stone-600 text-sm font-semibold rounded-xl hover:bg-stone-50 transition-colors"
            >
              Log in
            </motion.button>
            <motion.a
              href={SIGNUP_URL}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
              className="ml-1 px-4 py-2 bg-jade text-white text-sm font-semibold rounded-xl hover:bg-jade-700 transition-colors"
            >
              Get started
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 -mr-1 rounded-xl text-stone-500 hover:bg-stone-100 transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — AnimatePresence for in/out animation */}
      <AnimatePresence>
        {menuOpen && (
          <div className="sm:hidden fixed inset-0 z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/20"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ top: scrolled ? 53 : 65 }}
              className="absolute inset-x-0 bg-white border-b border-stone-200 shadow-xl px-6 py-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  {label}
                </a>
              ))}
              <div className="border-t border-stone-100 mt-2 pt-3 flex flex-col gap-2">
                <button
                  onClick={() => { window.location.href = LOGIN_URL }}
                  className="w-full py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl text-sm hover:bg-stone-50 transition-colors"
                >
                  Log in
                </button>
                <a
                  href={SIGNUP_URL}
                  className="w-full py-3 bg-jade text-white font-semibold rounded-xl text-sm hover:bg-jade-700 transition-colors text-center"
                >
                  Get started
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
