import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

/** Media grows to full-bleed as the section is scrolled through — reactbits' Scroll Expand. */
export default function ScrollExpand() {
  const wrapRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 641px)', () => {
      // Nested gsap.context() so `.revert()` fully unwinds the pin-spacer —
      // relying on matchMedia's own implicit tracking alone isn't reliable
      // enough for a pinned trigger and can throw "removeChild" on unmount.
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: wrap,
          start: 'top top',
          end: '+=100%',
          scrub: 0.6,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress
            // Scale a fixed-width box instead of animating `width` directly —
            // width/height changes force a layout reflow on every scroll tick,
            // scale is GPU-composited and free.
            gsap.set(mediaRef.current, { scale: 1 + p * (100 / 44 - 1), borderRadius: `${24 - p * 24}px` })
            gsap.set(titleRef.current, { opacity: Math.max(0, 1 - p * 1.3), scale: 1 + p * 0.12 })
          },
        })
      }, wrap)
      return () => ctx.revert()
    })

    mm.add('(max-width: 640px)', () => {
      gsap.set(titleRef.current, { opacity: 0.14 })
      const anim = gsap.fromTo(
        mediaRef.current,
        { scale: 0.92, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: wrap, start: 'top 75%', once: true } },
      )
      return () => anim.scrollTrigger?.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={wrapRef}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden border-t border-line bg-bg sm:h-svh"
    >
      <span
        ref={titleRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-0 select-none whitespace-nowrap font-display text-[15vw] font-semibold leading-none text-line-soft sm:text-[9vw]"
      >
        WORK THAT MOVES
      </span>

      <div ref={mediaRef} className="relative z-10 aspect-video w-[92vw] overflow-hidden rounded-2xl sm:w-[44vw]">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=75"
          alt="Inside the LaunchCraft studio"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
