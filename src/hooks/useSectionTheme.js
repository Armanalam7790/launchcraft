import { useEffect, useState } from 'react'

/**
 * Reads which theme ('light' | 'dark') the section sitting just below the
 * fixed navbar currently belongs to, by checking the element at a fixed
 * point each scroll tick. Sections opt in via `data-theme="dark"` (light is
 * the default, so it's optional there).
 */
export default function useSectionTheme(probeY = 90) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    let raf = null
    const check = () => {
      raf = null
      const el = document.elementFromPoint(window.innerWidth / 2, probeY)
      const themed = el?.closest('[data-theme]')
      setTheme(themed?.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [probeY])

  return theme
}
