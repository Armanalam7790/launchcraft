import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Pins `wrapRef` and translates `trackRef` horizontally across the pinned
 * scroll distance. Only active at >= `minWidth` (disabled on touch/mobile).
 */
export default function useHorizontalScroll({ minWidth = 861 } = {}) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const mm = gsap.matchMedia()
    mm.add(`(min-width: ${minWidth}px)`, () => {
      // Nested gsap.context() so `.revert()` fully unwinds the pin-spacer —
      // relying on matchMedia's own implicit tracking alone isn't reliable
      // enough for a pinned trigger and can throw "removeChild" on unmount.
      const ctx = gsap.context(() => {
        const getDistance = () => track.scrollWidth - window.innerWidth

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
      }, wrap)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [minWidth])

  return { wrapRef, trackRef }
}
