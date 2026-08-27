import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import GridDistortion from '../ui/GridDistortion'

const HERO_BG = 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1920&q=70'

export default function Hero({ ready }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.set('.hero-marker', { scale: 0, opacity: 0 })
      gsap.set('.hero-line', { yPercent: 110, rotate: 4 })
      gsap.set('.hero-script', { opacity: 0, scale: 0.94, filter: 'blur(6px)' })
      gsap.set('.hero-sub', { opacity: 0, y: 14 })
      gsap.set('.hero-scrolldown', { opacity: 0 })
      gsap.set('.hero-plus', { opacity: 0, rotate: -90 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('.hero-marker', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' })
        .to('.hero-line', { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.09 }, '-=0.25')
        .to('.hero-script', { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1 }, '-=0.55')
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .to('.hero-scrolldown', { opacity: 1, duration: 0.6 }, '-=0.3')
        .to('.hero-plus', { opacity: 1, rotate: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(2)' }, '-=0.9')
    }, sectionRef)
    return () => ctx.revert()
  }, [ready])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set('.hero-content', { y: self.progress * 80, opacity: 1 - self.progress * 0.7 })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section id="top" ref={sectionRef} data-theme="dark" className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-black pt-28">
      <div className="absolute inset-0 z-0">
        <GridDistortion imageSrc={HERO_BG} grid={20} mouse={0.14} strength={0.12} relaxation={0.92} className="h-full w-full opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/70" />
      </div>

      <span className="hero-plus pointer-events-none absolute left-[8vw] top-32 z-10 text-lg text-ink-dark/25 sm:block hidden" aria-hidden="true">+</span>
      <span className="hero-plus pointer-events-none absolute left-[8vw] bottom-24 z-10 text-lg text-ink-dark/25 sm:block hidden" aria-hidden="true">+</span>

      <div className="hero-content relative z-10 flex flex-1 flex-col justify-center px-5 sm:px-10">
        <div className="hero-marker mb-8 flex h-9 w-9 items-center justify-center rounded-full border border-ink-dark/20">
          <span className="h-1.5 w-1.5 rounded-full bg-ink-dark" />
        </div>

        <h1 className="text-ink-dark">
          <span className="reveal-lines block">
            <span className="hero-line block font-display text-[9vw] font-black uppercase leading-[1.05] tracking-tight sm:text-[clamp(1.6rem,3.4vw,2.6rem)]">
              Good enough is not enough, be
            </span>
          </span>

          <span className="hero-script accent-script mt-2 block text-[19vw] leading-[1.05] text-ink-dark sm:text-[clamp(4rem,11vw,10rem)]">
            Exceptional.
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:max-w-md">
          <p className="hero-sub font-mono text-xs uppercase leading-relaxed tracking-[0.08em] text-muted-dark">
            We design and build websites that look sharp, load fast, and actually convert.
          </p>
          <a href="#work" data-cursor="View →" className="hero-sub inline-flex w-fit items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink-dark">
            View our work
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>

      <div className="hero-scrolldown absolute bottom-10 right-5 z-10 flex flex-col items-center gap-3 sm:right-10">
        <span className="h-14 w-px bg-ink-dark/25" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-dark [writing-mode:vertical-rl]">Scroll to explore</span>
        <ArrowDown size={13} className="animate-bounce text-muted-dark" strokeWidth={1.5} />
      </div>
    </section>
  )
}
