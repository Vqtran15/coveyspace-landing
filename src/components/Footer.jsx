import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="px-6 py-10 bg-stone-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
          <span className="font-league-gothic text-2xl text-stone-400 tracking-wide">Coveyspace</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/#about"   className="text-stone-300 hover:text-white text-sm transition-colors">About</a>
            <a href="/#contact" className="text-stone-300 hover:text-white text-sm transition-colors">Contact</a>
            <a href="/#install" className="text-stone-300 hover:text-white text-sm transition-colors">Install App</a>
            <Link to="/privacy" className="text-stone-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
          </div>
        </div>
        <p className="text-stone-600 text-xs">© {new Date().getFullYear()} Coveyspace. All rights reserved.</p>
      </div>
    </footer>
  )
}
