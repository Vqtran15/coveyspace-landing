function gtag(...args) {
  if (typeof window.gtag === 'function') window.gtag(...args)
}

export function trackEvent(name, params = {}) {
  gtag('event', name, params)
}
