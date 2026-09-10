import { useState } from 'react'
import { Link } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const LOGIN_URL  = 'https://app.coveyspace.com/login'
const SIGNUP_URL = 'https://app.coveyspace.com/login?tab=signup'
const JADE = '#C4622D'

const NAV_LINKS = [
  { label: 'About',       href: '/#about' },
  { label: 'Install App', href: '/#install' },
  { label: 'Contact',     href: '/#contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Colors transition as the jade fill covers the nav
  const range = [0.3, 0.85]
  const textColor    = useTransform(scrollYProgress, range, ['#78716c', '#ffffff'])
  const logoColor    = useTransform(scrollYProgress, range, ['#1c1917', '#ffffff'])
  const borderColor  = useTransform(scrollYProgress, range, ['#f5f5f4', 'rgba(255,255,255,0.15)'])
  const loginBorder  = useTransform(scrollYProgress, range, ['#e7e5e4', 'rgba(255,255,255,0.4)'])
  const ctaBg        = useTransform(scrollYProgress, range, [JADE, '#ffffff'])
  const ctaColor     = useTransform(scrollYProgress, range, ['#ffffff', JADE])
  const iconBg       = useTransform(scrollYProgress, range, [JADE, '#ffffff'])
  const iconFill     = useTransform(scrollYProgress, range, ['#ffffff', JADE])

  return (
    <>
      <motion.nav
        style={{ borderColor }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b px-6 py-4 relative overflow-hidden"
      >
        {/* Jade progress fill — sits behind all content */}
        <motion.div
          className="absolute inset-0 origin-left pointer-events-none"
          style={{ scaleX: progressScaleX, backgroundColor: JADE }}
        />

        <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <motion.div
              style={{ backgroundColor: iconBg }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
            >
              <motion.svg
                viewBox="0 0 256 256"
                className="w-4 h-4"
                style={{ fill: iconFill }}
              >
                <path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z" />
              </motion.svg>
            </motion.div>
            <motion.span
              style={{ color: logoColor }}
              className="text-2xl font-bold tracking-tight"
            >
              Coveyspace
            </motion.span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                style={{ color: textColor }}
                className="px-3 py-2 text-sm font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                {label}
              </motion.a>
            ))}
            <motion.button
              onClick={() => { window.location.href = LOGIN_URL }}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
              style={{ color: textColor, borderColor: loginBorder }}
              className="ml-2 px-4 py-2 border text-sm font-semibold rounded-xl hover:bg-white/20 transition-colors"
            >
              Log in
            </motion.button>
            <motion.a
              href={SIGNUP_URL}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: ctaBg, color: ctaColor }}
              className="ml-1 px-4 py-2 text-sm font-semibold rounded-xl"
            >
              Get started
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            style={{ color: textColor }}
            className="sm:hidden p-2 -mr-1 rounded-xl hover:bg-white/20 transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-x-0 top-[65px] bg-white border-b border-stone-200 shadow-xl px-6 py-4 flex flex-col gap-1 animate-menu-enter">
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
                Get started free
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
