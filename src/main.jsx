import { StrictMode, useEffect, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import LandingPage from './components/LandingPage.jsx'
import PrivacyPage from './components/PrivacyPage.jsx'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll — connects to GSAP's ticker so ScrollTrigger
// receives accurate scroll positions without drift.
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: false,
})

gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Keep ScrollTrigger in sync with Lenis scroll values
lenis.on('scroll', ScrollTrigger.update)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    lenis.scrollTo(0, { immediate: true })
  }, [pathname])
  return null
}

class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#57534e' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Something went wrong.</p>
            <p style={{ fontSize: '0.875rem', color: '#a8a29e' }}>Please refresh the page.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/"        element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*"        element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
