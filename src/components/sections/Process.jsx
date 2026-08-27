import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const STEPS = [
  {
    n: '01',
    key: 'discover',
    title: 'Discover',
    desc: 'We learn what you are building, who it is for, and what success looks like.',
    receive: ['Creative brief', 'Audience alignment', 'Competitor review', 'Scope of work'],
  },
  {
    n: '02',
    key: 'define',
    title: 'Define',
    desc: 'Wireframes and structure so the site works before it looks good.',
    receive: ['Sitemap', 'Wireframes', 'Content plan', 'Tech stack'],
  },
  {
    n: '03',
    key: 'create',
    title: 'Create',
    desc: 'Visual design and development, built in fast, visible sprints.',
    receive: ['UI design files', 'Working build', 'Revision rounds', 'QA pass'],
  },
  {
    n: '04',
    key: 'launch',
    title: 'Launch',
    desc: 'Going live, then sticking around for fixes and updates after.',
    receive: ['Deployed site', 'Analytics setup', 'Handover docs', 'Support plan'],
  },
]

export default function Process() {
  const itemRefs = useRef([])
  const dotRef = useRef(null)
  const lineWrapRef = useRef(null)
  const headingRef = useRef(null)
  const cardsWrapRef = useRef(null)

  useEffect(() => {
    const items = itemRefs.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const triggers = items.map((item) => {
      if (!item) return null
      gsap.set(item, { opacity: 0, y: 40 })
      return ScrollTrigger.create({
        trigger: item,
        start: 'top 78%',
        onEnter: () => gsap.to(item, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
      })
    })

    const dotTrigger = ScrollTrigger.create({
      trigger: lineWrapRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5,
      onUpdate: (self) => gsap.set(dotRef.current, { top: `${self.progress * 100}%` }),
    })

    return () => {
      triggers.forEach((t) => t?.kill())
      dotTrigger.kill()
    }
  }, [])

  return (
    <section id="process" data-theme="light" className="border-t border-line bg-cream px-5 py-28 sm:px-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[0.85fr_1.4fr] sm:gap-16">
        {/* Sticky label column — a separate column (not stacked above the
            cards) is what actually keeps it clear of them: position:sticky
            only freezes this element, it doesn't reserve space that stops
            normal-flow siblings scrolling through the same screen area. */}
        <div ref={headingRef} className="sticky top-24 z-0 self-start">
          <h2 className="text-ink">
            <span className="block font-display text-[11vw] font-black leading-[0.95] tracking-tight sm:text-[clamp(2rem,4vw,3.4rem)]">
              From idea
            </span>
            <span className="accent-script mt-1 block text-[11vw] leading-[1.15] text-muted sm:text-[clamp(2rem,4vw,3.4rem)]">
              to launch.
            </span>
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Every project moves through a clear sequence. No guesswork. No surprises.
          </p>
        </div>

        <div ref={cardsWrapRef} className="flex gap-6 sm:gap-10">
          <div ref={lineWrapRef} className="relative hidden w-6 flex-shrink-0 sm:block">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
            <div ref={dotRef} className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-orange shadow-[0_0_10px_rgba(255,90,31,0.6)]" style={{ top: 0 }} />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-[0.25em] text-muted [writing-mode:vertical-rl]">
              How we work
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            {STEPS.map((step, i) => (
            <div
              key={step.key}
              ref={(el) => (itemRefs.current[i] = el)}
              className="sticky rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-10"
              style={{ top: `${96 + i * 16}px`, zIndex: i + 1 }}
            >
              <div className="flex items-center gap-3 border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                <span className="text-ink">{step.n}</span>
                <span>—</span>
                <span>{step.title}</span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1fr]">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Process stage</span>
                  <h3 className="mt-2 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">{step.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{step.desc}</p>

                  <div className="mt-8 border-t border-line pt-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">What you receive</span>
                    <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                      {step.receive.map((r) => (
                        <li key={r} className="flex items-center gap-2 text-sm text-ink">
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="min-h-[220px] rounded-2xl bg-black sm:min-h-0" aria-hidden="true" />
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
