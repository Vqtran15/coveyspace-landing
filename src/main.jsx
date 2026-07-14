import { StrictMode, useEffect, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import LandingPage from './components/LandingPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import InstallPage from './components/InstallPage.jsx'
import PrivacyPage from './components/PrivacyPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
