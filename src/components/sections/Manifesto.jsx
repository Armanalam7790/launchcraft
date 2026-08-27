import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const SEGMENTS = [
  { text: 'The internet is loud.', lime: false },
  { text: 'So we don’t whisper.', lime: true },
  {
    text: 'We build brands, websites and digital experiences designed to earn attention — and keep it.',
    lime: false,
  },
]

// Flattened once so each word's DOM ref can be assigned by a stable index.
const WORDS = SEGMENTS.flatMap((seg) => seg.text.split(' ').map((w) => ({ w, lime: !!seg.lime })))

export default function Manifesto() {
  const sectionRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const words = wordRefs.current.filter(Boolean)
    if (!section || !words.length) return

    gsap.set(words, { color: 'var(--color-muted)' })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => (w.style.color = w.dataset.lime === 'true' ? 'var(--color-lime)' : 'var(--color-ink)'))
      return
    }

    // gsap.context() (not a bare ScrollTrigger.kill()) so `.revert()` fully
    // unwinds the pin-spacer GSAP inserts — without it, React's own unmount
    // can try to remove a node GSAP has already re-parented, throwing
    // "Failed to execute 'removeChild'" when this section unmounts mid-route.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=120%',
        scrub: 0.4,
        pin: true,
        onUpdate: (self) => {
          const count = Math.round(self.progress * words.length)
          words.forEach((w, i) => {
            gsap.to(w, {
              color: i < count ? (w.dataset.lime === 'true' ? 'var(--color-lime)' : 'var(--color-ink)') : 'var(--color-muted)',
              duration: 0.25,
              overwrite: 'auto',
            })
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-svh items-center border-t border-line px-5 sm:px-10">
      <div className="max-w-5xl">
        <span className="mb-8 block font-mono text-xs uppercase tracking-[0.18em] text-muted">[ What we believe ]</span>
        <p className="font-display text-[9vw] font-medium leading-[1.05] tracking-tight sm:text-[clamp(2.4rem,5.4vw,5.2rem)]">
          {WORDS.map((item, i) => (
            <span
              key={i}
              ref={(el) => (wordRefs.current[i] = el)}
              data-lime={String(item.lime)}
              className="mr-[0.28em] inline-block"
            >
              {item.w}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
