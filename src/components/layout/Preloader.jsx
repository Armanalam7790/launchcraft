import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

const WORDS = ['LAUNCH', 'CRAFT', 'STUDIO']

export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const numRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onDone?.()
      return
    }

    const letters = rootRef.current.querySelectorAll('.pre-letter')
    const counter = { val: 0 }

    const tl = gsap.timeline({ onComplete: () => onDone?.() })

    tl.set(letters, { yPercent: 115, rotate: () => gsap.utils.random(-12, 12), opacity: 0 })
      .to(counter, {
        val: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = String(Math.floor(counter.val)).padStart(3, '0')
        },
      })
      .to(
        letters,
        { yPercent: 0, rotate: 0, opacity: 1, duration: 0.85, stagger: 0.02, ease: 'power4.out' },
        0.15,
      )
      // brief distortion pulse once the wordmark has landed
      .to('.pre-word', { skewX: -8, scaleX: 1.04, duration: 0.08, ease: 'power1.inOut' }, '-=0.3')
      .to('.pre-word', { skewX: 6, scaleX: 0.98, duration: 0.08, ease: 'power1.inOut' })
      .to('.pre-word', { skewX: 0, scaleX: 1, duration: 0.18, ease: 'power3.out' })
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.25')

    return () => tl.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading LaunchCraft Studio"
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center overflow-hidden bg-cream text-ink"
    >
      <span className="absolute left-6 top-6 font-mono text-xs tracking-[0.15em] sm:left-10 sm:top-10">
        LAUNCHCRAFT™
      </span>
      <span ref={numRef} className="absolute right-6 top-6 font-mono text-xs tracking-[0.15em] sm:right-10 sm:top-10">
        000
      </span>

      <div className="flex flex-col items-center leading-none">
        {WORDS.map((word) => (
          <span key={word} className="pre-word block overflow-hidden font-display text-[14vw] font-semibold leading-[0.9] sm:text-[9vw]">
            {word.split('').map((ch, i) => (
              <span key={i} className="pre-letter inline-block">
                {ch}
              </span>
            ))}
          </span>
        ))}
      </div>

      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] sm:bottom-10">
        MAKING SOME NOISE…
      </span>
    </div>
  )
}
