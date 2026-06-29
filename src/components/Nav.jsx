import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'

const LOGIN_URL   = 'https://app.coveyspace.com/login'
const SIGNUP_URL  = 'https://app.coveyspace.com/login?tab=signup'

export default function Nav() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-stone-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-jade flex items-center justify-center">
              <svg viewBox="0 0 256 256" className="w-4 h-4 fill-white">
                <path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z" />
              </svg>
            </div>
            <span className="font-league-gothic text-2xl text-jade tracking-wide">Covey Space</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-semibold rounded-xl transition-colors ${
                pathname === '/about' ? 'text-jade bg-jade/10' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-semibold rounded-xl transition-colors ${
                pathname === '/contact' ? 'text-jade bg-jade/10' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/install"
              className={`px-3 py-2 text-sm font-semibold rounded-xl transition-colors ${
                pathname === '/install' ? 'text-jade bg-jade/10' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              Install App
            </Link>
            <button
              onClick={() => { window.location.href = LOGIN_URL }}
              className="ml-2 px-4 py-2 border border-stone-200 text-stone-600 text-sm font-semibold rounded-xl hover:bg-stone-50 transition-colors"
            >
              Log in
            </button>
            <a
              href={SIGNUP_URL}
              className="ml-1 px-4 py-2 bg-jade text-white text-sm font-semibold rounded-xl hover:bg-jade-700 transition-colors"
            >
              Get started
            </a>
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-x-0 top-[65px] bg-white border-b border-stone-200 shadow-xl px-6 py-4 flex flex-col gap-1 animate-menu-enter">
            <Link
              to="/about"
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/about' ? 'text-jade bg-jade/10' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/contact' ? 'text-jade bg-jade/10' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/install"
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/install' ? 'text-jade bg-jade/10' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              Install App
            </Link>
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
