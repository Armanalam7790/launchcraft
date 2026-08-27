import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import useLenis from './hooks/useLenis'
import { ScrollTrigger } from './lib/gsap'

import Preloader from './components/layout/Preloader'
import Cursor from './components/layout/Cursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/layout/ErrorBoundary'

import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'

/** Routes don't reset scroll by default — jump to top on a plain navigation (no hash). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function AppShell({ loading, onDone }) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // Home's pinned ScrollTrigger sections can't survive being unmounted mid
  // route-transition — GSAP's pin-spacer cleanup races React's own DOM
  // removal and throws "removeChild" (caught silently, but the page that was
  // being navigated to never actually renders). So Home never unmounts once
  // it's mounted; it's just hidden with CSS. Refresh ScrollTrigger's
  // measurements when it becomes visible again, since it may have laid out
  // while hidden (display:none reports zero size).
  useEffect(() => {
    if (!onHome) return
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [onHome])

  return (
    <>
      {loading && <Preloader onDone={onDone} />}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[2100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <ScrollToTop />
      <main id="main-content">
        <div className={onHome ? '' : 'hidden'}>
          <HomePage ready={!loading} />
        </div>
        <ErrorBoundary>
          <Routes>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/" element={null} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useLenis()

  const handleDone = () => {
    setLoading(false)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      // Navbar's section-theme probe took its first reading while the
      // Preloader still covered the screen, so it locked onto "light".
      // Its resize listener is already wired to recheck — reuse it now
      // that the real content underneath is finally exposed.
      window.dispatchEvent(new Event('resize'))
    })
  }

  return (
    <BrowserRouter>
      <AppShell loading={loading} onDone={handleDone} />
    </BrowserRouter>
  )
}

export default App
